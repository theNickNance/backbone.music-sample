/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/artistresults',
    'views/songresults'
], function ($, _, Backbone, JST, ArtistResultsView, SongResultsView) {
    'use strict';

    var SearchresultsView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchresults.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );

            this.artistsView = new ArtistResultsView({collection: this.options.artistCollection});
            this.$('#artistsColumn').append(this.artistsView.render().el);

            this.listenTo(this.artistsView, 'click:item', function(model) {
                this.trigger('click:artist', model);
            });

            this.songView = new SongResultsView({collection: this.options.songCollection});
            this.$('#songsColumn').append(this.songView.render().el); 

            this.listenTo(this.songView, 'click:item', function(model) {
                this.trigger('click:song', model);
            });

            return this;
        }
    });

    return SearchresultsView;
});
