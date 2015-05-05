var express = require('express');
var router = express.Router();

var redis = require("redis"),
        client = redis.createClient(process.env.REDIS_PORT_6379_TCP_PORT, process.env.REDIS_PORT_6379_TCP_ADDR, null);

/* GET home page. */
router.get('/', function(req, res, next) {
   client.set("foo_rand000000000000", "xOK!!!");

   // This will return a JavaScript String
   client.get("foo_rand000000000000", function (err, reply) {
       console.log(reply.toString()); // Will print `OK`
   });

  res.render('index', { title: 'Hello Hey Willkommen im Buro2.0' });
});

module.exports = router;
