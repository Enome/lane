var functions = {

  cache: [],

  getAllSelectors: function () { 

    if (functions.cache.length !== 0) {
      return functions.cache; 
    }

    for (var i = 0; i < document.styleSheets.length; i++) {

      var rules = document.styleSheets[i].rules || document.styleSheets[i].cssRules;

      for (var x in rules) {
        if (typeof rules[x].selectorText === 'string') {
          functions.cache.push(rules[x].selectorText);
        }
      }

    }

    return functions.cache;

  },

  selectorExists: function (selector) { 

    var selectors = functions.getAllSelectors();

    for (var i = 0; i < selectors.length; i++) {

      if (selectors[i] === selector) {
        return true;
      }

    }

    return false;

  }

};

module.exports = functions;
