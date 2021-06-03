import { useState, useCallback } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Header from 'components/Header';
import Logo from 'components/Logo';
import { HEADER_HEIGHT } from 'constants/styles';
import ConnectWallet from 'containers/ConnectWallet';
import Input from 'components/Input/Input';
import { anchorStyle } from 'styles';
import RadioButtonForm from 'components/Form/RadioButtonForm';
import { FilterStatus } from 'types/search';
import Accordian from 'components/Accordian/Accordian';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
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

const Aside = styled.aside`
  width: 356px;
  height: 100%;
`;

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
`;

export default function Index() {
  const [searchInputText, setSearchInputText] = useState('');
  const [statusFilterValue, setStatusFilterValue] = useState<FilterStatus>(null);

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

  const statusValues: FilterStatus[] = [
    'On Auction', 'New', 'End',
  ];

  const handleStatusFilter = useCallback((value: FilterStatus) => {
    setStatusFilterValue(value);
  }, []);

  const filterComponents = [
    {
      title: 'Status',
      component: <RadioButtonForm
        handleCheck={handleStatusFilter}
        values={statusValues}
        checkedValue={statusFilterValue}
      />,
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
        <MenuContainer>
          {NAVBAR_MENU_LIST.map((menu) => (
            <Link href={menu.link}>
              <StyledLink>
                {menu.title}
              </StyledLink>
            </Link>
          ))}
        </MenuContainer>
        <ConnectWallet />
      </Header>
      <MainContainer>
        <Aside>
          {filterComponents.map((filter) => (
            <Accordian title={filter.title}>
              {filter.component}
            </Accordian>
          ))}
        </Aside>
      </MainContainer>
    </Container>
  );
}
