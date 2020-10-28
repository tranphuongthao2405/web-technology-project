const { admin, db } = require("./config/admin");
const functions = require("firebase-functions");
const express = require("express");
const firebaseConfig = require("./config/config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const app = express();

const { getPosts } = require("./routes/posts");

app.get("/posts", getPosts);

exports.api = functions.https.onRequest(app);
