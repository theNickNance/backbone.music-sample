/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/song'
], function (_, Backbone, AppSettings, SongModel) {
    'use strict';

    var SongCollection = Backbone.Collection.extend({
        url: AppSettings.baseUrl,
        model: SongModel,
        parse: function(response) {
            if (response.results)
            {
                return response.results.trackmatches.track;
            }
            else if (response.similartracks) 
            {
                return response.similartracks.track;
            }
            return response;
        }
    });

    return SongCollection;
});
