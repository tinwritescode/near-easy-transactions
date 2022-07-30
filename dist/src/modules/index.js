"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.initRequirements = exports.sendTransaction = exports.signTransaction = void 0;
var nearAPI = require("near-api-js");
var sha256 = require("js-sha256");
var config_1 = require("../config");
function signTransaction(_a) {
    var actions = _a.actions, nonce = _a.nonce, recentBlockHash = _a.recentBlockHash, sender = _a.sender, keyPair = _a.keyPair, contractName = _a.contractName;
    var publicKey = keyPair.getPublicKey();
    // create transaction
    var transaction = nearAPI.transactions.createTransaction(sender, publicKey, contractName, nonce, actions, recentBlockHash);
    var serializedTx = nearAPI.utils.serialize.serialize(nearAPI.transactions.SCHEMA, transaction);
    var serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
    var signature = keyPair.sign(serializedTxHash);
    // now we can sign the transaction :)
    var signedTransaction = new nearAPI.transactions.SignedTransaction({
        transaction: transaction,
        signature: new nearAPI.transactions.Signature({
            keyType: transaction.publicKey.keyType,
            data: signature.signature
        })
    });
    return signedTransaction;
}
exports.signTransaction = signTransaction;
function sendTransaction(provider, signedTransaction) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var signedSerializedTx, result, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                signedSerializedTx = signedTransaction.encode();
                                return [4 /*yield*/, provider.sendJsonRpc("broadcast_tx_commit", [
                                        Buffer.from(signedSerializedTx).toString("base64"),
                                    ])];
                            case 1:
                                result = _a.sent();
                                // console results :)
                                console.log("Transaction Results: ", result.transaction);
                                console.log("https://explorer." + config_1.networkId + ".near.org/transactions/" + (result === null || result === void 0 ? void 0 : result.transaction.hash));
                                resolve(result.transaction);
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                reject(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.sendTransaction = sendTransaction;
function initRequirements(_a) {
    var provider = _a.provider, sender = _a.sender, publicKey = _a.publicKey;
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var accessKey, nonce, recentBlockHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, provider.query("access_key/" + sender + "/" + publicKey, "")];
                            case 1:
                                accessKey = _a.sent();
                                // checks to make sure provided key is a full access key
                                if (accessKey.permission !== "FullAccess") {
                                    reject(new Error("Account [ " + sender + " ] does not have permission to send tokens using key: [ " + publicKey + " ]"));
                                }
                                nonce = ++accessKey.nonce;
                                recentBlockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash);
                                resolve({ accessKey: accessKey, nonce: nonce, recentBlockHash: recentBlockHash });
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.initRequirements = initRequirements;
