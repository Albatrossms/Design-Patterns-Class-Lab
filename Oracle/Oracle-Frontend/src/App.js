
import './App.css';
import Web3 from 'web3';



async function handleClick(e){    
  e.preventDefault();
  console.log('The link was clicked.');
  let result = await fetch("http://localhost:3001");
  let StockJson = await result.json();
  
  console.log(StockJson.price);
  console.log(StockJson.volume);
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
    },
    {
      "inputs": [],
      "name": "getValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ];
  
  let web3 = new Web3('http://localhost:8545');
  const contractAddress = "0x2D112BEF5a87AeADb010B7140F30a8F3e80b877C";
  const ownerAddress = '0x7301971Cf55006F442604e05D8CF60CF0Dd553a2';
  
  const contract = new web3.eth.Contract(abi, contractAddress);
  
  contract.methods.setStock('0x41424344',parseInt(StockJson.price), parseInt(StockJson.volume)).send({ from: ownerAddress})
    .then(function (result) {console.log(result)});
    
  // const taskCount = contract.methods.getValue().call().then(function (result) {console.log(result)});
    
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
