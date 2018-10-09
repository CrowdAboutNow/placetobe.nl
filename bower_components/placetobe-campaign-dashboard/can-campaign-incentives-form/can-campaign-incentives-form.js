Polymer({
    is: 'can-campaign-incentives-form',
    properties: {
        apiEndpoint: {
            type: String,
            // value: window.API_ROOT
        },
        accessToken: {
            type: String,
            // value: window.localStorage.getItem('CanSessionToken')
        },
        incentives: Array,
        valid: {
            type: Boolean,
            notify: true,
            computed: '_checkIfIsAtLeastOneIncentive(incentives)'
        },
        loading: {
            type: Boolean,
            value: true
        },
        changedIncentives: {
            type: Array,
            value: []
        },

        campaignTypes: {
            type: Array,
            notify: true
        },
        activeRole: {
            type: String,
            value: null,
            notify: true
        }

    },

    _handleDeleteIncentive: function(evt) {
        var id = evt.model.item.id;
        this.$.incentives.removeItem(id);
        this.removeIncentiveFromChangedList(id);
    },

    _handleUpdateIncentive: function(evt) {
        this.$.incentives.updateItem(evt.model.item);
    },

    _checkIfIsAtLeastOneIncentive: function(incentives) {
        return (incentives.length > 0);
    },

    _handleAddIncentive: function() {
        if(this.changedIncentives.length > 0) return alert('Je hebt nog ' + this.changedIncentives.length + ' niet opgeslagen belongen. Sla deze eerst op');
        var newIncentive = {
            title : null,
            minimumInvestment : 5,
            costs : 0,
            forBusiness : false,
            numberOfInvestors : 0,
            hasInvestors : false,
            hasStock : true,
            totalStock : 20,
            available : true,
            id : '5889c3195fe02',
            contractTypeId : this.campaignTypes[0].contractTypeId
        };
        this.$.incentives.addItem(newIncentive);
    },

    _handleIncentiveAdded: function() {
    },
    _handleIncentiveAddError: function() {
    },
    _handleIncentiveUpdated: function() {
    },
    _handleIncentiveUpdateLoading: function() {
    },
    _handleIncentiveUpdateError: function() {
    },
    _handleIncentiveDeleted: function() {
    },
    _handleIncentiveDeleteError: function() {
    },
    _incentiveChanged: function(evt, data) {
        if(!data.id) return;
        if(data.changed) this.push('changedIncentives', data.id);
        if(!data.changed) this.removeIncentiveFromChangedList(data.id);
    },

    removeIncentiveFromChangedList: function(id) {
        var index = this.changedIncentives.indexOf(id);
        if(index != -1) this.splice('changedIncentives', index, 1);
    }
});
