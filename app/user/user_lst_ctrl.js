/**
 * Created by Zen on 2021/8/7.
 */

(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('user_lst_ctrl', user_lst_ctrl);

    user_lst_ctrl.$inject = ['$scope', '$state'];

    function user_lst_ctrl(Vm, $state) {
        var Model = function(){
            return {
                Code: undefined,
                Name: undefined,
                Phone: undefined,
                Status: 'Enable'
            }
        };

        Vm.Basic = { Status: [ { Key: 'Enable', Val: '启用' }, { Key: 'Disable', Val: '禁用' } ] };
        Vm.Cond = new Model();
        Vm.Modal = new Model();
        Vm.Data = [];
        Vm.Query = function(){
            $http.post('someUrl', {}).then(function(){

            });
        };
        Vm.Edit = function(index){
            Vm.Modal = $.extend({}, Vm.Data[index]);
            $('#modal').modal('show');
        };
        Vm.Save = function(){
            if(!Vm.Modal.Code || !Vm.Modal.Name)
                return layer.msg('工号、名称不能为空');
            $('#modal').modal('hide');
            Vm.Data.push(Vm.Modal);
            Vm.Modal = new Model();
        };
    }
})();