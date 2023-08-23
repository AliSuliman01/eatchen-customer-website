import React from 'react'
import { useSwiper } from 'swiper/react'

export default function SlideNavButtons() {
  const swiper = useSwiper()

  return (
    <>
      <button onClick={() => swiper.slideNext()} className="">n</button>
      <button onClick={() => swiper.slidePrev()} className="">p</button>
    </>
  );
}
