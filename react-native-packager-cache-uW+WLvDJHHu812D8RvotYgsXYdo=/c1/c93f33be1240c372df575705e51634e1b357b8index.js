

'use strict';

var RNNotificationsComponent = require('./component');

var AppState = RNNotificationsComponent.state;
var RNNotifications = RNNotificationsComponent.component;

var Platform = require('react-native').Platform;

var Notifications = {
	handler: RNNotifications,
	onRegister: false,
	onError: false,
	onNotification: false,
	onRemoteFetch: false,
	isLoaded: false,
	hasPoppedInitialNotification: false,

	isPermissionsRequestPending: false,

	permissions: {
		alert: true,
		badge: true,
		sound: true
	}
};

Notifications.callNative = function (name, params) {
	if (typeof this.handler[name] === 'function') {
		var _handler;

		if (typeof params !== 'array' && typeof params !== 'object') {
			params = [];
		}

		return (_handler = this.handler)[name].apply(_handler, babelHelpers.toConsumableArray(params));
	} else {
		return null;
	}
};

Notifications.configure = function (options) {
	if (typeof options.onRegister !== 'undefined') {
		this.onRegister = options.onRegister;
	}

	if (typeof options.onError !== 'undefined') {
		this.onError = options.onError;
	}

	if (typeof options.onNotification !== 'undefined') {
		this.onNotification = options.onNotification;
	}

	if (typeof options.permissions !== 'undefined') {
		this.permissions = options.permissions;
	}

	if (typeof options.senderID !== 'undefined') {
		this.senderID = options.senderID;
	}

	if (typeof options.onRemoteFetch !== 'undefined') {
		this.onRemoteFetch = options.onRemoteFetch;
	}

	if (this.isLoaded === false) {
		this._onRegister = this._onRegister.bind(this);
		this._onNotification = this._onNotification.bind(this);
		this._onRemoteFetch = this._onRemoteFetch.bind(this);
		this.callNative('addEventListener', ['register', this._onRegister]);
		this.callNative('addEventListener', ['notification', this._onNotification]);
		this.callNative('addEventListener', ['localNotification', this._onNotification]);
		Platform.OS === 'android' ? this.callNative('addEventListener', ['remoteFetch', this._onRemoteFetch]) : null;

		this.isLoaded = true;
	}

	if (this.hasPoppedInitialNotification === false && (options.popInitialNotification === undefined || options.popInitialNotification === true)) {
		this.popInitialNotification(function (firstNotification) {
			if (firstNotification !== null) {
				this._onNotification(firstNotification, true);
			}
		}.bind(this));
		this.hasPoppedInitialNotification = true;
	}

	if (options.requestPermissions !== false) {
		this._requestPermissions();
	}
};

Notifications.unregister = function () {
	this.callNative('removeEventListener', ['register', this._onRegister]);
	this.callNative('removeEventListener', ['notification', this._onNotification]);
	this.callNative('removeEventListener', ['localNotification', this._onNotification]);
	Platform.OS === 'android' ? this.callNative('removeEventListener', ['remoteFetch', this._onRemoteFetch]) : null;
	this.isLoaded = false;
};

Notifications.localNotification = function (details) {
	if (Platform.OS === 'ios') {

		var soundName = details.soundName ? details.soundName : 'default';

		if (details.hasOwnProperty('playSound') && !details.playSound) {
			soundName = '';
		}

		this.handler.presentLocalNotification({
			alertTitle: details.title,
			alertBody: details.message,
			alertAction: details.alertAction,
			category: details.category,
			soundName: soundName,
			applicationIconBadgeNumber: details.number,
			userInfo: details.userInfo
		});
	} else {
		this.handler.presentLocalNotification(details);
	}
};

