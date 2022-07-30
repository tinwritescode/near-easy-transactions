import nearApi from 'near-api-js'

const secretKey = "ed25519:Nu2uMnLovU3UZT5bgi9hNBs8XvvL8hcFbWNwisjii5fR1yCLAE8EBgrFnBZGkaqTbdbzLwLyeomu6XRs9nUiivL";
const keyPair = nearApi.utils.KeyPairEd25519.fromString(secretKey);
const sender = 'tinisntreal.testnet'
const networkId = "testnet";
const contractName = "dev-1659138722896-68428843510312"

export {
	sender,
	networkId,
	contractName,
	keyPair
}