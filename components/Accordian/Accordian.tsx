import { memo, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Heading02 } from 'components/Heading/Heading02';
import Chevren from 'components/Icon/Chevron';
import { COLORS } from 'constants/colors';

interface Props {
    title: string;
    children?: ReactNode;
}

const Container = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLORS.grey01};
  padding: 0 15px;
  box-sizing: border-box;
`;

function Accordian({ title, children }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Heading02>
          {title}
        </Heading02>
        <Chevren width="19" height="19" direction="Up" />
      </TitleContainer>
      {children}
    </Container>
  );
}

export default memo(Accordian);
