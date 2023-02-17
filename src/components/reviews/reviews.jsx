import Author from '../../assets/review.png';
import { StarRaiting } from '../stars-raiting';

import styles from './reviews.module.css';

export const Reviews = ({ book: { comments } }) => (
  <div>
    {comments && (
      <ul className={styles.list}>
        {comments.map((el) => (
          <li key={el.id}>
            <div className={styles.wrapper}>
              {el.avatarUrl && <img src={`https://strapi.cleverland.by${el.avatarUrl}`} alt='author' />}
              {!el.avatarUrl && <img src={Author} alt='author' />}
              <div className={styles.container}>
                <span className={styles.name}>
                  {el.user.firstName} {el.user.lastName}
                </span>
                <span className={styles.date}>{el.createdAt}</span>
              </div>
            </div>
            <StarRaiting raiting={el.rating} />
            <p className={styles.comment}>{el.text}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
