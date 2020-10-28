const admin = require("firebase-admin");
const serviceAccount = require("./social-network-23da1-firebase-adminsdk-54wv7-0aa77c6945.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-network-23da1.firebaseio.com",
});
const db = admin.firestore();
const firebase = require("firebase");
module.exports = { admin, db, firebase };
