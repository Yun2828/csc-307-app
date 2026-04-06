// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import MyApp from "./MyApp";


// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
// go to the id="root" in index.html
// means this line injects MyApp component into the root of an HTML page 
root.render(<MyApp />);