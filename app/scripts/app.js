/*
Instructions:
(1) Refactor .forEach below to create a sequence of Promises that always resolves in the same
    order it was created.
  (a) Fetch each planet's JSON from the array of URLs in the search results.
  (b) Call createPlanetThumb on each planet's response data to add it to the page.
(2) Use developer tools to determine if the planets are being fetched in series or in parallel.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  //Helper function to show the search query.
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  //Helper function to create a planet thumbnail.
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  //XHR wrapped in a promise.
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  //Performs an XHR for a JSON and returns a parsed JSON response.
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  function buildPlanet(url){
    return getJSON(url).then(createPlanetThumb);
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    //Refactor this code!
    getJSON('../data/earth-like-results.json')
    .then(function(response) {
      // Set up placeholder for planet promises
      let planetPromises = Promise.resolve()
      // add the search header
      addSearchHeader(response.query)

      // for each result, generate and resolve the promises
      response.results.forEach(function(url) {
        planetPromises = planetPromises.then(buildPlanet(url))
      });
    });
  });
})(document);
