// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: absolute;
  top: 30px;
  left: 66px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media (max-width: 766.99px) {
    top: 25px;
    left: 20px;
    height: 24px;
  }

  &:focus {
    outline: none;
  }

  span {
    width: 36px;
    height: 3px;
    background: ${({ open }) => (open ? 'orangered' : '#363636')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 3px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }

    @media (max-width: 766.99px) {
      width: 24px;
      height: 2px;
      transform-origin: 1px;
    }
  }
`;
