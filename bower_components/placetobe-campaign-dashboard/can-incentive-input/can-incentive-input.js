Polymer({
    is: 'can-incentive-input',
    properties: {
        title: {
            type: String,
            notify: true
        },
        message: {
            type: String,
            notify: true
        },
        minimumInvestment: {
            type: String,
            notify: true
        },
        costs: {
            type: Number,
            notify: true
        },
        forBusiness: {
            type: Boolean,
            notify: true
        },
        inStock: {
            type: Number,
            notify: true,
            observer: '_setUnlimitedStock'
        },
        inStockStorageInput: {
            type: Number
        },
        unlimitedStock: {
            type: Boolean,
            value: false,
            observer: 'unlimitedStockChanged',
        },
        minimumStock: {
            type: Number,
            computed: '_getMinimumInputStock(unlimitedStock)'
        },
        contractTypeId: {
            type: Number,
            value: 0,
            notify: true
        },
        id: {
            type:String,
            notify: true
        },
        index: Number,
        number: {
            type: Number,
            computed: '_parseNumberByIndex(index)'
        },
        businessOptions: {
            type: Array,
            value: [
                {
                    label: 'Particulier',
                    value: 0
                },
                {
                    label: 'Zakelijk',
                    value: 1
                }
            ]
        },
        loading: {
            type: Boolean,
            value: null
        },
        incentiveChanged: {
            type: Boolean,
            value: false,
            observer: '_incentiveChanged'
        },
        responseStatus: {
            type: Object
        },
        valid: {
            type: Boolean
        },

        campaignTypes: {
            type: Array,
            notify: true
        },

        campaignTypeOptions: {
            type: Array,
            notify: true
        },

        selectedCampaignType: {
            type: Object,
            notify: true,
            computed: '_getSelectedCampaignType(campaignTypes, contractTypeId)'
        }
    },

    observers: [
        '_setCampaignTypeOptions(campaignTypes)',
        '_setSuccess(loading)'
    ],

    _setCampaignTypeOptions: function(campaignTypes) {
        if(campaignTypes.length == 0) return;
        var campaignTypeOptions = [];

        for (var i = 0; i < campaignTypes.length; i++) {
            campaignTypeOptions.push({
                label: campaignTypes[i].contractTypeName,
                value: campaignTypes[i].contractTypeId
            });
        }
        if(this.contractTypeId == 0) campaignTypeOptions.push({
            label: 'kies een campagne type',
            value: 0
        });
        this.set('campaignTypeOptions', campaignTypeOptions);
    },

    _getSelectedCampaignType: function(campaignTypes, contractTypeId) {
        for (var i = 0; i < campaignTypes.length; i++) {
            if(campaignTypes[i].contractTypeId == contractTypeId) return campaignTypes[i];
        }
    },

    attached: function(){
        var _self = this;
        window.onbeforeunload = function(){
            if(_self.incentiveChanged) return 'Je hebt nog onopgeslagen belongingen.';
        };
    },

    _setChanged: function() {
        this.set('incentiveChanged', true);
    },

    _setSuccess: function(loading) {
        if(loading === false && this.incentiveChanged) {
            this._setStatusResponseObject('success');
            this.set('incentiveChanged', false);
        }
    },

    _handleDeleteIncentive(evt) {
        var confirm = window.confirm('Weet je zeker dat je deze beloning wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');
        if(confirm) {
            this.deleteIncentive(evt.target.parentElement.incentiveId);
        }
    },

    deleteIncentive: function(incentiveId) {
        this.fire('delete', incentiveId);
    },

    updateIncentive: function(evt) {
        if(evt.target.disabled) return;
        this._setStatusResponseObject('loading');
        this.set('loading', true);
        this.fire('update', evt.target.parentElement.incentiveId);
    },

    _parseNumberByIndex: function() {
        return parseInt(this.index) + 1;
    },
    unlimitedStockChanged: function(unlimitedStock) {
        if (unlimitedStock) {
            this.set('inStockStorageInput', this.inStock);
            this.set('inStock', 0);
        } else {
            this.set('inStock', this.inStockStorageInput);
        }
    },
    _getMinimumInputStock: function(unlimitedStock) {
        return (unlimitedStock) ? 0 : 1;
    },

    _setUnlimitedStock: function(inStock) {
        var unlimitedStock = (parseInt(inStock) < 1);
        this.set('unlimitedStock', unlimitedStock);
    },

    _setStatusResponseObject: function(status, error) {
        this.set('responseStatus', {
            status: status,
            error: error
        });
    },

    _incentiveChanged: function() {
        if(!this.id) return;
        this.fire('changed', {
            changed: this.incentiveChanged,
            id: this.id
        });
    }

});
