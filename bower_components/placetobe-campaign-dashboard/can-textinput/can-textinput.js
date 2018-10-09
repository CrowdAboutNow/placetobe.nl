Polymer({
    is: 'can-textinput',
    properties: {
        type: {
            type: String,
            value: 'text',
            observers: '_setTypeSettings'
        },
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
            notify: true,
            value: null
        },
        min: {
            type: String,
            notify: true
        },
        max: {
            type: String,
            notify: true
        },
        step: {
            type: String,
            notify: true
        },
        dateFormat:{
            type: String,
            notify: true
        },
        pattern: {
            notify: true
        },
        autocomplete: {
            type: String,
            value: 'on'
        },
        empty: {
            type: Boolean,
            value: true,
            computed: '_checkIfInputIsEmpty(value)',
            reflectToAttribute: true
        },
        valid: {
            type: Boolean,
            notify: true,
            reflectToAttribute: true,
            computed: '_checkInputValidity(value)',
        },
        description: String,
        dataDateFormat: String
    },

    _checkInputValidity: function(value) {
        var inputElement = this.$$('input');
        inputElement.value = value;
        return inputElement.validity.valid;
    },

    _checkIfInputIsEmpty: function(value) {
        return (!value);
    },

    _setNumberToRounded: function () {
        var roundedNumber = this.roundToStepSize(this.value, this.step);
        this.set('value', roundedNumber);
    },

    _setTypeSettings: function () {
        if(this.type === 'date') {
            this.set('pattern', '^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$');
        }
    },

    roundToStepSize: function (userInputValue, stepValue) {
        userInputValue = parseFloat(userInputValue);
        stepValue = parseFloat(stepValue);
        var roundedValue = Math.floor(userInputValue/stepValue)*stepValue;
        return roundedValue.toString();
    },
});
