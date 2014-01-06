/*global define*/

define([
    'jquery',
    'backbone',
    'views/song'
], function ($, Backbone, SongView) {
    'use strict';

    var SongRouter = Backbone.Router.extend({
        routes: {
            'song/:song/:artist': 'songRoute'
        },

        initialize: function(options) {
            if(!options || !options.layout ){
                throw new Error('Required options missing');
            } else {
                this.layout = options.layout;
            }
        },

        songRoute: function(name, artist) {
            this.songView = new SongView({name: name, artist: artist});
            this.layout.showBody(this.songView.render());
        }

    });

    return SongRouter;
});
