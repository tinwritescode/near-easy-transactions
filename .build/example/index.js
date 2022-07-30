var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var nearAPI = __toModule(require("near-api-js"));
var import_config = __toModule(require("../config"));
var import_modules = __toModule(require("../modules"));
const provider = new nearAPI.providers.JsonRpcProvider({
  url: `https://rpc.${import_config.networkId}.near.org`
});
(async () => {
  const { nonce, recentBlockHash } = await (0, import_modules.initRequirements)({ provider, sender: import_config.sender, publicKey: import_config.keyPair.getPublicKey() });
  const actions = [nearAPI.transactions.functionCall("set_greeting", Buffer.from(JSON.stringify({})), 1e13, 0)];
  const signedTransaction = (0, import_modules.signTransaction)({
    actions,
    nonce,
    recentBlockHash,
    sender: import_config.sender,
    contractName: import_config.contractName,
    keyPair: import_config.keyPair
  });
  (0, import_modules.sendTransaction)(provider, signedTransaction);
})();
//# sourceMappingURL=index.js.map
