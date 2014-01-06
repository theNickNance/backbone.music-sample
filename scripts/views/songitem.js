/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SongitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/songitem.ejs'],

        events: {
            'click .songItem': 'showSong'
        },

        initialize: function(options) {
            if (options && options.song) {
                this.model = options.song;
            }
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

        showSong: function() {
            this.trigger('click:item', this.model);
        }
    });

    return SongitemView;
});
