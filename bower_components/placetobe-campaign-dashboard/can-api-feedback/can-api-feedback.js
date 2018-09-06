Polymer({
    is: 'can-api-feedback',
    properties: {

        responseStatus: {
            type: Object,
            notify: true
        },

        status: {
            type: String,
            notify: true,
            reflectToAttribute: true,
            computed: '_getStatusFromResponseStatus(responseStatus)'
        },

        feedbackText: {
            type: String,
            computed: '_getFeedbackTextFromResponseStatus(responseStatus)'
        }
    },

    _getStatusFromResponseStatus: function(responseStatus) {
        if(responseStatus.method && responseStatus.method.toLowerCase() == 'get') return;
        if(responseStatus.status == 'success') this._resetFeedback(3000);
        return responseStatus.status;
    },

    _getFeedbackTextFromResponseStatus: function(responseStatus) {
        if(responseStatus.method && responseStatus.method.toLowerCase() == 'get') return;

        switch (responseStatus.status) {
        case 'unsaved':
            return 'onopgeslagen wijzigingen';
        case 'loading':
            return 'bezig met opslaan';
        case 'success':
            return 'opgeslagen!';
        case 'failed':
            alert(responseStatus.error);
            return responseStatus.error;
        default:
            return '';
        }
    },

    _resetFeedback: function(miliseconds) {
        var self = this;
        window.setTimeout(function() {
            self.set('responseStatus', {
                status: null,
                error: null
            });
        }, miliseconds);
    }

});
