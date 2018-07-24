var Backbone = require('backbone');

var getTemplate = require('../../utils/getTemplate');

var HomeView = Backbone.View.extend({
  el: '#main',

  render: function() {
    var that = this;

    getTemplate('containers/HomePage/home.view.html').then(function(template) {
      that.$el.html(template({
        name: 'mink nq'
      }));
    });
  }
});

module.exports = HomeView;
