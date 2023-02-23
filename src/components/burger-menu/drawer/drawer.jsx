import { Menu } from '../../menu';

import { StyledDrawer } from './drawer.styled';

export const Drawer = ({ open, setOpen, categories, isBooksError, isCategoriesError, books, cat, setCat }) => (
  <StyledDrawer open={open} data-test-id='burger-navigation'>
    <Menu
      setOpen={setOpen}
      open={open}
      burger={true}
      categories={categories}
      isCategoriesError={isCategoriesError}
      isBooksError={isBooksError}
      cat={cat}
      setCat={setCat}
      books={books}
    />
  </StyledDrawer>
);
