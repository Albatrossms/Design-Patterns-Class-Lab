var express = require('express');
var router = express.Router();
var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3'); 

const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "_symbol",
				"type": "bytes4"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_volume",
				"type": "uint256"
			}
		],
		"name": "setStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "_symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "_symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockVolume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x119A2B4d82B034De4f0DfeEdeD6Be4FB5c82cF19";
const ownerAddress = "0x843E5a78aD29Ab22d2332733678a73D0d7C9a573";

const initPage = ()=>{
  // var tx = Tx;
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  //web3.eth.getAccounts(console.log);
  let contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
  console.log("contractinstance: "+contractInstance);

  const account = '0x843E5a78aD29Ab22d2332733678a73D0d7C9a573';
  const privateKey = Buffer.from('24695926c7922ec219d2d96dac36635aee02ec2221d4087ad0141a2cf155de7f', 'hex');
  const _newAddress = '0x5aB5E52245Fd4974499aa625709EE1F5A81c8157';
  // var TestContract = new web3.eth.Contract([YOUR_ABI], contractAddress);
  const _data = contractInstance.methods.getStockPrice("0x41424344").encodeABI();
  web3.eth.getTransactionCount(account).then(nonce => {
    console.log("nonce:"+ nonce);
    var rawTx = {
        nonce: nonce,
        gasPrice: '0x20000000000',
        gasLimit: '0x41409',
        to: contractAddress,
        value: 0,
        data: _data      
    }
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  initPage();
  res.render('index', { title: 'Express' });
});

module.exports = router;
