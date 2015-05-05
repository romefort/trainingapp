var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://postgres:mysecretpassword@postgresql/postgres";

//this starts initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)

/* GET home page. */
router.get('/', function(req, res, next) {

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].theTime);
      res.render('index', { title: 'Hello from postgres: '+ result.rows[0].theTime });

      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });



});

module.exports = router;
