import { memo, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import Image from 'next/image';
import SolanaLogo from 'components/Icon/SolanaLogo';
import { Heading01 } from 'components/Heading/Heading01';
import Button from 'components/Button/Button';
import { NFT } from 'types/nft';
import { Heading02 } from 'components/Heading/Heading02';
import Modal from 'components/Modal/Modal';
import { Heading04 } from '../Heading/Heading04';

const Container = styled.div`
  width: 83vw;
  min-width: 800px;
  max-width: 1200px;
  height: calc(83vw * 0.45);
  min-height: calc(800px * 0.45);
  max-height: calc(1200px * 0.45);
  background-color: white;
  box-sizing: border-box;
  padding: 40px 34px;
  display: flex;
  justify-content: space-between;
  margin: auto;
`;

const Column = styled.div`
  width: 42%;
  display: flex;
  flex-direction: column;
  font-family: 'SF-Pro-Text-Regular';
  white-space: nowrap;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BiddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  border: 1px solid ${COLORS.grey02};
  padding: 16px 24px;
  margin: 24px 0;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Span = styled.span`
  display: inline-block;
  font-family: 'SF-Pro-Text-Regular';
  font-size: clamp(8px, 1.2vw, 13px);
  line-height: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Price = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  font-family: 'SF-Pro-Text-Regular';
  font-size: 18px;
  max-width: 60%;
  margin-right: 56px;
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  padding: 9px 20px;
  border: 1px solid ${COLORS.grey01};
  &:last-child {
    margin-left: 14px;
  }
`;

const Paragraph = styled.p`
  white-space: initial;
  line-height: 19px;
  font-family: 'SF-Pro-Text-Light';
  font-size: clamp(12px, 1.3vw, 16px);
  color: ${COLORS.grey02};
`;

const ItemBox = styled.div`
    width: 300px;
    height: 200px;
    margin: 20% auto;
    border-radius: 40px;
    padding: 24px 16px;
    background-color: white;
`;

interface Props {
  nft: NFT;
}

function NFTDetail({ nft }: Props) {
  const [isItemeModalOpen, setItemModalOpen] = useState(false);
  const [isHiddenHistory, setHiddenHistory] = useState(false);

  const toggleItemModal = () => {
    setItemModalOpen(!isItemeModalOpen);
  };

  const biddingHistory = [
    {
      usdc: '⭐️190',
      bidder: 'CKdMBUE5AypGfwKThdCBkzQkfYGrTWLP8MK6y8vbw5ri',
    },
    {
      usdc: '150',
      bidder: 'BFzxoDz5AypGfwKThdCBkzQkfYGrTWLZCoPPy8vbwZXM',
    },
    {
      usdc: '100',
      bidder: 'YpGfwdThdypGfwKThdCdkzQkfYSDCZXCXVXCVy8vbaOd',
    },
  ];

  return (
    <>
      <Container>
        <Column>
          <Image
            src={nft.imageUrl}
            alt={nft.title}
            width="480"
            height="370"
            css={css`
          border-radius: 10px;
        `}
          />
          <Row>
            <Image src="/images/icons/award.svg" alt="award" width="32" height="32" />
            <Span css={css`
            color: ${COLORS.grey02};
            font-size: clamp(8px, 1.1vw, 14px);
            width: 56px;
          `}
            >
              creator
            </Span>
            <Span>
              {nft.creator}
            </Span>
          </Row>
          <Row>
            <Heading04>Due Date : 2021.06.14. 21:00</Heading04>
          </Row>
        </Column>
        <Column css={css`
        width: 55%; 
        justify-content: space-between`}
        >
          <InfoContainer>
            <Heading01>
              {nft.title}
            </Heading01>
            <Paragraph>
              Picture of the gray road in Paris in 1980
            </Paragraph>
            <BiddingContainer>
              <Heading02>
                Bidding History
              </Heading02>
              {isHiddenHistory ? (
                <>
                  <Image src="/images/cloud.svg" alt="clooud" width="400" height="300" />
                  <Heading04 css={css`text-align: center`}>Hidden by Item</Heading04>
                </>
              ) : (
                <>
                  {biddingHistory.map((bidding) => (
                    <Heading04 key={bidding.usdc}>
                      <span css={css`font-family: 'SF-Pro-Text-Bold'`}>
                        {bidding.usdc}
                        {' '}
                        USDC
                        {' '}
                      </span>
                      by
                      {' '}
                      {bidding.bidder}
                    </Heading04>
                  ))}
                </>
              )}
            </BiddingContainer>
          </InfoContainer>
          <PriceContainer>
            {/* <Price>
              <SolanaLogo style={{ marginRight: '24px' }} />
              {nft.price}
            </Price> */}
            <StyledButton redColor>
              Buy Now
            </StyledButton>
            <StyledButton redColor>
              Place a Bid
            </StyledButton>
            <StyledButton redColor={false} css={css`border: 1px solid ${COLORS.red01}`} onClick={toggleItemModal}>
              Use Items
            </StyledButton>
          </PriceContainer>
        </Column>
      </Container>
      <Modal isOpen={isItemeModalOpen}>
        <ItemBox>
          <Heading02 css={css`border-bottom: 5px solid black; width: 42%; margin: 0 auto 24px`}>
            Use Items
          </Heading02>
          <Button
            redColor={false}
            onClick={() => { toggleItemModal(); setHiddenHistory(true); }}
            css={css`width: 80%; margin-bottom: 16px`}
          >
            <Heading04>☁️ Hide Bidding History</Heading04>
          </Button>
          <Button
            redColor={false}
            onClick={() => { toggleItemModal(); setHiddenHistory(false); }}
            css={css`width: 80%`}
          >
            <Heading04>🦋 Clear Items</Heading04>
          </Button>
        </ItemBox>
      </Modal>
    </>
  );
}

export default memo(NFTDetail);
