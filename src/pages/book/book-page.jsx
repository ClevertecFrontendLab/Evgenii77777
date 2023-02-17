import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Chevron from '../../assets/chevron.svg';
import Rait from '../../assets/rating.png';
import { About } from '../../components/about';
import { ButtonOrder } from '../../components/buttons/button-order';
import { Error } from '../../components/error';
import { Info } from '../../components/info';
import { Line } from '../../components/line';
import { Loader } from '../../components/loader';
import { Reviews } from '../../components/reviews';
import { StarRaiting } from '../../components/stars-raiting';
import { addCategory, addPath } from '../../redux/categories/categories-actions';
import { getBook } from '../../redux/thunk/async/get-book';

import styles from './book-page.module.css';

export const BookPage = () => {
  const par = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.book.book);
  const isBookError = useSelector((state) => state.book.error);
  const isBookLoading = useSelector((state) => state.book.loading);
  const categoryName = useSelector((state) => state.category.category);
  const categoryPath = useSelector((state) => state.category.path);

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!categoryName) {
      dispatch(addCategory('Все книги'));
    }
    if (!categoryPath) {
      dispatch(addPath('all'));
    }
    dispatch(getBook(par.bookId));
  }, [categoryName, categoryPath, dispatch, par.bookId]);

  const onHandleChangeActive = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <section className={styles.section}>
      <Line path={categoryPath} category={categoryName} name={book.title} />
      {isBookError && <Error />}
      {isBookLoading && <Loader />}
      {isBookError || isBookLoading ? (
        ''
      ) : (
        <React.Fragment>
          <About book={book} />
          <div className={styles.container}>
            <h3 className={styles.title}>Рейтинг</h3>
            {book.rating && (
              <div className={styles.wrapper}>
                <StarRaiting raiting={book.rating} st={false} />
                <span className={styles.rating}>{book.rating}</span>
              </div>
            )}
            {!book.rating && (
              <div className={styles.wrapper}>
                <img src={Rait} alt='raiting' />
                <p className={styles.phrase}>ещё нет оценок</p>
              </div>
            )}
          </div>
          <div className={styles.container}>
            <h3 className={styles.title}>Подробная информация</h3>
            <Info book={book} />
          </div>
          <div className={styles.container}>
            <div className={styles.wrapperReviews}>
              <div className={styles.wrapperTextReviews}>
                <h3 className={styles.title}>Отзывы</h3>
                {book.comments && <span className={styles.qyantity}>{book.comments.length}</span>}
                {!book.comments && <span className={styles.qyantity}>0</span>}
              </div>
              <button
                data-test-id='button-hide-reviews'
                onClick={(e) => onHandleChangeActive(e)}
                className={styles.buttonChevron}
                type='button'
              >
                <img
                  className={isActive ? styles.iconChevron : styles.rotateChevron}
                  src={Chevron}
                  alt='icon-chevron'
                />
              </button>
            </div>
            <div className={isActive ? styles.wrapperIsActive : styles.wrapperNotActive}>
              <Reviews book={book} isActive={isActive} />
            </div>
          </div>
          <ButtonOrder test='button-rating' page={true} order={true} text='оценить книгу' />
        </React.Fragment>
      )}
    </section>
  );
};
