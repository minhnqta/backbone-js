'use strict';

var Backbone = require('backbone');
var HomeView = require('./containers/HomePage');

var Router = Backbone.Router.extend({
  routes: {
    '': 'default'
  },

  initialize: function() {
    Backbone.history.start({ pushState: true, root: '/' });
  },

  default: function() {
    var view = new HomeView();

    view.render();
  }

});

module.exports = Router;
