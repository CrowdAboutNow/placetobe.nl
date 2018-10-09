Polymer({
  is: 'can-page-tab',
  properties: {
    requiresCompletion: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
    },
    complete: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  observers: [
    "_updateParent(complete, disabled, requiresCompletion)"
  ],

  attached: function() {
    this._updateParent()
  },

  _updateParent: function() {
    Polymer.dom(this).parentNode.updateTabs();
  }
  
});
