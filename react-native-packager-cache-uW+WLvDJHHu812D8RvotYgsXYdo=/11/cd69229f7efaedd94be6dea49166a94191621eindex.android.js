'use strict';

var _require = require('react-native'),
    NativeModules = _require.NativeModules,
    DeviceEventEmitter = _require.DeviceEventEmitter;

var RNPushNotification = NativeModules.RNPushNotification;
var _notifHandlers = new Map();

var DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';
var NOTIF_REGISTER_EVENT = 'remoteNotificationsRegistered';
var REMOTE_FETCH_EVENT = 'remoteFetch';

var NotificationsComponent = function NotificationsComponent() {};

NotificationsComponent.prototype.getInitialNotification = function () {
	return RNPushNotification.getInitialNotification().then(function (notification) {
		if (notification && notification.dataJSON) {
			return JSON.parse(notification.dataJSON);
		}
		return null;
	});
};

NotificationsComponent.prototype.requestPermissions = function (senderID) {
	RNPushNotification.requestPermissions(senderID);
};

NotificationsComponent.prototype.cancelLocalNotifications = function (details) {
	RNPushNotification.cancelLocalNotifications(details);
};

NotificationsComponent.prototype.cancelAllLocalNotifications = function () {
	RNPushNotification.cancelAllLocalNotifications();
};

NotificationsComponent.prototype.presentLocalNotification = function (details) {
	RNPushNotification.presentLocalNotification(details);
};

NotificationsComponent.prototype.scheduleLocalNotification = function (details) {
	RNPushNotification.scheduleLocalNotification(details);
};

NotificationsComponent.prototype.setApplicationIconBadgeNumber = function (number) {
	if (!RNPushNotification.setApplicationIconBadgeNumber) {
		return;
	}
	RNPushNotification.setApplicationIconBadgeNumber(number);
};

NotificationsComponent.prototype.abandonPermissions = function () {};

NotificationsComponent.prototype.checkPermissions = function (callback) {};

NotificationsComponent.prototype.addEventListener = function (type, handler) {
	var listener;
	if (type === 'notification') {
		listener = DeviceEventEmitter.addListener(DEVICE_NOTIF_EVENT, function (notifData) {
			var data = JSON.parse(notifData.dataJSON);
			handler(data);
		});
	} else if (type === 'register') {
		listener = DeviceEventEmitter.addListener(NOTIF_REGISTER_EVENT, function (registrationInfo) {
			handler(registrationInfo.deviceToken);
		});
	} else if (type === 'remoteFetch') {
		listener = DeviceEventEmitter.addListener(REMOTE_FETCH_EVENT, function (notifData) {
			var notificationData = JSON.parse(notifData.dataJSON);
			handler(notificationData);
		});
	}

	_notifHandlers.set(type, listener);
};

NotificationsComponent.prototype.removeEventListener = function (type, handler) {
	var listener = _notifHandlers.get(type);
	if (!listener) {
		return;
	}
	listener.remove();
	_notifHandlers.delete(type);
};

NotificationsComponent.prototype.registerNotificationActions = function (details) {
	RNPushNotification.registerNotificationActions(details);
};

NotificationsComponent.prototype.clearAllNotifications = function () {
	RNPushNotification.clearAllNotifications();
};

module.exports = {
	state: false,
	component: new NotificationsComponent()
};