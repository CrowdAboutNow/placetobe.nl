Polymer({
    is: "can-date",
    properties: {
        /**
         * The date to parse
         */
    	value: String,
        /**
         * The formatted date
         */
    	formattedDate: {
    		type: String,
    		computed: "_getFormattedDate(value)"
    	},
        /**
         * The format for the date
         */
    	format: {
    		type: String,
    		value: "dd D MMMM YYYY"
    	},
        /**
         * The inputted format for the date (so moment can comprende)
         */
        inputFormat: {
            type: String,
            value: null
        },
        /**
         * The locale so mement knows where we live
         */
        locale: {
            type: String,
            value: "nl"
        }
    },
    /**
     * Format the date
     */
    _getFormattedDate: function() {
        // if(this.inputFormat) return moment(this.value, this.inputFormat).locale(this.locale).format(this.format);
    	return moment(this.value, this.inputFormat).locale(this.locale).format(this.format);
    }
})
