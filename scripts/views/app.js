/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/layout',
    'routes/main',
    'routes/home',
    'routes/artist',
    'routes/song'
], function ($, _, Backbone, Layout, MainRouter, HomeRouter, ArtistRouter, SongRouter) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function() {
            this.layout = new Layout({el: '#container'});

            this.backboneSync = Backbone.sync;

            this.mainRouter = new MainRouter({layout: this.layout});
            this.homeRouter = new HomeRouter({layout: this.layout});
            this.artistRouter = new ArtistRouter({layout: this.layout});
            this.songRouter = new SongRouter({layout: this.layout});
        },

        render: function() {
            this.layout.render();
            return this;
        }

    });

    return AppView;
});
