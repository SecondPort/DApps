//https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
// SPDX-License-Identifier: MIT
pragma solidity >0.6.0;

contract Oracle {

    //direccion del owner
    address owner;

    //numero de asteroides
    uint public numberAsteroids;

    //eventos que reciba datos del oraculo
    event __callbackNewData();

    constructor() public {
        owner = msg.sender;
    }

    //restriccion de la ejecucion de la funcion
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    //funcion que recibe datos del oraculo
    function update()public onlyOwner{
        emit __callbackNewData();
    }

    //funcion para config manual para el numero de asteroides
    function setNumberAsteroids(uint _num)public onlyOwner{
        numberAsteroids = _num;
    }









}