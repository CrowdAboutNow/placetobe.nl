Polymer({
    is: "can-page-tabs",
    properties: {
        activeTab: {
            type: Number,
            value: 0,
            notify: true
        },
        tabsdata: {
            type: Array,
            notify: true,
            value: function () {
                return []
            }
        }
    },
    _getTabsData: function() {
        var activeTab = this.activeTab
        var childTabs = this._getChildTabs();
        return childTabs.map(function(childTab, tabIndex) {
            return {
                name: childTab.getAttribute('name'),
                requiresCompletion: childTab.requiresCompletion,
                isComplete: childTab.complete,
                isSelected: (tabIndex === activeTab),
                isDisabled: childTab.disabled
            }
        })
    },
    _setTabsData: function() {
        this.tabsdata = this._getTabsData()
    },
    _getChildTabs: function() {
        return Polymer.dom(this).querySelectorAll('can-page-tab');
    },
    updateTabs: function() {
        this._setTabsData()
    }
});
