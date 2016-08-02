'use strict';

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    Promise = require('bluebird'),
    models = require('../db/models');

var Message = models.Message;
var Channel = models.Channel;


