import { useContext } from 'react';
import { WalletContext } from 'providers/wallet';

export function useWallet() {
  const {
    wallet, connected, provider, select,
  } = useContext(WalletContext);
  return {
    wallet,
    connected,
    provider,
    select,
    publicKey: wallet?.publicKey,
    connect() {
      // eslint-disable-next-line no-unused-expressions
      wallet ? wallet.connect() : select();
    },
    disconnect() {
      wallet?.disconnect();
    },
  };
}
