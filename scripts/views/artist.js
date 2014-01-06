/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'appsettings',
    'spinner',
    'templates',
    'collections/artistinfo',
    'models/artistinfo',
    'views/artistheader',
    'collections/artist',
    'models/artist',
    'views/artistresults'
], function ($, _, Backbone, AppSettings, Spinner, JST, ArtistInfoCollection, ArtistInfoModel, ArtistHeaderView, ArtistCollection, ArtistModel, ArtistResultsView) {
    'use strict';

    var ArtistView = Backbone.View.extend({
        template: JST['app/scripts/templates/artist.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );

            this.spinner = new Spinner();

            this.artistInfo = new ArtistInfoCollection();
            this.artistCollection = new ArtistCollection();
            
            this.listenTo(this.artistInfo, 'sync', _.bind(this.load,this));

            this.artistInfo.url = AppSettings.baseUrl + '/2.0/?method=artist.getinfo&artist=' + this.options.name + '&api_key=' + AppSettings.apiKey + '&format=json';
            this.artistInfo.fetch({reset: true});

            return this;
        },

        load: function() {
            var header = new ArtistHeaderView({artist: this.artistInfo.models[0]});
            this.$('#artistHeaderSpot').append(header.render().el);

            this.loadSimilar(this.artistInfo.models[0].get('name'));
        },

        loadSimilar: function(name) {
            var artists = new ArtistResultsView({collection: this.artistCollection});
            this.$('#similarArtistSpot').append(artists.render().el);

            this.listenTo(artists, 'click:item', function(model) {
                var name = model.get('name');
                Backbone.history.navigate('artist/' + name, true);
            });
            
            this.artistCollection.url = AppSettings.baseUrl + '/2.0/?method=artist.getsimilar&artist=' + name + '&api_key=' + AppSettings.apiKey + '&format=json';
            this.artistCollection.fetch({reset: true});
        }
    });

    return ArtistView;
});
