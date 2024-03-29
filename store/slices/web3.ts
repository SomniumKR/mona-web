import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ENV as ChainID } from '@solana/spl-token-registry';
import Wallet from '@project-serum/sol-wallet-adapter';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';
import {
  Chain, UpdateWalletParam, WalletAdapter,
  EndpointValueType,
} from 'types/web3';
import { Connection } from '@solana/web3.js';
import { ENDPOINTS } from 'constants/web3';

export interface Web3State {
  wallet: WalletAdapter;
  connection: Connection;
  chain: Chain;
  walletConnected: boolean;
  status: 'success' | 'loading' | 'failed';
}

const initialState: Web3State = {
  wallet: null,
  connection: new Connection(ENDPOINTS.MainnetBeta, 'recent'),
  chain: {
    name: 'mainnet-beta',
    endpoint: ENDPOINTS.MainnetBeta,
    chainID: ChainID.MainnetBeta,
  },
  walletConnected: false,
  status: 'loading',
};

const hydrate = createAction<Web3State>(HYDRATE);

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    updateConnection: (state, action: PayloadAction<EndpointValueType>) => {
      const endpoint = action.payload;
      state.connection = new Connection(endpoint, 'recent');
    },
    connectWalletProvider: (state, action: PayloadAction<UpdateWalletParam>) => {
      const { provider, network } = action.payload;

      if (provider) {
        state.wallet = new Wallet(provider, network);
      } else {
        // TODO: notify 'no sollet extension'
        console.log('No sollet extension');
      }
    },
    updateWallet: (state, action: PayloadAction<WalletAdapter>) => {
      const wallet = action.payload;
      state.wallet = wallet;
      state.walletConnected = true;
    },
    updateChain: (state, action: PayloadAction<Chain>) => {
      const { name, endpoint, chainID } = action.payload;
      state.chain = { name, endpoint, chainID };
    },
    disconnectWallet: (state) => {
      state.walletConnected = false;
    },

  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...(action.payload as any),
      };
    });
    // TODO: Send transaction
  },
});

export const selectChain = (state: RootState) => state.web3.chain;
export const selectConnection = (state: RootState) => state.web3.connection;
export const selectWallet = (state: RootState) => state.web3.wallet;
export const selectWalletConnected = (state: RootState) => state.web3.walletConnected;

export const {
  updateWallet, updateChain, updateConnection, connectWalletProvider, disconnectWallet,
} = web3Slice.actions;

export default web3Slice.reducer;
