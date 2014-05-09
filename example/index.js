/** @jsx React.DOM */

var React = require('react');
var lane = require('../');

/* PAGES */

var Page1 = React.createClass({

  render: function () {
    return (
      <div className='page page1'>
        <h1>Page 1</h1>
        <a onClick={lane.navigate('/page2')}>Page 2</a> <br />
        <a onClick={lane.navigate('/page3')}>Page 3</a>
      </div> 
    );
  },

});

var Page2 = React.createClass({

  render: function () {
    return (
      <div className='page page2'>
        <h1>Page 2</h1>
        <a onClick={lane.navigate('/')}>Page 1</a> <br />
        <a onClick={lane.navigate('/page3')}>Page 3</a>
      </div> 
    );
  },

});

var Page3 = React.createClass({

  render: function () {
    return (
      <div className='page page3'>
        <h1>Page 3</h1>
        <a onClick={lane.navigate('/')}>Page 1</a> <br />
        <a onClick={lane.navigate('/page2')}>Page 2</a>
      </div> 
    );
  },

});


/* Router */

var routes = [
  ['/', Page1, 'none'],
  ['/page2', Page2, 'overlay'],
  ['/page3', Page3, 'slidein' ],
];

React.renderComponent(lane.Component({ routes: routes, debug: true }), document.querySelector('body'));
