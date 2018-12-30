const request = require('request'); 
const _ = require('lodash');
const config = require('./config');

var client_id = config.client_id; 
var client_secret = config.client_secret; 

// Verify authentication
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  

// Users top 10 artists
function getTopArtists() {
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
      
          // use the access token to access the Spotify Web API
          var token = body.access_token;
          var options = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            qs: {limit: 10},
            json: true
      
          };
          request.get(options, function(error, response, body) {
             const names = _.map(body.items, 'name'); 
             console.log(names);
          });
        }
      });
}

// Users top 10 tracks

function getTopTracks() {

}


module.exports = {
    getTopTracks, getTopArtists
}
