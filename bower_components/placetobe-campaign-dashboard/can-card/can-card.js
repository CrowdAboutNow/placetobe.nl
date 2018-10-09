Polymer({
    is: 'can-card',
    properties: {
        expandable: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true            
        },
        expanded: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true
        },
        raiseOnHover: {
            type: String,
            value: false,
            notify: true,
            reflectToAttribute: true
        }
    },
    toggleExpanded: function() {
        this.set("expanded", !this.expanded)
    }
})
