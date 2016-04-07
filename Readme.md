# Extraverse

This is a `JavaScript` tool that turns **any folder on your computer** into a **pretty online file viewer** (and editor in the future).

See [live demo here (⌐■_■)](https://demo.extraverse.io) — this is `extraverse` presenting itself → `Hey!`.

[![Extraverse preview](http://cdn.tutorialzine.com/wp-content/uploads/2014/09/file-and-folder-grid.jpg)](https://demo.extraverse.io)

If you need instructions on how to best set up your `node` environment, please [look here](https://subcults.com/wiki/Code-Collaboration.pdf). You only have to do this once.

**Why is Extraverse so astonishing / magnificent / awe-inspiring and humble?**

* Built in the spirit of Open Source which has already radically changed the world.
* Need to quickly show code to someone so that they can help you?
* You are working on a project for a client and want to show progress / ask for comments but don't have git/hub repository set up yet?
* You will find other use cases when you start using it...

**Features:**

* Share your code easily with anyone in the world.
* Easy to install and use.
* Beautiful design, responsive and retina-ready.
* Syntax highlighting for **150+** computer languages.
* Font ligatures via [FiraCode](https://github.com/tonsky/FiraCode) font.
* Instant file search.
* Mount inside an existing `express.js` app so it can show its own source.

**Planned:**

* Breadcrumbs on file view.
* Other actions on particular file types (show `pdf`, play `mp3`, download `zip` etc.).
* Automatic reloading of source code on change.
* Diff view of last change pushed to the client via `socket.io`.
* Ability to share just one file or some files from the folder.
* Editing functionality with a view of passing tests / live css preview.

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

If port you are trying to use is already used, `extraverse` will try the next available one.

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

### Design and inspiration

Design is based on [martinaglv/cute-files](https://github.com/martinaglv/cute-files) which is based on [tutorialzine's file browser tutorial](http://tutorialzine.com/2014/09/cute-file-browser-jquery-ajax-php/).

### Info

Project Home: [NpmJs](https://www.npmjs.com/package/extraverse)

Main Sponsor: [Subcults](https://subcults.com)

Main Author: [davidhq](https://davidkrmpotic.com)

Add me on LinkedIn if you want to send pull requests and make **Extraverse** better ¯\(º_o)/¯
