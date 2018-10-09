Polymer({
    is: 'can-campaign-kvk-form',
    properties: {
        campaignId: {
            type: String,
            value: null
        },
        kvkData: {
            type: Object,
            notify: true,
            value: null
        },
        valid: {
            type: Boolean,
            notify: true,
            computed: '_hasKvk(kvkData.dataURI, kvkData.filename)'
        },
        isImage: {
            type: Boolean,
            notify: true,
            computed: '_computeIfIsImage(kvkData.dataURI)'
        },
        maximumFileSize: {
            type: Number,
            notify: true
        },
        disabledWarning: String,
        disabled: String,
        activeRole: {
            type: String,
            value: null,
            notify: true
        }
    },

    _hasKvk: function(dataURI, filename) {
        return (!!dataURI && !!filename);
    },

    _computeIfIsImage: function(dataURI) {
        if(!dataURI) return false;
        if(dataURI.split(':')[1].split('/')[0] == 'image') return true;
        return false;
    },

    _uploadFailed: function() {
        alert('Sorry, er is iets misgegaan met het uploaden van het bestand. Mogelijk is het bestand te groot.');
    }
});
