const request = require('sync-request');

module.exports = function () {
  let fruitName = 'apple ' + Date.now();

  var res = request(
    'POST',
    'http://localhost:8000/api/0.1/fruit',
    {
      json: {
        "name": fruitName,
        "description":"test",
        "price":"5"
      }
    }
  );

  return fruitName;
}