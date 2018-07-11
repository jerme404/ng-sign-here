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

        let ctrl = {};

        ctrl.$onInit = function () {

            $element.css('display', 'block');

            ctrl.backgroundColor = this.backgroundColor || signatureDefaults.backgroundColor;
            ctrl.penColor = this.penColor || signatureDefaults.penColor;
            ctrl.imageFormat = this.imageFormat || undefined;

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
        * @description Function for signature pad onEnd.
        */
        ctrl.onEnd = function () {

            if (!ctrl.onSignatureUpdate) {

                return;
            }

            let signatureData;
            if (!ctrl.imageFormat || ctrl.imageFormat == 'png') {

                signatureData = ctrl.signaturePad.toDataURL();
            } else if (ctrl.imageFormat == 'jpg' || ctrl.imageFormat == 'jpeg') {

                signatureData = ctrl.signaturePad.toDataURL('image/jpeg');
            } else if (ctrl.imageFormat == 'svg') {

                signatureData = ctrl.signaturePad.toDataURL('image/svg+xml');
            } else {

                // Use default because imageFormat is probably invalid.
                signatureData = ctrl.signaturePad.toDataURL();
            }

            ctrl.onSignatureUpdate(signatureData);
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
