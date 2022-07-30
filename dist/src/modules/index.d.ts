/// <reference types="node" />
import * as nearAPI from 'near-api-js';
import { Action, SignedTransaction } from 'near-api-js/lib/transaction';
import { KeyPair, PublicKey } from 'near-api-js/lib/utils';
import { AccessKeyQuery } from '../models/types';
declare type SignedTransactionProps = {
    nonce: number;
    actions: Action[];
    recentBlockHash: Buffer;
    sender: string;
    keyPair: KeyPair;
    contractName: string;
};
declare type RequirementProps = {
    provider: nearAPI.providers.JsonRpcProvider;
    sender: string;
    publicKey: PublicKey;
};
declare type Requirements = {
    accessKey: AccessKeyQuery;
    nonce: number;
    recentBlockHash: Buffer;
};
export declare function signTransaction({ actions, nonce, recentBlockHash, sender, keyPair, contractName }: SignedTransactionProps): SignedTransaction;
export declare function sendTransaction(provider: nearAPI.providers.JsonRpcProvider, signedTransaction: SignedTransaction): Promise<any>;
export declare function initRequirements({ provider, sender, publicKey }: RequirementProps): Promise<Requirements>;
export {};
