// Import web3.js library
const Web3 = require("web3");

// Create a new Web3 instance
const web3 = new Web3();

// Event object
const eventObject = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: "address",
      name: "user",
      type: "address",
    },
    {
      indexed: true,
      internalType: "address",
      name: "_partner",
      type: "address",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "amount",
      type: "uint256",
    },
  ],
  name: "SendBalance",
  type: "event",
};

// Calculate the hash of the event
const eventSignature = web3.eth.abi.encodeEventSignature(eventObject);
const eventHash = web3.utils.keccak256(eventSignature);

console.log("Event Signature:", eventSignature);
console.log("Event Hash:", eventHash);
