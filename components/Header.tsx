import { memo } from 'react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from 'constants/styles';
import { COLORS } from 'constants/colors';

const Header = styled.header`
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

export default memo(Header);
