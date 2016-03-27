# Extraverse

This is a `node.js` command line utility that turns any folder into a pretty online file viewer (and editor in the future).

See a live demo [here (⌐■_■)](http://extraverse.bitcells.com) (this is `extraverse` presenting itself - `Hey!`).

[![Extraverse preview](http://cdn.tutorialzine.com/wp-content/uploads/2014/09/file-and-folder-grid.jpg)](http://tutorialzine.com/2014/09/cute-file-browser-jquery-ajax-php/)

**Why is this useful?**

* Need to quickly show code to someone so that they can help you?
* You are working on a project for a client and want to show progress / ask for comments but don't have GitHub repository setup yet?
* You can probably think of other use cases once you start using it...

**Features:**

* Share your code easily with anyone in the world.
* Syntax highlighting for 150+ computer languages.
* Beautiful design, responsive and retina-ready.
* Instant file search.
* Easy to install and use.
* Mount inside an existing express.js app so it can show its own source on a specified route (url).

**Planned:**

* Other actions on some file types (show pdf, play mp3, download zip etc.).
* Automatic reloading of source code files on change.
* Diff view of last change pushed to the client via `socket.io`.
* Ability to share just one file or some files from the folder.
* Editing functionality with a view of passing test / live css preview.
* Breadcrumbs on file view (frontend has to be moved to `React` first so it's easy to work with).

## Installation

This utility is available on `npm`, so installation is a breeze. Use the **-g** flag:

```bash
npm install -g extraverse
```

## Usage

To use it, `cd` into a directory, and run

```bash
extraverse --public
```

Magic window (⌐■_■) is now running on `localhost:3000` and `ngrok` url is produced for public sharing.

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

### Mount inside an existing `express.js` app to reveal its own source

```bash
npm install --save extraverse
```

```javascript
app.use('/source', require('extraverse')('/source', { ignore: ['config'] }))
```

Then visit `http://example.com/source` to see all the source code for easy presentation or discussion.

### Known issues

* When used as a mounted app and served with [pm2](https://www.npmjs.com/package/pm2) behind `nginx` (possibly Apache as well), [there are issues](http://serverfault.com/questions/766280/nginx-proxy-pass-cannot-fetch-assets) because of incompatibility between [config package](https://www.npmjs.com/package/config) and `pm2`. Use [forever](https://www.npmjs.com/package/forever) or [Phusion Passenger](https://github.com/phusion/passenger/wiki/Phusion-Passenger:-Node.js-tutorial) instead in production.
* There will be infinite recursion and stack overflow when trying to share a folder that has a symlink back to itself.

### Notes

Files starting with a dot are assumed to be private and are not served.

## Design and inspiration

Design is based on [martinaglv/cute-files](https://github.com/martinaglv/cute-files) which is based on [tutorialzine's file browser tutorial](http://tutorialzine.com/2014/09/cute-file-browser-jquery-ajax-php/).
