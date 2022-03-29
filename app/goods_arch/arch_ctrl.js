/**
 * Created by Zen on 2021/8/7.
 */

(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('arch_ctrl', arch_ctrl);

    arch_ctrl.$inject = ['$scope', '$state'];

    function arch_ctrl(vm, $state) {
        vm.gen_barcode = function(){
            $("#barcode").JsBarcode("Hi!");
        }
    }
})();