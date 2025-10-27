// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VibeRoomNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Room {
        string roomName;
        string colorTheme;
        string metadata;
        address creator;
        uint256 timestamp;
    }

    mapping(uint256 => Room) public rooms;
    
    event RoomMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string roomName
    );

    constructor() ERC721("VibeRoom", "VIBE") Ownable(msg.sender) {}

    function mintRoom(
        string memory roomName,
        string memory colorTheme,
        string memory metadata
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        
        rooms[tokenId] = Room({
            roomName: roomName,
            colorTheme: colorTheme,
            metadata: metadata,
            creator: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RoomMinted(msg.sender, tokenId, roomName);
        
        return tokenId;
    }

    function getRoomData(uint256 tokenId) public view returns (Room memory) {
        require(ownerOf(tokenId) != address(0), "Room does not exist");
        return rooms[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Override required functions
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
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
