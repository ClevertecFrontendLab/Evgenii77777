import { useSelector } from 'react-redux';

import Logo from '../../assets/logo.svg';
import { BurgerMenu } from '../burger-menu';
import { Error } from '../error';
import { Loader } from '../loader';
import { User } from '../user';

import styles from './header.module.css';

export const Header = () => {
  const isBooksError = useSelector((state) => state.books.error);
  const isCategoriesError = useSelector((state) => state.categories.error);
  const isBooksLoading = useSelector((state) => state.books.loading);
  const isCategoriesLoading = useSelector((state) => state.categories.loading);
  const userName = useSelector((state) => state.user.user);

  return (
    <header className={styles.header}>
      {(isBooksError || isCategoriesError) && <Error />}
      {(isBooksLoading || isCategoriesLoading) && <Loader />}
      <div className={styles.container}>
        <img className={styles.logo} src={Logo} alt='logo' />
        <BurgerMenu />
        <h1 className={styles.title}>Библиотека</h1>
      </div>
      <User name={userName.identifier} />
    </header>
  );
};
