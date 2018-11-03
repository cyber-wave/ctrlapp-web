var express = require('express');
var auth = require('./auth');
var router = express.Router();
var SecretarioDAO = require('../../models/secretario/secretarioDAO');