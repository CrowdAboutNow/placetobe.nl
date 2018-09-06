Polymer({
    is: 'can-button',
    properties: {
        label: String,
        url: String,
        download: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        small: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        deselect: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        add: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        remove: {
            type: Boolean,
            value: false,
            reflectToAttribute: true

        },
        special: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        invest: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        target: {
            type: String,
            value: '_self'
        },
        usePushState:{
            type: Boolean,
            value: false
        },
        disabled: Boolean
    },

    _handleButtonTap: function(e) {
        if(e) e.preventDefault();
        this.fire('button-tap');
        if(this.url) this.openURL();
    },

    openURL: function() {
        if(this.usePushState) return document.querySelector('app-router').go(this.url);
        return window.open(this.url, this.target);
    }
});
