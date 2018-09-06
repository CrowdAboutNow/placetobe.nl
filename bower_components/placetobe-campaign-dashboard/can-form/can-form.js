Polymer({
    is: 'can-form',
    properties: {
        apipath: {
            type: String
        },
        response:{
            type:Object
        },
        formdata: {
            type: Object,
            value: {},
            notify: true
        },
        submitlabel: {
            type: String,
            value: 'Opslaan'
        },
        valid: {
            type: Boolean,
            computed: '_isFormValid(formdata, formdata.*)',
            notify: true,
            reflectToAttribute: true
        },
        buttonlabel: {
            type: String,
            value: 'submitlabel'
        },
        auth: {
            type: Boolean,
            value: false
        },
        auto: {
            type: Boolean,
            value: false,
            notify: true
        },
        disabled: {
            type: Boolean,
            value: false,
            notify: true,
            observer: '_stateChanged'
        },
        responseStatus: {
            type: Object
        },
        hideFeedback: {
            type: Boolean,
            value: false
        },
        hidesubmitbutton: {
            type: Boolean,
            value: false
        },
        disabledWarning: {
            type: String,
            value: null
        },
        autocomplete: {
            type: String,
            value: 'new-password'
        },
        method: String,
        smallbutton: Boolean,
        useWithCaas: {
            type: Boolean,
            value: false
        },
        loading: {
            type: Boolean,
            value: false
        }
    },
    submit: function(e) {
        if(e) e.preventDefault();
        if(this.useWithCaas) return this._fireCaasSubmitEvent();
        if(!this._isFormValid() || this.disabled || !this.apipath) return;
        this._sendRequest();
        this.fire('submit', this.formdata);
        if (window.location.href === 'https://crowdaboutnow.nl/tips') {
            return goog_report_conversion();
        }
    },
    enable: function() {
        // this.set('hidesubmitbutton', false);
        var elements = this.$$('form').children;
        for(var i in elements) {
            elements[i].disabled = false;
        }
    },
    disable: function() {
        // this.set('hidesubmitbutton', true);
        var elements = this.$$('form').children;
        for(var i in elements) {
            elements[i].disabled = true;
        }
    },
    _stateChanged: function(shouldEnableForm) {
        if(shouldEnableForm == false) return this.enable();
        this.disable();
    },
    _sendRequest: function() {
        this.$$('can-api').send();
    },
    _handleResponse: function(evt, data) {
        this.fire('response', data);
    },
    _handleError: function(evt, data) {
        evt.stopPropagation();
        this.fire('error', data);
    },
    _isFormValid: function() {
        return this.$$('form').checkValidity();
    },
    _fireCaasSubmitEvent: function() {
        this.fire('caas-submit');

    }
});
