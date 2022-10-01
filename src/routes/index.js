const postRouter = require('./post.route');
const commentRouter = require('./comment.route');

const routes = (app) => {
    app.use('/', postRouter);

    app.use('/posts/:postId/comments', commentRouter);
};

module.exports = routes;
