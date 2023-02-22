import cn from 'classnames';

import styles from './button-sort.module.css';

export const ButtonSort = ({ img, name, change, active = false, test = false }) => (
  <button data-test-id={test} className={cn(styles.button, { activeSort: active })} type='button' onClick={change}>
    <img src={img} alt={name} />
  </button>
);
