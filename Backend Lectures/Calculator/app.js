const http = require('http');
const {requestHandler}=require("./handler.js")
const server=http.createServer(requestHandler);
const PORT=3004;
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});