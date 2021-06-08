import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

// const solanaWeb3 = require('@solana/web3.js');
// const tokenProgram = require('@solana/spl-token');

const url = clusterApiUrl('devnet', true);
const connection = new Connection(url);

// eslint-disable-next-line camelcase
const TOKEN_PROGRAM_IDd = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATE_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const DEV_NFT_PUBLIC_KEY = new PublicKey('DsMH7yrL3uYrZy4LKyQQcqC6NvpA1mDuHqZeDCSgQyW5');
const DEV_PAYER_KEY = new PublicKey('6QyxcM7wAfPhLuZ6emGtnj4RcujViw77ieMurbScVWts');

const arr = Uint8Array.from([145, 138, 140, 252,
  133, 72, 75, 119, 205, 148, 247, 81, 16, 201,
  59, 81, 241, 44, 93, 40, 180, 253, 132, 228, 249,
  240, 61, 55, 238, 59, 176, 190, 80, 111, 50, 93, 175,
  189, 165, 191, 80, 184, 110, 232, 180, 104, 75, 211,
  156, 160, 243, 20, 107, 199, 19, 98, 22, 61, 118, 181, 45, 144, 250, 4]);
const devSigner = {
  publicKey: DEV_PAYER_KEY,
  secretKey: arr,
};

console.log(connection);
export const createMint = async () => {
  console.log('minting..');

  const token = await Token.createMint(
    connection,
    devSigner,
    DEV_NFT_PUBLIC_KEY,
    null,
    0,
    TOKEN_PROGRAM_IDd,
  );
  console.log('finish mint!');
  const acc = await token.createAccount(DEV_NFT_PUBLIC_KEY);
  //   try {
  //     token.setAuthority(
  //       DEV_NFT_PUBLIC_KEY,
  //       null,
  //       'MintTokens',
  //       devSigner,
  //       [],
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  console.log('finish!');
  console.log(acc);
  return acc.toBase58();
};
