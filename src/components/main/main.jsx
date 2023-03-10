import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import Block from '../../assets/block.svg';
import BlockWhite from '../../assets/block_white.svg';
import Cat from '../../assets/catnone.jpg';
import Cross from '../../assets/cross.svg';
import Line from '../../assets/line.svg';
import LineWhite from '../../assets/line_white.svg';
import Search from '../../assets/search.svg';
import { getAllBooks } from '../../redux/thunk/async/get-all-books';
import { getAllCategories } from '../../redux/thunk/async/get-categories';
import { ButtonOrder } from '../buttons/button-order';
import { ButtonSort } from '../buttons/button-sort';
import { Menu } from '../menu';
import { StarRaiting } from '../stars-raiting';

import styles from './main.module.css';

export const Main = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const books = useSelector((state) => state.books.allBooks);
  const isBooksError = useSelector((state) => state.books.error);
  const isCategoriesError = useSelector((state) => state.categories.error);
  const isCategoriesLoading = useSelector((state) => state.categories.loading);
  const isBooksLoading = useSelector((state) => state.books.loading);

  useEffect(() => {
    if (localStorage.getItem('JWT')) {
      dispatch(getAllCategories());
      dispatch(getAllBooks());
    }
  }, [dispatch]);

  const onChangeFormList = () => {
    setActive(!active);
  };

  const onChangeInput = () => {
    setOpen(!open);
  };

  if (!localStorage.getItem('JWT')) return <Navigate to='/auth' />;

  return (
    <main className={styles.main}>
      <div className={styles.wrapperMenu}>
        <Menu isCategoriesError={isCategoriesError} isBooksError={isBooksError} setOpen={setOpen} />
      </div>
      {isBooksError || isCategoriesError || isCategoriesLoading || isBooksLoading ? (
        ''
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.wrapperInput}>
              <input className={styles.search} type='search' placeholder='Поиск книги или автора…' />
              <div className={styles.boxInput}>
                {!open && <ButtonSort img={Search} name='search' change={onChangeInput} test='button-search-open' />}
                <div className={open ? styles.openSearch : styles.closeSearch} data-test-id='input-search'>
                  <input className={styles.searchMobile} type='search' placeholder='Поиск книги или автора…' />
                  <button
                    data-test-id='button-search-close'
                    onClick={() => onChangeInput()}
                    className={styles.closeBtn}
                    type='button'
                  >
                    <img src={Cross} alt='cross' />
                  </button>
                </div>
                <button className={styles.sort} type='button'>
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
            {books.map((el) => (
              <li data-test-id='card' className={cn(styles.item, { itemLine: !active })} key={el.id}>
                <Link className={cn('linkBooks', { linkLine: !active })} to={`/books/${params.category}/${el.id}`}>
                  {el.image && (
                    <img
                      className={cn('cover', { coverLine: !active })}
                      src={`https://strapi.cleverland.by${el.image.url}`}
                      alt='cover'
                    />
                  )}
                  {!el.image && <img className={cn('cover', { coverLine: !active })} src={Cat} alt='cover' />}
                  <div className={cn({ wrapperLine: !active })}>
                    <div className={cn('wrapperRaiting', { ratingLine: !active })}>
                      {el.rating ? <StarRaiting raiting={el.rating} /> : <p className={styles.rait}>ещё нет оценок</p>}
                    </div>
                    <div className={cn('wrapperText', { wrapperTextLine: !active })}>
                      <p className={cn(styles.name, { nameLine: !active })}>{el.title}</p>
                      <span className={cn(styles.author, { authorLine: !active })}>{el.authors}</span>
                      <span className={cn(styles.author, { authorLine: !active })}>,{el.issueYear}</span>
                    </div>
                  </div>
                  <div className={cn(styles.wrapperOrder, { orderLine: !active })}>
                    {!el.booking?.order && !el.delivery?.handed && <ButtonOrder text='Забронировать' />}
                    {el.booking?.order && <ButtonOrder text='Забронирована' booked={true} />}
                    {el.delivery?.handed && (
                      <ButtonOrder text={`Отложена до ${el.delivery.dateHandedTo}`} postponed={true} />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};
