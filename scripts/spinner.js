define([
    'spinnerjs'
], function (SpinnerJS) {

    function Spinner(options) {
        var opts = {
            lines: 7, // The number of lines to draw
            length: 0, // The length of each line
            width: 20, // The line thickness
            radius: 20, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#243342', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '100', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        
        this.spinnerJS = new SpinnerJS((options !== undefined) ? options : opts);
    }

    Spinner.prototype = {

        spin: function(target) {
            this.spinnerJS.spin(target[0]);
            // target.append(this.spinnerJS.el);
            return this;
        },

        stop: function() {
            this.spinnerJS.stop();
        }
    };

    return Spinner;
});