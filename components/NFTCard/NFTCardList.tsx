import { memo } from 'react';
import styled from '@emotion/styled';
import { NFT } from 'types/nft';
import { css } from '@emotion/react';
import NFTCard from './NFTCard';

interface Props {
    nftList: NFT[];
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

function NFTCardList({ nftList }: Props) {
  return (
    <Container>
      {nftList.map((nft) => <NFTCard nft={nft} css={css`margin: 0 14px 24px 0`} />)}
    </Container>
  );
}

export default memo(NFTCardList);
