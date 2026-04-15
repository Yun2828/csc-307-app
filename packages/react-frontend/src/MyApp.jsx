import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

 function deleteUser(id) {
  return fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  });
}

function removeOneCharacter(id) {
  deleteUser(id)
    .then((res) => {
      if (res.status === 204) {
        const updated = characters.filter((character) => {
          return character.id !== id;
        });
        setCharacters(updated);
      } else {
        throw new Error("User was not deleted");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("User was not created");
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;