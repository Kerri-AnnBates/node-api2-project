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
            if(post.length > 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.end();
            res.status(500).json({error: "The post information could not be retrieved." });
        })
})

module.exports = router;