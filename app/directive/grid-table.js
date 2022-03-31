(function() {
    'use strict';

    angular
        .module('app.widget')
        .directive('gridTable', gridTable);

    gridTable.$inject = [];

    function gridTable() {
        return function (vm, $element) {
            $(function(){
                $element.DataTable();
            });
        }
    }
})();