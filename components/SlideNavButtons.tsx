import { useSwiper } from 'swiper/react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

const SlideNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flex justify-between gap-x-2 mt-0 mx-2">
      <button
        className='text-C3 text-xl'
        onClick={() => swiper.slidePrev()}
      >
        <BsFillArrowLeftCircleFill />
      </button>
      <button
        className='text-C3 text-xl'
        onClick={() => swiper.slideNext()}
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  );
};

export default SlideNavButtons;

// import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
// import { useSwiper } from 'swiper/react';

// const SlideNavButtons = () => {
//   const swiper = useSwiper();

//   return (
//     <>
//       <button
//         className="absolute top-[20%] left-0"
//         onClick={() => swiper.slidePrev()}
//       >
//         <CgArrowLeft />
//       </button>
//       <button
//         className="absolute top-[20%] right-0"
//         onClick={() => swiper.slideNext()}
//       >
//         <CgArrowRight />
//       </button>
//     </>
//   );
// };

// export default SlideNavButtons;