const { app } = require("firebase-functions");
const { admin, db } = require("../config/admin");

exports.getPosts = (req, res) => {
  admin
    .firestore()
    .collection("posts")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          body: doc.data().body,
          role: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(posts);
    })
    .catch((err) => console.error(err));
};

exports.createPosts = (req, res) => {
  const newPosts = {
    body: req.body.body,
    role: req.body.role,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  };

  admin
    .firestore()
    .add(newPosts)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
