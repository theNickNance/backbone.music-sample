define([
    'jquery',
    'backbone',
    'views/home',
    'views/searchinput'
], function ($, Backbone, HomeView, SearchInputView) {
    'use strict';

    var HomeRouter = Backbone.Router.extend({
        routes: {
            'home': 'homeRoute'
        },

        initialize: function(options) {
            if(!options || !options.layout ){
                throw new Error('Required options missing');
            } else {
                this.layout = options.layout;
            }
        },

        homeRoute: function() {
            var searchInputView = new SearchInputView();

            this.homeView = new HomeView();
            this.layout.showBody(this.homeView.render(searchInputView));
        },

    });

    return HomeRouter;
});
