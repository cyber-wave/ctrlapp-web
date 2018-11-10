var firebase = require('../secret/firebase');

var NotificationPusher = {
    pushToDevice: function(titulo, corpo, fcmToken){
        var promise = firebase.messaging().send({
            notification: {
                body: mensagem,
                title: titulo,
            },
            token: theToken
        });
        return promise;
    },

    pushToTopic: function(titulo, corpo, topic){
        var promise = firebase.messaging().send({
            android: {
                collapseKey: topic
            },
            notification: {
                body: corpo,
                title: titulo,
            },
            topic: topic
        });
        return promise;
    }
}

module.exports = NotificationPusher;