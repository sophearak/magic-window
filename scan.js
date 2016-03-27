"use strict"
var fs = require('fs');

module.exports = function scan(dir, alias, options) {

  let ignore = ['.git', 'node_modules', 'bower_components', 'tmp', 'log', 'Godeps', 'elm-stuff', 'deps', '_build', 'target', 'dist', 'deploy'];
  if(options && options.ignore) ignore = ignore.concat(options.ignore);

  let depth = options ? options.depth : null;

  if(depth) {
    depth += 2;
  };

	return {
		name: alias,
		type: 'folder',
		path: alias,
		items: walk(dir, alias, depth, ignore)
	};

};

function walk(dir, prefix, depth, ignore){

	prefix = prefix || '';

  if(depth) depth--;

	if(!fs.existsSync(dir) || depth == 0){
		return [];
	}

	return fs.readdirSync(dir).filter(function(f) {

		return f && f[0] != '.' && ignore.indexOf(f) == -1; // Ignore hidden files and directories listed in "ignore"

	}).map(function(f){

		var p = (dir + '/' + f).replace('./', ''),
			stat = fs.statSync(p);

		if(stat.isDirectory()){

			return {
				name: f,
				type: 'folder',
				path: prefix ? prefix + '/' + p : p,
				items: walk(p, prefix, depth, ignore)
			};

		};

		return {
			name: f,
			type: 'file',
			path: prefix ? prefix + '/' + p : p,
			size: stat.size
		};

	});

};
