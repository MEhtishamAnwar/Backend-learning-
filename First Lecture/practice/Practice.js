const http =require('http');
// const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method)
    res.setHeader('Content-Type','text/html');



    if(req.url==='/home'){

        res.write('<h1> Wellcome to home page </h1>');
        return res.end();
    }
    else if(req.url === '/men'){

        res.write('<h1> wellcome to the men shopping page </h1>');
        return res.end();

    }
    else if(req.url ==='/women'){
res.write('<h1> Wellcome to Women Shopping Page</h1>');
return res.end();

    }
      else if(req.url ==='/cart'){
res.write('<h1> Wellcome to  cart Page</h1>');
return res.end();

    }
        else if(req.url ==='/kids'){
res.write('<h1> Wellcome to  kids Page</h1>');
return res.end();

    }

    res.write(`
      <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <head>
        <nav>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/men">Men</a></li>
                <li><a href="/women">Women</a></li>
                <li><a href="/kids">Kids</a></li>
                <li><a href="/cart">Cart</a></li>
            </ul>
        </nav>
    </head>
</body>
</html>
    
        `);

res.end();
});
server.listen(2000,()=>{
    console.log('Server is running on address http://localhost:2000');
})