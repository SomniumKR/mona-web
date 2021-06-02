import styled from '@emotion/styled';
import { HEADER_HEIGHT } from 'constants/styles';

const Header = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  padding: 7px 15px;
  box-sizing: border-box;
`;

export default Header;
