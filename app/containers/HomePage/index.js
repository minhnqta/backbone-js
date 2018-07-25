'use strict';

var Backbone = require('backbone');
var template = require('./home.view.hbs');
var Todo = require('../../models/Todo');

var HomeView = Backbone.View.extend({
  el: '#main',
  template,

  render: function() {
    var that = this;
    var todos = new Todo({
      idx: 455,
      value: 'valsd'
    });

    console.log(todos.get('idx'));

    that.$el.html(template({
      name: 'mink nq'
    }));

    return this;
  }
});

module.exports = HomeView;
