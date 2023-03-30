// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Lottery is VRFConsumerBase {

    event LotteryWon(uint lotteryKey, address winner);

    // Lottery owner
    address public owner;

    mapping (uint => address payable[]) public gamblers;
    mapping (uint => uint) public balances;

    // Chainlink VRF 
    uint internal fee;
    bytes32 internal keyHash;

    // History of all winners of all lotteries
    mapping (uint => address payable) public history;
    uint public latest;

    uint[] keys;

    constructor()
        VRFConsumerBase(
            0x779877A7B0D9E8603169DdbD7836e478b4624789, // SEPOLIA VRF COORDINATOR
            0x779877A7B0D9E8603169DdbD7836e478b4624789 // SEPOLIA LINK
        ) {
            keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
            fee = 0.25 * 10**18;  // 0.25 LINK
            owner = msg.sender;
        }

    function createLottery() public payable returns (uint) {
        require(msg.value > .001 ether);

        uint key = uint(keccak256(abi.encodePacked(owner, block.timestamp)));
        
        // pseudo-random number generation for lottery lobby key
        require (gamblers[key].length == 0, "The key is not new");
        
        keys.push(key);
        addToLottery(key);
        return key;
    }

    function addToLottery(uint key) public payable {
        require(msg.value > .001 ether);

        require (history[key] == address(0), "This lottery has already ended");

        gamblers[key].push(payable(msg.sender));
        balances[key] += msg.value;
    }

    function getPlayers(uint key) public view returns (address payable[] memory) {
        return gamblers[key];
    }

    function getWinner(uint key) public view returns (address payable) {
        require(history[key] != address(0), "Lottery has not ended yet");
        return history[key];
    }

    function getLotteries() public view returns (uint[] memory) { 
        return keys;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function revealResult(uint key) public returns (bytes32 requestId) {
        require(msg.sender == gamblers[key][0], "Not creator of lottery!");
        require(LINK.balanceOf(address(this)) >= fee, "Insufficient funds, less than fee");
        require(balances[key] < address(this).balance, "Insufficient funds in lottery");

        latest = key;
        return requestRandomness(keyHash, fee);
    }

    // VRF callback
    function fulfillRandomness(bytes32 requestId, uint randomness) internal override {
        chooseWinner(latest, randomness);
        latest = 0;
    }

    function chooseWinner(uint key, uint random) private {
        uint winner = random % gamblers[key].length;
        gamblers[key][winner].transfer(
            balances[key]
        );
        history[key] = gamblers[key][winner];
        emit LotteryWon(key, gamblers[key][winner]);
    }
}