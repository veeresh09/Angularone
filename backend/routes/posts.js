const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    // console.log(result);
    res.status(200).json({
      message: "edited",
    });
  });
});
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((newpost) => {
    res.status(201).json({
      message: "Created",
      postId: newpost._id,
    });
  });
  //console.log(post);
});
router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Succ3sss",
      posts: documents,
    });
  });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post Not Found",
      });
    }
  });
});
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted",
    });
  });
});
module.exports = router;
