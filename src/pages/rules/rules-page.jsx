import { Menu } from '../../components/menu';
import { Offerts } from '../../components/offerts';

import styles from './rules.module.css';

export const RulesPage = () => (
  <section className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.wrapperMenu}>
        <Menu />
      </div>
      <div className={styles.containerText}>
        <h2 className={styles.title}>Правила пользования</h2>
        <Offerts />
      </div>
    </div>
  </section>
);
