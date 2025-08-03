const express = require("express");
const userRequest = require("./userRequest");
const app = express();

app.use((req, res, next) => {
  console.log("first middle ware", req.method);
  next();
});

app.use((req, res, next) => {
  res.send("<h1>home page</h1>");
});

app.listen(3000, () => {
  console.log(`Server running on port 3005 http://localhost:3005/`);
});
