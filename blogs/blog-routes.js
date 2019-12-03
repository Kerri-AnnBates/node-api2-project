const express = require('express');
const db = require('../data/db');
const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.end();
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})

// GET post by a specific id ?
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.end();
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

// GET post comments
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;

    db.findCommentById(id)
        .then(comments => {
            console.log(comments);
            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.end();
            res.status(500).json({ message: "The post with the specified ID does not exist." });
        })
})

// DELETE post
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(post => {
            // console.log("post", post);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.end();
            res.status(500).json({ error: "The post could not be removed" });
        })
})

module.exports = router;