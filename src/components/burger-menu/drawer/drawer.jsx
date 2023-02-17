import { Menu } from '../../menu';

import { StyledDrawer } from './drawer.styled';

export const Drawer = ({ open, setOpen }) => (
  <StyledDrawer open={open} data-test-id='burger-navigation'>
    <Menu setOpen={setOpen} open={open} burger={true} />
  </StyledDrawer>
);
