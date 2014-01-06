/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/artistinfo'
], function (_, Backbone, AppSettings, ArtistInfoModel) {
    'use strict';

    var ArtistInfoCollection = Backbone.Collection.extend({
        url: AppSettings.baseUrl,
        model: ArtistInfoModel,
        parse: function(response) {
            if (response.artist)
            {
                return response.artist;
            }
            return response;
        }
    });

    return ArtistInfoCollection;
});
