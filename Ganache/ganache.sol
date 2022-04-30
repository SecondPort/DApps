// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

contract ganache{

    string message = "";
    uint[] list;

    //publicar un mensaje en la cadena de bloques
    function setMessage(string memory _message)public{
        message = _message;
    }

    //funcion de visualizar el mensaje de la cadena de bloques
    function getMessage()public view returns(string memory){
        return message;
    }
}