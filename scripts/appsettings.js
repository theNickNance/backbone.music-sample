define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var AppSettings = {
		baseUrl: "http://ws.audioscrobbler.com",
		apiKey: '713f93522592153ce6c653389402b7bf'
		//modelType: "common/models/jsonp/event"
    };

    return AppSettings;
});
