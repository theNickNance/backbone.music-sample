/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SongheaderView = Backbone.View.extend({
        template: JST['app/scripts/templates/songheader.ejs'],

        initialize: function(options) {
            if (options && options.song) {
                this.model = options.song;
            }
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        }
    });

    return SongheaderView;
});
