/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/songinfo'
], function (_, Backbone, AppSettings, SongInfoModel) {
    'use strict';

    var SongInfoCollection = Backbone.Collection.extend({
        url: AppSettings.baseUrl,
        model: SongInfoModel,
        parse: function(response) {
            if (response.track)
            {
                return response.track;
            }
            return response;
        }
    });

    return SongInfoCollection;
});