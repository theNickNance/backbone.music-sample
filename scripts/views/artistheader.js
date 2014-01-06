/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ArtistheaderView = Backbone.View.extend({
        template: JST['app/scripts/templates/artistheader.ejs'],

        initialize: function(options) {
            if (options && options.artist) {
                this.model = options.artist;
            }
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        }
    });

    return ArtistheaderView;
});
