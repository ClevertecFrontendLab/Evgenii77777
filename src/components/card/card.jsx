import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Cat from '../../assets/catnone.jpg';
import { ButtonOrder } from '../buttons/button-order';
import { StarRaiting } from '../stars-raiting';

import styles from '../main/main.module.css';

const LigthText = (props) => {
  const { filter, str } = props;

  if (!filter) return str;
  const regExp = new RegExp(filter, 'ig');
  const matchValues = str.match(regExp);

  if (matchValues) {
    return str.split(regExp).map((letter, i, array) => {
      if (i < array.length - 1) {
        const MatchLetter = matchValues.shift();

        return (
          <React.Fragment>
            {letter}
            <span data-test-id='highlight-matches' className={styles.ligth}>
              {MatchLetter}
            </span>
          </React.Fragment>
        );
      }

      return letter;
    });
  }

  return str;
};

export const Card = ({ value, active, params, el }) => {
  const ligth = useCallback((str) => <LigthText filter={value} str={str} />, [value]);

  return (
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
            <p className={cn(styles.name, { nameLine: !active })}>{ligth(el.title)}</p>
            <span className={cn(styles.author, { authorLine: !active })}>{el.authors}</span>
            <span className={cn(styles.author, { authorLine: !active })}>,{el.issueYear}</span>
          </div>
        </div>
        <div className={cn(styles.wrapperOrder, { orderLine: !active })}>
          {!el.booking?.order && !el.delivery?.handed && <ButtonOrder text='Забронировать' />}
          {el.booking?.order && <ButtonOrder text='Забронирована' booked={true} />}
          {el.delivery?.handed && <ButtonOrder text={`Отложена до ${el.delivery.dateHandedTo}`} postponed={true} />}
        </div>
      </Link>
    </li>
  );
};
