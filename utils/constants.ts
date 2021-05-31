import { clusterApiUrl } from '@solana/web3.js';
import { Endpoint } from 'types/web3';

export const ENDPOINTS: Endpoint = {
  MainnetBeta: 'https://solana-api.projectserum.com/',
  Testnet: clusterApiUrl('testnet'),
  Devnet: clusterApiUrl('devnet'),
};
