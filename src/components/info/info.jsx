import styles from './info.module.css';

export const Info = ({ book }) => (
  <div className={styles.container}>
    <ul className={styles.list}>
      <li className={styles.question}>
        <p>Издательство</p>
        <p>Год издания</p>
        <p>Страниц</p>
        <p>Переплёт</p>
        <p>Формат</p>
      </li>
      <li className={styles.answer}>
        <p>{book.publish}</p>
        <p>{book.issueYear}</p>
        <p>{book.pages}</p>
        <p>{book.cover}</p>
        <p>{book.format}</p>
      </li>
    </ul>
    <ul className={styles.list}>
      <li className={styles.question}>
        <p>Жанр</p>
        <p>Вес</p>
        <p>ISBN</p>
        <p>Изготовитель</p>
      </li>
      <li className={styles.answer}>
        <p>{book.categories}</p>
        <p>{book.weight}</p>
        <p>{book.ISBN}</p>
        <p>{book.producer}</p>
      </li>
    </ul>
  </div>
);
