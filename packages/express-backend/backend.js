// backend.js

// ES Module Syntax
import express from "express";
import cors from "cors";

// create an instance of express
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
    {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
    },
    {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
    },
    {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
    },
    {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
    },
    {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
    }
]
};
app.get ("/", (req,res) => {
    res.send("Hello World!");
}) ;
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => {
    const matchesName = name === undefined || user["name"] === name;
    const matchesJob = job === undefined || user["job"] === job;
    return matchesName && matchesJob;
  });
};
// API endpoint
// accept http get request
// '/' is the root path of the server (localhost), that will map to this endpoint
// receive a request and send a response
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined || job !== undefined) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const addUser = (user) => {
  const userWithId = {
    id: generateId(),
    ...user,
  };

  users["users_list"].push(userWithId);
  return userWithId;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).send(addedUser);
});

const removeUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);

  if (index === -1) {
    return undefined;
  }

  const deletedUser = users["users_list"][index];
  users["users_list"].splice(index, 1);
  return deletedUser;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deletedUser = removeUserById(id);

  if (deletedUser === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
console.log("Server is done...");