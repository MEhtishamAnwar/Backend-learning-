
const http = require('http');
// This function handles every browser request
const requestHandler=require('./data');
// Pass the handler function into createServer
const server = http.createServer(requestHandler);

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});