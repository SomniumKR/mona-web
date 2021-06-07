import { useEffect, memo, useState } from 'react';
import {
  selectWallet,
  updateConnection,
  updateWallet,
  selectChain,
  selectConnection,
  connectWalletProvider,
} from 'store/slices/web3';
import { useAppSelector, useAppDispatch } from 'hooks/store';
import { UpdateWalletParam } from 'types/web3';
import styled from '@emotion/styled';
import Button from 'components/Button/Button';
import { notify } from 'utils/notifications';
import { COLORS } from 'constants/colors';
import { css } from '@emotion/react';

const StyledButton = styled(Button)`
  height: 38px;
  width: 176px;
  font-size: 14px;
`;

function ConnectWallet() {
  const wallet = useAppSelector(selectWallet);
  const chain = useAppSelector(selectChain);
  const connection = useAppSelector(selectConnection);
  const [walletConnected, setWalletConnected] = useState(false);

  const dispatch = useAppDispatch();

  const updateWalletForSolletExtension = () => {
    const { sollet } = window as any;

    if (sollet) {
      const param: UpdateWalletParam = {
        provider: sollet,
        network: chain.endpoint,
      };
      dispatch(connectWalletProvider(param));
    } else {
      // notify 'no sollet extension'
    }
  };

  const connectWallet = async () => {
    const { sollet } = window as any;

    if (wallet && sollet) {
      await wallet.connect();
    } else {
      notify('Cannot find Sollet Extension');
    }
  };

  useEffect(() => {
    updateWalletForSolletExtension();
  }, [connection]);

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        if (wallet?.publicKey) {
          notify('Wallet connected !', { backgroundColor: COLORS.green01 });
          setWalletConnected(true);
        }
      });
    }

    if (!wallet || !wallet.connected) {
      setWalletConnected(false);
    }
  }, [wallet]);

  useEffect(() => {
    if (chain) {
      dispatch(updateConnection(chain.endpoint));
    }
  }, [chain]);

  return (
    <StyledButton
      type="button"
      onClick={connectWallet}
      redColor={!walletConnected}
      css={walletConnected && css`cursor: default`}
    >
      {walletConnected ? 'Connected' : 'Connect Wallet'}
    </StyledButton>
  );
}

export default memo(ConnectWallet);
