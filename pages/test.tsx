import { useEffect } from 'react';
import { ENV as ChainID } from '@solana/spl-token-registry';
import {
  selectWallet, updateConnection, updateWallet, selectChain, selectConnection, updateChain,
} from 'store/slices/web3';
import { useAppSelector, useAppDispatch } from 'hooks/store';
import { UpdateWalletParam } from 'types/web3';
import { ENDPOINTS } from 'utils/constants';
import { Chain } from '../types/web3';

export default function Test() {
  const wallet = useAppSelector(selectWallet);
  const chain = useAppSelector(selectChain);
  const connection = useAppSelector(selectConnection);

  const dispatch = useAppDispatch();

  const updateWalletForSolletExtension = () => {
    const { sollet } = window as any;

    if (sollet) {
      const param: UpdateWalletParam = {
        provider: sollet,
        network: chain.endpoint,
      };
      dispatch(updateWallet(param));
    } else {
      // notify 'no sollet extension'
      console.log('no sollet');
    }
  };

  const connectWallet = async () => {
    const { sollet } = window as any;

    if (wallet && sollet) {
      await wallet.connect();
    } else {
      console.log('no sollet');
    }
  };

  const updateChainNetwork = () => {
    const param: Chain = {
      name: 'devnet',
      endpoint: ENDPOINTS.Devnet,
      chainID: ChainID.Devnet,
    };

    dispatch(updateChain(param));
  };

  useEffect(() => {
    updateWalletForSolletExtension();
  }, [connection]);

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        if (wallet?.publicKey) {
          console.log('connected');
          const walletPublicKey = wallet.publicKey.toBase58();
          console.log('key : ', walletPublicKey);
        }
      });
    }
  }, [wallet]);

  useEffect(() => {
    if (chain) {
      dispatch(updateConnection(chain.endpoint));
    }
  }, [chain]);

  return (
    <>
      <button type="button" onClick={connectWallet}>Connect Wallet</button>
      <button type="button" onClick={updateChainNetwork}>Change Chain</button>
    </>
  );
}
