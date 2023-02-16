import { useState } from 'react';

import Cat from '../../assets/catnone.jpg';
import { ButtonOrder } from '../buttons/button-order';
import { Swip } from '../swiper';
import { Thumb } from '../swiper/thumb';

import styles from './about.module.css';

export const About = ({ book: { images, title, authors, description, booking, delivery, issueYear } }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.wrapperInfo}>
        <div>
          <div>
            {images && <Swip thumbsSwiper={thumbsSwiper} img={images} />}
            {!images && <img className={styles.cover} src={Cat} alt='cover' />}
          </div>
          {images && images.length > 1 && <Thumb setThumbsSwiper={setThumbsSwiper} img={images} />}
        </div>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.author}>
            {authors},{issueYear}
          </span>
          {!delivery?.handed && !booking?.order && <ButtonOrder page={true} text='Забронировать' />}
          {delivery?.handed && (
            <ButtonOrder page={true} text={`Отложена до ${delivery.dateHandedTo}`} postponed={true} />
          )}
          {booking?.order && <ButtonOrder page={true} text='Забронирована' booked={true} />}
        </div>
      </div>
      <div className={styles.box}>
        <span className={styles.text}>О книге</span>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
