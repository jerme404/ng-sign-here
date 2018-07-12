(function () {
    'use strict';

    angular.module('demoApp')
    .controller('demoController', DemoController);

    DemoController.$inject = ['$timeout'];

    /**
     * @memberOf demo
     * @name DemoController
     * @param {Service} $timeout AngularJS wrapper for window.setTimeout.
     */
    function DemoController ($timeout) {

        let ctrl = {
            $timeout: $timeout,
        };

        let clearSignatureHandler = null;
        /**
        * @name registerClearhandler
        * @description Registers the signature pad component clear handler.
        */
        ctrl.registerClearHandler = function (handler) {

            clearSignatureHandler = handler;
        };
        /**
        * @name acceptSignature
        * @description Demo button placeholder.
        */
        ctrl.acceptSignature = function () {

            // Do something here with the signature.
        };
        /**
        * @name clearSignature
        * @description Clears the signature image.
        */
        ctrl.clearSignature = function () {

            if (clearSignatureHandler) {

                clearSignatureHandler();
            }
        };
        /**
        * @name onSignatureUpdate
        * @description Callback to update the base64 signature image.
        * @param {String} signatureData
        */
        ctrl.onSignatureUpdate = function (signatureData) {

            return ctrl.$timeout(function () {

                ctrl.signatureData = signatureData;
            });
        };

        return ctrl;
    };
})();
