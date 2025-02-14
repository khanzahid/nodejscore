const fs = require("fs");

const serverRequest = (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.write(
      `<html lang="en"> <head> <meta charset="UTF-8"> <title>Express Server</title> </head> <body> <h1>Express Server</h1> </body> </html> `
    );
    return res.end();
  } else if (req.url === "/users") {
    res.write(
      `<html lang="en"> <head> <meta charset="UTF-8"> <title>Express Server</title> </head> <body> <h1>Users</h1> </body> </html> `
    );
    return res.end();
  } else if (req.url === "/contact") {
    res.write(
      `<html lang="en"> <head> <meta charset="UTF-8"> <title>Contact</title> </head> <body> <h1>Contact</h1>
         <form action="/contact-submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required>
            <label for="twic">TWIC:</label>
            <input type="text" id="twic" name="twic" required>
            <label for="cdl">CDL:</label>
            <input type="text" id="cdl" name="cdl" required>
            <label for="hazmat">Hazmat:</label>
            <input type="text" id="hazmat" name="hazmat" required>
            <label for="tanker">Tanker:</label>
            <input type="text" id="tanker" name="tanker" required>
            <button type="submit">Submit</button>
        </form>
      </body> </html> `
    );
    return res.end();
  } else if (
    req.url.toLocaleLowerCase() === "/contact-submit" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const bodyString = Buffer.concat(body).toString();
      console.log(bodyString);
      const params = new URLSearchParams(bodyString);
      //   const bodyObject = {};
      //   console.log(params);
      //   for (const [key, value] of params.entries()) {
      //     bodyObject[key] = value;
      //   }
      const bodyObject = Object.fromEntries(params);
      console.log("after", bodyObject);
      fs.writeFileSync("contact.txt", JSON.stringify(bodyObject));
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else {
    res.write(
      `<html lang="en"> <head> <meta charset="UTF-8"> <title>Express Server</title> </head> <body> <h1>404</h1> </body> </html> `
    );
    res.end();
  }
};

module.exports = serverRequest;
