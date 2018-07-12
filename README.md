# ng-sign-here
AngularJS wrapper component for [signature_pad](https://github.com/szimek/signature_pad/).

### Demo
The [demo](https://jerme404.github.io/ng-sign-here/) uses ```on-signature-update``` to set the background image of a div at the end of each signature stroke. 

## Install
```bash
npm install ng-sign-here
```
### Dependencies
The only dependency, other than AngularJS, is signature_pad. You can either link it, or install as a package with 
```bash
npm install signature_pad
```
## Getting Started
Include ngSignHere.min.js and signature_pad.
```html
<script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>
<script src="../dist/ngSignHere.min.js"></script>
```
Add ngSignaturePad as a module dependency.
```js
angular.module('demoApp', ['ngSignHere']);
```
Add the ```sign-here``` component to your html.
```html
<sign-here></sign-here>
```
## Examples
Adding the component in html isn't very useful by itself. You can draw on the canvas, but that's about it. All bindings are **optional**, and **one-way**.
### Size
To set the signature pad size, simply add a css class or inline style. The signature pad will size itself to fit.
```html
<sign-here style="width: 600px; height: 300px;">
</sign-here>
```
### Background Color
Set the background color using ```background-color```. 
Supports hex, rgb/rgba, and color names. Defaults to transparent.
```html
<!-- Sets background color to black -->
<sign-here background-color="#000000">
</sign-here>
```
### Pen Color
Set the pen color using ```pen-color```. 
Supports hex, rgb/rgba, and color names. Defaults to a dark blue.
```html
<!-- Sets pen color to green -->
<sign-here pen-color="#6BD425">
</sign-here>
```
### Image Format
Set the returned image format using ```image-format```.
Valid formats are png, jpg/jpeg, and svg. Defaults to png.
```html
<!-- Sets image format to svg -->
<sign-here image-format="svg">
</sign-here>
```
### Getting the Signature
Pass a function to ```on-signature-update```. Internally, this is called on the signature_pad ```onEnd``` event, meaning at the end of each signature stroke.
```js
// Controller signature update function.
ctrl.onSignatureUpdate = function (signatureData) {

    // Set a signatureData property on your controller.
    ctrl.signature = signatureData;
};
```
```html
<sign-here on-signature-update="demo.onSignatureUpdate">
</sign-here>
```
### Clearing the Signature
This component does NOT use two-way binding, so you need to register a handler with ```register-clear-handler```, and then call that handler from your controller. On clear, the  ```onSignatureUpdate event``` will fire with ```undefined```.

```js
// Your controller's clear handler.
let clearSignatureHandler = null;

// Register clear handler function.
ctrl.registerClearHandler = function (handler) {

    // Set the handler returned from the component.
    clearSignatureHandler = handler;
};

// Handle the clear button click.
ctrl.clearSignature = function () {

    // Check if a the clearSignatureHandler is registered.
    if (clearSignatureHandler) {

        clearSignatureHandler();
    }
};
```
```html
<!-- Register your controller's clear handler -->
<sign-here demo.registerClearHandler(handler)>
</sign-here>

<!-- A clear button somewhere on your page -->
<button ng-click="demo.clearSignature()">
    CLEAR
</button>
```
### Non Implemented
The following [signature_pad options/features](https://github.com/szimek/signature_pad/#api) have been omitted because I didn't need them.  I may or may not add these in the future, but you're certainly welcome to submit a pull request if you want to add them.
* dotSize
* minWidth
* maxWidth
* throttle
* minDistance
* velocityFilterWeight
* onBegin
## Build from Source
Clone the repository.
```bash
git clone https://github.com/jerme404/ng-sign-here.git
```
Install npm packages.
```bash
npm install
```
Run gulp.
```bash
gulp
```
