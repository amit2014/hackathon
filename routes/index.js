
/*
 * GET home page.
 */

exports.index = function(req, res){
  var httpAgent = require('http-agent');
  var jsdom = require('jsdom'),
      sys = require('sys');
      util = require('util');

  var agent = httpAgent.create('www.google.com', ['finance', 'news', 'images']);

  agent.addListener('next', function(err, agent){
    console.log('body of the current page', agent.body);
    console.log('Response of the current page', util.inspect(agent.respnse));

    agent.next();
  });

  agent.addListener('stop', function(err, agent){
    console.log('agent has stopped');
  });

  agent.start();

  res.render('index', { title: 'Express' })
};
