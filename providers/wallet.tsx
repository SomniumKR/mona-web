/* eslint-disable no-shadow */
import Wallet from '@project-serum/sol-wallet-adapter';
import { Button, Modal } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { notify } from 'utils/notification';
import { useConnectionConfig } from 'hooks/connection';
// import { useLocalStorageState } from 'hooks/localStorage';
import { SolletExtensionAdapter, WalletAdapter } from 'utils/wallet-adapters';

const ASSETS_URL = 'https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/';
export const WALLET_PROVIDERS = [
  {
    name: 'Sollet Extension',
    url: 'https://www.sollet.io/extension',
    icon: `${ASSETS_URL}/sollet.svg`,
    adapter: SolletExtensionAdapter as any,
  },
//   {
//     name: 'Sollet',
//     url: 'https://www.sollet.io',
//     icon: `${ASSETS_URL}sollet.svg`,
//   },
//   {
//     name: 'Solong',
//     url: 'https://solongwallet.com',
//     icon: `${ASSETS_URL}solong.png`,
//     adapter: SolongWalletAdapter,
//   },
//   {
//     name: 'Solflare',
//     url: 'https://solflare.com/access-wallet',
//     icon: `${ASSETS_URL}solflare.svg`,
//   },
//   {
//     name: 'MathWallet',
//     url: 'https://mathwallet.org',
//     icon: `${ASSETS_URL}mathwallet.svg`,
//   },
//   {
//     name: 'Ledger',
//     url: 'https://www.ledger.com',
//     icon: `${ASSETS_URL}ledger.svg`,
//     adapter: LedgerWalletAdapter,
//   },
//   {
//     name: 'Phantom',
//     url: 'https://phantom.app/',
//     icon: 'https://raydium.io/_nuxt/img/phantom.d9e3c61.png',
//     adapter: PhantomWalletAdapter,
//   },
];

export const WalletContext = React.createContext<{
  wallet: WalletAdapter | undefined;
  connected: boolean;
  select:() => void;
  provider: typeof WALLET_PROVIDERS[number] | undefined;
    }>({
      wallet: undefined,
      connected: false,
      select() {},
      provider: undefined,
    });

// eslint-disable-next-line react/prop-types
export function WalletProvider({ children = null as any }) {
  const { endpoint } = useConnectionConfig();

  const [autoConnect, setAutoConnect] = useState(false);
  const [providerUrl, setProviderUrl] = useState('');

  const provider = useMemo(
    () => WALLET_PROVIDERS.find(({ url }) => url === providerUrl),
    [providerUrl],
  );

  const wallet = useMemo(
    () => {
      if (provider) {
        return new (provider.adapter || Wallet)(
          providerUrl,
          endpoint,
        ) as WalletAdapter;
      }
    },
    [provider, providerUrl, endpoint],
  );

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        if (wallet.publicKey) {
          setConnected(true);
          const walletPublicKey = wallet.publicKey.toBase58();
          const keyToDisplay = walletPublicKey.length > 20
            ? `${walletPublicKey.substring(
              0,
              7,
            )}.....${walletPublicKey.substring(
              walletPublicKey.length - 7,
              walletPublicKey.length,
            )}`
            : walletPublicKey;

          notify({
            message: 'Wallet update',
            description: `Connected to wallet ${keyToDisplay}`,
          });
        }
      });

      wallet.on('disconnect', () => {
        setConnected(false);
        notify({
          message: 'Wallet update',
          description: 'Disconnected from wallet',
        });
      });
    }

    return () => {
      setConnected(false);
      if (wallet) {
        wallet.disconnect();
      }
    };
  }, [wallet]);

  useEffect(() => {
    if (wallet && autoConnect) {
      wallet.connect();
      setAutoConnect(false);
    }

    return () => {};
  }, [wallet, autoConnect]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const select = useCallback(() => setIsModalVisible(true), []);
  const close = useCallback(() => setIsModalVisible(false), []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        select,
        provider,
      }}
    >
      {children}
      <Modal
        title="Select Wallet"
        okText="Connect"
        visible={isModalVisible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={close}
        width={400}
      >
        {WALLET_PROVIDERS.map((walletProvider) => {
          const onClick = function () {
            setProviderUrl(walletProvider.url);
            setAutoConnect(true);
            close();
          };

          return (
            <WalletContext.Provider
              value={{
                wallet,
                connected,
                select,
                provider,
              }}
            >
              {children}
              <Modal
                title="Select Wallet"
                okText="Connect"
                visible={isModalVisible}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={close}
                width={400}
              >
                {WALLET_PROVIDERS.map((provider) => {
                  const onClick = function () {
                    setProviderUrl(provider.url);
                    setAutoConnect(true);
                    close();
                  };

                  return (
                    <Button
                      size="large"
                      type={providerUrl === provider.url ? 'primary' : 'ghost'}
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={onClick}
                      icon={(
                        <img
                          alt={`${provider.name}`}
                          width={20}
                          height={20}
                          src={provider.icon}
                          style={{ marginRight: 8 }}
                        />
                      )}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        marginBottom: 8,
                      }}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
              </Modal>
            </WalletContext.Provider>
          );
        })}
      </Modal>
    </WalletContext.Provider>
  );
}
