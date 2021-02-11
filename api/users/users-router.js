const express = require("express");
const mw = require("../middleware/middleware");
const router = express.Router();
const User = require("./users-model");

router.get("/",mw.logger,(req, res) => {
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: `Unable to get Users` });
    });
});

router.get("/:id", mw.logger,mw.validateUserId, (req, res) => {
  res.status(200).json(req.users)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post("/", mw.logger, mw.validateUser, (req, res) => {
  User.insert(req.body)
  .then((users)=>{
    res.status(201).json({users})
  })
  .catch(()=>{
    res.status(500).json({message:`Can not add user.`})
  })

  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id",mw.logger,mw.validateUserId,mw.validateUser, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  User.update(id, changes)
  .then((users)=>{
    console.log()
    res.status(201).json(users)
  })
  .catch((error)=>{
    res.status(500).json({message:`Can not update user ${error}`})
  })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", mw.logger,mw.validateUserId, (req, res) => {
  const id = req.params.id 
  User.remove(id)
  .then(()=>{
    res.status(202).json({message:` User: ${id} has been removed.`})
  })
  .catch((error)=>{
    res.status(500).json({message:`Server Error: ${error}`})
  })
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts",mw.logger,mw.validateUserId, (req, res) => {
  
  User.getUserPosts(req.params.id)
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch((error)=>{
    res.status(500).json({message:`Can not get users post.`})
  })
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router