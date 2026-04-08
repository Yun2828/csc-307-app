// backend.js

// ES Module Syntax
import express from "express";

// create an instance of express
const app = express();
const port = 8000;

// setup express to process data in JSON format
app.use(express.json());

// API endpoint
// accept http get request
// '/' is the root path of the server, that will map to this endpoint
// receive a request and send a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});