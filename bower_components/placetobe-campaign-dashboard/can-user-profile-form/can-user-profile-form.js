Polymer({
    is: 'can-user-profile-form',
    properties: {
        role: {
            type: String,
            value: 'investor',
            notify: true
        },
        ondernemer: {
            type: Boolean,
            computed: '_getIsOndernemer(role)'
        },
        investor: {
            type: Boolean,
            computed: '_getIsInvestor(role)'
        },
        userId: {
            type: String
        },
        valid: {
            type: Boolean,
            notify: true
        },
        data: {
            type: Object,
            notify: true
        },
        readonly: {
            type: Boolean,
            value: false,
            notify: true
        },
        APIRoute: {
            type: String,
            computed: '_getAPIRoute(role, userId)'
        },
        businessEntities: {
            type: Object,
            value: [
                { label : 'Besloten vennootschap (BV)',   value: 'BV'},
                { label : 'Commanditaire vennootschap (CV)',   value: 'CV'},
                { label : 'Coöperatie',   value: 'Cooperatie'},
                { label : 'Natuurlijk persoon',   value: 'NP'},
                { label : 'Maatschap',   value: 'Maatschap'},
                { label : 'Naamloze vennootschap (NV)',   value: 'NV'},
                { label : 'Stichting',   value: 'Stichting'},
                { label : 'Vennootschap onder firma (VOF)',  value: 'VOF'},
                { label : 'Vereniging',  value: 'Vereniging'},
                { label : 'Kerkgenootschap',  value: 'Kerkgenootschap'}
            ],
        },
        isStocksCampaign: {
            type: Boolean,
            value: false
        },
        disabled: {
            type: Boolean,
            value: false,
            notify: true
        },
        disabledWarning: {
            type: String,
            value: 'Je kunt deze informatie niet wijzigen omdat je campagne is gestart.',
            notify: true
        }
    },

    _saveSuccess: function(evt, data) {
        this.fire('saved', data);
    },

    _saveFailed: function(evt, error) {
        this.fire('save-error', error);
    },

    _getAPIRoute: function(role, userId) {
        switch(role) {
        case 'investor':
            return 'investors/' + userId;
        case 'ondernemer':
            return 'entrepreneurs/' + userId + '/profile';
        }
    },
    _getIsOndernemer: function(role) {
        return (role == 'ondernemer');
    },

    _getIsInvestor: function(role) {
        return (role == 'investor');
    }

});
