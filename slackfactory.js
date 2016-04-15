var request = require('request')
var token = 'xoxp-33696896116-33718237554-34763824660-87dbef8d67'
var dbGet = 'https://slack.com/api/'
var Promise = require('bluebird')
var queryStr;

var getUserInfo = function(UserId) {
  queryStr = dbGet + 'users.info?token=' + token + '&user=' + UserId + '&pretty=1';
  return new Promise(function(resolve) {
    request(queryStr, function(req, res) {
      var info = JSON.parse(res.body)
      resolve(info.user)
    })
  })
}

var getChannelInfo = function(ChannelId) {
  queryStr = dbGet + 'channels.info?token=' + token + '&channel=' + ChannelId + '&pretty=1';
  return new Promise(function(resolve) {
    request(queryStr, function(req, res) {
      var info = JSON.parse(res.body)
      resolve(info.channel)
    })
  })
}

var getTeamInfo = function(TeamId) {
  queryStr = dbGet + 'team.info?token=' + token + '&team=' + TeamId + '&pretty=1';
  return new Promise(function(resolve) {
    request(queryStr, function(req, res) {
      var info = JSON.parse(res.body)
      resolve(info.team)
    })
  })
}

module.exports = {
  getUserInfo: getUserInfo,
  getChannelInfo: getChannelInfo,
  getTeamInfo: getTeamInfo,
}
