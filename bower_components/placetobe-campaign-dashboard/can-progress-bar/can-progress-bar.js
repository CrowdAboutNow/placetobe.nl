Polymer({
    is: "can-progress-bar",
    properties: {
        value: {
            type: String
        },
        remaining: {
            type: Boolean,
            value: false
        },
        progress: {
            type: Array,
            notify: true
            // value: [10, 20, 30, 20, 20]
        },
        progressbarWidth: {
            type: String,
            computed: "_getProgressbarPercentageStyle(progress, remaining, multi)"
        },
        multi: {
            type: Boolean,
            value: false,
            reflectToAttribute : true
        },
        multiProgressbarWidth: {
            type: String,

        }
    },
    _getProgressbarPercentageStyle: function(progress, remaining) {
        if(typeof progress === 'object') return this._getMultiBarPercentageStyle(progress);
        if(progress > 100) progress = 100;
        if(remaining) progress = 100 - progress;
        var progressbarPercentageWidth = progress + "%";
        this.$$(".progress").style.width = progressbarPercentageWidth;
        return progressbarPercentageWidth;
    },
    _getMultiBarPercentageStyle: function(progress) {
        this.set("multi", true);
        // console.log(this.multi);

        // for (var i = 0; i < count(this.progress); i++) {
        //     console.log(progress[i]);
        // }
    }
});
