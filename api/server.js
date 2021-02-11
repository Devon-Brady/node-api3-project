const express = require('express');

const server = express();
const postRouter = require('./posts/posts-router');
const mw = require('./middleware/middleware');
const userRouter = require('./users/users-router')
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use('/api/post', postRouter);
server.use('/api/users', userRouter);
// global middlewares and routes need to be connected here

server.get('/',mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
