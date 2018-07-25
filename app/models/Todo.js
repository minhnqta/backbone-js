var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  defaults: function() {
    return {
      idx: null,
      value: null,
    };
  }
});

module.exports = Todo;
