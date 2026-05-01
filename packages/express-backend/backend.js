// backend.js

// ES Module Syntax
import express from "express";
import cors from "cors";
import userService from "./user-services.js";

// create an instance of express
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get ("/", (req,res) => {
    res.send("Hello World!");
}) ;

// API endpoint
// accept http get request
// '/' is the root path of the server (localhost), that will map to this endpoint
// receive a request and send a response
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
  .getUsers(name, job) 
  .then((results) => {
    res.send({ users_list: results });
  })
  .catch(() => {
    res.status(500).send("Internal server error.");
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .findUserById(id) 
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(() => {
      res.status(500).send("Internal server error.");
    });
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService
    .addUser(userToAdd) 
    .then((addedUser) => {
      res.status(201).send(addedUser);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});


app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch(() => {
      res.status(500).send("Internal server error.");
    });
});


app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
console.log("Server is done...");