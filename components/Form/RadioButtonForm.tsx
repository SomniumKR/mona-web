import React, { ComponentProps, memo } from 'react';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import Button from 'components/Button/Button';
import RadioButton from 'components/Button/RadioButton';
import { FilterStatus } from 'types/search';

type RadioButtonProps = Omit<ComponentProps<typeof RadioButton>, 'checked'>

interface Props extends RadioButtonProps {
    values: FilterStatus[];
    handleCheck: (value: FilterStatus) => void;
    checkedValue: FilterStatus;
}

const Container = styled.div`
  padding: 29px 15px 26px 15px;
  background-color: ${COLORS.lightRed};
`;

function RadioButtonForm({
  values, checkedValue, handleCheck, ...rest
}: Props) {
  return (
    <Container>
      {values.map((value) => (
        <RadioButton onClick={() => handleCheck(value)} checked={value === checkedValue} {...rest}>
          {value}
        </RadioButton>
      ))}
      <Button redColor>
        Show Results
      </Button>
    </Container>
  );
}

export default memo(RadioButtonForm);
