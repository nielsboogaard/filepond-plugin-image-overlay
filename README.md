# Image Overlay plugin for FilePond

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nielsboogaard/filepond-plugin-image-overlay/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/filepond-plugin-image-overlay.svg)](https://badge.fury.io/js/filepond-plugin-image-overlay)

The Image Overlay plugin will add a tiny 'eye' icon in front of the filename to allow opening the uploaded image in a large overlay. In case the Image Preview plugin is used, the preview itself will be made clickable as well.

<img src="https://github.com/nielsboogaard/filepond-plugin-image-overlay/blob/master/demo.gif?raw=true" width="100%" alt=""/>


## Quick Start

Install using npm:

```bash
npm install filepond-plugin-image-overlay
```

Then import in your project:

```js
import * as FilePond from 'filepond';
import FilePondPluginImageOverlay from 'filepond-plugin-image-overlay';
```

Also, don't forget to import the belonging styles:

```js
import 'filepond-plugin-image-overlay/dist/filepond-plugin-image-overlay.css'
```

Register the plugin:
```js
FilePond.registerPlugin(FilePondPluginImageOverlay);
```
Create a new FilePond instance as normal.
```js
const pond = FilePond.create({
    name: 'filepond'
});

// Add it to the DOM
document.body.appendChild(pond.element);
```
 The functionality will become active when uploading an image.

## Configuration

The label of the image overlay icon can be adjusted as follows:
```js
const pond = FilePond.create({
    name: 'filepond',
    labelButtonImageOverlay: 'custom label' // by default 'Open image in overlay file'
});
```

## Demo
[View the demo](https://nielsboogaard.github.io/filepond-plugin-image-overlay/)
