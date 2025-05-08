import React from "react";
import bannerImg from "../../../../../public/frontend/assets/bannerImg.png";
const BannerSection = ({heading,subheading}:any) => {
  return (
    <div>
      <section
        className={`h-60 bg-cover bg-center flex items-center justify-center bg-secondary`}
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div >
          <div className="max-w-screen-2xl container px-12 md:px-15">
          <h1 className="uppercase text-3xl text-white font-bold">{heading}</h1>
          {subheading && 
          <h2 className=" text-md">{subheading}</h2>}
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default BannerSection;
