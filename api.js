const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router.js');

app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log(`API listening on ${port}`);