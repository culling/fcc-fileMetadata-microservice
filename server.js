/*
Free Code Camp: File Metadata Microservice
https://www.freecodecamp.com/challenges/file-metadata-microservice

User Story: I can submit a FormData object that includes a file upload.

User Story: When I submit something, I will receive the file size in bytes within the JSON response
*/

//express
var express = require("express");
var app     = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config  = require("./config/config.js");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

var api = require("./app/routes/api");
app.use("/api", api);

//static files
app.use(express.static('./public'));

app.listen(config.port, function(){
    console.log("listening on port: " + config.port );
});
