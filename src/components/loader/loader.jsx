import { ColorRing } from 'react-loader-spinner';

import styles from './loader.module.css';

export const Loader = () => (
  <div className={styles.container} data-test-id='loader'>
    <div className={styles.wrapper}>
      <div className={styles.wrapperLoader}>
        <ColorRing
          visible={true}
          height='80'
          width='80'
          ariaLabel='blocks-loading'
          wrapperStyle={{}}
          wrapperClass='blocks-wrapper'
          color={['orangered']}
          colors={['orangered', 'orangered', 'orangered', 'orangered', 'orangered']}
        />
      </div>
    </div>
  </div>
);
