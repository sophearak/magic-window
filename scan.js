"use strict"
var fs = require('fs');

module.exports = function scan(dir, alias, depth){

	return {
		name: alias,
		type: 'folder',
		path: alias,
		items: walk(dir, alias, depth+2)
	};

};

const IGNORED = ['.git', 'node_modules', 'bower_components', 'tmp', 'log', 'Godeps', 'elm-stuff', 'deps', '_build', 'target', 'dist', 'deploy']

function walk(dir, prefix, depth){

	prefix = prefix || '';

  if(depth) depth--;

	if(!fs.existsSync(dir) || depth == 0){
		return [];
	}

	return fs.readdirSync(dir).filter(function(f) {

		return f && f[0] != '.' && IGNORED.indexOf(f) == -1; // Ignore hidden files

	}).map(function(f){

		var p = (dir + '/' + f).replace('./', ''),
			stat = fs.statSync(p);

		if(stat.isDirectory()){

			return {
				name: f,
				type: 'folder',
				path: prefix ? prefix + '/' + p : p,
				items: walk(p, prefix, depth)
			};

		}

		return {
			name: f,
			type: 'file',
			path: prefix ? prefix + '/' + p : p,
			size: stat.size
		}

	});

};
