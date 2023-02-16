import Empty from '../../assets/empty.svg';
import Star from '../../assets/star.svg';

import styles from './stars.module.css';

export const Stars = ({ st = true }) => (
  <div className={st ? styles.container : styles.wrapper}>
    <img src={Star} alt='star' />
    <img src={Star} alt='star' />
    <img src={Star} alt='star' />
    <img src={Star} alt='star' />
    <img src={Empty} alt='empty-star' />
  </div>
);
