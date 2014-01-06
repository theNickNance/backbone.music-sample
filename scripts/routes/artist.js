/*global define*/

define([
    'jquery',
    'backbone',
    'views/artist'
], function ($, Backbone, ArtistView) {
    'use strict';

    var ArtistRouter = Backbone.Router.extend({
        routes: {
            'artist/:id': 'artistRoute'
        },

        initialize: function(options) {
            if(!options || !options.layout ){
                throw new Error('Required options missing');
            } else {
                this.layout = options.layout;
            }
        },

        artistRoute: function(name) {
            this.artistView = new ArtistView({name: name});
            this.layout.showBody(this.artistView.render());
        }

    });

    return ArtistRouter;
});
