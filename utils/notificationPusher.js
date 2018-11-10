var firebase = require('../secret/firebase');

class NotificationPusher{
    static pushToDevice(titulo, corpo, fcmToken){
        var promise = firebase.messaging().send({
            notification: {
                body: mensagem,
                title: titulo,
            },
            token: theToken
        });
        return promise;
    }

    static pushToTopic(titulo, corpo, topic){
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