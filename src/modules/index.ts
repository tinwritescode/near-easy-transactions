import * as nearAPI from 'near-api-js'
import { Action, SignedTransaction } from 'near-api-js/lib/transaction';
import * as sha256 from 'js-sha256'
import { KeyPair, PublicKey } from 'near-api-js/lib/utils';
import { networkId } from '../config'
import { AccessKeyQuery } from '../models/types'

type SignedTransactionProps = {
	nonce: number
	actions: Action[]
	recentBlockHash: Buffer
	sender: string
	keyPair: KeyPair
	contractName: string
}

type RequirementProps = {
	provider: nearAPI.providers.JsonRpcProvider
	sender: string
	publicKey: PublicKey
}
type Requirements = {
	accessKey: AccessKeyQuery,
	nonce: number,
	recentBlockHash: Buffer
}

export function signTransaction({ actions, nonce, recentBlockHash, sender, keyPair, contractName }: SignedTransactionProps): SignedTransaction {
	const publicKey = keyPair.getPublicKey()

	// create transaction
	const transaction = nearAPI.transactions.createTransaction(
		sender,
		publicKey,
		contractName,
		nonce,
		actions,
		recentBlockHash
	);
	const serializedTx = nearAPI.utils.serialize.serialize(
		nearAPI.transactions.SCHEMA,
		transaction
	);
	const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
	const signature = keyPair.sign(serializedTxHash);

	// now we can sign the transaction :)
	const signedTransaction = new nearAPI.transactions.SignedTransaction({
		transaction,
		signature: new nearAPI.transactions.Signature({
			keyType: transaction.publicKey.keyType,
			data: signature.signature,
		}),
	});

	return signedTransaction;
}

export async function sendTransaction(provider: nearAPI.providers.JsonRpcProvider, signedTransaction: SignedTransaction): Promise<void> {
	// send the transaction!
	try {
		// encodes signed transaction to serialized Borsh (required for all transactions)
		const signedSerializedTx = signedTransaction.encode();

		// TODO: Correct type
		const result = await provider.sendJsonRpc("broadcast_tx_commit", [
			Buffer.from(signedSerializedTx).toString("base64"),
		]) as any;

		// console results :)
		console.log("Transaction Results: ", JSON.stringify(result?.transaction));
		console.log(
			"------------------------------------------------------------------------"
		);
		console.log("OPEN LINK BELOW to see transaction in NEAR Explorer!");
		console.log(
			`https://explorer.${networkId}.near.org/transactions/${result?.transaction.hash}`
		);
		console.log(
			"------------------------------------------------------------------------"
		);
	} catch (error) {
		console.log(error);
	}
}


export async function initRequirements({ provider, sender, publicKey }: RequirementProps) {
	return new Promise<Requirements>(async (resolve, reject) => {

		const accessKey = await provider.query<AccessKeyQuery>(
			`access_key/${sender}/${publicKey}`,
			"");

		// checks to make sure provided key is a full access key
		if (accessKey.permission !== "FullAccess") {
			reject(new Error(
				`Account [ ${sender} ] does not have permission to send tokens using key: [ ${publicKey} ]`
			))
		}

		const nonce = ++accessKey.nonce;

		const recentBlockHash = nearAPI.utils.serialize.base_decode(
			accessKey.block_hash
		);

		resolve({ accessKey, nonce, recentBlockHash })
	});
}