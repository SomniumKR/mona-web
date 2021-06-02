import React, { InputHTMLAttributes } from 'react';
import { css } from '@emotion/react';
import { inputStyle } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleEnter?: () => void;
  handleChange?: (value: string) => void;
}

function Input(props: Props) {
  const {
    handleEnter, handleChange, ...rest
  } = props;

  return (
    <input
      css={css`
        ${inputStyle}
      `}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleEnter}
      {...rest}
    />
  );
}

export default Input;
