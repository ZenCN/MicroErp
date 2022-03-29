/**
 * Created by Zen on 2021/8/7.
 */

(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('stock_ctrl', stock_ctrl);

    stock_ctrl.$inject = ['$scope'];

    function stock_ctrl(vm) {
        vm.Code = new Date().serial_num() + "001";
        vm.CreateTime = new Date().to_str(1);

    }
})();