const express = require("express");

const PostController = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const checkimage = require("../middleware/image-check");

const router = express.Router();

router.post("", checkAuth, checkimage, PostController.createPost);

router.put("/:id", checkAuth, checkimage, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
