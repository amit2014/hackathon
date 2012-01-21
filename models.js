var Model = require('LazyBoy')

Model.create_connection({db:'hackathon'});

var Deal = Model.define("Deal", {
  "price" : Number,
  //"primary_type" : String,
  //"secondary_type" : String,

  "source" : String,

  //"location" : String,
  //"geolat" : Number,
  //"geolng" : Number,

  "link" : String,
  "desc" : String
});

Model.load()

exports.Deal = Deal;
