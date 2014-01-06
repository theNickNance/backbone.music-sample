/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/artist'
], function (_, Backbone, AppSettings, ArtistModel) {
    'use strict';

    var ArtistCollection = Backbone.Collection.extend({
        url: AppSettings.baseUrl,
        model: ArtistModel,
        parse: function(response) {
            if (response.results)
            {
                return response.results.artistmatches.artist;
            }
            else if (response.similarartists) 
            {
                return response.similarartists.artist;
            }
            return response;
        }
    });

    return ArtistCollection;
});
