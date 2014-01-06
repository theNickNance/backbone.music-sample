/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ArtistitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/artistitem.ejs'],

        events: {
            'click .artistItem': 'showArtist'
        },

        initialize: function(options) {
            if (options && options.artist) {
                this.model = options.artist;
            }
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

        showArtist: function() {
            this.trigger('click:item', this.model);
        }

    });

    return ArtistitemView;
});
