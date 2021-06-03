import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Header from 'components/Header';
import Logo from 'components/Logo';
import { HEADER_HEIGHT } from 'constants/styles';
import ConnectWallet from 'containers/ConnectWallet';
import Input from 'components/Input/Input';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
`;

const SearchInput = styled(Input)`
  width: 40%;
  min-width: 480px;
  max-width: 600px;
`;

export default function Index() {
  const [searchInputText, setSearchInputText] = useState('');

  const handleSearchInputChange = useCallback(
    (value: string) => {
      setSearchInputText(value);
    },
    [],
  );

  return (
    <Container>
      <Header>
        <Logo height={HEADER_HEIGHT} />
        <SearchInput handleChange={handleSearchInputChange} value={searchInputText} />
        <ConnectWallet />
      </Header>
    </Container>
  );
}
