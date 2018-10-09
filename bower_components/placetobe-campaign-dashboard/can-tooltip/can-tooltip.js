Polymer({
    is: 'can-tooltip',
    properties: {
        description: {
            type: String
        },
        visible: {
            type: Boolean,
            notify: true,
            value: false,
        }

    },
    toggleDescription: function() {
        this.set('visible', !this.visible);
    },
    show: function() {
        this.set('visible', true);
    },
    hide: function() {
        this.set('visible', false);
    }
});
