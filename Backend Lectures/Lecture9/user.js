const fs = require('fs');
const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

  // Home page
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<head><title>Lecture5</title></head>');
    res.write('<body>');
    res.write('<h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">');

    res.write(
      '<input type="text" name="username" placeholder="Enter your name" required>'
    );
    res.write('<br><br>');
    res.write('<label for="male">Male</label>');
    res.write(
      '<input type="radio" id="male" name="gender" value="male" required>'
    );
    res.write('<label for="female">Female</label>');
    res.write(
      '<input type="radio" id="female" name="gender" value="female">'
    );
    res.write('<br><br>');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  // Handle submitted form
  if (
    req.url.toLowerCase() === '/submit-details' &&
    req.method === 'POST'
  ) {
    const body = [];
    // Receive form data in chunks
    req.on('data', (chunk) => {
      console.log('Chunk:', chunk);
      console.log('Chunk as string:', chunk.toString());
      body.push(chunk);
    });
    // Runs when all form data has arrived
    req.on('end', () => {
      const fullBody = Buffer.concat(body).toString();
      console.log('Full body:', fullBody);

      const params = new URLSearchParams(fullBody);

      const bodyObject = Object.fromEntries(params);

      console.log('Parsed object:', bodyObject);

      // Save object inside user.txt
      fs.writeFileSync(
        'user.txt',
        JSON.stringify(bodyObject, null, 2)
      );

      // Redirect back to home page
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });

    // Stop the rest of the function from running
    return;
  }
  // 404 page
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');

  res.write('<html>');
  res.write('<head><title>Page Not Found</title></head>');
  res.write('<body><h1>404 - Page Not Found</h1></body>');
  res.write('</html>');

  return res.end();
};
module.exports = userRequestHandler;