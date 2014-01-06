/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var LayoutView = Backbone.View.extend({
        initialize: function() {
            this.bodyRegion = new Backbone.View({id: 'bodyRegion'});
        },

        render: function() {
            this.$el.append(this.bodyRegion.el);
            return this;
        },

        showBody: function(view, bodyClass) {
            this.swapView(this.bodyRegion, view);
            if (bodyClass) {
                $('body').addClass(bodyClass);
            } else {
                $('body').removeClass();
            }
        },
        
        swapView: function(region, view) {
            if (region.currentView) {
                region.currentView.remove();
            }
            region.currentView = view;
            region.$el.append(region.currentView.el);
        }
    });

    return LayoutView;
});
