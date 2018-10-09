Polymer({
    is: "can-campaign-contract-form",
        properties: {
            campaignId: {
                type: String,
                value: null
            },
            contractData: {
                type: Object,
                value: null
            },
            valid: {
                type: Boolean,
                notify: true,
                computed: "_hasContract(contractData.dataURI, contractData.filename)"
            },
            isImage: {
                type: Boolean,
                notify: true,
                computed: "_computeIfIsImage(contractData.dataURI)"
            },
            maximumFileSize: {
                type: Number,
                notify: true

            },
            disabled: Boolean,
            disabledWarning: String,
            activeRole: {
                type: String,
                value: null,
                notify: true
            }
        },

        _hasContract: function(dataURI, filename) {
            return (!!dataURI && !!filename)
        },

        _computeIfIsImage: function(dataURI) {
            if(!dataURI) return false;
            if(dataURI.split(":")[1].split("/")[0] == "image") return true;
            return false;
        },

        _uploadFailed: function() {
            alert("Sorry, er is iets misgegaan met het uploaden van het bestand. Mogelijk is het bestand te groot.")
        }
});
