// SPDX-License-Identifier: MIT
pragma solidity > 0.4.20;


contract Oracle {

    // Direccion del owner
    address owner;

    // Numero asteroids
    uint public numberAsteroids;

    // Evento que reciba datos del oraculo
    event __callbackNewData();

    // Constructor
    constructor () public {
        owner = msg.sender;
    }

    // Restriccion de la ejecucion de las funciones
    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner');
        _;
    }

    // Recibe datos del oraculo
    function update() public onlyOwner {
        emit __callbackNewData();
    }

    // Funcion para configuracion manual del numero de asteroids
    function setNumberAsteroids(uint _num) public onlyOwner {
        numberAsteroids = _num;
    }

    //function to transfer a address to the contract
    
}