import React, { useRef, useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    content:
      "Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue.",
    author: "John Doe",
    position: "Student",
  },
  {
    content:
      "Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue.",
    author: "Edward Philipe",
    position: "Programmer",
  },
  {
    content:
      "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui. Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    author: "Ricardo Snow",
    position: "Public Speaker",
  },
];

const Testimonials = () => {
  const swiperRef: any = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  return (
    <section className="bg-gray-100">
      <div className="section-container">
        <div className="text-center mb-5">
          {/* custom next & previous button */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => {
                handlePrev();
              }}
              className={`text-white bg-buyBtn cursor-pointer px-4 py-4 rounded-full`}
            >
              <FaArrowLeftLong />
            </button>

            <h3 className="text-3xl font-semibold uppercase">What Students Say?</h3>

            <button
              onClick={() => {
                handleNext();
              }}
              className={`text-white bg-buyBtn cursor-pointer px-4 py-4 rounded-full`}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <hr className="w-10" />
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper relative mt-4"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide  key={index}>
              <div className="flex justify-center w-full">
                <div className="lg:w-1/2">
                  <p className="text-gray-700 mb-4">"{item.content}"</p>
                  <div className="flex gap-4 items-center">
                    <h3 className="font-semibold text-buyBtn">{item.author}</h3>
                    <p className="text-sm text-gray-500">{item.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
