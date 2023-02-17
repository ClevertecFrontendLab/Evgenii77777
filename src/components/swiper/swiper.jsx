import { FreeMode, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../index.css';
import styles from './swiper.module.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export const Swip = ({ img, thumbsSwiper }) => (
  <Swiper
    spaceBetween={10}
    pagination={{
      clickable: true,
    }}
    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
    modules={[FreeMode, Thumbs, Pagination]}
    className='mySwiper2'
    data-test-id='slide-big'
  >
    {img &&
      img.map((el) => (
        <SwiperSlide key={`https://strapi.cleverland.by${el.url}`}>
          <img className={styles.cover} src={`https://strapi.cleverland.by${el.url}`} alt='cover' />
        </SwiperSlide>
      ))}
  </Swiper>
);
