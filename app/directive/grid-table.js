(function() {
    'use strict';

    angular
        .module('app.widget')
        .directive('gridTable', gridTable);

    gridTable.$inject = [];

    function gridTable() {
        return function (vm, $element) {
            $(function(){
                $element.DataTable({
                    "aLengthMenu": [[18, 25, 50, -1], [18, 25, 50, "所有"]],
                    "language": {
                        "decimal": "",
                        "emptyTable": "No data available in table",
                        "info": "第 _PAGE_ 页/共 _PAGES_ 页",
                        "infoEmpty": "没有任何数据 ^_^",
                        "infoFiltered": "(filtered from _MAX_ total entries)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "每页显示 _MENU_ 条记录",
                        "loadingRecords": "数据加载中...",
                        "processing": "处理中...",
                        "search": "搜索:",
                        "zeroRecords": "没有任何数据 ^_^",
                        "paginate": {
                            "first": "第一页",
                            "last": "最后一页",
                            "next": "下一页",
                            "previous": "上一页"
                        },
                        "aria": {
                            "sortAscending": ": activate to sort column ascending",
                            "sortDescending": ": activate to sort column descending"
                        }
                    }
                });
            });
        }
    }
})();