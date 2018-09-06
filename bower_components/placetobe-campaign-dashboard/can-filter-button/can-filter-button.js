Polymer({
  is: 'can-filter-button',
  properties: {
    label: {
      type: String
    },
    value: {
      type: String
    },
    filter: {
      type: String
    },
    enabled: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true
    },
    disableToggle: {
        type: Boolean,
        value: false
    }
  },
  toggle: function() {
      if(this.disableToggle) return;
      this.enabled = (!this.enabled)
  }
});
