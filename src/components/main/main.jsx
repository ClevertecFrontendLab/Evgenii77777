import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import Block from '../../assets/block.svg';
import BlockWhite from '../../assets/block_white.svg';
import Cross from '../../assets/cross.svg';
import Line from '../../assets/line.svg';
import LineWhite from '../../assets/line_white.svg';
import Search from '../../assets/search.svg';
import Sort from '../../assets/sort.svg';
import { getAllBooks } from '../../redux/thunk/async/get-all-books';
import { getAllCategories } from '../../redux/thunk/async/get-categories';
import { ButtonSort } from '../buttons/button-sort';
import { Card } from '../card';
import { EmpthyCategory } from '../empthy-category';
import { Menu } from '../menu';

import styles from './main.module.css';

export const Main = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [max, setMax] = useState(true);
  const [value, setValue] = useState('');
  const cat = useSelector((state) => state.category.category);
  const books = useSelector((state) => state.books.allBooks);
  const categories = useSelector((state) => state.categories.products);
  const isBooksError = useSelector((state) => state.books.error);
  const isCategoriesError = useSelector((state) => state.categories.error);
  const isCategoriesLoading = useSelector((state) => state.categories.loading);
  const isBooksLoading = useSelector((state) => state.books.loading);
  const maxSorted = [...books]
    .sort((a, b) => b.rating - a.rating)
    .filter((el) => el.title.toLowerCase().includes(value.toLowerCase()));
  const minSorted = [...books]
    .sort((a, b) => a.rating - b.rating)
    .filter((el) => el.title.toLowerCase().includes(value.toLowerCase()));

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
    setValue('');

    dispatch(getAllBooks());
  }, [categories.length, dispatch]);

  const onChangeFormList = () => {
    setActive(!active);
  };

  const onChangeInput = () => {
    setOpen(!open);
  };

  const onChangeRatingSort = () => {
    setMax(!max);
  };

  const onChangeInputSearch = (e) => {
    setValue(e);
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapperMenu}>
        <Menu
          categories={categories}
          isCategoriesError={isCategoriesError}
          isBooksError={isBooksError}
          setOpen={setOpen}
          books={books}
        />
      </div>
      {isBooksError || isCategoriesError || isCategoriesLoading || isBooksLoading ? (
        ''
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.wrapperInput}>
              <div className={styles.boxInput}>
                <div className={styles.btnContainer}>
                  {!open && <ButtonSort img={Search} name='search' change={onChangeInput} test='button-search-open' />}
                </div>
                <div className={open ? styles.openSearch : styles.closeSearch}>
                  <input
                    data-test-id='input-search'
                    className={open ? styles.search : styles.searchClosed}
                    type='text'
                    placeholder='Поиск книги или автора…'
                    onChange={(e) => onChangeInputSearch(e.target.value)}
                  />
                  <button
                    data-test-id='button-search-close'
                    onClick={() => onChangeInput()}
                    className={open ? styles.closeBtn : styles.openBtn}
                    type='button'
                  >
                    <img src={Cross} alt='cross' />
                  </button>
                </div>
                <button
                  data-test-id='sort-rating-button'
                  className={styles.sort}
                  type='button'
                  onClick={() => onChangeRatingSort()}
                >
                  <img className={max ? styles.maxSort : styles.minSort} src={Sort} alt='icon-sort' />
                  <p className={styles.sortText}>По рейтингу</p>
                </button>
              </div>
            </div>
            <div className={styles.wrapperBtn}>
              <ButtonSort
                test='button-menu-view-window'
                img={active ? BlockWhite : Block}
                name='block'
                change={onChangeFormList}
                active={active}
              />
              <ButtonSort
                test='button-menu-view-list'
                img={active ? Line : LineWhite}
                name='line'
                change={onChangeFormList}
                active={!active}
              />
            </div>
          </div>
          <ul className={cn(styles.list, { listLine: !active })}>
            {cat === 'Все книги'
              ? (max ? maxSorted : minSorted).map((el) => (
                  <Card el={el} value={value} active={active} params={params} />
                ))
              : (max ? maxSorted : minSorted)
                  .filter((item) => item.categories.includes(cat))
                  .map((el) => <Card el={el} value={value} active={active} params={params} />)}
          </ul>
          {(maxSorted.filter((item) => item.categories.includes(cat)).length === 0 ||
            minSorted.filter((item) => item.categories.includes(cat)).length === 0) && (
            <EmpthyCategory value={value} minSorted={minSorted} maxSorted={maxSorted} />
          )}
        </div>
      )}
    </main>
  );
};
