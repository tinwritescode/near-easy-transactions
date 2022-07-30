import { QueryResponseKind } from 'near-api-js/lib/providers/provider';

export interface AccessKeyQuery extends QueryResponseKind {
	permission: string;
	nonce: number;
}
export interface Transaction {
	actions: Action[];
	hash: string;
	nonce: number;
	public_key: string;
	receiver_id: string;
	signature: string;
	signer_id: string;
}

interface Action {
	FunctionCall: FunctionCall;
}

interface FunctionCall {
	args: string;
	deposit: string;
	gas: number;
	method_name: string;
}
