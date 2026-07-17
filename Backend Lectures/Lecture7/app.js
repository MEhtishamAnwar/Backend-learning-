const http = require('http');
const server=http.createServer((req,res)=>{

    console.log("Request Method:", req.method);

});
const PORT=3007;
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});