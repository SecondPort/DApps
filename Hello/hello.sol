// SPDX-License-Identifier: MIT
pragma solidity >0.6.0;

contract hello{

    string public message = "Hola mundo";
    uint[] list;


    //visulizacion del message en blockchain
    function getMessage()public view returns(string memory){
        return message;
    }

    //envio de un mensaje a la blockchain
    function setMessage(string memory _message)public{
        message = _message;
    }

    function fullGas()public returns(uint[] memory){
        for(uint i = 0; i < 100; i++){
            list.push(i);
        }
        return list;
    }

    //visualizar los valores que consumen mucho gas
    function seeValues()public view returns(uint[] memory){
        return list;
    }
}