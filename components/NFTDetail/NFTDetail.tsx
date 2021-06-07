import { memo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import Image from 'next/image';
import SolanaLogo from 'components/Icon/SolanaLogo';
import { Heading01 } from 'components/Heading/Heading01';
import Button from 'components/Button/Button';
import { NFT } from 'types/nft';

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

interface Props {
  nft: NFT;
}

function NFTDetail({ nft }: Props) {
  return (
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
      </Column>
      <Column css={css`
        width: 55%; 
        justify-content: space-between`}
      >
        <InfoContainer>
          <Heading01>
            Title of NFT:
            {' '}
            {nft.title}
          </Heading01>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Egestas at ullamcorper integer in elementum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Egestas at ullamcorper integer in elementum.
          </Paragraph>
        </InfoContainer>
        <PriceContainer>
          <Price>
            <SolanaLogo style={{ marginRight: '24px' }} />
            {nft.price}
          </Price>
          <StyledButton redColor>
            Buy Now
          </StyledButton>
          <StyledButton redColor>
            Place a Bid
          </StyledButton>
        </PriceContainer>
      </Column>
    </Container>
  );
}

export default memo(NFTDetail);
