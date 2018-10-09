Polymer({
    is: 'can-page-cover',
    properties: {
       /**
        * takes a URL of an image to display behind the content
        * @type: string
        */
        imageUrl: {
            type: String,
            value: null,
        },

       /**
        * takes a URL of an image to display behind the content
        * @type: string
        */
        imageUrls: {
            type: Array,
            value: [],
        },

        srcSet: {
            type: String,
            reflectToAttribute: true,
            computed: '_getSrcSet(imageUrls.*)'
        },

        hasImage: {
            type: Boolean,
            reflectToAttribute: true,
            computed: '_getHasImage(imageUrl, imageUrls.*)'
        },
        objectPosition: {
            type: String,
            value: 'center center'
        }

    },

    _getHasImage: function(imageUrl) {
        return (imageUrl && imageUrl.length > 0 || this.imageUrls.length >0);
    },

    _getSrcSet: function() {
        if(!this.imageUrls || this.imageUrls.length == 0) return null;
        var srcSet = this.imageUrls.join(', ');
        return srcSet;
    }
});
