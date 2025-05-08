import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "@inertiajs/react";
import { HeroProps } from "@/types";

interface heroProps {
    heroSliders: HeroProps[];
}
const Hero = ({heroSliders} : heroProps) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
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
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper relative "
      >
        {heroSliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div  className="slide">
              <img src={typeof slide.hero_image == "string" ? slide.hero_image : '/backend/no_image.jpg' } alt={slide.hero_heading} className="w-full h-70 sm:h-auto object-cover"/>
              <div className="max-w-screen-2xl mx-auto container px-12 md:px-15">
                <div className="absolute top-1/2 -translate-y-1/2 space-y-1 sm:space-y-1 text-left">
                  <h1 className="text-base sm:text-4xl flex uppercase text-gray-700">
                    {slide.hero_title}
                  </h1>
                  <h1 className="text-2xl flex sm:text-5xl text-gray-900 font-bold uppercase ">
                    {slide.hero_heading}
                  </h1>
                  <h2 className="text-md sm:text-xl font-base">{slide.hero_subtitle}</h2>
                  <button
                    
                    className=" bg-buyBtn hover:bg-buyBtn/90 text-white px-4 sm:px-5 py-2 sm:py-3 mt-1 transition-colors cursor-pointer border-b-2 border-[#65b4ad]"
                  >
                    <Link href={slide.hero_button_link}>{slide.hero_button_text}</Link>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
