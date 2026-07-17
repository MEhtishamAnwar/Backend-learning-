const sumRequestHandler = (req, res) => {
  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();

    console.log("Parsed Body:", parsedBody);

    const params = new URLSearchParams(parsedBody);
    const bodyObj = Object.fromEntries(params.entries());

    console.log("Body Object:", bodyObj);

    const firstNum = Number(bodyObj.first);
    const secondNum = Number(bodyObj.second);

    // if (Number.isNaN(firstNum) || Number.isNaN(secondNum)) {
    //   res.statusCode = 400;
    //   res.setHeader("Content-Type", "text/html");
    //   res.end(`
    //     <h1>Invalid numbers</h1>
    //     <p>Received data: ${parsedBody || "No form data received"}</p>
    //   `);
    //   return;
    // }

    const result = firstNum + secondNum;

    console.log("First Number:", firstNum);
    console.log("Second Number:", secondNum);
    console.log("Result:", result);

    res.setHeader("Content-Type", "text/html");

    res.end(`

        <h1>First number is ${firstNum}</h1>
        <h1>Second number is ${secondNum}</h1>
        <h1>Result: ${result}</h1>

        `);
  });
};

exports.sumRequestHandler = sumRequestHandler;