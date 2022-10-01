const express = require('express');
const route = express.Router({ mergeParams: true });

const CommentController = require('../app/controllers/CommentController');

route.post('/new', CommentController.post);

module.exports = route;
