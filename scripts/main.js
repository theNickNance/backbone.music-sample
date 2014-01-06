/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        spinnerjs: '../bower_components/spin.js/spin',
        appsettings: 'appsettings'
    }
});

require([
    'backbone',
    'jquery',
    'views/app'
], function (Backbone, $, App) {
    var app = new App();
    app.render();

    Backbone.history.start();
});
