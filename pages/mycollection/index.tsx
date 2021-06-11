import { useState, useCallback, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import styled from '@emotion/styled';
import Header from 'components/Header/Header';
import mockNftList from 'public/mocks/nft.json';
import { COLORS } from 'constants/colors';
import { Heading01 } from 'components/Heading/Heading01';
import { css } from '@emotion/react';
import Button from 'components/Button/Button';
import { Heading00 } from 'components/Heading/Heading00';
import Modal from 'components/Modal/Modal';
import CreateNFTForm from 'containers/CreateNFTForm';
import { useAppSelector } from 'hooks/store';
import { selectWallet, selectWalletConnected } from 'store/slices/web3';
import { localstorageNameForNFT } from 'constants/storage';
import { NFTInfoToSave } from 'types';
import { fetchBlobFromDataURL } from 'utils';
import { Heading04 } from 'components/Heading/Heading04';

const Container = styled.div`
  width: 100%;
  min-width: 600px;
  height: 100%;
  /* background-color: white; */
  box-sizing: border-box;
  font-family: 'SF-Pro-Text-Regular';
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: ${COLORS.grey02};
`;

const BoxContainer = styled.div`
  min-width: 1000px;
  width: 70%;
  display: flex;
  justify-content: space-evenly;
`;

const Box = styled.div`
  width: 460px;
  height: 365px;
  /* /* background-color: white; */
  border-radius: 30px; 
  border: 1px solid black;
  background-color: white;
  box-shadow: 0px -8px 16px  rgba(225, 225, 225, 0.18), 0px 16px 24px  rgba(55, 71, 79, 0.16);
  background-clip: padding-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 62px 0;
  box-sizing: border-box;
`;

export default function NFT({ nft }:
     InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [searchInputText, setSearchInputText] = useState('');
  const [savedNFTInfo, setSavedNFTInfo] = useState<NFTInfoToSave[]>([]);

  const wallet = useAppSelector(selectWallet);
  const walletConnected = useAppSelector(selectWalletConnected);

  const handleSearchInputChange = useCallback(
    (value: string) => {
      setSearchInputText(value);
    },
    [],
  );

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const toogleCreateButton = () => {
    setCreateModalOpen(!isCreateModalOpen);
  };

  const getSavedNFT = () => {
    if (wallet && walletConnected) {
      const NFTInfoString = localStorage.getItem(localstorageNameForNFT);

      if (NFTInfoString) {
        const NFTInfo = JSON.parse(NFTInfoString);
        setSavedNFTInfo([NFTInfo]);
      }
    }
  };

  const handleCreateNFT = (NFTInfo: NFTInfoToSave) => {
    setSavedNFTInfo([NFTInfo]);
  };

  useEffect(() => {
    getSavedNFT();
  }, [wallet, walletConnected]);

  return (
    <>
      <Container>
        <Header
          handleSearchInputChange={handleSearchInputChange}
          searchInputText={searchInputText}
        />
        <Heading00>
          My Collections
        </Heading00>
        <Paragraph>
          Here you can see the NFT collections you made!
        </Paragraph>
        <BoxContainer>
          <Box>
            <Heading00>
              🖼 🎧 🌏 👽 🔫 📮
            </Heading00>
            <Heading01 css={css`color: ${COLORS.grey02}`}>
              Create new NFT
            </Heading01>
            <Button redColor onClick={toogleCreateButton}>
              Create
            </Button>
          </Box>
          {Boolean(savedNFTInfo.length)
      && (
      <Box>
        <img src={fetchBlobFromDataURL(savedNFTInfo[0]?.file as string)} alt="sample" width="80%" height="auto" />
        <Heading04>
          {savedNFTInfo[0]?.name}
        </Heading04>
        <Button redColor>
          Sell this NFT
        </Button>
      </Box>
      )}
        </BoxContainer>
      </Container>
      <Modal isOpen={isCreateModalOpen}>
        <CreateNFTForm handleCancel={toogleCreateButton} handleCreateNFT={handleCreateNFT} />
      </Modal>
    </>
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
