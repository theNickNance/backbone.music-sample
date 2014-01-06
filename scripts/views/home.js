/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'appsettings',
    'templates',
    'views/searchresults',
    'collections/artist',
    'models/artist',
    'collections/song',
    'models/song'
], function ($, _, Backbone, AppSettings, JST, SearchResultsView, ArtistCollection, ArtistModel, SongCollection, SongModel) {
    'use strict';

    var HomeviewView = Backbone.View.extend({
        template: JST['app/scripts/templates/home.ejs'],

        render: function(searchInputView) {
            this.$el.html( this.template( this ) );

            this.artistCollection = new ArtistCollection();
            this.songCollection = new SongCollection();

            if (searchInputView) {
            	this.$('#searchSpot').append(searchInputView.render().el);
            }

            this.listenToOnce(searchInputView, 'focus:input', function(model) {
                this.addResults();
            });

            this.listenTo(searchInputView, 'keyup:input', function(tag) {
                this.artistCollection.url = AppSettings.baseUrl + '/2.0/?method=artist.search&artist=' + tag + '&api_key=' + AppSettings.apiKey + '&format=json';
                this.artistCollection.fetch({reset: true});

                this.songCollection.url = AppSettings.baseUrl + '/2.0/?method=track.search&track=' + tag + '&api_key=' + AppSettings.apiKey + '&format=json';
                this.songCollection.fetch({reset: true});
            });

            return this;
        },

        addResults: function() {
            var resultsView = new SearchResultsView({artistCollection: this.artistCollection, songCollection: this.songCollection});
            $('#resultSpot').append(resultsView.render().el);

            this.listenTo(resultsView, 'click:artist', function(model) {
                var name = model.get('name');
                Backbone.history.navigate('artist/' + name, true);
            });

            this.listenTo(resultsView, 'click:song', function(model) {
                var name = model.get('name');
                var artist = model.get('artist');
                Backbone.history.navigate('song/' + name + '/' + artist, true);
            });
        }
    });

    return HomeviewView;
});
