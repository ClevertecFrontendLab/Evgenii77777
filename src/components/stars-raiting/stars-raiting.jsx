import Empthy from '../../assets/empty.svg';
import Star from '../../assets/star.svg';

import styles from './stars-raiting.module.css';

export const StarRaiting = ({ raiting = 0, st }) => {
  const starRating = Math.round(raiting);
  const count = 5 - starRating;

  return (
    <div className={st ? styles.container : styles.wrapper}>
      {[...Array(starRating)].map(() => (
        <img src={Star} alt='icon-star' />
      ))}
      {[...Array(count)].map(() => (
        <img src={Empthy} alt='icon-star' />
      ))}
    </div>
  );
};