Notifications.localNotificationSchedule = function (details) {
	if (Platform.OS === 'ios') {
		var soundName = details.soundName ? details.soundName : 'default';

		if (details.hasOwnProperty('playSound') && !details.playSound) {
			soundName = '';
		}

		var iosDetails = {
			fireDate: details.date.toISOString(),
			alertBody: details.message,
			soundName: soundName,
			applicationIconBadgeNumber: parseInt(details.number, 10),
			userInfo: details.userInfo,
			repeatInterval: details.repeatType
		};

		if (!details.repeatType || details.repeatType === 'time') {
			delete iosDetails.repeatInterval;
		}
		this.handler.scheduleLocalNotification(iosDetails);
	} else {
		details.fireDate = details.date.getTime();
		delete details.date;

		if (['year', 'month'].includes(details.repeatType)) {
			delete details.repeatType;
		}
		this.handler.scheduleLocalNotification(details);
	}
};

Notifications._onRegister = function (token) {
	if (this.onRegister !== false) {
		this.onRegister({
			token: token,
			os: Platform.OS
		});
	}
};

Notifications._onRemoteFetch = function (notificationData) {
	if (this.onRemoteFetch !== false) {
		this.onRemoteFetch(notificationData);
	}
};

Notifications._onNotification = function (data) {
	var isFromBackground = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (isFromBackground === null) {
		isFromBackground = data.foreground === false || AppState.currentState === 'background';
	}

	if (this.onNotification !== false) {
		if (Platform.OS === 'ios') {
			this.onNotification({
				foreground: !isFromBackground,
				userInteraction: isFromBackground,
				message: data.getMessage(),
				data: data.getData(),
				badge: data.getBadgeCount(),
				alert: data.getAlert(),
				sound: data.getSound()
			});
		} else {
			var notificationData = babelHelpers.extends({
				foreground: !isFromBackground
			}, data);

			if (typeof notificationData.data === 'string') {
				try {
					notificationData.data = JSON.parse(notificationData.data);
				} catch (e) {}
			}

			this.onNotification(notificationData);
		}
	}
};

Notifications._onPermissionResult = function () {
	this.isPermissionsRequestPending = false;
};

Notifications._requestPermissions = function () {
	if (Platform.OS === 'ios') {
		if (this.isPermissionsRequestPending === false) {
			this.isPermissionsRequestPending = true;
			return this.callNative('requestPermissions', [this.permissions]).then(this._onPermissionResult.bind(this)).catch(this._onPermissionResult.bind(this));
		}
	} else if (typeof this.senderID !== 'undefined') {
		return this.callNative('requestPermissions', [this.senderID]);
	}
};

Notifications.requestPermissions = function () {
	if (Platform.OS === 'ios') {
		return this.callNative('requestPermissions', [this.permissions]);
	} else if (typeof this.senderID !== 'undefined') {
		return this.callNative('requestPermissions', [this.senderID]);
	}
};

Notifications.presentLocalNotification = function () {
	return this.callNative('presentLocalNotification', arguments);
};

Notifications.scheduleLocalNotification = function () {
	return this.callNative('scheduleLocalNotification', arguments);
};

Notifications.cancelLocalNotifications = function () {
	return this.callNative('cancelLocalNotifications', arguments);
};

Notifications.cancelAllLocalNotifications = function () {
	return this.callNative('cancelAllLocalNotifications', arguments);
};

Notifications.setApplicationIconBadgeNumber = function () {
	return this.callNative('setApplicationIconBadgeNumber', arguments);
};

Notifications.getApplicationIconBadgeNumber = function () {
	return this.callNative('getApplicationIconBadgeNumber', arguments);
};

Notifications.popInitialNotification = function (handler) {
	this.callNative('getInitialNotification').then(function (result) {
		handler(result);
	});
};

Notifications.abandonPermissions = function () {
	return this.callNative('abandonPermissions', arguments);
};

Notifications.checkPermissions = function () {
	return this.callNative('checkPermissions', arguments);
};

Notifications.registerNotificationActions = function () {
	return this.callNative('registerNotificationActions', arguments);
};

Notifications.clearAllNotifications = function () {
	return this.callNative('clearAllNotifications', arguments);
};

module.exports = Notifications;