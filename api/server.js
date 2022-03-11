const express = require('express');
const server = express();

const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

server.use(express.json());
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send(`<h2>insert some content here maybe idk lulz</h2>`)
})

module.exports = server;
