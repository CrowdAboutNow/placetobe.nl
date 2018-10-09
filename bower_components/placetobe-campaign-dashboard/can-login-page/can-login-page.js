Polymer({
    is: 'can-login-page',
    properties: {
        loggedin: {
            notify: true,
            type: Boolean
        },
        title: {
            type: String,
            value: 'Inloggen',
            computed: '_getTitle(loggedin)'
        },
        hidden: {
            type: Boolean,
            value: true,
            notify: true
        },
        dashboardUrl: {
            type: String
        },
        hideUsertypeSelect: {
            type: Boolean,
            value: false
        },
        userRole: {
            type: String
        },
        userRoleName: {
            type: String
        }
    },
    _getTitle: function() {
        return this.loggedin ? 'Dashboard' : 'Inloggen';
    },
});
