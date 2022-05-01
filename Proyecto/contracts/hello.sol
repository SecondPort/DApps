// SPDX-License-Identifier: MIT
pragma solidity >0.6.0;

contract hello{

    string public message = "Hola mundo";

    //visulizacion del message en blockchain
    function getMessage()public view returns(string memory){
        return message;
    }

    //envio de un mensaje a la blockchain
    function setMessage(string memory _message)public{
        message = _message;
    }
}