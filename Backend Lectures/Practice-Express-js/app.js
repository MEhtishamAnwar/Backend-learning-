     const express= require('express')
    const app = express();
    app.use(express.urlencoded({ extended: true }));
  app.use((req,res,next)=>{
      console.log( "Request came from 1st middleware",req.url, req.method);   
    
       next();
  });
  app.use( (req, res, next) => {
     
      console.log("Request came from 2nd middleware", req.url, req.method);
      next();
  });
//   app.use( (req, res, next) => {
    
//       console.log("Request came from complete middleware", req.url, req.method);
//         res.send(`<h1>Welcome to the complete Route</h1>`);
        
//   });
  app.get('/', (req, res) => {
    console.log("Request came from home route", req.url, req.method);
      res.send(`<h1>Welcome to the Home Route</h1>`);
  });
    app.get('/contact-us', (req, res) => {
      console.log("Request came from contact-us route", req.url, req.method);
      res.send(`<h1>Welcome to the Contact Us Route</h1>
                <form action="/contact-us" method="POST">
                <input type="text" name="name" placeholder="Enter your name">
                <input type="email" name="email" placeholder="Enter your email">
                <button type="submit">Submit</button>
                </form>
        
        `);
  });
  app.post('/contact-us', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    console.log("Request came from contact-us route", req.url, req.method);
    console.log("Form data:", { name, email });
    res.send(`<h1>Form submitted successfully ${name}! and email is ${email}</h1>`);

  });
const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server s running on http://localhost:${PORT}`);
});