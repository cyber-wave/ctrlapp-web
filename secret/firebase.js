var admin = require('firebase-admin');



var serviceAccount = require('./cyberwave.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

module.exports = admin;