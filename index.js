/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

const request = require('request'); 
const _ = require('lodash');
const spotifyApi = require('./lambda-functions/spotifyHandler');

// your application requests authorization
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

// Display Users top 10 spotify artists
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