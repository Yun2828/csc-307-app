// src/MyApp.jsx


import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';

function MyApp() {
    // useState returns a pair (current state value, function that let you update the value)
    // empty state useState([])
    const [characters, setCharacters] = useState([]);
    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }
    function updateList(person){
        setCharacters([...characters, person]);
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
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
  }, [] );
  return (
    <div className="container">
      <Table characterData={characters}
        removeCharacter = {removeOneCharacter} 
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}

// make it available to other files 
export default MyApp;

