import styled from '@emotion/styled';
import Header from 'components/Header';
import Logo from 'components/Logo';
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
        <Logo height="62px" />
        <ConnectWallet />
      </Header>
    </Container>
  );
}
