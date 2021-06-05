import { useState, useCallback } from 'react';
import { InferGetServerSidePropsType } from 'next';
import styled from '@emotion/styled';
import Header from 'components/Header/Header';
import mockNftList from 'public/mocks/nft.json';
import NFTDetail from 'components/NFTDetail/NFTDetail';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  font-family: 'SF-Pro-Text-Regular';
  margin: auto;
`;

export default function NFT({ nft }:
     InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [searchInputText, setSearchInputText] = useState('');
  const handleSearchInputChange = useCallback(
    (value: string) => {
      setSearchInputText(value);
    },
    [],
  );

  return (
    <Container>
      <Header handleSearchInputChange={handleSearchInputChange} searchInputText={searchInputText} />
      <NFTDetail nft={nft} />
    </Container>
  );
}

export const getServerSideProps = async (params) => {
  // const res = await axios.get<NFT>('endpoint/params.id');
  // const fetchedNft = res.data;
  const nft = mockNftList[0];

  return {
    props: {
      nft,
    },
  };
};
