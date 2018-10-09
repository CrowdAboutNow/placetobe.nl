Polymer({
    is: "can-campaign-categories-list",
    properties: {
        selectedValues: {
            type: Array,
            value: [],
            notify: true
        },
        maxSelect: {
            type: Number,
            value: false,
            notify: true
        },
        options: {
            type: Array,
            value: [
                {label: "Cultuur", value: "Cultuur"},
                {label: "Media", value: "Media"},
                {label: "Horeca en Recreatie", value: "Horeca&Recreatie"},
                {label: "Duurzaamheid", value: "Duurzaamheid"},
                {label: "Food", value: "Food"},
                {label: "Fashion", value: "Fashion"},
                {label: "Handel", value: "Handel"},
                {label: "Design", value: "Design"},
                {label: "Detailhandel", value: "Detailhandel"},
                {label: "Onderwijs en Trainingen", value: "Onderwijs&Trainingen"},
                {label: "Bouw", value: "Bouw"},
                {label: "Logistiek", value: "Logistiek"},
                {label: "Dienstverlening", value: "Dienstverlening"},
                {label: "Gezondheidszorg", value: "Gezondheidszorg"},
                {label: "Agrarisch", value: "Agrarisch"},
                {label: "Innovatie", value: "Innovatie"},
                {label: "Internet en apps", value: "Internet en apps"},
                {label: "Ambachten", value: "Ambachten"},
                {label: "Wetenschap", value: "Wetenschap"},
                {label: "Buurt/Bewonersinitiatieven", value: "Buurt/Bewonersinitiatieven"},
                {label: "Overig", value: "Overig"},
                {label: "Sport", value: "Sport"},
                {label: "Beauty", value: "Beauty"}
            ]
        }
    },
    _checkMaxSelected: function(evt, data) {
        if(!this.maxSelect) return true;
        if(data.item.hasAttribute('enabled')) return true;
        if((this.selectedValues.length + 1) > this.maxSelect) {
            evt.preventDefault();
            alert("Je kunt maximaal " + this.maxSelect + " waarden selecteren");
            return false
        }
    },
    _mySort: function(a, b) {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1 ;
      return 0
    }
});
