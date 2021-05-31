/* eslint-disable no-unused-vars */
import Wallet from '@project-serum/sol-wallet-adapter';
import type { PublicKey, Transaction } from '@solana/web3.js';

export function SolletExtensionAdapter(_, network) {
  const { sollet } = window as any;
  if (sollet) {
    return new Wallet(sollet, network);
  }

  return {
    on: () => {},
    connect: () => {
      // TODO: notify
      /*
      notify({
        message: 'Sollet Extension Error',
        description: 'Please install the Sollet Extension for Chrome',
      });
      */
    },
  };
}

export interface WalletAdapter {
  publicKey: PublicKey;
  autoApprove: boolean;
  connected: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>;
  connect: () => any;
  disconnect: () => any;
  on<T>(event: string, fn: () => void): this;
}
