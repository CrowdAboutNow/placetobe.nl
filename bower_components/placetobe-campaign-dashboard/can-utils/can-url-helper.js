Polymer({
    is: "can-url-helper",
    properties: {
        paramsString: {
            type: String,
            notify: true,
            observer: 'paramsStringChanged',
        },
        paramsObject: {
            type: Object,
            notify: true,

        },
        _dontReact: {
            type: Boolean,
            value: false
        }

    },

    observers: ['paramsObjectChanged(paramsObject.*)'],

    paramsStringChanged: function(paramsString) {
        if (this._dontReact) {
            return;
        }
        // console.log(paramsString);
        // if(!paramsString) return;
        // this.set('_dontReact', true);
        this.set('paramsObject', Qs.parse(this.paramsString));
        // this.set('_dontReact', false);

    },
    paramsObjectChanged: function(paramsObject) {
        // console.log(paramsObject);
        if (this._dontReact) {
            return;
        }
        if(paramsObject.length < 1) return
        var query = paramsObject.base;
        this.set('_dontReact', true);
        this.set('paramsString', Qs.stringify(query));
        this.set('_dontReact', false);
    }
});
