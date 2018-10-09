Polymer({
    is: 'can-selectbox',
    properties: {
        type: {
            type: String,
            value: 'text',
        },
        placeholder: {
            type: String,
        },
        name: {
            type: String,
        },
        required: {
            type: Boolean
        },
        value: {
            type: String,
            notify: true,
            reflectToAttribute: true,
            observer: 'valueChangeHandler'
        },
        options: {
            type: Array,
            notify: true,
            value: [],
        },
        disabled: Boolean

    },

    observers: [
        'updateOptions(options.*)'
    ],

    listeners: {
        'change': 'selectChangeHandler'
    },

    selectChangeHandler: function(evt) {
        var index = this.$$('select').selectedIndex;
        var value = this.$$('select').options[index].value;
        this.set('value', value);
    },

    valueChangeHandler: function(value) {
        var selectedIndex = 0;
        $options = this.$$('select').options;
        for(var i=0;i<$options.length;i++) {
            if($options[i].value == value) {
                selectedIndex = i;
                $options[i].setAttribute('selected', 'selected');
            } else {
                $options[i].removeAttribute('selected');
            }
        }
    },

    updateOptions: function() {
        var options = this.options;
        var self = this;
        $selectbox = this.$$('select');
        $selectbox.innerHTML = '';
        this.options.map(function(option, index) {
            $option = document.createElement('option');
            $option.setAttribute('value', option.value);
            $option.innerHTML = option.name;
            $selectbox.appendChild($option);
        });
    }
});
