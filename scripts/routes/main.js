/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultRoute'
        },

        initialize: function(options) {
            if(!options || !options.layout ){
                throw new Error('Required options missing');
            } else {
                this.layout = options.layout;
            }
        },

        defaultRoute: function() {
            Backbone.history.navigate('home', true);
        }

    });

    return MainRouter;
});
