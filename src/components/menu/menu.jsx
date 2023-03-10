import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Chevron from '../../assets/chevr.svg';
import { Links } from '../../links';
import { addCategory, addPath } from '../../redux/categories/categories-actions';

import styles from './menu.module.css';

export const Menu = ({ setOpen, open = false, burger = false, isBooksError, isCategoriesError }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector((state) => state.categories.products);

  const onChangeCategory = (category, path) => {
    dispatch(addCategory(category));
    dispatch(addPath(path));
  };

  const onHandleChangeActive = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onOpenMenu = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (location.pathname.includes('books')) {
      onOpenMenu();
    }
  }, [location.pathname, open]);

  const onCloseBurgerAndMenu = (index) => {
    if (index === 0) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
      if (open) {
        setOpen(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        {Links.map((el, index) => (
          <li className={styles.item} key={el.name}>
            <div className={styles.wrapperFirsLink}>
              <NavLink
                onClick={() => onCloseBurgerAndMenu(index, el)}
                className={
                  location.pathname.includes('books') &&
                  el.path !== '/rules' &&
                  el.path !== '/treaty' &&
                  el.path !== '/profile' &&
                  el.path !== '/auth'
                    ? styles.booksLink
                    : styles.menuLink
                }
                activestyle={styles.activeLink}
                to={el.path}
                data-test-id={burger ? el.burger : el.test}
              >
                {el.name}
              </NavLink>
              {!index && (
                <button onClick={(e) => onHandleChangeActive(e)} className={styles.buttonChevron} type='button'>
                  <img
                    className={isOpen ? styles.iconChevron : styles.rotateChevron}
                    src={Chevron}
                    alt='icon-chevron'
                  />
                </button>
              )}
            </div>
            {el.seconds && !isCategoriesError && !isBooksError && (
              <ul className={isOpen ? styles.list : styles.listNotActive}>
                {isCategoriesError || isBooksError ? (
                  ''
                ) : (
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? 'activeLink' : '')}
                      to='/books/all'
                      onClick={() => onChangeCategory('Все книги', 'all')}
                    >
                      Все книги
                    </NavLink>
                  </li>
                )}
                {categories &&
                  categories.map((item, i) => (
                    <li key={item.id}>
                      <NavLink
                        data-test-id={burger ? item.burger : item.test}
                        className={({ isActive }) => (isActive ? 'activeLink' : '')}
                        to={`/books/${item.path}`}
                        onClick={() => onChangeCategory(item.name, item.path)}
                      >
                        {item.name}
                      </NavLink>
                      <span className={styles.quantity}>{i + 10}</span>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button
        data-test-id={burger ? 'exit-button' : ''}
        onClick={() => {
          localStorage.setItem('JWT', '');
          navigate('/auth');
        }}
        className={styles.buttonLogout}
        type='button'
      >
        Выход
      </button>
    </div>
  );
};
