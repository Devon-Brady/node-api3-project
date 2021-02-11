const { post } = require("../server");
const Post = require('../posts/posts-model');
const User = require('../users/users-model')
function logger(req, res, next) {
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log( `A ${req.method} request was made on ${Date().toLocaleString()} to ${fullUrl}`);
  next();
}

async function validateUserId(req, res, next) {
  const {id} = req.params
  try{
    const user = await User.getById(id)
    if(!user){
      res.status(400).json({message:`No user with Id: ${id}`})
    } else{
      req.users = user
      next()
    }
  }catch(err){
    res.status(500).json(`Server error:${err}`)
  }
}
function validatePost(req, res, next) {
  // do your magic!
}

async function validateUser(req, res, next) {
  const {name} = req.body
  if(!name){
    res.status(400).json({message:`User must contain a name`})
  } else {
    next()
  }


  // do your magic!
}

 async function validatePostId(req, res, next) {
  const {id} = req.params
  try{
    const post = await Post.getById(id)
    if(!id){
      res.status(400).json({message:`No post with Id: ${id}`})
    } else{
      req.posts = post
      next()
    }
  }catch(err){
    res.status(500).json(`Server error:${err}`)
  }
}
function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
  validatePostId
}