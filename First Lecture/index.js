const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Home page
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');

    res.write(`
      <html>
        <head>
          <title>Home Page</title>
        </head>

        <body>
          <h1 style="background-color: lightgray; color: blue;">
            Home Page
          </h1>

          <form action="/about" method="POST">

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            >

            <br><br>

            <input
              type="radio"
              name="gender"
              value="Male"
              required
            >
            Male

            <input
              type="radio"
              name="gender"
              value="Female"
            >
            Female

            <br><br>

            <button type="submit">
              Save User Data
            </button>

          </form>

          <br>

          <a href="/contact">Go to Contact Page</a>
        </body>
      </html>
    `);

    return res.end();
  }

  // Handle form submission
  if (req.url === '/about' && req.method === 'POST') {
    const body = [];

    // Receive form data in small parts
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    // Runs when all form data is received
    req.on('end', () => {
      const completeBody = Buffer.concat(body).toString();

      console.log('Form Data:', completeBody);

      // Convert form data into readable values
      const formData = new URLSearchParams(completeBody);

      const name = formData.get('name');
      const gender = formData.get('gender');

      const userData = `User name is: ${name}\nGender is: ${gender}`;

      // Save data inside user.txt file
      fs.writeFileSync('user.txt', userData);

      res.setHeader('Content-Type', 'text/html');

      res.write(`
        <html>
          <head>
            <title>User Data</title>
          </head>

          <body>
            <h1 style="color: green;">
              Data Saved Successfully
            </h1>

            <h2>Entered Information</h2>

            <p>Name: ${name}</p>
            <p>Gender: ${gender}</p>

            <a href="/">Go Back to Home Page</a>
          </body>
        </html>
      `);

      return res.end();
    });

    return;
  }

  // Contact page
  if (req.url === '/contact' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');

    res.write(`
      <html>
        <head>
          <title>Contact Page</title>
        </head>

        <body>
          <h1 style="background-color: lightgray; color: green;">
            This is the Contact Page
          </h1>

          <a href="/">Go Back to Home Page</a>
        </body>
      </html>
    `);

    return res.end();
  }

  // Page not found
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');

  res.write(`
    <html>
      <head>
        <title>Page Not Found</title>
      </head>

      <body>
        <h1 style="color: red;">
          404 - Page Not Found
        </h1>

        <a href="/">Go to Home Page</a>
      </body>
    </html>
  `);

  return res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});