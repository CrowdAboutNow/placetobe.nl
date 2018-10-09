Polymer({
    is: 'can-page',
    properties: {
        /**
        * Show the sidebar on the right hand side that eats the content in the <section> tag
        * @type
        */
        sidebar: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        /**
        * Remove the header
        * @type
        */
        noHeader: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        /**
        * URL of the background of the cover
        */
        coverImageUrl: {
            type: String
        },
        /**
        * URLs of the backgrounds of the cover
        */
        coverImageUrls: {
            type: Array,
            value: [],
        },
        /**
        * URL of the embeddable vimeo video for the cover
        */
        coverVimeoUrl: {
            type: String
        },

        title: {
            type: String,
            value: null,
        },

        description: {
            type: String,
            value: 'CrowdAboutNow bestaat sinds 2009 en is één van de eerste crowdfundingplatforms van Nederland. Wij helpen ondernemers bij het vinden en activeren van hun crowd om zo hun plannen te realiseren.'
        },

        image: {
            type: String,
            value: 'https://crowdaboutnow.nl/apple-touch-icon-180x180.png'
        },

        exemptionNoticeImageHeight: {
            type: Number
        }

    },

    'observers': [
        'updateTopMargin(exemptionNoticeImageHeight)'
    ],

    updateTopMargin: function(exemptionNoticeImageHeight) {
        console.log(exemptionNoticeImageHeight);
    }
});
