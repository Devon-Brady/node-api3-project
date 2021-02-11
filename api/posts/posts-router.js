const express = require("express");
const mw = require("../middleware/middleware.js");
const router = express.Router();
const Post = require("./posts-model");

router.get("/", mw.logger, (req, res) => {
  Post.get()
    .then(() => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: "Can not get post" });
    });
});

router.get("/:id", mw.logger, mw.validatePostId, (req, res) => {
  
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  res.status(200).json(req.posts);
});

// do not forget to export the router
module.exports = router;
