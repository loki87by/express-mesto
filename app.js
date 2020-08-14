const http = require('http');
const server = http.createServer();
const { PORT = 3000 } = process.env;
server.listen(PORT);