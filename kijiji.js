var nodeio = require('node.io')
var models = require('./models');

var methods = {
  input: false,
  run: function(){
    this.getHtml('kitchener.kijiji.ca/f-Classifieds-W0QQ',function(err,$){
      if (err) this.exit(err);

      //var titles = [];
      //var descriptions = [];
      //
      //var prices = [];
      //var links = [];

      //var primary = [];
      //var secondary = [];

      //var deals = [];
      
      $('tr.resultsTableSB td a').each(function(a){

        var deal = {};

        deal.title = a.text;
        deal.link = a.attribs.href;

        if (deal.title && deal.link){
          nodeio.scrape(function(){
            this.getHtml(deal.link, function(err, $){
              if (err) console.log(err);

              $('#attributeTable td').each(function(tr){
                if (tr.attribs.class!='first_col ' &&
                   tr.attribs.class!='first_row first_col ' &&
                   tr.attribs.class!='first_col first_row ' &&
                   tr.attribs.class!='first_row'){

                  deal.price = tr.children.first().text;
                  //console.log(deal);
                }

                //deals.push(deal);
                

                //this.emit(deal);
              });

            });
          });

          nodeio.scrape(function(){
            nodeio.scrape(function(){

              this.getHtml(deal.link, function(err, $){

                var desc = ''
                $('div#ad-desc span div').each(function(div){

                  desc += div.text;
                  
                  console.log(desc);

                  desc = ''
                });
              });
            });
          });

        }

          //var m_deal = models.Deal.create({
            //price:deal.price,
            //source:deal.title,
            //link:deal.link
          //});

          //m_deal.save(function(err, saved_deal){
            //console.log(saved_deal);
            
          //});

      });

      //this.emit(deals);
    });
  },
}

exports.job = new nodeio.Job({timeout:30}, methods);

