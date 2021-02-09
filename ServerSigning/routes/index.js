var express = require('express');
var router = express.Router();

const Web3 = require('web3'); 
const initPage = ()=>{
  var Tx = require('ethereumjs-tx').Transaction;
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  web3.eth.getAccounts(console.log);
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
