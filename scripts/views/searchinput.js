/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchinputView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchinput.ejs'],

        events: {
            'focus .searchInput': 'showResults',
            'keyup .searchInput': 'loadResults',
        },

        render: function() {
            this.$el.html( this.template( this ) );

            return this;
        },

        showResults: function(event) {
            event.preventDefault();
            this.trigger('focus:input');
        },

        loadResults: function(event) {
            var tag = $(event.currentTarget).val();
            this.trigger('keyup:input', tag);
        }
    });

    return SearchinputView;
});
