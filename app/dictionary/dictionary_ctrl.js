/**
 * Created by Zen on 2021/8/7.
 */

(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('dictionary_ctrl', dictionary_ctrl);

    dictionary_ctrl.$inject = ['$scope', '$http'];

    function dictionary_ctrl(Vm, $http) {
        var Model = function(){
            return {
                Type: undefined,
                Code: undefined,
                Value: undefined,
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
            if(!Vm.Modal.Type || !Vm.Modal.Code || !Vm.Modal.Value)
                return layer.msg('类型、编码、内容不能为空');
            $('#modal').modal('hide');
            Vm.Data.push(Vm.Modal);
            Vm.Modal = new Model();
        };
    }
})();