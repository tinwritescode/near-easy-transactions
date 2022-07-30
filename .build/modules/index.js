var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  initRequirements: () => initRequirements,
  sendTransaction: () => sendTransaction,
  signTransaction: () => signTransaction
});
var nearAPI = __toModule(require("near-api-js"));
var import_js_sha256 = __toModule(require("js-sha256"));
var import_config = __toModule(require("../config"));
function signTransaction({ actions, nonce, recentBlockHash, sender, keyPair, contractName }) {
  const publicKey = keyPair.getPublicKey();
  const transaction = nearAPI.transactions.createTransaction(sender, publicKey, contractName, nonce, actions, recentBlockHash);
  const serializedTx = nearAPI.utils.serialize.serialize(nearAPI.transactions.SCHEMA, transaction);
  const serializedTxHash = new Uint8Array(import_js_sha256.default.sha256.array(serializedTx));
  const signature = keyPair.sign(serializedTxHash);
  const signedTransaction = new nearAPI.transactions.SignedTransaction({
    transaction,
    signature: new nearAPI.transactions.Signature({
      keyType: transaction.publicKey.keyType,
      data: signature.signature
    })
  });
  return signedTransaction;
}
async function sendTransaction(provider, signedTransaction) {
  try {
    const signedSerializedTx = signedTransaction.encode();
    const result = await provider.sendJsonRpc("broadcast_tx_commit", [
      Buffer.from(signedSerializedTx).toString("base64")
    ]);
    console.log("Transaction Results: ", JSON.stringify(result == null ? void 0 : result.transaction));
    console.log("------------------------------------------------------------------------");
    console.log("OPEN LINK BELOW to see transaction in NEAR Explorer!");
    console.log(`https://explorer.${import_config.networkId}.near.org/transactions/${result == null ? void 0 : result.transaction.hash}`);
    console.log("------------------------------------------------------------------------");
  } catch (error) {
    console.log(error);
  }
}
async function initRequirements({ provider, sender, publicKey }) {
  return new Promise(async (resolve, reject) => {
    const accessKey = await provider.query(`access_key/${sender}/${publicKey}`, "");
    if (accessKey.permission !== "FullAccess") {
      reject(new Error(`Account [ ${sender} ] does not have permission to send tokens using key: [ ${publicKey} ]`));
    }
    const nonce = ++accessKey.nonce;
    const recentBlockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash);
    resolve({ accessKey, nonce, recentBlockHash });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initRequirements,
  sendTransaction,
  signTransaction
});
//# sourceMappingURL=index.js.map
