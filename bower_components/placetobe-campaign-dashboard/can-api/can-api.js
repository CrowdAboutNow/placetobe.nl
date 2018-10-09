Polymer({
    is: 'can-api',
    properties: {
        method: String,
        activeRole: {
            type: String
        },
        route: {
            type: String,
        },
        requestheaders: {
            type: String,
            computed: 'getRequestHeaders(method, route, auth, accessToken, activeRole)'
        },
        apiEndpoint: {
            type: String,
            value: 'https://api.crowdaboutnow.nl/',
            notify: true,
        },
        userId: {
            type: String,
            notify: true
        },
        accessToken: {
            type: String,
            notify: true
        },
        url: {
            type: String,
            notify: true,
            computed: 'getApiURL(apiEndpoint, method, route)'
        },
        body: {
            type: Object,
            notify: true
        },
        error: {
            type: Object,
            notify: true
        },
        loggedIn: {
            type: Object,
            notify: true,
            computed: 'getLoggedIn(userToken, userId)'
        },
        auth: {
            type: Boolean,
            notify: true,
            value: false
        },
        contentType: {
            type: String,
            value: 'application/json'
        },
        handleAs: {
            type: String,
            value: 'json'
        },
        downloadFile: {
            type: Boolean,
            value: false,
            observer: 'downloadFileChanged'
        },
        lastResponse: {
            type: Object,
            notify: true
        },
        isAuto: {
            type: Boolean,
            computed: 'computeAuto(auto, auth, accessToken)'
        },
        auto: {
            type: Boolean,
            value: false
        },
        loading: {
            type: Boolean,
            value: true,
            notify: true
        },
        downloadedFilename: {
            type: String,
            value: 'filename.ext'
        },
        responseStatus: {
            type: Object,
            notify: true
        },
        tokenData: {
            type: Object,
        }
    },

    observers: [
        '_setUserId(tokenData.data.userId)'
    ],

    _setUserId(userId) {
        this.userId = userId;
    },

    downloadFileChanged: function () {
        if (this.downloadFile) {
            this.set('handleAs', 'arraybuffer');
        }
    },
    computeAuto: function (auto, auth) {
        if (auto && !auth) {
            return true;
        }
        if (auto && auth && this.accessToken) {
            return true;
        }
        if (auto && auth && !this.accessToken) {
            console.error('Tried getting an authorised URL without having a login token set.');
            return true;
        }
        return false;
    },
    send: function () {
        this._setStatusResponseObject('loading');
        this.$.ajax.generateRequest();
        return this.fire('request', {url: this.url, method: this.method, body: this.body});
    },
    _handleResponse: function (evt, data) {
        if (this.downloadFile) {
            return this._handleDownload(evt, data);
        }
        this._setStatusResponseObject('success');
        return this.fire('response', this.lastResponse || null);
    },
    _handleError: function (evt, data) {
        if (this.downloadFile) return this._handleDownloadError(evt, data);
        this._setStatusResponseObject('failed', 'Opslaan mislukt' + ((data.request.xhr.response && data.request.xhr.response.error[0]) ? ': '+data.request.xhr.response.error[0].message : ''));
        this.fire('error', data.request.xhr.response);
        if (data.request.xhr.response != null && (data.request.xhr.response.error[0].message == 'Access token not issued for this ip address')) {
            return this.fire('iron-signal', {name: 'ip-changed', data: data.request.xhr.response.error});   
        }
    },
    _handleDownload: function (evt, data) {
        var _self = this;
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('hidden', true);
        var blob = new Blob([data.xhr.response], {type: _self.contentType});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, _self.downloadedFilename);
        } else {
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = _self.downloadedFilename;
            a.click();
            setTimeout(function(){
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        }
        return this.fire('response', this.lastResponse || null);
    },
    _handleDownloadError: function () {
        alert('Het bestand kon niet worden gedownload');
    },
    getRequestHeaders: function (method, route, auth, activeRole) {
        if (!auth) return {};
        return {
            'authorization': 'Bearer ' + this.accessToken,
            'activeRole': this.activeRole
        };
    },
    getApiURL: function () {
        var apiurl = (this.apiEndpoint || 'https://api.crowdaboutnow.nl/') + this.route;
        apiurl.replace(':userId', this.userId);
        return apiurl;
    },
    getLoggedIn: function () {
        return !!(window.localStorage.CanSessionToken && this.userId);
    },
    _setStatusResponseObject: function(status, error) {
        if(this.method.toLowerCase() == 'get') return;
        this.set('responseStatus', {
            status: status,
            error: error,
            method: this.method.toLowerCase(),
            route: this.route
        });
    }
});
