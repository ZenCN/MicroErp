(function() {
    'use strict';

    angular
        .module('app.widget')
        .directive('slideMenu', slideMenu);

    slideMenu.$inject = [];

    function slideMenu() {
        return function (vm, $element) {
            var slideout = new Slideout({
                'panel': document.getElementById('panel'),
                'menu': document.getElementById('menu'),
                'padding': 256,
                'tolerance': 70
            });

            document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
                slideout.toggle();
            });

            document.querySelector('.menu').addEventListener('click', function(eve) {
                if (eve.target.nodeName === 'A') { slideout.close(); }
            });
        }
    }
})();