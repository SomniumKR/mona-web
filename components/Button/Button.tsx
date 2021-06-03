import { ButtonHTMLAttributes, memo } from 'react';
import { COLORS, GRADIENTS } from 'constants/colors';
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
        background: ${redColor ? GRADIENTS.red : COLORS.white};
        color: ${redColor ? COLORS.white : COLORS.black01};
      `}
      {...rest}
    >
      {children}
    </button>
  );
}

export default memo(Button);
