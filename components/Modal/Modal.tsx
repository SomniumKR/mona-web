import styled from '@emotion/styled/';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.25); 
`;

const Contents = styled.div`
  margin: 6% auto;
  text-align: center;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({
  isOpen, onClose, children,
}: Props) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Container>
      <button onClick={onClose}>Close</button>
      <Contents>
        {children}
      </Contents>
    </Container>,
    document.body,
  );
};

export default Modal;
