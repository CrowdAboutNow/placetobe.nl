Polymer({
    is: 'can-number',
    properties: {
        /**
         * shows a number
         */
        number: {
            type:Number,
            value: null
        },
        /**
         * shows an amount of euros with € sign and if it is a round number it will have a ,–
         */
        euros: {
            type: Number,
            value: null
        },
        /**
         * shows a percentage with a % sign
         */
        percentage: {
            type: Number,
            value: null
        },
        /**
         * The formatted string
         */
        formatted: {
            type: String,
            computed: '_format(number, euros, percentage, decimals)',
            value: ''
        },

        /**
         * The number of decimals
         */
        decimals: {
            type: Number,
            value: 0
        }
    },
    /**
     * Format a string based on the inputs.
     *
     * @param {string} number
     * @param {string} euros
     * @param {string} percentage
     * @return {string} The formatted string
     */
    _format: function (number, euros, percentage, decimals) {
        if (number !== null) return this.formatNumber(number, decimals);
        if (euros !== null) return this.formatEuros(euros);
        if (percentage !== null && percentage !== '') return this.formatPercentage(percentage , decimals);
    },
    /**
     * Format a number.
     *
     * @param {string} number
     * @return {string} The formatted string
     */
    formatNumber: function (number, decimals) {
        if (typeof number !== 'number') console.error(number, 'is not a number. can-number should be fed numbers, else it starts behaving erratically.');
        number = +number.toFixed(decimals);
        number = number.toLocaleString('nl-NL');
        return number;
    },
    /**
     * Format an amount of euros.
     *
     * @param {string} euros
     * @return {string} The formatted string
     */
    formatEuros: function (euros) {
        if(!this.decimals) this.set('decimals', 0);
        if (typeof euros !== 'number') console.error(euros, 'is not a number. can-number should be fed numbers, else it starts behaving erratically.');
        euros = accounting.formatMoney(euros, '€', this.decimals, '.', ',');
        // In order to delete the &nbsp; that is inserted we need to make a URIEncoded string out of it to do search and replace
        euros = encodeURIComponent(euros);
        euros = euros.replace('%C2%A0', '');
        euros = decodeURIComponent(euros);
        euros = euros.replace(',00', '');
        euros = euros.replace(' ', '');
        return euros;
    },
    /**
     * Format a percentage.
     *
     * @param {string} percentage
     * @return {string} The formatted string
     */
    formatPercentage: function (percentage, decimals) {
        if (typeof percentage !== 'number') console.error(percentage, 'is not a number. can-number should be fed numbers, else it starts behaving erratically.');
        percentage = +percentage.toFixed(decimals);
        percentage = percentage + '%';
        return percentage;
    }
});
