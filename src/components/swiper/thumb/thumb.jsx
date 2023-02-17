import { FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../../index.css';
import styles from '../swiper.module.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export const Thumb = ({ img, setThumbsSwiper }) => (
  <Swiper
    slidesPerView={4}
    onSwiper={setThumbsSwiper}
    spaceBetween={30}
    freeMode={true}
    watchSlidesProgress={true}
    modules={[FreeMode, Thumbs]}
    className='mySwiper'
  >
    {img &&
      img.map((el) => (
        <SwiperSlide key={`https://strapi.cleverland.by${el.url}`}>
          <img
            data-test-id='slide-mini'
            className={styles.cover}
            src={`https://strapi.cleverland.by${el.url}`}
            alt='cover'
          />
        </SwiperSlide>
      ))}
  </Swiper>
);
