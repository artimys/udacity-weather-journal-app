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

// Spin up the server
const port = 8000;
const server = app.listen(port, listening);

// Callback to debug
function listening(){
     console.log("server running, Yay!!");
     console.log("running on localhost:", port);
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
     console.log("'/all'", projectData);
     res.send(projectData);
})

// Post Route
app.post('/addEntry', function (req, res) {
     const entry = req.body;
     const newId = (Object.keys(projectData).length + 1).toString();

     projectData[newId] = {
          temp: entry.temp,
          content: entry.content
     }

     console.log("'/addEntry'", newId, "=>", projectData[newId]);
     res.send(projectData[newId]);
})