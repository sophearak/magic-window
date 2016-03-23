"use strict"
var express = require('express');
var scan = require('./scan');
var path = require('path');
var fs = require('fs');
var Handlebars = require('handlebars');

module.exports = (prefix, options) => {

  // var template = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/frontend/assets/js/script.hbs.js')).toString());
  // fs.writeFileSync(path.join(__dirname, '/frontend/assets/js/script.js'), template({ prefix }))

  var tree = scan('.', 'files', options);

  // Ceate a new express app

  var app = express();

  // Serve static files from the frontend folder

  var template1 = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/frontend/index.html')).toString());

  app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));

  // Serve files from the current directory under the /files route

  var template2 = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/frontend/code.hbs.html')).toString());

  app.use('/files', function(req, res) {
    res.send(template2({ code: fs.readFileSync(path.join(process.cwd(), req.path)).toString(), prefix }))
  })

  app.use('/static', express.static(__dirname + '/public'));

  // This endpoint is requested by our frontend JS

  app.get('/scan', function(req,res){
    res.send(tree);
  });

  //
  app.use('/', function(req, res) {
    res.send(template1({ prefix }))
  });

  return app;

}
