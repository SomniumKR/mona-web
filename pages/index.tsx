import { useState, useCallback } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Header from 'components/Header';
import Logo from 'components/Logo';
import { HEADER_HEIGHT } from 'constants/styles';
import ConnectWallet from 'containers/ConnectWallet';
import Input from 'components/Input/Input';
import { anchorStyle } from 'styles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
`;

const SearchInput = styled(Input)`
  width: 40%;
  height: 40px;
  min-width: 480px;
  max-width: 600px;
`;

const StyledLink = styled.a`
  ${anchorStyle}
`;

const MenuContaner = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-around;
`;
export default function Index() {
  const [searchInputText, setSearchInputText] = useState('');

  const NAVBAR_MENU_LIST = [
    {
      title: 'Marketplace',
      link: '/index',
    },
    {
      title: 'Items',
      link: '/items',
    },
    {
      title: 'Docs',
      link: '/docs',
    },
  ];

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
        <MenuContaner>
          {NAVBAR_MENU_LIST.map((menu) => (
            <Link href={menu.link}>
              <StyledLink>
                {menu.title}
              </StyledLink>
            </Link>
          ))}
        </MenuContaner>
        <ConnectWallet />
      </Header>
    </Container>
  );
}
