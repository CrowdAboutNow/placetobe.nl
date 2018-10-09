Polymer({
    is: 'can-list-item',
    properties: {
        expandable: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        expanded: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            notify: true
        },
        buttonOnlyExpands: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        }
    },
    toggleExpanded: function(e) {
        this.set("expanded", !this.expanded)
    }
})
