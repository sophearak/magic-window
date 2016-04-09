"use strict"

function fileIsAscii(filename) {
  return new Promise((s, r) => {
    // Read the file with no encoding for raw buffer access.
    require('fs').readFile(filename, function(err, buf) {
      if (err) throw err;
      var isAscii = true;
      for (var i=0, len=buf.length; i<len; i++) {
        if (buf[i] > 127) { isAscii=false; break; }
      }
      s(isAscii); // true iff all octets are in [0, 127].
    });
  })
}

module.exports = {
  fileIsAscii
}
