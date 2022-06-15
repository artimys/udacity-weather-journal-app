// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Callback to debug
const listening = () => {
     console.log("server running, Yay!!");
     console.log("running on localhost:", port);
};

// Initialize all route with a callback function
const getEntry = (request, response) => {
     console.log("'/all'", projectData);
     response.send(projectData);
};

const addEntry = (request, response) => {
     const entry = request.body;

     projectData["temp"] = entry.temp;
     projectData["content"] = entry.content;
     projectData["date"] = entry.date;

     console.log("'/addEntry'", projectData);
     response.send(projectData);
};

// Callback function to complete GET '/all'
app.get('/all', getEntry);

// Post Route
app.post('/addEntry', addEntry);

// Spin up the server
const port = 8000;
const server = app.listen(port, listening);