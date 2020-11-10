const express = require("express");
const router = express.Router();
const { db } = require("../Config/config");
const auth = require("../Middleware/auth");

router.get("/getPosts", auth, (req, res) => {
  const posts = [];
  db.collection("posts")
    .orderBy("timestamp", "desc")
    .onSnapshot(
      (snapshot) => {
        snapshot.docs.map((doc) => {
          posts.push({ id: doc.id, data: doc.data() });
        });
        return res.status(200).json(posts);
      },
      (error) => {
        return res.status(400).json(error);
      }
    );
});

router.post("/createPosts", auth, (req, res) => {
  db.collection("posts")
    .add(req.body)
    .then((response) => res.status(200).json(response.id))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
