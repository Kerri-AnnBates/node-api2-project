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

    db.findPostComments(id)
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

// POST a post.
router.post('/', (req, res) => {
    const newPost = req.body;
    if (newPost.title || newPost.contents) {

        db.insert(newPost)
            .then(post => {
                res.status(200).json(post);
            })
            .catch(error => {
                res.end();
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

// POST comments on a post
router.post('/:id/comments', (req, res) => {
    const newComment = req.body;
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
        })

    if (newComment.text) {
        db.insertComment(newComment)
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" });
                res.end();
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
})

// PUT resquest to update post
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })

    if(changes.title || changes.contents){
        db.update(id, changes)
            .then(post => {
                res.status(200).json(post);
            })
            .catch(error => {
                res.end();
                res.status(500).json({ error: "The post information could not be modified." });
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

module.exports = router;