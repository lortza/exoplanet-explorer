/*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  // Helper function to create page heading
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  //Helper function to create a planet thumbnail.
  function createPlanetThumb(data) {
    var planetThumb = document.createElement('planet-thumb');
    for (var d in data) {
      planetThumb[d] = data[d];
    }
    home.appendChild(planetThumb);
  }

  //XHR wrapped in a promise
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  //A promise wrapped in a function that performs an XHR for
  // JSON and returns a parsed JSON response.
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');

    // Call the function/promise to get json
    getJSON('../data/earth-like-results.json')
    .then(function(response){
      // string a then to process the JSON
      addSearchHeader(response.query)
      // return the 1st piece of data
      return getJSON(response.results[0])
    })
    .catch(function(){
      // string a catch to process a failure
      throw Error('Search Request Error')
    })
    .then(createPlanetThumb)//processes data from the previous then
    .catch(function(error){
      // string a catch to handle errors
      addSearchHeader('unknown')
      console.log(error)
    })
  });
})(document);
