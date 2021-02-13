
import './App.css';
import Web3 from 'web3';



async function handleClick(e){    
  e.preventDefault();
  console.log('The link was clicked.');
  let result = await fetch("http://localhost:3001");
  let json = await result.json();
  console.log(json);
  let abi = [
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
  // const web3 = new Web3(
  //   "https://ropsten.infura.io/v3/ammmkmmj2kj3hh1ggff0ee864f8145ed"
  // );
  


  //https://ropsten.infura.io/v3/fb9c6bd97e0c43768c8ce95cb71dbd3c

  // const Web3 = require('web3');
  const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/fb9c6bd97e0c43768c8ce95cb71dbd3c");
  const web3 = new Web3(provider);
  web3.eth.net.isListening()
     .then(() => console.log('web3 is connected'))
     .catch(e => console.log('Wow. Something went wrong'));

  // //let web3 = new Web3('http://localhost:7545');
  // window.web3 = new Web3(Web3.currentProvider);
  // const contract = new window.web3.eth.Contract(abi);
  // const contract = new web3.Contract(abi);
  const contractAddress = "0xbF8360D77dACfCf01f1D27DA401A130bdd4B1274";
  
  const contract = new web3.eth.Contract(abi, contractAddress);
  // const contractInstance = new provider.eth.Contract(abi, contractAddress);
  //const contractInstance = new web3.eth.Contract(abi, contractAddress);
  // debugger;
  // const contractInstance = contract.at(contractAddress);

  // const transactionObject = {
  //   from: '0xbD16130C9aF2124F1eB89F44A76050285BB9f99D',
  //   gas: gasLimit,
  //   gasPrice: gasPriceInWei
  // };

  //[0x41, 0x42, 0x43, 0x44]//{ from: '0xbD16130C9aF2124F1eB89F44A76050285BB9f99D'}
  //'0x41424344'
  //[0x41, 0x42, 0x43, 0x44]
  contract.methods.setStock('0x41424344',15, 2000).call({ from: '0xbd16130c9af2124f1eb89f44a76050285bb9f99d'})
  // .then(console.log);
  
  // .then(console.log);
  .then(function (result) {console.log(result)});
  // .on('receipt', () => {
  //   console.log("Done");
  // })

    // contractInstance.setStock.me.sendTransaction('name', transactionObject, (error, result) => { // do something with error checking/result here 
    // });
}

function App() {

  return (
    <div className="App">
    
      <div>
        <button onClick={handleClick}> Click me</button>
      </div>
    </div>
  );
}

export default App;
