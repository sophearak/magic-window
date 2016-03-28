"use strict"
var express = require('express');
var scan = require('./scan');
var path = require('path');
var fs = require('fs');
var Handlebars = require('handlebars');

module.exports = (prefix, options) => {

  var tree = scan('.', 'files', options);

  // Ceate a new express app

  var app = express();

  // Serve static files from the frontend folder

  app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));

  // Serve files from the current directory under the /files route

  var codeTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/frontend/code.hbs.html')).toString());

  app.use('/files', function(req, res) {
    res.send(codeTemplate({ code: fs.readFileSync(path.join(process.cwd(), req.path)).toString().replace(/\t/g, "  "), prefix }))
  })

  // This endpoint is requested by our frontend JS

  app.get('/scan', function(req,res){
    res.send(tree);
  });

  var homeTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/frontend/index.hbs.html')).toString());

  // Main entry

  app.use('/', function(req, res) {
    res.send(homeTemplate({ prefix }))
  });

  return app;

}
