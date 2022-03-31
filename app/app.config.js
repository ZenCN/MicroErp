(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true
        });

        $urlRouterProvider.when('', '/dashboard');
        $urlRouterProvider.otherwise('/dashboard');

        window.app_path = '';

        var resolve_dep = function (config) {
            if (window.app_path) {
                $.each(config, function(i) {
                    config[i] = window.app_path + config[i];
                });
            }
            return {
                load: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(config);
                    }
                ]
            };
        };

        $stateProvider
            .state('menu', {
                url: '',
                abstract: true,
                controller: 'menu_ctrl',
                templateUrl: 'app/menu/menu.html',
                resolve: resolve_dep([
                    'app/menu/menu_ctrl.js',
                    'app/menu/menu.css',
                    'libs/plugin.slideout/slideout.min.js',
                    'app/directive/slide-menu.js'
                ])
            })
            .state('menu.dashboard',{
                url: '/dashboard',
                controller: 'dashboard_ctrl',
                templateUrl: 'app/dashboard/dashboard.html',
                resolve: resolve_dep([
                    'app/dashboard/dashboard_ctrl.js',
                    'libs/chart.js/Chart.min.js',
                    'app/directive/chart-area.js',
                    'app/directive/chart-pie.js',
                    'app/dashboard/dashboard.css'
                ])
            })
            .state('menu.goods_arch',{
                url: '/goods_arch',
                controller: 'arch_ctrl',
                templateUrl: 'app/goods_arch/arch.html',
                resolve: resolve_dep([
                    'app/goods_arch/arch_ctrl.js',
                    'app/goods_arch/arch.css'
                ])
            })
            .state('menu.goods_',{
                url: '/goods_arch',
                controller: 'arch_ctrl',
                templateUrl: 'app/goods_arch/arch.html',
                resolve: resolve_dep([
                    'app/goods_arch/arch_ctrl.js',
                    'libs/js-barcode/JsBarcode.all.min.js',
                    'app/goods_arch/arch.css'
                ])
            })
            .state('menu.goods_stock',{
                    url: '/goods_stock',
                    controller: 'stock_ctrl',
                    templateUrl: 'app/goods_stock/stock.html',
                    resolve: resolve_dep([
                        'app/goods_stock/stock_ctrl.js',
                        'libs/datatables/jquery.dataTables.min.js',
                        'libs/datatables/dataTables.bootstrap4.min.js',
                        'app/directive/grid-table.js',
                        'app/goods_stock/stock.css',
                        'libs/datatables/dataTables.bootstrap4.css'
                    ])
        });
    }
})();