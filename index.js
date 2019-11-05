const redis = require("redis")
const client = redis.createClient();

const express = require('express')
const app = express()
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.on("error", function (err) {
    console.log("Error " + err);
});



app.get('/', function (req, res) {
  client.set("string key", "string val", redis.print);
  client.hset("hash key", "hashtest 1", "some value", redis.print);
  client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
  client.hkeys("hash key", function (err, replies) {
      console.log(replies.length + " replies:");
      replies.forEach(function (reply, i) {
          console.log("    " + i + ": " + reply);
      });
      client.quit();
  });
  res.send('Hello World')
})
app.listen(3000, () => {
  console.log('port in 3000')
})