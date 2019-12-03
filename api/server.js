const express = require('express');
const blogRoutes = require('../blogs/blog-routes');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to my blog</h1>`);
});

server.use('/api/posts', blogRoutes);

module.exports = server;