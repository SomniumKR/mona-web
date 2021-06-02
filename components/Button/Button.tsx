import React, { ButtonHTMLAttributes } from 'react';
import { colors, gradients } from 'constants/colors';
import { css } from '@emotion/react';
import { buttonStyle } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  redColor: boolean;
}

function Button(props: Props) {
  const { children, redColor, ...rest } = props;

  return (
    <button
      css={css`
        ${buttonStyle}
        background: ${redColor ? gradients.red : colors.white};
        color: ${redColor ? colors.white : colors.black01};
      `}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}

export default Button;
