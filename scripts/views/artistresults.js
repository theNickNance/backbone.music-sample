/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'spinner',
    'templates',
    'views/artistitem'
], function ($, _, Backbone, Spinner, JST, ArtistItemView) {
    'use strict';

    var ArtistresultsView = Backbone.View.extend({
        template: JST['app/scripts/templates/artistresults.ejs'],

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

            var container = this.$('.artistsColumn');

            this.collection.forEach(function(artistItem) {

                var itemView = new ArtistItemView({artist: artistItem});

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

    return ArtistresultsView;
});
