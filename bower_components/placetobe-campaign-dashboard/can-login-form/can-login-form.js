Polymer({
    is: 'can-login-form',
    properties: {
        userRole: {
            type: String,
            value: 'investor',
            notify: true
        },
        userRoleName: {
            type: String,
            computed: '_getUserRoleName(userRole, userRoles)',
            notify: true
        },
        email: {
            type: String,
            value: '',
            notify: true
        },
        password: {
            type: String,
            value: '',
            notify: true
        },
        userRoles: {
            type: Array,
            value: [
                { name : 'Investeerder', value: 'investor'},
                { name : 'Ondernemer', value: 'ondernemer'},
                { name : 'Accountmanager', value: 'accountmanager'},
                { name : 'FinancialAdministrator', value: 'financialadministrator'},
                { name : 'CommunicationsManager', value: 'communicationsmanager'},
            ],
        },
        hideUsertypeSelect: {
            type: Boolean,
            value: false,
            notify: true
        },
        loginError: {
            type: Boolean,
            value: false,
            notify: true
        },
        username: String
    },

    observers: [
        'hideLoginError(userRole, email, password)'
    ],

    loggedinHandler: function () {
        this.set('loggedin', true);
    },
    loginErrorHandler: function () {
        this.set('loginError', true);
    },

    hideLoginError: function() {
        this.set('loginError', false);
    },

    fireLoginRequest: function () {
        this.fire('request-login', {
            userRole: this.userRole,
            username: this.username,
            password: this.password
        });
    },
    _getUserRoleName: function(userRole, userRoles) {
        var selectedUserRole = userRole;
        return userRoles.filter(function(userRoleRecord) {
            return userRoleRecord.value == selectedUserRole;
        })[0].name;
    }
});
