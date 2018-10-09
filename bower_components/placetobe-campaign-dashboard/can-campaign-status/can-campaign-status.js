Polymer({
    is: 'can-campaign-status',

    properties: {

        slug: {
            type: String,

        },

        campaign: {
            type: Object
        },

        _campaignHasLoan: {
            type:Boolean,
            computed: '_checkIfCampaignHasLoan(campaign)'
        },

        _campaignIsDonation: {
            type:Boolean,
            computed: '_checkIfCampaignIsDonation(campaign)'
        },

        _campaignIsCombi: {
            type:Boolean,
            computed: '_checkIfCampaignIsCombi(campaign)'
        },

        percentageCompleted: {
            type: Number
        },

        loadingExcel: {
            type: Boolean,
            value: false
        }
    },

    _getExportExcel: function() {
        this.set('loadingExcel', true);
        this.$$('#export-excel').send();
    },

    _excelDownloadSuccess: function() {
        this.set('loadingExcel', false);
    },

    _checkIfCampaignIsDonation: function(campaign) {
        if(campaign.contractTypeIds[1]) return false;
        return (campaign.contractTypeIds.indexOf(1) !== -1 ||
                campaign.contractTypeIds.indexOf(2) !== -1);
    },

    _checkIfCampaignHasLoan: function(campaign) {
        if(campaign.contractTypeIds[1]) return false;
        return (campaign.contractTypeIds.indexOf(3) !== -1 ||
                campaign.contractTypeIds.indexOf(4) !== -1 ||
                campaign.contractTypeIds.indexOf(7) !== -1 ||
                campaign.contractTypeIds.indexOf(8) !== -1);
    },

    _checkIfCampaignIsCombi: function(campaign) {
        return (campaign.contractTypeIds[1]);
    },

    computeInterestAmountForPayment: function(repayment) {
        return (repayment.interestRate * repayment.currentPaymentsStatus.totalLoanPrinciple) / 100;
    },

    computeShareAmountForPayment: function(repayment) {
        return (repayment.totalAmountThisPayment - ((repayment.interestRate * repayment.currentPaymentsStatus.totalLoanPrinciple) / 100));
    }

});
