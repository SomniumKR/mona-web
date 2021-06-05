import { useState, useCallback } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Logo from 'components/Logo';
import { HEADER_HEIGHT } from 'constants/styles';
import ConnectWallet from 'containers/ConnectWallet';
import Input from 'components/Input/Input';
import { anchorStyle } from 'styles';
import { COLORS } from 'constants/colors';

const Container = styled.div`
  width: 100%;
  min-width: 800px;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  padding: 11px 15px;
  box-sizing: border-box;
  align-items: center;
  border-bottom: solid 1px ${COLORS.grey01};
`;

const SearchInput = styled(Input)`
  width: 40%;
  height: 40px;
  min-width: 340px;
  max-width: 400px;
`;

const StyledLink = styled.a`
  ${anchorStyle}
`;

const MenuContainer = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-around;
`;

interface Props {
  handleSearchInputChange: (value: string) => void;
  searchInputText: string;
}

export default function Index({ handleSearchInputChange, searchInputText }: Props) {
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

  return (
    <Container>
      <Logo height={HEADER_HEIGHT} />
      <SearchInput handleChange={handleSearchInputChange} value={searchInputText} />
      <MenuContainer>
        {NAVBAR_MENU_LIST.map((menu) => (
          <Link href={menu.link}>
            <StyledLink>
              {menu.title}
            </StyledLink>
          </Link>
        ))}
      </MenuContainer>
      <ConnectWallet redColor />
    </Container>
  );
}
