/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'appsettings',
    'spinner',
    'templates',
    'collections/songinfo',
    'models/songinfo',
    'views/songheader',
    'collections/song',
    'models/song',
    'views/songresults'
], function ($, _, Backbone, AppSettings, Spinner, JST, SongInfoCollection, SongInfoModel, SongHeaderView, SongCollection, SongModel, SongResultsView) {
    'use strict';

    var SongView = Backbone.View.extend({
        template: JST['app/scripts/templates/song.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );

            this.spinner = new Spinner();

            this.songInfo = new SongInfoCollection();
            this.songCollection = new SongCollection();
            
            this.listenTo(this.songInfo, 'sync', _.bind(this.load,this));

            this.songInfo.url = AppSettings.baseUrl + '/2.0/?method=track.getinfo&track=' + this.options.name + '&artist=' + this.options.artist + '&api_key=' + AppSettings.apiKey + '&format=json';
            this.songInfo.fetch({reset: true});

            return this;
        },

        load: function() {
            var header = new SongHeaderView({song: this.songInfo.models[0]});
            this.$('#songHeaderSpot').append(header.render().el);

            this.loadSimilar(this.songInfo.models[0].get('name'), this.songInfo.models[0].get('artist').name);
        },

        loadSimilar: function(name, artist) {
            var songs = new SongResultsView({collection: this.songCollection});
            this.$('#similarSongSpot').append(songs.render().el);

            this.listenTo(songs, 'click:item', function(model) {
                var name = model.get('name');
                var artist = model.get('artist').name;
                Backbone.history.navigate('song/' + name + '/' + artist, true);
            });
            
            this.songCollection.url = AppSettings.baseUrl + '/2.0/?method=track.getsimilar&track=' + name + '&artist=' + artist + '&api_key=' + AppSettings.apiKey + '&format=json';
            this.songCollection.fetch({reset: true});
        }
    });

    return SongView;
});
