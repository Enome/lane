/** @jsx React.DOM */

var React = require('react/addons');
var page = require('page');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var functions = require('./functions');

var Component = React.createClass({

  previous_transition: '',

  /* LOGIC */

  generateClassName: function (from, to) {

    var c = '';

    if (from) {
      c += from + '-'; 
    }

    if (to) {
      c += to; 
    }

    return c;
    
  },

  generateTransition: function (class_name) {

    var transition = { transitionName: '', enter: false, leave: false };

    if (!class_name) {
      return transition; 
    }

    var leave = '.' + class_name + '-leave';
    var enter = '.' + class_name + '-enter';

    transition.leave = functions.selectorExists(leave);
    transition.enter = functions.selectorExists(enter);
    transition.transitionName = class_name;

    if (this.props.debug) {
      console.warn('leave css', leave);
      console.warn('enter enter', enter);
      console.warn('generated transition', transition);
    }

    return transition;

  },

  /* LIFECYCLE EVENTS */

  getDefaultProps: function () {
    return {
      base: ''
    };
  },

  componentDidMount: function () {

    var self = this;

    page.base(this.props.base);

    this.props.routes.forEach(function (route) {

      var url = route[0];
      var component = route[1];
      var transition = route[2];

      page(url, function (ctx) {

        self.setState({
          component: <component key={ctx.path} ctx={ctx} />, 
          transition: transition
        });
        
      });
      
    });

    page.start();

  },

  getInitialState: function () {
    return {
      component: <div />,
      transition: '',
    };
  },


  /* RENDER */

  render: function () {
    var class_name = this.generateClassName(this.previous_transition, this.state.transition);
    var transition = this.generateTransition(class_name);
    this.previous_transition = this.state.transition;

    return (
      <CSSTransitionGroup transitionName={transition.transitionName} transitionEnter={transition.enter} transitionLeave={transition.leave}>
        {this.state.component}
      </CSSTransitionGroup>
    );
  },

});

module.exports = Component;
