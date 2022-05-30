// SPDX-License-Identifier: MIT
pragma solidity >0.4.20;
pragma abicoder v2;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Poker is ERC20{

    ERC20 private _token;

    address private _owner;

    address private _contrato;

    //constructor de las variables privadas y funciones de la herencia de la clase ERC20
    constructor() ERC20("Poker", "POK") {
        _mint(msg.sender, 1000000000000000000000000000);
        _owner = msg.sender;
        _contrato = address(this);
    }

    function increaseTotalSupply(uint256 _cant)public{
        uint256 _t = totalSupply();
        _mint(msg.sender, _cant + _t);
    }

    function getOwner()public view returns (address){
        return _owner;
    }

    function getContract()public view returns (address){
        return _contrato;
    }

    function send_toke(address _to, uint256 _amount)public{
        transfer(_to, _amount);
    }

    //? obtener el balance de una direccion
    function balance_direccion(address _addr)public view returns (uint256){
        return balanceOf(_addr);
    }

    //function buy token
    function buy_token(uint256 _amount)public  payable{
        _transfer(_owner,msg.sender,_amount);
    }
}