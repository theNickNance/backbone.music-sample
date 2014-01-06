/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'spinner',
    'templates',
    'views/songitem'
], function ($, _, Backbone, Spinner, JST, SongItemView) {
    'use strict';

    var SongresultsView = Backbone.View.extend({
        template: JST['app/scripts/templates/songresults.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );

            this.items = [];
            this.spinner = new Spinner();

            this.listenTo(this.collection, 'request', _.bind(this.showSpinner,this));
            this.listenTo(this.collection, 'reset', _.bind(this.clearList,this));
            this.listenTo(this.collection, 'sync', _.bind(this.load,this));

            return this;
        },

        showSpinner: function() {
            this.spinner.spin(this.$('.results'));
        },

        load: function() {
            this.spinner.stop();

            var container = this.$('.songColumn');

            this.collection.forEach(function(songItem) {

                var itemView = new SongItemView({song: songItem});

                this.items.push(itemView);
                container.append(itemView.render().el);

                this.listenTo(itemView, 'click:item', function(model) {
                    this.trigger('click:item', model);
                });
            },this);
        },

        clearList: function() {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].remove();
            }
        },

        remove: function() {
            this.clearList();
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });

    return SongresultsView;
});
