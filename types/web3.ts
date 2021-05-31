/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { PublicKey, Transaction } from '@solana/web3.js';
import { ENV as ChainID } from '@solana/spl-token-registry';

export interface WalletAdapter {
    publicKey: PublicKey;
    autoApprove: boolean;
    connected: boolean;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>;
    connect: () => Promise<any>;
    disconnect: () => any;
    on<T>(event: string, fn: () => void): this;
}

export enum WalletProviderUrl {
    SolletExtension = 'https://www.sollet.io/extension',
    Sollet = 'https://www.sollet.io',
    Solong = 'https://solongwallet.com',
    Solflare = 'https://solflare.com/access-wallet',
    MathWallet = 'https://mathwallet.org',
    Ledger = 'https://www.ledger.com',
    Phantom = 'https://phantom.app',
}

export type WalletProvider = {
    name: string;
    url: WalletProviderUrl;
    icon: string;
    adapter: WalletAdapter;
}

export type ENV =
  | 'mainnet-beta'
  | 'testnet'
  | 'devnet'

export type Endpoint = {
    MainnetBeta: string;
    Testnet: string;
    Devnet: string;
}
export type EndpointValueType = string;

export type Chain = {
    name: ENV,
    endpoint: EndpointValueType,
    chainID: ChainID,
}

export type UpdateWalletParam = {
    provider: () => void;
    network: string;
}
