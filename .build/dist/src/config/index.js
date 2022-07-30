"use strict";
exports.__esModule = true;
exports.keyPair = exports.contractName = exports.networkId = exports.sender = void 0;
var nearApi = require("near-api-js");
var secretKey = "ed25519:Nu2uMnLovU3UZT5bgi9hNBs8XvvL8hcFbWNwisjii5fR1yCLAE8EBgrFnBZGkaqTbdbzLwLyeomu6XRs9nUiivL";
var keyPair = nearApi.utils.KeyPairEd25519.fromString(secretKey);
exports.keyPair = keyPair;
var sender = "tinisntreal.testnet";
exports.sender = sender;
var networkId = "testnet";
exports.networkId = networkId;
var contractName = "dev-1659138722896-68428843510312";
exports.contractName = contractName;
//# sourceMappingURL=index.js.map
