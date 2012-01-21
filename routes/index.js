var request = require('request')
  , httpAgent = require('http-agent')
  , models = require('../models')
  , gm = require('googlemaps')
  , util = require('util')
  , nodeio = require('node.io');

exports.index = function(req, res){
  deals = models.Deal.all(function(err, deals){
    res.render('index', {'deals':deals, 'deal':{}});
  });
};

exports.deals = function(req, res){
  var deal = {}
  deals = models.Deal.all(function(err, deals){
    for (var i=0; i < deals.length; i++){
      if (deals[i].id == req.params['id']){
        deal = deals[i];
      }
    } 
    res.render('index', {'deals':deals, 'deal':deal});
  });
}

exports.new_page = function(req, res){
  res.render('new', {});
}
