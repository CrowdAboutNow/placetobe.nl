Polymer({
    is: "can-contracts-table",
    properties: {
        contracts: Array,
        currentContractId: {
            type: String,
            value: ""
        },
        activeRole: {
            type: String,
            value: null,
            notify: true
        }
    },
    _handleResponse: function(evt, data) {
        this.set("contracts", data);
    },
    _handleError: function(evt, error) {
        //alert("Error loading contracts table!")
    },
    _handlePDFError: function(evt, error) {
        alert("error!")
    },
    _downloadFile: function(evt) {
        this.set("currentContractId", evt.currentTarget.contractId);
        this.$$("#download-contract").send();
    }
});
