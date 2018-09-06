Polymer({
    is: 'can-campaign-cover-form',
    properties: {
        campaignId: {
            type: String,
            value: null
        },
        coverData: {
            type: Object,
            value: null
        },
        valid: {
            type: Boolean,
            notify: true,
            computed: '_hasCoverImage(coverData.dataURI)'
        },
        maximumFileSize: {
            type: Number,
            notify: true
        },
        disabled: {
            type: Boolean,
            notify: true,
        },
        disabledWarning: String

    },

    _hasCoverImage: function(dataURI) {
        return (!!dataURI);
    },

    _uploadFailed: function() {
        alert('Sorry, er is iets misgegaan met het uploaden van het bestand. Mogelijk is het bestand te groot.');
    }
});
