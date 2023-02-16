// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const StyledDrawer = styled.nav`
  width: 502px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 32px 32px 52px;
  position: absolute;
  top: 96px;
  left: 0;
  background: #f9f9fa;
  box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
    0px 1px 5px rgba(191, 196, 201, 0.24);
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(62px)' : 'translateX(-100vw)')};
  z-index: 10;

  @media (max-width: 766.99px) {
    left: 16px;
    top: 74px;
    width: calc(100% - 32px);
    max-width: 502px;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100vw)')};
  }
`;
