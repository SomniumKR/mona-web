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

export const SFProTextFont = css`
  @font-face {
    font-family: 'SF-Pro-Text-Regular';
    src: url('/fonts/SF-Pro-Text-Regular.otf');
  }
  @font-face {
    font-family: 'SF-Pro-Text-Bold';
    src: url('/fonts/SF-Pro-Text-Bold.otf');
  }
  @font-face {
    font-family: 'SF-Pro-Text-Light';
    src: url('/fonts/SF-Pro-Text-Light.otf');
  }
`;
