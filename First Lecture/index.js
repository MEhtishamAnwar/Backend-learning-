const http = require('http');
const fs = require('fs');

const server =http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);
 if(req.url === '/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head >');
    res.write('<title>My First Page</title>');
    res.write('</head>');
    res.write('<body><h1 style="background-color: lightgray; color:blue" >Hello this is home page</h1>');
    res.write('<form action="/about" method="POST"> <input type="text" name="name" placeholder="Enter your name"><input type="radio" name="gender" value="male"> Male <input type="radio" name="gender" value="female"> Female <button type="submit">Go to About Page</button> </form>');
    res.write('</body>')
    res.write('</html>');
   return  res.end();
 }
 else if(req.url === '/about'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head >');
    res.write('<title>My First Page</title>');
    res.write('</head>');
    res.write('<body><h1 style="background-color: lightgray; color:green" >This is  about page</h1></body>');
    res.write('</html>');
   return  res.end();
   res.setHeader('Location','/');
    ret
    
 } else if(req.url.toLowerCase() === '/about' && req.method === 'POST'){
   fs.writeFileSync('user.txt','User name is: '+req.body.name + ' and gender is: '+ req.body.gender);
   res.statusCode = 302;
   res.setHeader('Location','/');
   res.end();
 }
 res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head >');
    res.write('<title>My First Page</title>');
    res.write('</head>');
    res.write('<body><h1 style="background-color: lightgray; color:red" >Hello from my Node.js Server! </h1></body>');
    res.write('</html>');
    res.end();
    // process.exit();

} );
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
