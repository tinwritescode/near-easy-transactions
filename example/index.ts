import * as nearAPI from 'near-api-js'
import { contractName, networkId, keyPair, sender } from '../config'
import { signTransaction, sendTransaction, initRequirements } from '../modules';

const provider = new nearAPI.providers.JsonRpcProvider({
	url: `https://rpc.${networkId}.near.org`
});

((async () => {

	const { nonce, recentBlockHash } = await initRequirements({ provider, sender, publicKey: keyPair.getPublicKey() });

	const actions = [nearAPI.transactions.functionCall('set_greeting', Buffer.from(JSON.stringify({})), 10000000000000, 0
		// nearAPI.utils.format.parseNearAmount('0.1')
	)];

	const signedTransaction = signTransaction({
		actions,
		nonce,
		recentBlockHash,
		sender,
		contractName,
		keyPair
	})

	sendTransaction(provider, signedTransaction);
})())