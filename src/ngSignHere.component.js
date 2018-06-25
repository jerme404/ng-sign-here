(function () {
    'use strict';

    angular.module('ngSignHere')
    .component('signHere', {
        controllerAs: 'signHere',
        controller: 'signHereController',
        bindings: {
            backgroundColor: '@?',
            penColor: '@?',
            registerClearHandler: '&?',
            onSignatureUpdate: '<?'
        },
        template: '<div style="width: 100%; height: 100%;"><canvas style="width: 100%; height: 100%;"></canvas></div>',
    });
})();
