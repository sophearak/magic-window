#!/usr/bin/env node
"use strict"
var path = require('path');
var copyPaste = require("copy-paste");
var colors = require('colors')
var app = require('./app')('')
var portfinder = require('portfinder');

// Parse command line options
var program = require('commander');

var pkg = require( path.join(__dirname, 'package.json') );

program
	.version(pkg.version)
  .description('Turn any folder on your computer into a magic window')
  .option('-p, --port <port>', 'Port on which to run (defaults to 3000)', parseInt)
  .option('-P, --private', 'Only local share')
	.option('-c, --copy', 'Copy url for public sharing to clipboard')
	.parse(process.argv);

portfinder.basePort = program.port || 3000;

portfinder.getPort((err, port) => {

  // Share over ngrok if Public
  if (!program.private) {
    var ngrok = require('ngrok');
    ngrok.connect(port, function (err, url) {
      let copied = "";
      if(program.copy) {
        copied = "(copied to clipboard)"
        copyPaste.copy(url);
      }
      console.log(`Public URL: ${colors.yellow(url)} ${colors.green(copied)}`);
    });
  }

  app.listen(port, () => {
    console.log("%s is running on %s", colors.blue("Magic"), colors.magenta(`port ${port}`));
  });
});
