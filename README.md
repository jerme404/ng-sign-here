# ng-sign-here
AngularJS signature capture component.  Wrapper for [signature_pad](https://github.com/szimek/signature_pad/).

## Install
```bash
npm install ng-sign-here
```

## Getting Started
Include ngSignHere.min.js and [signature_pad](https://github.com/szimek/signature_pad/).
```html
<script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>
<script src="../dist/ngSignHere.min.js"></script>
```
Add as a module dependency.
```js
angular.module('demoApp', ['ngSignHere']);
```
Use the component in html.
```html
<sign-here></sign-here>
```
## Examples
Adding the component in html isn't very useful by itself. You can draw on the canvas, but that's about it.
### Size
To set the signature pad size, simply add a css class or inline style. The signature pad will size itself to fit.
```html
<sign-here style="width: 600px; height: 300px;">
</sign-here>
```
### Background Color
Set the background color using background-color. Defaults to transparent.
Supports hex, rgb/rgba, and color names.
```html
<!-- Sets background color to black -->
<sign-here background-color="#000000">
</sign-here>
```
### Pen Color
Set the pen color using pen-color. Defaults to a dark blue.
Supports hex, rgb/rgba, and color names.
```html
<!-- Sets pen color to green -->
<sign-here pen-color="#6BD425">
</sign-here>
```
### Image Format
Set the returned image format using image-format. Defaults to png.
Supported formats are png, jpg/jpeg, and svg.
```html
<!-- Sets image format to svg -->
<sign-here image-format="svg">
</sign-here>
```
