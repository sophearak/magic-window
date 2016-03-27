#!/usr/bin/env node
"use strict"
var path = require('path');
var copyPaste = require("copy-paste");
var colors = require('colors')
var app = require('./app')('')

// Parse command line options
var program = require('commander');

var pkg = require( path.join(__dirname, 'package.json') );

program
	.version(pkg.version)
  .description('Turn any folder on your computer into a magic window')
  .option('-p, --port <port>', 'Port on which to run (defaults to 3000)', parseInt)
  .option('-P, --public', 'Allow secret access on the internet (uses ngrok)')
	.option('-c, --copy', 'Copy url for public sharing to clipboard')
	.parse(process.argv);

var port = program.port || 3000;

// Scan the directory in which the script was called. It will
// add the 'files/' prefix to all files and folders, so that
// download links point to our /files route

// Share over ngrok if Public

if (program.public) {
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

// Everything is setup. Listen on the port.

app.listen(port, () => {
  console.log("%s is running on %s", colors.blue("Extraverse"), colors.magenta(`port ${port}`));
});
