import { css } from '@emotion/react';
import { COLORS } from 'constants/colors';

export const inputStyle = css`
  cursor: pointer;
  color: ${COLORS.black01};
  border-radius: 20px;
  padding: 4px 28px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 20px;

  &:focus {
    outline-color: ${COLORS.red01};
  }
`;
