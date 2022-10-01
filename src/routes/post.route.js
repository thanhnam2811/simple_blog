const express = require('express');
const route = express.Router();

const PostController = require('../app/controllers/PostController');

route.get('/', PostController.showListPost);

route.get('/posts/new', PostController.create);

route.post('/posts/new', PostController.post);

route.get('/posts/:id', PostController.show);

route.get('/posts/:id/delete', PostController.delete);

route.get('/posts/:id/edit', PostController.edit);

route.post('/posts/:id/edit', PostController.put);

module.exports = route;
