'use strict';

var Backbone = require('backbone');
var template = require('./home.view.hbs');

var HomeView = Backbone.View.extend({
  el: '#main',
  template,

  render: function() {
    var that = this;

    that.$el.html(template({
      name: 'mink nq'
    }));

    console.log(222);

    return this;
  }
});

module.exports = HomeView;
