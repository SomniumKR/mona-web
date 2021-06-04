import { memo } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import { NFT } from 'types/nft';
import SolanaLogo from 'components/Icon/SolanaLogo';
import Link from 'next/link';
import { anchorStyle } from 'styles';

interface Props {
    nft: NFT;
}

const Container = styled.div`
  width: 23vw;
  min-width: 240px;
  max-width: 342px;
  height: calc(23vw * 1.08);
  min-height: calc(240px * 1.08);
  max-height: 372px;
  border: 1px solid ${COLORS.grey01};
  border-radius: 15px;
  box-sizing: border-box;
  padding: 33px 22px 28px 22px;
  margin: 0 14px 24px 0;
  white-space: nowrap;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 8px 12px 8px;
  box-sizing: border-box;
`;

const InfoContainer = styled(HeaderContainer)`
  padding: 0;
  justify-content: space-between;
  margin-top: 12px;
`;

const Holder = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  font-family: 'SF-Pro-Text-Regular';
  font-size: 11px;
`;

const Title = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  font-family: 'SF-Pro-Text-Regular';
  font-size: 14px;
  line-height: 22px;
`;

const Price = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  font-family: 'SF-Pro-Text-Regular';
  font-size: 18px;
  max-width: 60%;
`;

const LinkWrapper = styled(Link)`
  ${anchorStyle}
`;

function NFTCard({ nft }: Props) {
  return (
    <LinkWrapper href={`/${nft.address}`}>
      <Container>
        <HeaderContainer>
          <Holder>
            {nft.holder}
          </Holder>
        </HeaderContainer>
        <Image
          src={nft.imageUrl}
          alt={nft.title}
          width="298"
          height="188"
          css={css`
          border-radius: 5px;
          border: 1px solid ${COLORS.grey01};
        `}
        />
        <InfoContainer>
          <Title>
            {nft.title}
          </Title>
          <Price>
            <SolanaLogo style={{ marginRight: '6px' }} />
            {nft.price}
          </Price>
        </InfoContainer>
      </Container>
    </LinkWrapper>
  );
}

export default memo(NFTCard);
