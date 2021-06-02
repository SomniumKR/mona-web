import styled from '@emotion/styled';
import Header from 'components/Header';
import Logo from 'components/Logo';
import { HEADER_HEIGHT } from 'constants/styles';
import ConnectWallet from 'containers/ConnectWallet';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
`;

export default function Index() {
  return (
    <Container>
      <Header>
        <Logo height={HEADER_HEIGHT} />
        <ConnectWallet />
      </Header>
    </Container>
  );
}
