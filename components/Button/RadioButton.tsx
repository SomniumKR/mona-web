import React, { ButtonHTMLAttributes } from 'react';
import { COLORS, GRADIENTS } from 'constants/colors';
import { css } from '@emotion/react';
import { buttonStyle } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
}

function RadioButton(props: Props) {
  const { checked, children, ...rest } = props;

  return (
    <button
      css={css`
        ${buttonStyle}
        background: ${checked ? GRADIENTS.red : COLORS.white};
        color: ${checked ? COLORS.white : COLORS.black01};
      `}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}

export default RadioButton;
