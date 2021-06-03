import { memo } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import { NFT } from 'types/nft';

interface Props {
    nft: NFT;
}

const Container = styled.div`
  width: 23vw;
  min-width: 240px;
  height: calc(23vw * 1.08);
  min-height: calc(240px * 1.08);
  border: 1px solid ${COLORS.grey01};
  border-radius: 15px;
  box-sizing: border-box;
  padding: 33px 22px 28px 22px;
  margin: 0 14px 24px 0;
`;

const HolderContainer = styled.div`
  width: 100%;
`;

const Holder = styled.span`
  display: inline-block;
  font-family: 'SF-Pro-Text-Regular';
  font-size: 11px;
`;

function NFTCard({ nft }: Props) {
  return (
    <Container>
      <HolderContainer>
        <Holder>
          {nft.holder}
        </Holder>
      </HolderContainer>
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
    </Container>
  );
}

export default memo(NFTCard);
