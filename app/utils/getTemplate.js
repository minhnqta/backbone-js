var $ = require('jquery');
var _ = require('underscore');

function getTemplate(path, model) {
  return new Promise(function(resolve, reject) {
    $.get(path)
      .done(function(data) {
        resolve(_.template(data, model));
      })
      .fail(function(error) {
        reject(error);
      });
  });
}

module.exports = getTemplate;
