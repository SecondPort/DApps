// SPDX-License-Identifier: MIT
pragma solidity >0.4.20;

import "../node_modules/@openzeppelin/contracts/interfaces/IERC165.sol";
import '../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../node_modules/@openzeppelin/contracts/utils/Address.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';
import '../node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
/*ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable  */

contract Color is ERC721, Ownable, ERC721Enumerable, ERC721URIStorage, ERC721Burnable{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string[] public colors;
    mapping (string => uint) public colorToTokenId;
    mapping (string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR") {}

    function safeMint(string memory _color) public onlyOwner {
        //uint256 tokenId = 1;
        require(!_colorExists[_color], "Color already exists");
        uint256 tokenId = _tokenIdCounter.current();
        colorToTokenId[_color] = tokenId;
        colors.push(_color);
        _colorExists[_color] = true;
        _tokenIdCounter.increment();
        _safeMint(msg.sender,tokenId);
        _setTokenURI(tokenId, _color);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

