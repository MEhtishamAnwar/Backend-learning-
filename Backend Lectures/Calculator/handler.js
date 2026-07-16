const {sumRequestHandler}=require("./Sum")



const requestHandler= (req,res)=>{
console.log(req.url, req.method,);
console.log("thw quick brown fox jumps over the lazy dog THE QUCK BROWN FOX JUMPS OVER THE LAZY DOG")


if(req.url==="/"){
     res.setHeader('Content-Type', 'text/html');

    res.write(`<html>
    <head><title>Calculator</title></head>
       <body>
    <h1>Wellcome to calculator App:</h1>
    <a href="/calculator">Go To Calculator</a>
    </body>
    </html>
    
    `);
    return res.end();
}

else if(req.url.toLowerCase()==="/calculator"){
res.setHeader('Content-Type', 'text/html');

    res.write(`<html>
    <head><title>Calculator</title></head>
       <body>
    <h1>Here is the calculator App:</h1>
    <form action="/calculator-result" method="POST">
       <input type="number" name="first" placeholder="Enter the first number" required />
       <input type="number" name="second" placeholder="Enter the second number" required />
       <input type="submit" value="Sum" />
      </form>
    </body>
    </html>
    
    `);
    return res.end();

}
else if(req.url.toLowerCase()==="/calculator-result"&& req.method==="POST"){
  return  sumRequestHandler(req,res)
}
res.setHeader('Content-Type', 'text/html');

    res.write(`<html>
    <head><title>Calculator</title></head>
       <body>
    <h1>404 page doesn,t exist:</h1>
    <a href="/">Go To Home</a>
    </body>
    </html>
    
    `);
    return res.end();
}
exports.requestHandler=requestHandler;