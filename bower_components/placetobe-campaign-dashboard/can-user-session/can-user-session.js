Polymer({
    is: 'can-user-session',
    properties: {
        token: {
            type: String,
            value: null
        },
        effectiveDate: {
            type: Date,
            value: null
        },
        expirationDate: {
            type: Date,
            value: null
        },
        userId: {
            type: String,
            value: null,
            notify: true
        },
        role: {
            type: String,
            value: null,
            notify: true
        },
        dashboardUrl: {
            type: String,
            value: null,
            notify: true
        },
        loginError: {
            type: Boolean,
            value: false,
            notify: true
        },
        guest: {
            type: Boolean,
            notify: true,
            computed: 'isGuest(role)',
        },
        ondernemer: {
            type: Boolean,
            notify: true,
            computed: 'isOndernemer(role)',
        },
        investor: {
            type: Boolean,
            notify: true,
            computed: 'isInvestor(role)',
        },
        accountmanager: {
            type: Boolean,
            notify: true,
            computed: 'isAccountManager(role)',
        },
        financialadministrator: {
            type: Boolean,
            notify: true,
            computed: 'isFinancialAdministrator(role)',
        },
        communicationsManager: {
            type: Boolean,
            notify: true,
            computed: 'isCommunicationsManager(role)',
        }
    },
    isGuest: function(role) {
        return (role == null);
    },
    isOndernemer: function (role) {
        return (role == 'ondernemer');
    },
    isInvestor: function (role) {
        return (role == 'investor');
    },
    isAccountManager: function (role) {
        return (role == 'accountmanager');
    },
    isFinancialAdministrator: function (role) {
        return (role == 'financialadministrator');
    },
    isCommunicationsManager: function (role) {
        return (role == 'communicationsmanager');
    },
    login: function (role, username, password) {
        var loginRequest = {
            userRole: role,
            username: username,
            password: password
        };
        this.$.authenticate.set('body', loginRequest);
        this.$.authenticate.send();
    },
    logout: function () {
        this.$.unauthenticate.send();
        this.unsetSessionStorage();
        this.unsetProperties();
        this.fireLoggedOutEvent();
        this.unsetWindowTimers();
    },
    unsetWindowTimers: function () {
        clearTimeout(window.timerWarning);
        clearTimeout(window.timer);
    },
    handleResponse: function (event, data) {
        data.dashboardUrl = this.createDashboardUrl(data.role, data.userId);
        this.setProperties(data);
        this.setSessionStorage(data);
        this.fireLoggedInEvent(data);
        this.startTokenExpirationChecker();
    },
    setProperties: function (data) {
        this.set('token', data.token);
        this.set('effectiveDate', data.effectiveDate);
        this.set('expirationDate', data.expirationDate);
        this.set('userId', data.userId);
        this.set('role', data.role);
        this.set('dashboardUrl', data.dashboardUrl);
    },
    unsetProperties: function () {
        this.set('token', null);
        this.set('effectiveDate', null);
        this.set('expirationDate', null);
        this.set('userId', null);
        this.set('role', null);
        this.set('dashboardUrl', null);
    },
    handleError: function () {
        this.set('loginError', true);
        this.fire('iron-signal', {name: 'login-error', data: null});
    },
    createDashboardUrl: function (role) {
        switch(role) {
        case 'ondernemer':
            return '/ondernemer/dashboard';
        case 'accountmanager':
            return '/accountmanager/dashboard';
        case 'financialadministrator':
            return '/financial-administrator/dashboard';
        case 'communicationsmanager':
            return '/communicationsmanager/dashboard';
        default:
            return '/investeerder/dashboard';
        }
    },
    fireLoggedInEvent: function (data) {
        this.fire('iron-signal', {name: 'logged-in', data: {
            token: data.token,
            effectiveDate: data.effectiveDate,
            expirationDate: data.expirationDate,
            userId: data.userId,
            role: data.role,
            dashboardUrl: data.dashboardUrl
        }});
    },
    fireLoggedOutEvent: function () {
        this.fire('iron-signal', {name: 'logged-out'});
    },
    handleSignalLoggedIn: function (evt, data) {
        this.setProperties(data);
        this.set('loginError', false);
    },
    handleSignalLogInError: function () {
        this.set('loginError', true);
    },
    handleSignalLoggedOut: function () {
        this.unsetProperties();
        this.unsetSessionStorage();
    },
    getSessionStorage: function () {
        var data = {
            token: window.localStorage.CanSessionToken,
            effectiveDate: window.localStorage.CanSessionEffectiveDate,
            expirationDate: window.localStorage.CanSessionExpirationDate,
            userId: window.localStorage.CanSessionUserId,
            role: window.localStorage.CanSessionUserRole,
            dashboardUrl: window.localStorage.CanSessionDashboardUrl
        };
        return data;
    },
    setSessionStorage: function (data) {
        try {
            window.localStorage.setItem('CanSessionToken', data.token);
            window.localStorage.setItem('CanSessionEffectiveDate', data.effectiveDate);
            window.localStorage.setItem('CanSessionExpirationDate', data.expirationDate);
            window.localStorage.setItem('CanSessionUserId', data.userId);
            window.localStorage.setItem('CanSessionUserRole', data.role);
            window.localStorage.setItem('CanSessionDashboardUrl', data.dashboardUrl);
        } catch(e) {
            alert('Het is niet gelukt om in te loggen. Mogelijk gebruik je de privémodus van je browser. Schakel privémodus uit en probeer het opnieuw.');
        }
    },
    unsetSessionStorage: function () {
        window.localStorage.setItem('CanSessionToken', null);
        window.localStorage.setItem('CanSessionEffectiveDate', null);
        window.localStorage.setItem('CanSessionExpirationDate', null);
        window.localStorage.setItem('CanSessionUserId', null);
        window.localStorage.setItem('CanSessionUserRole', null);
        window.localStorage.setItem('CanSessionDashboardUrl', null);
    },
    startTokenExpirationChecker: function () {
        var self = this;
        var minutesWarningAheadOfExpiration = 5;
        var tokenExpiresIn = (self.expirationDate - new Date().getTime() / 1000);
        var tokenWarningIn = (tokenExpiresIn - (minutesWarningAheadOfExpiration * 60));
        if (tokenExpiresIn >= 1) {
            this.unsetWindowTimers();
            window.timerWarning = window.setTimeout(function () {
                return alert('Je wordt over ' + minutesWarningAheadOfExpiration + ' minuten automatisch uitgelogd uit veiligheidsoverwegingen, sla je werk op en log opnieuw in.');
            }, tokenWarningIn * 1000);
            window.timer = window.setTimeout(function () {
                alert('Je bent automatisch uitgelogd uit veiligheidsoverwegingen, log opnieuw in.');
                return self.logout();
            }, tokenExpiresIn * 1000);
        }
    },
    attached: function () {
        var sessionTokenExpirationDate = parseInt(window.localStorage.CanSessionExpirationDate);
        var currentDate = new Date().getTime() / 1000;

        if (window.localStorage.CanSessionToken && (sessionTokenExpirationDate > currentDate)) {
            this.setProperties(this.getSessionStorage());
            this.startTokenExpirationChecker();
        } else {
            this.unsetSessionStorage();
            this.unsetProperties();
            this.fireLoggedOutEvent();
            this.unsetWindowTimers();
        }
    },

    _handleLogout: function() {
        window.localStorage.removeItem('CanSessionToken');
        window.localStorage.removeItem('CanSessionEffectiveDate');
        window.localStorage.removeItem('CanSessionExpirationDate');
        window.localStorage.removeItem('CanSessionUserId');
        window.localStorage.removeItem('CanSessionUserRole');
        window.localStorage.removeItem('CanSessionDashboardUrl');
    },

    clientIpChanged: function() {
        this.fireLoggedOutEvent();
        return location.reload();
    }
});
