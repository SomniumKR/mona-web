import { css } from '@emotion/react';
import { COLORS } from 'constants/colors';

export const anchorStyle = css`
  color: ${COLORS.black01}; 
  text-decoration: none; 
  outline: none;
  cursor: pointer;

  &:hover, &:active {
    text-decoration: none; 
    color: ${COLORS.black}; 
  }
`;
