Polymer({
    is: 'can-textarea',
    properties: {
        placeholder: {
            type: String,
        },
        name: {
            type: String,
        },
        required: {
            type: Boolean,
            value: false
        },
        disabled: {
            type: Boolean,
            value: false
        },
        value: {
            type: String,
            notify: true
        },
        empty: {
            type: Boolean,
            computed: '_checkIfInputIsEmpty(value)',
            reflectToAttribute: true
        },
        description: String,
        pattern: {
            type: String,
            value: null
        },
        maxlength: Number,
        minlength: Number
    },
    _checkIfInputIsEmpty: function(value) {
        return (!value);
    },
});
