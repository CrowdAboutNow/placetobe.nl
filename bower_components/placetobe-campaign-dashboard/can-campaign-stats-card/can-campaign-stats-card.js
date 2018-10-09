Polymer({
    is: 'can-campaign-stats-card',
    properties: {
        apiEndpoint: {
            type: String,
            value: window.API_ROOT
        },
        campaignId: {
            type: String
        },
        data: {
            type: Object,
            notify: true,
            observer: '_dataLoaded'
        },
        campaignTypes: {
            type: Object
        },
        contractTypeId: {
            type: String,
            value: null
        },
        investVerbOnButton: {
            type: String,
            notify: true,
            computed: '_getInvestVerb(contractTypeId, data.investVerb, data.investVerbSecondContractType, data.contractTypes)'
        },
        campaignIsActive: {
            type: Boolean,
            value: false,
            notify: true,
            computed: '_getCampaignIsActive(data.status, data.deadlineDateTime, data.campaignBlocked)'
        },
        campaignBlocked: {
            type: Boolean,
            value: false,
            computed: '_getCampaignIsBlocked(data.campaignBlocked)'
        },
        voorverkoopcampagne: {
            type: Boolean,
            computed: '_campaignTypeIsVoorverkoop(contractTypeId)',
            value: false
        },
        leningcampagne: {
            type: Boolean,
            computed: '_campaignTypeIsLening(contractTypeId)',
            value: false
        },
        aandelencampagne: {
            type: Boolean,
            computed: '_campaignTypeIsAandelen(contractTypeId)',
            value: false
        },
        campaignHasFixedYearReturnOnInvestment: {
            type: Boolean,
            computed: '_campaignHasFixedYearReturnOnInvestment(contractTypeId)',
            value: false
        },
        hideInvestButton: {
            type: Boolean,
            value: false
        },
        daysLeftBeforeDeadLine: {
            type: String,
            computed: '_getTimeLeftBeforeDeadLine(data.deadlineDateTime, data.requiredFunding, data.progressInEuros)'
        },
        investUrl: {
            type: String,
            computed: '_getInvestURL(data.slug)'
        },
        buttonDisabled: {
            type: Boolean,
            notify: true,
            computed: '_computeButtonDisabled(campaignTypes, contractTypeId)'
        },
        disabledWarning: {
            type: String,
            value: 'De ondernemer heeft een maximaal leendeel ingesteld, dit maximale bedrag is bereikt. Je kunt in deze campagne alleen nog deelnemen in de voorverkoop.'
        },
        tooltipVisible: {
            type: Boolean,
            value: false
        },
    },
    listeners: {
        'updateCampaignData': 'updateStatsData'
    },

    setTooltipVisibility: function() {
        if (this.buttonDisabled) return this.$$('can-tooltip').show();
    },

    _computeButtonDisabled: function(campaignTypes, contractTypeId) {
        if(campaignTypes.length < 1) return false;
        if(!contractTypeId) return false;
        for (var i = 0; i < campaignTypes.length; i++) {
            if(campaignTypes[i].contractTypeId == contractTypeId) return (campaignTypes[i].maximumTotalAmount <= campaignTypes[i].progress);
        }
        return false;
    },
    updateStatsData: function() {
        this.$$('#statsAjax').send();
        this.$$('caas-campaign-types').getItems();
    },
    _campaignTypeIsVoorverkoop: function (campaignTypeId) {
        return (campaignTypeId == 1 || campaignTypeId == 2 );
    },
    _campaignTypeIsLening: function (campaignTypeId) {
        return (campaignTypeId == 3 || campaignTypeId == 4 || campaignTypeId == 7 || campaignTypeId == 8);
    },
    _campaignTypeIsAandelen: function (campaignTypeId) {
        return (campaignTypeId == 5 || campaignTypeId == 6 );
    },
    _campaignHasFixedYearReturnOnInvestment: function(campaignTypeId) {
        return (campaignTypeId == 7 || campaignTypeId == 8);
    },
    _getInvestVerb: function(contractTypeId, investVerb, investVerbSecondContractType, contractTypes) {
        if(investVerb && contractTypes[0].id == contractTypeId) return investVerb;
        if(investVerbSecondContractType && contractTypes[1].id == contractTypeId) return investVerbSecondContractType;
        if(contractTypeId == 1 || contractTypeId == 2) return 'koop';
        if(contractTypeId == 3 || contractTypeId == 4  || contractTypeId == 7 || contractTypeId == 8) return 'leen';
        if(contractTypeId == 5 || contractTypeId == 6) return 'investeer';
        return 'investeer';
    },
    _getCampaignIsActive: function(campaignStatus, campaignDeadline, campaignBlocked) {
        return (!campaignBlocked && campaignStatus == 1 && campaignDeadline > Date.now() / 1000);
    },
    _getCampaignIsBlocked: function(campaignBlocked) {
        return campaignBlocked;
    },
    _dataLoaded: function(data) {
        if(!this.contractTypeId) this.set('contractTypeId', data.contractTypes[0].id);
    },
    _getTimeLeftBeforeDeadLine: function(deadlineDateTime, requiredFunding, progressInEuros) {
        var timeleft = deadlineDateTime - (Date.now() / 1000),
            daysleft = Math.ceil(timeleft / (60*60*24)),
            hoursleft = Math.ceil(timeleft / (60*60));

        if(timeleft < 0) {
            if(progressInEuros >= requiredFunding) return 'Deze campagne is succesvol afgerond';
            return 'Deze campagne is niet succesvol afgerond';
        }
        if(daysleft > 2) return 'Nog ' + daysleft + ' dagen tot de campagne sluit';
        if(hoursleft > 1) return  'Nog ' + hoursleft + ' uur tot de campagne sluit';
        return 'Laatste uur!';
    },
    _getInvestURL: function(slug) {
        if(window.WIDGET) return window.WEBSITEURL + '#/' + slug + '/investeer';
        return window.WEBSITEURL + 'campagnes/' + slug + '/investeer';
    }
});
