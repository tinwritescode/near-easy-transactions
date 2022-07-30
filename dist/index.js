"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.initRequirements = exports.sendTransaction = exports.signTransaction = void 0;
// import * as nearAPI from 'near-api-js'
// import { contractName, networkId, keyPair, sender } from './config'
var modules_1 = require("./src/modules");
__createBinding(exports, modules_1, "signTransaction");
__createBinding(exports, modules_1, "sendTransaction");
__createBinding(exports, modules_1, "initRequirements");
// const provider = new nearAPI.providers.JsonRpcProvider({
// 	url: `https://rpc.${networkId}.near.org`
// });
// ((async () => {
// 	const { nonce, recentBlockHash } = await initRequirements({ provider, sender, publicKey: keyPair.getPublicKey() });
// 	const actions = [nearAPI.transactions.functionCall('set_greeting', Buffer.from(JSON.stringify({})), 10000000000000, 0
// 		// nearAPI.utils.format.parseNearAmount('0.1')
// 	)];
// 	const signedTransaction = signTransaction({
// 		actions,
// 		nonce,
// 		recentBlockHash,
// 		sender,
// 		contractName,
// 		keyPair
// 	})
// 	sendTransaction(provider, signedTransaction);
// })())
