(function() {
    'use strict';

    angular.module('demoApp', ['ngSignHere']);

    angular.element(document).ready(function () {

        angular.bootstrap(document, ['demoApp'], { strictDi: true });
    });
})();
