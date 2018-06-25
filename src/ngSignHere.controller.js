(function () {
    'use strict';

    angular.module('ngSignHere')
    .controller('signHereController', SignHereController);

    SignHereController.$inject = ['$element', 'signatureDefaults'];
    
    /**
    * @name signHereController
    * @description AngularJS wrapper component for https://github.com/szimek/signature_pad/.
    */
    function SignHereController ($element, signatureDefaults) {

        // Component defaults.
        const defaultBackColor = 'rgba(0, 0, 0, 0)'; // Transparent.
        const defaultPenColor = 'rgb(27, 53, 88)'; // Blue.

        let ctrl = {};

        ctrl.$onInit = function () {

            $element.css('display', 'block');

            ctrl.backgroundColor = this.backgroundColor || signatureDefaults.backgroundColor;
            ctrl.penColor = this.penColor || signatureDefaults.penColor;

            ctrl.onSignatureUpdate = this.onSignatureUpdate;

            ctrl.registerClearHandler = this.registerClearHandler;
            if (ctrl.registerClearHandler) {
                ctrl.registerClearHandler({
                    handler: ctrl.clear
                });
            }
        };

        ctrl.$postLink = function () {

            ctrl.canvas = $element.find('canvas')[0];
            ctrl.ctx = ctrl.canvas.getContext('2d');
            ctrl.signaturePad = new SignaturePad(ctrl.canvas, {
                backgroundColor: ctrl.backgroundColor,
                penColor: ctrl.penColor,
                onEnd: ctrl.onEnd
            });
            ctrl.resizeCanvas();
        };

        ctrl.$onDestroy = function () {

            ctrl.signaturePad.off();
        };

        /**
        * @name clear
        * @description Clears the signature pad.
        */
        ctrl.clear = function () {

            ctrl.signaturePad.clear();

            if (ctrl.onSignatureUpdate) {

                // Update signature data with undefined.
                ctrl.onSignatureUpdate();
            }
        };

        /**
        * @name onEnd
        * @description Function for signature pad onEnd callback.
        */
        ctrl.onEnd = function () {

            if (ctrl.onSignatureUpdate) {

                let signatureData = ctrl.signaturePad.toDataURL();
                ctrl.onSignatureUpdate(signatureData);
            }
        };

        /**
        * @name resizeCanvas
        * @description Set canvas dimension and scale.
        * Copied from docs at https://github.com/szimek/signature_pad/
        */
        ctrl.resizeCanvas = function () {


            let ratio =  Math.max(window.devicePixelRatio || 1, 1);
            ctrl.canvas.width = ctrl.canvas.offsetWidth * ratio;
            ctrl.canvas.height = ctrl.canvas.offsetHeight * ratio;
            ctrl.canvas.getContext("2d").scale(ratio, ratio);
            ctrl.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
        };

        return ctrl;
    };
})();
