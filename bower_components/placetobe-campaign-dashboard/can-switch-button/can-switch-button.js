Polymer({
    is: "can-switch-button",
    properties: {
        selectedValue: {
            type: String,
            notify: true,
            value: null
        }
    },
    attached: function() {
    	this._setDefaultValue();
    },

    _setDefaultValue: function() {
    	if(this.selectedValue) return;
    	var button =this.$$("iron-selector").querySelector("button");
    	var value = button.value;
    	this.set("selectedValue", value);
    }
});
