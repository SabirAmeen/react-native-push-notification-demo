Object.defineProperty(exports, "__esModule", {
    value: true
});
var tok = exports.tok = undefined;
var PushNotification = exports.PushNotification = require('react-native-push-notification');

PushNotification.configure({
    onRegister: function onRegister(token) {
        console.log('TOKEN:', token);
        exports.tok = tok = token.token;
    },

    onNotification: function onNotification(notification) {
        PushNotification.localNotification({
            id: '0',
            ticker: "My Notification Ticker",
            autoCancel: true,
            largeIcon: "ic_launcher",
            smallIcon: "ic_notification",
            subText: "Chunks",
            color: "red",
            vibrate: true,
            vibration: 300,
            tag: 'some_tag',
            group: "group",
            ongoing: false,
            title: notification["name"],
            message: notification["msg"],
            playSound: true,
            soundName: 'default',
            number: '10',
            actions: '["Yes", "No"]' });
        console.log('NOTIFICATION:', notification);
    },

    senderID: "541608258822",

    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    popInitialNotification: true,

    requestPermissions: true
});