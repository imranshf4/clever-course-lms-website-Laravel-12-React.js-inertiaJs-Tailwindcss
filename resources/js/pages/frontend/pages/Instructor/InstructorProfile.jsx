import React from "react";
import image1 from "../../assets/instructor/rebecca-700x400.jpg";
import { Link } from "react-router";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaPhoneAlt,
} from "react-icons/fa";
import { GrLink } from "react-icons/gr";
import { CgMail } from "react-icons/cg";
import BannerSection from "../../components/BannerSection";

const InstructorProfile = () => {
  return (
    <>
      <div className="text-white">
      <BannerSection
        heading="Rebecca Smith" subheading="instructor"
      />
      </div>

      <div className="section-container flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/8 bg-gray-900 text-white space-y-4">
          {/* profile image */}
          <img src={image1} alt="image1" className="object-contain w-full" />

          <div className="space-y-2 items-center px-6">
            <h1 className="font-bold text-xl">Rebecca Smith</h1>
            <p className="text-md text-white/50">Creative Director, Photographer</p>
          </div>
          <hr className="text-gray-400/50 w-full" />

          {/* contact info */}
          <div className="space-y-2">
            <div className="flex gap-4 items-center px-6">
              <FaPhoneAlt className="text-md text-white/50" />
              <p className="text-md text-white/50">+1-222-222-33</p>
            </div>
            <div className="flex gap-4 items-center px-6">
              <CgMail className="text-md text-white/50" />
              <Link className="text-md text-white/50" to={"Rebecca@goodlayerss.com"}>
                Rebecca@goodlayerss.com
              </Link>
            </div>
            <div className="flex gap-4 items-center px-6">
              <GrLink className="text-md text-white/50" />
              <p className="text-md text-white/50">http://google.com</p>
            </div>
          </div>
          <hr className="text-gray-400/50 w-full" />

          {/* social mendia */}
          <div className="flex justify-center items-center gap-4 text-3xl text-white/50">
            <Link to="" target="_blank">
              <FaFacebookSquare />
            </Link>
            <Link to="" target="_blank">
              <FaLinkedin />
            </Link>
            <Link to="" target="_blank">
              <FaTwitter />
            </Link>
          </div>

          <button className="bg-buyBtn w-full hover:bg-buyBtn/90 text-white px-4 sm:px-5 py-2 sm:py-3 mt-1 transition-colors cursor-pointer border-b-2 border-[#65b4ad] uppercase tex-sm font-bold">
            <Link to="" target="_blank">
              View courses by Rebecca Smith
            </Link>
          </button>
        </div>

        <div className="w-full md:w-5/8 space-y-4">
          <div className="bg-gray-100 space-y-3 py-4  border-b-2 border-[#65b4ad]">
            <div className="px-6 flex gap-4">
              <h2 className="font-bold text-gray-900/60 text-md">Location</h2>
              <p className="text-base text-gray-600/50">Los Angeles</p>
            </div>
            
            <div className="px-6 flex gap-4">
              <h2 className="font-bold text-gray-900/60 text-md">Current Work</h2>
              <p className="text-base text-gray-600/50">Good Studio</p>
            </div>

            <div className="px-6 flex gap-4">
              <h2 className="font-bold text-gray-900/60 text-md">Past Work</h2>
              <p className="text-base text-gray-600/50">Design Mag, Facebook</p>
            </div>

            <div className="px-6 flex gap-4">
              <h2 className="font-bold text-gray-900/60 text-md">Specialist In</h2>
              <p className="text-base text-gray-600/50">Photography, Branding, Creativity</p>
            </div>

            <div className="px-6 flex gap-4">
              <h2 className="font-bold text-gray-900/60 text-md">Experience</h2>
              <p className="text-base text-gray-600/50">12 Years</p>
            </div>

          </div>

          {/* Biography */}
          <div className="space-y-3">
            <h1 className="font-bold text-2xl capitalize">Biography</h1>
            <p className="text-base text-gray-900/50">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              leo risus, porta ac consectetur ac, vestibulum at eros. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet.
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed
              diam eget risus varius blandit sit amet non magna. Nullam quis
              risus eget urna mollis ornare vel eu leo. Integer posuere erat a
              ante venenatis dapibus posuere velit aliquet. Nulla vitae elit
              libero, a pharetra augue. Etiam porta sem malesuada magna mollis
              euismod. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorProfile;
