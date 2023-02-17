import { StyledBurger } from './burger.styled';

export const Burger = ({ open, setOpen }) => (
  <StyledBurger data-test-id='button-burger' open={open} onClick={() => setOpen(!open)}>
    <span />
    <span />
    <span />
  </StyledBurger>
);
