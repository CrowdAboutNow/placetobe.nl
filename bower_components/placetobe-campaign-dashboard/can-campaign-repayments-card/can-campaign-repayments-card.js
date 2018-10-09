Polymer({
    is: 'can-campaign-repayments-card',

    properties: {

        campaignId: {
            type: String,
            value: null
        },

        payments: {
            type: Array
        },

        amount: {
            type: Array,
        },

        amounts: {
            type: Number
        },

        expandedItem: {
            type: Number,
            value: null,
            reflectToAttribute: true
        },

        _repaymentsAmounts: {
            type: Array
        }
    },

    observers: [
        '_parseRepaymentsFromAmount(amount)',
        '_parseRepaymentsFromAmounts(amounts)'
    ],

    _parseRepaymentsFromAmount: function(amount) {
        if(amount) this.set('_repaymentsAmounts', [amount]);
    },

    _parseRepaymentsFromAmounts: function(amounts) {
        if(amounts) this.set('_repaymentsAmounts', amounts);
    },

    computeAmountForPayment: function(percentage, amount) {
        return (percentage * amount) / 100;
    },

    _itemIsExpanded: function(index) {
        var itemIsExpanded = (parseInt(index) == parseInt(this.expandedItem));
        return itemIsExpanded;
    },

    updatePaymentData: function() {
        this.$$('#paymentsAjax').send();
    }
});
