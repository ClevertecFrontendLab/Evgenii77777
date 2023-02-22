import { useRef, useState } from 'react';

import { Burger } from './burger/burger';
import { Drawer } from './drawer/drawer';
import { useOnClickOutside } from './hooks';

import styles from './burger-menu.module.css';

export const BurgerMenu = ({ isCategoriesError, isBooksError }) => {
  const [open, setOpen] = useState(false);

  const node = useRef();

  useOnClickOutside(node, () => {
    setOpen(false);
  });

  return (
    <div className={styles.burger} ref={node}>
      <Burger open={open} setOpen={setOpen} />
      <Drawer open={open} setOpen={setOpen} isCategoriesError={isCategoriesError} isBooksError={isBooksError} />
    </div>
  );
};
