Polymer({
    is: 'can-location-selector',

    properties: {

        query: {
            type: String,
            observer: '_queryChanged'
        },
        
        geocode: {
            type: Object,
            notify: true,
            value: {
                lat: 52.0910391,
                lng: 5.132362199999989
            }
        },

        results: Array,

        options: {
            type: Array,
            computed: '_computeOptions(results.splices)'
        },


        noResults: {
            type: Array,
            computed: '_computeNoResults(results.splices)'
        },

        chosenAddress: {
            type: String,
            observer: '_focusOnMarker'
        },
        
        searchMapsString: String

    },


    _queryChanged: function() {
        this.set('results', []);
        this.set('geocode.lat', null);
        this.set('geocode.lng', null);
        this.set('chosenAddress', null);
        this.set('geocode', {});
    },

    _computeNoResults: function() {
        return !this.results || this.results.length < 1;
    },
    
    _computeOptions: function(resultsSplice) {
        var results = this.results;
        return results.map(function(result) {
            return {
                label: result.name,
                value: [result.latitude, result.longitude]
            }
        })
    },

    _focusOnMarker: function(chosenAddress) {
        if(!chosenAddress) return;
        var geo = chosenAddress.split(',');
        this.set('geocode', {
            lat: geo[0],
            lng: geo[1],
        });
        this.$$("google-map").fitToMarkers = true;
    },

    _searchGoogleMaps: function() {
        this.$$("#searchselector").set('query', this.$$('#searchMapsString').value);
        this.$$("#searchselector").search();
    },

    resizeModal: function() {
        this.fire('resizeModal');
    }
});
