global.ListPost = require('../../data/post.data');
global.ListComment = require('../../data/comment.data');

class CommentController {
    post(req, res, next) {
        // title & content
        const newComment = req.body;

        // postId
        newComment.postId = Number(req.params.postId);

        // date_created
        newComment.date_created = new Date().toISOString();

        // id
        if (ListComment.length === 0) newComment.id = 0;
        else
            newComment.id = Math.max(
                ...ListComment.map((comment) => comment.id)
            );

        // Save
        ListComment = [...ListComment, newComment];

        // Redirect to current page
        res.redirect(`/posts/${newComment.postId}`);
    }
}

module.exports = new CommentController();
