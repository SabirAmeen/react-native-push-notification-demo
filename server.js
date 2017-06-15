var express = require('express'),
    path = require('path'),
    http = require('http'),
    request = require('request');
var app = express();
var server = http.createServer(app);

function sendMessageToUser(deviceId, message) {
    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=AAAAfhpeLQY:APA91bHZyVmn-Cp48-pT9wFtlJw_uNPWawLrsEMmNtNeprWStt4DNj9TJue836ygg3nJBtjsOmNcgA1f3J_YehsyAwceCN1OOfw4du4fqM9HCQfxto2B4t6B-qnqTsl5NMUKzQh5XCIf'
        },
        body: JSON.stringify({
            data: message,
            to: deviceId
        })
    }, function(error, response, body) {
        if (error) {
            console.error(error, response, body);
        } else if (response.statusCode >= 400) {
            console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        } else {
            console.log('Done!')
        }
    });
}
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/server.js')
    sendMessageToUser(
        "/topics/Hello", {msg:"hi",name:"john"}
    );
})

server.listen(8088);
console.log('Listening on port 8088...');
