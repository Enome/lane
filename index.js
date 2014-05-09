/** @jsx React.DOM */

var page = require('page');
var Component = require('./component');

var router = {

  Component: Component,

  navigate: function (url) {
    return function () {
      page(url); 
    };
  },

};

module.exports = router;
