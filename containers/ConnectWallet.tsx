import { useEffect, memo, ComponentProps } from 'react';
import {
  selectWallet, updateConnection, updateWallet, selectChain, selectConnection,
} from 'store/slices/web3';
import { useAppSelector, useAppDispatch } from 'hooks/store';
import { UpdateWalletParam } from 'types/web3';
import styled from '@emotion/styled';
import Button from 'components/Button/Button';

type ButtonProps = ComponentProps<typeof Button>;

interface Props extends ButtonProps {}

const StyledButton = styled(Button)`
  height: 38px;
  width: 176px;
  font-size: 14px;
`;

function ConnectWallet({ ...rest } : Props) {
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
    <StyledButton type="button" onClick={connectWallet} redColor {...rest}>
      Connect Wallet
    </StyledButton>
  );
}

export default memo(ConnectWallet);
