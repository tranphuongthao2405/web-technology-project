const { admin, db } = require("./config/admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const firebaseConfig = require("./config/config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const app = express();
app.use(cors({ origin: true }));

const { getPosts, createPosts } = require("./routes/posts");

app.get("/posts", getPosts);
app.post("/posts", createPosts);

exports.api = functions.https.onRequest(app);
