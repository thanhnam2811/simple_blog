global.ListPost = require('../../data/post.data');
global.ListComment = require('../../data/comment.data');
const moment = require('moment');

class PostController {
    // [GET] /
    showListPost(req, res, next) {
        res.render('home', {
            listPost: ListPost.sort((a, b) =>
                moment(a.date_created).isBefore(moment(b.date_created)) ? 1 : -1
            ).map((post) => {
                const timeAgo = moment(post.date_created)
                    .locale('vi')
                    .fromNow();
                return { ...post, timeAgo };
            }),
        });
    }

    create(req, res, next) {
        res.render('posts/new.post.hbs');
    }

    post(req, res, next) {
        // title & content
        const newPost = req.body;

        // New id
        if (ListPost.length === 0) newPost.id = 0;
        else newPost.id = Math.max(...ListPost.map((post) => post.id)) + 1;

        // Time create
        newPost.date_created = new Date().toISOString();

        // Save
        ListPost = [...ListPost, newPost];

        // Redirect to home page
        res.redirect('/');
    }

    show(req, res, next) {
        const post_id = Number(req.params.id);

        const post = ListPost.find((post) => post_id === post.id);

        if (post) {
            const listPostComment = ListComment.filter(
                (comment) => comment.postId === post.id
            ).sort((a, b) =>
                moment(a.date_created).isBefore(moment(b.date_created)) ? 1 : -1
            );

            const timeAgo = moment(post.date_created).locale('vi').fromNow();

            res.render('posts/show.post.hbs', {
                post: { ...post, timeAgo },
                listComment: listPostComment.map((comment) => {
                    const timeAgo = moment(comment.date_created)
                        .locale('vi')
                        .fromNow();
                    return {
                        ...comment,
                        timeAgo,
                    };
                }),
            });
        } else res.status(404).send('Không tìm thấy bài post');
    }

    delete(req, res, next) {
        const post_id = Number(req.params.id);

        // Delete post
        ListPost = ListPost.filter((post) => post.id !== post_id);

        // Delete comment
        ListComment = ListComment.filter(
            (comment) => comment.postId !== post_id
        );

        // Redirect to home
        res.redirect('/');
    }

    edit(req, res, next) {
        const post_id = Number(req.params.id);

        const post = ListPost.find((post) => post_id === post.id);

        if (post) {
            res.render('posts/edit.post.hbs', { post });
        } else res.status(404).send('Không tìm thấy bài post');
    }

    put(req, res, next) {
        const post_id = Number(req.params.id);

        // Save
        ListPost = ListPost.map((post) =>
            post.id === post_id ? { ...post, ...req.body } : post
        );

        // Redirect to post page
        res.redirect(`/posts/${post_id}`);
    }
}

module.exports = new PostController();
