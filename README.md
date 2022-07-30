# Near Easy Transactions

### Example
```ts
import * as nearAPI from 'near-api-js'
import { contractName, networkId, keyPair, sender } from '../src/config'
import { signTransaction, sendTransaction, initRequirements } from '../src/modules';

const provider = new nearAPI.providers.JsonRpcProvider({
	url: `https://rpc.${networkId}.near.org`
});

(async () => {
	const { nonce, recentBlockHash } = await initRequirements({ provider, sender, publicKey: keyPair.getPublicKey() });

	const actions = [nearAPI.transactions.functionCall('set_greeting', Buffer.from(JSON.stringify({text: 'hello from webview'})), 10000000000000, 0];

	const signedTransaction = signTransaction({
		actions,
		nonce,
		recentBlockHash,
		sender,
		contractName,
		keyPair
	})

	const transaction = await sendTransaction(provider, signedTransaction);

	console.log('transaction', transaction)
})()
```