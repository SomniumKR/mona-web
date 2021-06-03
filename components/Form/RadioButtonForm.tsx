import React, { ComponentProps, memo } from 'react';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import Button from 'components/Button/Button';
import RadioButton from 'components/Button/RadioButton';
import { FilterStatus, FilterCategory } from 'types/search';
import { css } from '@emotion/react';

type RadioButtonProps = ComponentProps<typeof RadioButton>;

interface Props extends Omit<RadioButtonProps, 'checked'> {
    values: FilterStatus[] | FilterCategory[];
    handleCheck: (value: FilterStatus | FilterCategory) => void;
    checkedValue: FilterStatus | FilterCategory;
}

const Container = styled.div`
  padding: 29px 15px 26px 15px;
  background-color: ${COLORS.lightRed};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-bottom: 1px solid ${COLORS.grey01};
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 29px;
  width: 100%;
`;

const ApplyButton = styled(Button)`
  padding: 12px 20px;
  font-size: 12px;
`;

function RadioButtonForm({
  values, checkedValue, handleCheck, ...rest
}: Props) {
  return (
    <Container>
      <RadioContainer>
        {values.map((value) => (
          <RadioButton
            onClick={() => handleCheck(value)}
            checked={value === checkedValue}
            type="button"
            {...rest}
            css={css`
              margin-right: 20px;

              &:last-child {
                margin-right: 0;
              }
            `}
          >
            {value}
          </RadioButton>
        ))}
      </RadioContainer>
      <ApplyButton type="button" redColor>
        Show Results
      </ApplyButton>
    </Container>
  );
}

export default memo(RadioButtonForm);
