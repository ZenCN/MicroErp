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
                $.each(config, function (i) {
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
                    'app/directive/slide-menu.js',
                    'libs/datatables/jquery.dataTables.min.js',
                    'libs/datatables/dataTables.bootstrap5.min.js',
                    'libs/datatables/dataTables.bootstrap4.css'
                ])
            })
            .state('menu.dashboard', {
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
            .state('menu.goods_arch_lst', {
                url: '/goods_arch_lst',
                controller: 'arch_lst_ctrl',
                templateUrl: 'app/goods_arch/arch_lst.html',
                resolve: resolve_dep([
                    'app/goods_arch/arch_lst_ctrl.js',
                    'app/directive/grid-table.js',
                ])
            })
            .state('menu.goods_arch', {
                url: '/goods_arch',
                controller: 'arch_ctrl',
                templateUrl: 'app/goods_arch/arch.html',
                resolve: resolve_dep([
                    'app/goods_arch/arch_ctrl.js',
                    'app/goods_arch/arch.css'
                ])
            })
            .state('menu.goods_stock_lst', {
                url: '/goods_stock_lst',
                controller: 'stock_lst_ctrl',
                templateUrl: 'app/goods_stock/stock_lst.html',
                resolve: resolve_dep([
                    'app/goods_stock/stock_lst_ctrl.js',
                    'app/directive/grid-table.js',
                    'app/goods_stock/stock_lst.css'
                ])
            })
            .state('menu.goods_stock', {
                url: '/goods_stock',
                controller: 'stock_ctrl',
                templateUrl: 'app/goods_stock/stock.html',
                resolve: resolve_dep([
                    'app/goods_stock/stock_ctrl.js',
                    'app/directive/grid-table.js',
                    'app/goods_stock/stock.css'
                ])
            })
            .state('menu.goods_checkout_lst', {
                url: '/goods_checkout_lst',
                controller: 'checkout_lst_ctrl',
                templateUrl: 'app/goods_checkout/checkout_lst.html',
                resolve: resolve_dep([
                    'app/goods_checkout/checkout_lst_ctrl.js',
                    'app/directive/grid-table.js',
                    'app/goods_checkout/checkout_lst.css'
                ])
            })
            .state('menu.goods_checkout', {
                url: '/goods_checkout',
                controller: 'checkout_ctrl',
                templateUrl: 'app/goods_checkout/checkout.html',
                resolve: resolve_dep([
                    'app/goods_checkout/checkout_ctrl.js',
                    'app/directive/grid-table.js',
                    'app/goods_checkout/checkout.css'
                ])
            })
            .state('menu.dictionary', {
                url: '/dictionary',
                controller: 'dictionary_ctrl',
                templateUrl: 'app/dictionary/dictionary.html',
                resolve: resolve_dep([
                    'app/dictionary/dictionary_ctrl.js',
                    'app/directive/grid-table.js'
                ])
            })
            .state('menu.user_lst', {
                url: '/user_lst',
                controller: 'user_lst_ctrl',
                templateUrl: 'app/user/user_lst.html',
                resolve: resolve_dep([
                    'app/user/user_lst_ctrl.js',
                    'app/directive/grid-table.js'
                ])
            })
            .state('menu.user', {
                url: '/user',
                controller: 'user_ctrl',
                templateUrl: 'app/user_manage/user.html',
                resolve: resolve_dep([
                    'app/user_manage/user_ctrl.js'
                ])
            })
    }
})();