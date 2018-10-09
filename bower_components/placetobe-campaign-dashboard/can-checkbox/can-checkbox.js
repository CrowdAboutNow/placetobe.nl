Polymer({
    is: 'can-checkbox',
    properties: {
        checked: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            notify: true
        },
        disabled: {
            type: Boolean,
            reflectToAttribute: true
        },
        name: String
    },
    listeners: {
        'tap': 'toggleChecked'
    },
    toggleChecked: function (event) {
        this.set('checked', !this.checked)
    }
});
