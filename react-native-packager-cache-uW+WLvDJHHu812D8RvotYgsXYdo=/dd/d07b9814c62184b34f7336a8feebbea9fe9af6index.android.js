Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = '/home/sabir/study/reactNativeNotifications/index.android.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _notifications = require('./notifications');

var _reactNative = require('react-native');

var reactNativeNotifications = function (_Component) {
    babelHelpers.inherits(reactNativeNotifications, _Component);

    function reactNativeNotifications(props) {
        babelHelpers.classCallCheck(this, reactNativeNotifications);

        var _this = babelHelpers.possibleConstructorReturn(this, (reactNativeNotifications.__proto__ || Object.getPrototypeOf(reactNativeNotifications)).call(this, props));

        _this.register = function () {
            var topicName = 'Hello';
            var url = 'https://iid.googleapis.com/iid/v1/' + _notifications.tok + '/rel/topics/' + topicName;
            fetch(url, { headers: { 'Content-Type': 'application/json', 'Authorization': 'key=AAAAfhpeLQY:APA91bHZyVmn-Cp48-pT9wFtlJw_uNPWawLrsEMmNtNeprWStt4DNj9TJue836ygg3nJBtjsOmNcgA1f3J_YehsyAwceCN1OOfw4du4fqM9HCQfxto2B4t6B-qnqTsl5NMUKzQh5XCIf' }, method: 'POST' }).then(function (result) {
                if (result.status == 200) {
                    console.log(result);
                } else {
                    console.log(result.status);
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        _this.unregister = function () {
            var topicName = '/topics/Hello';
            var data = {
                to: topicName,
                registration_tokens: [_notifications.tok]
            };
            var payload = JSON.stringify(data);
            var url = 'https://iid.googleapis.com/iid/v1:batchRemove';
            fetch(url, { headers: { 'Content-Type': 'application/json', 'Authorization': 'key=AAAAfhpeLQY:APA91bHZyVmn-Cp48-pT9wFtlJw_uNPWawLrsEMmNtNeprWStt4DNj9TJue836ygg3nJBtjsOmNcgA1f3J_YehsyAwceCN1OOfw4du4fqM9HCQfxto2B4t6B-qnqTsl5NMUKzQh5XCIf' }, method: 'POST', body: payload }).then(function (result) {
                if (result.status == 200) {
                    console.log(result);
                } else {
                    console.log(result);
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        _this.notify = function () {
            _notifications.PushNotification.localNotification({
                id: '0',
                ticker: "My Notification Ticker",
                autoCancel: true,
                largeIcon: "ic_launcher",
                smallIcon: "ic_notification",
                bigText: "My big text that will be shown when notification is expanded",
                subText: "This is a subText",
                color: "red",
                vibrate: true,
                vibration: 300,
                tag: 'some_tag',
                group: "group",
                ongoing: false,
                title: "My Notification Title",
                message: "My Notification Message",
                playSound: true,
                soundName: 'default',
                number: '10',
                actions: '["Yes", "No"]' });
        };

        return _this;
    }

    babelHelpers.createClass(reactNativeNotifications, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactNative.View,
                { style: styles.container, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 89
                    }
                },
                _react2.default.createElement(
                    _reactNative.Text,
                    { style: styles.welcome, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 90
                        }
                    },
                    'Welcome to React Native!'
                ),
                _react2.default.createElement(
                    _reactNative.Text,
                    { style: styles.instructions, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 93
                        }
                    },
                    'React Native Push Notifications'
                ),
                _react2.default.createElement(
                    _reactNative.TouchableOpacity,
                    { style: styles.button, onPress: this.notify.bind(this), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 96
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 97
                            }
                        },
                        'Click'
                    )
                ),
                _react2.default.createElement(
                    _reactNative.TouchableOpacity,
                    { style: styles.button, onPress: this.register.bind(this), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 99
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 100
                            }
                        },
                        'Register'
                    )
                ),
                _react2.default.createElement(
                    _reactNative.TouchableOpacity,
                    { style: styles.button, onPress: this.unregister.bind(this), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 102
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 103
                            }
                        },
                        'Unregister'
                    )
                )
            );
        }
    }]);
    return reactNativeNotifications;
}(_react.Component);

exports.default = reactNativeNotifications;


var styles = _reactNative.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    button: {
        margin: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

_reactNative.AppRegistry.registerComponent('reactNativeNotifications', function () {
    return reactNativeNotifications;
});