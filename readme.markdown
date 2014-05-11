# Lane

This router is based on my [react-router-transition-example](https://github.com/Enome/react-router-transition-example). This router is mainly focussed on page transition although they are optional. The transition also respect `history.back` and `history.forward`.

## Usage

```js
var React = require('react');
var lane = require('lane');

var Page1 = React.createClass({});
var Page2 = ...
var Page3 = ...

var routes = [
  ['/', Page1, 'none'],
  ['/page2', Page2, 'overlay'],
  ['/page3', Page3, 'slidein' ],
];

React.renderComponent(<Lane routes={routes} debug={true}>, document.querySelector('body'));
```

### Route

A route is an array with 2 or 3 elements.

- route[0] = url
- route[1] = react component
- route[2] = transition name (optional)


### Props

- routes = array with routes
- debug = boolean (if true it will show you the classNames it expects on page changes and which transition object it generates for CSSTransitionGroup)


## How does it work?

Instead of having one transition for each new url/page this router generates a `transitionName` based on the previous and current page. So you use classes that describe going from one transition to an other. You can compare it to a finite state machine going from one state to an other and an event that gets fired depending on the previous and new state.

If we take the example from above and you visit `/` you go from transition name `''` -> `'none'`. The router will generate the `transitionName: '.none'`. Next it will check if `'.none-enter'` is defined in css. If it's not it will set `transitionEnter: false` same happens for `'.none-leave`. 

The `CSSTransitionGroup` could have the following props:

```js
{ 
  transitionName: '.none', 
  transitionEnter: true/false, // depending if you defined .none-enter
  transitionLeave: true/false  // depending if you defined .none-leave
}
```

If you go from `/` to `/page2` `transitionName: '.none-overlay'` is used:

```js
{ 
  transitionName: '.none-overlay', 
  transitionEnter: true/false, // depending if you defined .none-overlay-enter
  transitionLeave: true/false  // depending if you defined .none-overlay-leave
}
```

The css for going from none -> overlay and overlay -> none could be the following:

```css
@-webkit-keyframes none {
  0% { opacity: 1; }
  100% { opacity: 1; }
}

@-webkit-keyframes overlay {
  from { -webkit-transform: translate(0, 100%); }
  to { -webkit-transform: translate(0, 0); }
}

/* none -> overlay */

/* old component */
.none-overlay-leave {
  -webkit-animation: none 300ms;
}

/* new component */
.none-overlay-enter {
  -webkit-animation: overlay 300ms;
  z-index: 1;
}


/* overlay -> none */

/* old component */
.overlay-none-leave {
  -webkit-animation: overlay 300ms reverse;
}

/* new component */
.overlay-none-enter {
  -webkit-animation: none 300ms;
}
```

You might notice that the `none` animation goes from `opacity: 1` to `opacity: 1`. That because `CSSTransitionGroup` destroys the old component after [transitionend or animationend](https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionEvents.js#L28) event so we need to provide an animation that triggers it.
