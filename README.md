# ng-sign-here
AngularJS signature capture component.  Wrapper for [signature_pad](https://github.com/szimek/signature_pad/).

## Install
Download ngSignHere.min.js.

## Example
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
