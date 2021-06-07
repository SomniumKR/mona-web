import { useState, useCallback } from 'react';
import { InferGetServerSidePropsType } from 'next';
import styled from '@emotion/styled';
import Header from 'components/Header/Header';
import { HEADER_HEIGHT } from 'constants/styles';
import RadioButtonForm from 'components/Form/RadioButtonForm';
import { FilterCategory, FilterStatus } from 'types/search';
import Accordian from 'components/Accordian/Accordian';
import { COLORS } from 'constants/colors';
import { Heading01 } from 'components/Heading/Heading01';
import NFTCardList from 'components/NFTCard/NFTCardList';
import mockNftList from 'public/mocks/nft.json';
import axios from 'axios';
import { NFT } from 'types/nft';

const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  font-family: 'SF-Pro-Text-Regular';
`;

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Aside = styled.aside`
  width: 372px;
  height: calc(100vh - ${HEADER_HEIGHT});
  border-right: 1px solid ${COLORS.grey01};
`;

const Article = styled.article`
  width: calc(100% - 372px);
  height: calc(100% - ${HEADER_HEIGHT});
  box-sizing: border-box;
  padding: 24px 14px;
  overflow: auto;
`;

export default function Index(
  { fetchedNftList }: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [searchInputText, setSearchInputText] = useState('');
  const [statusFilterValue, setStatusFilterValue] = useState<FilterStatus>(null);
  const [categoryFilterValue, setCategoryFilterValue] = useState<FilterCategory>(null);

  const statusValues: FilterStatus[] = [
    'On Auction', 'New', 'End',
  ];

  const categoryValues: FilterCategory[] = [
    'Item (TBD)', 'Classic',
  ];

  const handleStatusFilter = useCallback((value: FilterStatus) => {
    setStatusFilterValue(value);
  }, []);

  const handleCategoryFilter = useCallback((value: FilterCategory) => {
    setCategoryFilterValue(value);
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
    {
      title: 'Category',
      component: <RadioButtonForm
        handleCheck={handleCategoryFilter}
        values={categoryValues}
        checkedValue={categoryFilterValue}
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
      <Header handleSearchInputChange={handleSearchInputChange} searchInputText={searchInputText} />
      <MainContainer>
        <Aside>
          {filterComponents.map((filter) => (
            <Accordian title={filter.title}>
              {filter.component}
            </Accordian>
          ))}
        </Aside>
        <Article>
          <Heading01>
            Marketplace
          </Heading01>
          {fetchedNftList && <NFTCardList nftList={fetchedNftList as NFT[]} /> }
        </Article>
      </MainContainer>
    </Container>
  );
}

export const getServerSideProps = async () => {
  // const res = await axios.get<NFT[]>('/mocks/nft.json');
  // const fetchedNftList = res.data;
  const fetchedNftList = mockNftList;

  return {
    props: {
      fetchedNftList,
    },
  };
};
