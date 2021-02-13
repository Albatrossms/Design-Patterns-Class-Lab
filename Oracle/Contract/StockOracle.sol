// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

contract StockOracle {
    // Contract owner
    address oracleOwner;
    
    // quote structure
    struct stock {
        uint price;
        uint volume;
    }
    
    // quotes by symbol
    mapping(bytes4 => stock) stockQuote;

    constructor(){
        oracleOwner = msg.sender;
    }
    
    
    modifier onlyOwner{
        require(
                msg.sender==oracleOwner,
                "Only Owner can call this"
            );
            _;
    }
    
    // Set the value of a stock 
    function setStock(bytes4 _symbol, uint _price, uint _volume) onlyOwner public {
        stock memory _stk;
        _stk.price = _price;
        _stk.volume = _volume;
        
        stockQuote[_symbol]=_stk;
    }
    
    // Get the value of a stock 
    function getStockPrice(bytes4 _symbol) public view returns (uint) {
        return stockQuote[_symbol].price;
    }
    
    // Get the value of volume traded for a stock 
    function getStockVolume(bytes4 _symbol) public view returns (uint) {
        return stockQuote[_symbol].volume;
    }
    
    function getValue() public pure returns(uint){
        return 13;
    }
    
}