var request = require('request')
    httpAgent = require('http-agent')
    jsdom = require('jsdom')

exports.index = function(req, res){

  url_scrapper();

  res.render('index');
};

function url_scrapper(){
  var rfd_scraps = [
    {
      method: 'GET',
      uri: 'groceries'
    }
  ];

  var agent = httpAgent.create('www.redflagdeals.com/in/waterloo-on/deals/c/', ['groceries?sort_by=distance']);

  agent.addListener('next', function(error, agent){
    if (error){
      console.log(error);
      return;
    }

    jsdom.env({
      html:agent.body,
      scripts:[
        'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      ]
    }, function(err, window){
      var $ = window.jQuery;

      $('div.offer_main').each(function(){
        console.log($('h3.merchant_name', $(this)).html());
        console.log($('time:last', $(this)).text());
      });

      agent.next();
    });

  });

  agent.addListener('stop', function(agent){
    console.log("agent has stoped");
  });


  agent.start();

};
