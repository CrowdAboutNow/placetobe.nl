Polymer({
    is: 'can-campaign-dashboard-page',
    properties: {
        apiEndpoint: {
            type: String,
            value: window.API_ROOT
        },
        accessToken: {
            type: String,
            value: window.localStorage.getItem('CanSessionToken')
        },
        campaign: {
            type: Object,
            notify: true
        },
        activeContractId: {
            type: String,
            notify: true,
            computed: '_getActiveContractId(campaign.contractTypeIds)'
        },
        basicsCompleted: {
            type: Boolean,
            value: false
        },
        categoriesCompleted: {
            type: Boolean,
            value: false
        },
        videoCompleted: {
            type: Boolean,
            value: false
        },
        coverCompleted: {
            type: Boolean,
            value: false
        },
        socialCompleted: {
            type: Boolean,
            value: false
        },
        tabOneCompleted: {
            type: Boolean,
            computed: '_tabOneIsComplete(basicsCompleted, categoriesCompleted, videoCompleted, coverCompleted, socialCompleted)'
        },
        goalsCompleted: {
            type: Boolean,
            value: false
        },
        datesCompleted: {
            type: Boolean,
            value: false
        },
        investAmountsCompleted: {
            type: Boolean,
            value: false
        },
        tabTwoComplete: {
            type: Boolean,
            computed: '_tabTwoIsComplete(goalsCompleted, datesCompleted, investAmountsCompleted)'
        },
        campaignIdComplete: {
            type: Boolean,
            value: false
        },
        campaignContractComplete: {
            type: Boolean,
            value: false
        },
        campaignKvkComplete: {
            type: Boolean,
            value: false
        },
        tabThreeComplete: {
            type: Boolean,
            computed: '_tabThreeIsComplete(campaignIdComplete, campaignContractComplete, campaignKvkComplete)'
        },
        incentivesComplete: {
            type: Boolean
        },
        tabFourComplete: {
            type: Boolean,
            computed: '_tabFourIsComplete(incentivesComplete)'
        },
        percentageCompleted: {
            type: Number,
            computed: '_computePercentageCompleted(basicsCompleted, categoriesCompleted, videoCompleted, coverCompleted, socialCompleted, goalsCompleted, datesCompleted, investAmountsCompleted, campaignIdComplete, campaignKvkComplete, campaignContractComplete, incentivesComplete, administrativeFormalities.contractDocumentReceived, administrativeFormalities.identificationDocumentReceived, administrativeFormalities.KVKDocumentReceived, administrativeFormalities.paymentReceived, administrativeFormalities.basicCampaignInformationApproved)'
        },
        userId: {
            type: String,
            value: null
        },
        isLening: {
            type: Boolean,
            notify: true,
            computed: '_computeIsLening(campaign.contractTypeIds)'
        },
        isAandelen: {
            type: Boolean,
            notify: true,
            computed: '_computeIsAandelen(campaign.contractTypeIds)'
        },
        paysInTerms: {
            type: Boolean,
            notify: true,
            computed: '_computePayInTerms(campaign.annuity)'
        },
        annuityItems: {
            type: Object,
            notify: true,
            value: [
                { name : 'In 1 keer', value : 0},
                { name : '3 maandelijks', value : 3},
                { name : 'Half jaarlijks', value : 6},
                { name : 'Jaarlijks', value : 12}
            ]
        },
        maxRequiredFunding: {
            type: Number,
            computed: '_getMaxRequiredFunding(campaign.requiredFunding, isLening)'
        },

        today: {
            type: String,
            value: function() {
                return moment().format('YYYY-MM-DD');
            }
        },
        campaignStatusLabel: {
            type: String,
            computed: '_getCampaignStatusLabel(campaign.status)'
        },
        activeTab: {
            type: Number,
            value: 0
        },
        editable: {
            type: Boolean,
            computed: '_computeIfIsEditable(campaign.entrepreneurCanEdit, campaign.started, userRole)',
            value: false
        },

        notEditableWarning: {
            type: String,
            computed: '_computeNotEditableWarning(campaign.entrepreneurCanEdit, campaign.started)'
        },
        htmlInterview: {
            type: String,
            value: null
        },

        loggedIn: {
            type: Boolean,
            notify: true,
            value: false
        },
        userRole: {
            type: String,
            value: null
        },
        editorEnabled: {
            type: Boolean,
            value: false,
            computed: '_computeEditorIsEnabled(userRole)'
        },
        savingInterviewText: {
            type: Boolean,
            value: false
        },
        administrativeFormalities: {
            type: Object,
            value: {}
        },

        repaymentAmounts: {
            type: Array,
            computed: '_getRepaymentAmounts(campaign.requiredFunding, campaign.maxFunding)'
        },
        loadingExcel: {
            type: Boolean,
            value: false
        },
        tabsdata: Array,
        maximumFileSize: Number,
        maximumCoverFileSize: Number,
        maximumIDFileSize: Number,
        maximumContractFileSize: Number,
        maximumKvkFileSize: Number,
        disabled: Boolean,
        disabledWarning: String,
        campaignId: Number,
        totalInterestLabel: {
            type: String,
            computed: '_computeTotalInterestLabel(activeContractId)'
        },
        isYearlyLoan: {
            type: Boolean,
            computed: '_computeIfLoanIsOnlyYearly(campaign.contractTypeIds, isLening)'
        }
    },

    observers: [
        '_parseFacebookURL(campaign.facebook)',
        '_parseTwitterURL(campaign.twitter)',
        '_parseLinkedInURL(campaign.linkedin)',
        '_setCampaignText(campaign.interview)',
        '_setVideo(campaign.video.url)'
    ],

    ready: function () {
        window.scrollTo(0, 0);
        this.addEventListener('image-upload-error', function(e) {
            alert(e.detail);
        });
    },

    _computeIsLening: function(contractTypeIds) {
        if(!contractTypeIds) return;
        return (contractTypeIds.indexOf(3) != -1 || contractTypeIds.indexOf(4) != -1 || contractTypeIds.indexOf(7)  != -1 || contractTypeIds.indexOf(8) != -1);
    },

    _computeIsAandelen: function(contractTypeIds) {
        if(!contractTypeIds) return;
        return (contractTypeIds.indexOf(5) != -1 || contractTypeIds.indexOf(6) != -1);
    },

    _computeIfLoanIsOnlyYearly: function(contractTypeIds, isLening) {
        if(!contractTypeIds) return;
        if(!isLening) return false;
        return (contractTypeIds.indexOf(7) != -1 || contractTypeIds.indexOf(8) != -1);
    },

    _computePayInTerms: function(annuity) {
        return (annuity != 0);
    },

    _getActiveContractId: function(contractTypeIds) {
        return (contractTypeIds) ? contractTypeIds[0] : null;
    },

    handleBasicsError: function() {
    },

    _tabOneIsComplete: function(basicsCompleted, categoriesCompleted, videoCompleted, coverCompleted, socialCompleted) {
        return (basicsCompleted && categoriesCompleted && videoCompleted && coverCompleted && socialCompleted);
    },

    _tabTwoIsComplete: function(goalsCompleted, datesCompleted, investAmountsCompleted) {
        return (goalsCompleted && datesCompleted && investAmountsCompleted);
    },

    _tabThreeIsComplete: function(campaignIdComplete, campaignContractComplete, campaignKvkComplete) {
        return (campaignIdComplete, campaignContractComplete, campaignKvkComplete);
    },

    _tabFourIsComplete: function(incentivesComplete) {
        return ((!!incentivesComplete));
    },

    _computePercentageCompleted: function(basicsCompleted, categoriesCompleted, videoCompleted, coverCompleted, socialCompleted, goalsCompleted, datesCompleted, investAmountsCompleted, campaignIdComplete, campaignKvkComplete, campaignContractComplete, incentivesComplete, contractDocumentReceived, identificationDocumentReceived, KVKDocumentReceived, paymentReceived, basicCampaignInformationApproved) {
        var numberOfCompletes = 0;
        var completables = [basicsCompleted, categoriesCompleted, videoCompleted, coverCompleted, socialCompleted, goalsCompleted, datesCompleted, investAmountsCompleted, campaignIdComplete, campaignKvkComplete, campaignContractComplete, incentivesComplete, contractDocumentReceived, identificationDocumentReceived, KVKDocumentReceived, paymentReceived, basicCampaignInformationApproved];

        for (var i = 0; i < completables.length; i++) {
            if(completables[i]) numberOfCompletes++;
        }
        return (numberOfCompletes * 100) / completables.length;
    },

    _parseFacebookURL: function(facebookURL) {
        if(!facebookURL) return;
        this.set('campaign.facebook', this._parseSocialURL(facebookURL));
    },

    _parseTwitterURL: function(twitterURL) {
        if(!twitterURL) return;
        this.set('campaign.twitter', this._parseSocialURL(twitterURL));
    },

    _parseLinkedInURL: function(linkedInURL) {
        if(!linkedInURL) return;
        this.set('campaign.linkedin', this._parseSocialURL(linkedInURL));
    },

    _parseSocialURL: function(socialURL) {
        return socialURL.replace(/\?.*?$/, '');
    },

    _getMaxRequiredFunding: function(requiredFunding, isLening) {
        return (isLening) ? (requiredFunding * 2) : '';
    },

    _getCampaignStatusLabel: function(campaignStatus) {
        switch(campaignStatus) {
        case 0:
            return 'in voorbereiding';
        case 1:
            return 'lopend';
        case 2:
        case 3:
        case 4:
            return 'succesvol';
        default:
            return 'afgerond';
        }
    },
    _handleCampaignText: function(e, interviewText) {
        this.set('htmlInterview', interviewText.replace(/"/g, '\\"'));
    },

    saveCampaignText: function() {
        this.$$('#update-campaign-text').send();
    },

    openTextEditor: function() {
        this.set('htmlInterview', this.campaign.interview.replace(/"/g, '\\"'));
        this.$$('can-overlay#campaign-text-overlay').open();
    },

    requestCloseTextEditor: function() {
        var close = window.confirm('Weet je zeker dat je de editor wilt verlaten? Eventuele wijzigingen gaan mogelijk verloren.');
        if(close) {
            this.closeTextEditor();
        }
    },

    closeTextEditor: function() {
        this.$$('can-overlay#campaign-text-overlay').close();
    },

    saveGeocode: function() {
        this.$$('#update-campaign-geocode').send();
    },

    openLocationSelector: function() {
        this.set('htmlInterview', this.campaign.interview.replace(/"/g, '\\"'));
        this.$$('can-overlay#location-selector-overlay').open();
    },

    requestCloseLocationSelector: function() {
        var close = window.confirm('Weet je zeker dat je de locatie selectie wilt verlaten? Eventuele wijzigingen gaan mogelijk verloren.');
        if(close) {
            this.closeLocationSelector();
        }
    },

    closeLocationSelector: function() {
        this.$$('can-overlay#location-selector-overlay').close();
    },

    geoCodeSaved: function() {
        this.closeLocationSelector();
    },

    geoCodeSavedError: function() {
        alert('Sorry, er is iets misgegaan tijdens het bewaren van de locatie. Probeer het opnieuw a.u.b.');
    },

    _computeNotEditableWarning: function(entrepreneurCanEdit, campaignStarted) {
        if(campaignStarted) return 'Je kunt deze informatie niet wijzigen omdat je campagne is gestart.';
        if(!entrepreneurCanEdit) return 'Je kunt deze informatie (nog) niet wijzigen.';
        return 'Deze campagne is gesloten';
    },

    _computeIfIsEditable: function (entrepreneurCanEdit, started, userRole) {
        if(userRole == 'accountmanager') return true;
        if(userRole == 'financialadministrator') return true;
        if(started) return false;
        if(entrepreneurCanEdit) return true;
        return false;
    },

    _computeEditorIsEnabled: function(userRole) {
        if(userRole == 'accountmanager') return true;
        if(userRole == 'financialadministrator') return true;
        return false;
    },

    _getExportExcel: function() {
        this.set('loadingExcel', true);
        this.$$('#export-excel').send();
    },

    _excelDownloadSuccess: function() {
        this.set('loadingExcel', false);
    },

    _setCampaignText: function(campaignInterview) {
        this.$$('#campaignText').innerHTML = campaignInterview;
    },
    saveInterviewText: function() {
        this.savingInterviewText = true;
    },
    interviewTextSaved: function() {
        this.savingInterviewText = false;
        this.set('campaign.interview', this.htmlInterview.replace(/\\"/g, '"'));
        this.closeTextEditor();
    },
    interviewTextSavedError: function() {
        alert('Sorry, er is iets misgegaan tijdens het bewaren van de tekst. Probeer het opnieuw a.u.b.');
        this.savingInterviewText = false;
    },

    _setVideo: function(campaignVideoURL) {
        if(!campaignVideoURL) return;
        var pattern = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/g;
        var youtubeID = campaignVideoURL.replace(pattern, '$7');

        if(campaignVideoURL.match(pattern)) {

            this.set('campaign.video.vimeo', {});
            this.notifyPath('campaign.video.vimeo', {});

            this.set('campaign.video.youtube', {id: youtubeID});
            this.notifyPath('campaign.video.youtube', {id: youtubeID});

            return;
        }

        pattern = /^.*?\/([0-9]{3,12})$/;
        var vimeoID = campaignVideoURL.replace(pattern, '$1');

        if(campaignVideoURL.match(pattern)) {

            this.set('campaign.video.youtube', {});
            this.notifyPath('campaign.video.youtube', {});

            this.set('campaign.video.vimeo', {id: vimeoID});
            this.notifyPath('campaign.video.vimeo', {id: vimeoID});

        }

    },

    _updateCampaignData: function() {
        this.$$('can-campaign-stats-card').updateStatsData();
        this.$$('caas-campaign-types').getItems();
        if(this.isLening) this.$$('can-campaign-repayments-card').updatePaymentData();
    },

    _getRepaymentAmounts: function(requiredFunding, maxFunding) {
        return [Number(maxFunding), Number(requiredFunding)];
    },

    _deletePublicFile: function(evt) {
        if (confirm('Weet je zeker dat je ' + evt.model.item.fileName + ' wilt verwijderen?')) {
            this.$$('#publicFile' + evt.model.index).send();
        } else {
            return;
        }
    },

    _computeTotalInterestLabel: function(activeContractId) {
        if(activeContractId == 7 || activeContractId == 8) return 'jaarrendement (%)';
        return 'rendement over de gehele periode (%)';
    },

    updateCampaignData: function() {
        this.$$('#campaignAjax').send();
    },

    _saveCampaignTypes: function() {
        var campaignTypes = this.campaignTypes;
        for (var i = 0; i < campaignTypes.length; i++) {
            this.$$('caas-campaign-types').notifyPath('campaignTypes.' + [i] + '.id');
        }
    }
});
