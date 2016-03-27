# Extraverse

This is a node.js command line utility that turns the current working directory into a pretty online file viewer/editor.

## Design and inspiration

It is based on [martinaglv/cute-files](https://github.com/martinaglv/cute-files) which is based on [tutorialzine's file browser tutorial](http://tutorialzine.com/2014/09/cute-file-browser-jquery-ajax-php/). See a live demo [here](http://extraverse.bitcells.com).

[![Cute files preview](http://cdn.tutorialzine.com/wp-content/uploads/2014/09/file-and-folder-grid.jpg)](http://tutorialzine.com/2014/09/cute-file-browser-jquery-ajax-php/)

**Features:**

* Share your code easily with anyone in the world.
* Syntax highlighting for 150+ computer languages.
* Beautiful design, responsive and retina-ready.
* Instant file search.
* Easy to install and use.
* Mount inside an existing express.js app so it can show its own source on a specified route (url).

## Installation

This utility is available on npm, so installation is a breeze. Use the **-g** flag:

```bash
npm install -g extraverse
```

## Usage

To use it, `cd` into a directory, and run

```bash
extraverse --public
```

## Help

```bash
extraverse --help
```

### Examples

Make the current folder available on `<yourip>:3000` on the local network:

```bash
extraverse
```

Allow public access:

```bash
extraverse --public
```

Copy `ngrok` url to clipboard:

```bash
extraverse --public --copy
```

Make the current folder available on `<yourip>:12345` on the local network:

```bash
extraverse --port 12345
```

### Use inside your express.js app to reveal its source

```bash
npm install --save extraverse
```

```javascript
app.use('/source', require('extraverse')('/source', { ignore: ['config'] }))
```

### Notes

Files starting with a dot are assumed to be private and are not served.
