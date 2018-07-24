var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  initialize: function() {
    Backbone.history.start({ pushState: true, root: '/' });
  },

  default: function() {

  }

});
