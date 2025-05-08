import React from "react";
import { Link } from "@inertiajs/react";
const Footer = () => {
  return (
    <footer className="bg-secondary-bg text-black dark:text-white border-t border-gray-300">
      <div className="section-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-8">
        <div>
          <Link href="/">
            <img src="/frontend/assets/logo.png" alt="Logo" className="h-5" />
          </Link>
          <p className="text-sm mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            omnis!
          </p>
        </div>

        <div className="md:pl-35">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Courses</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="md:pl-10">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">Travel</a>
            </li>
            <li>
              <a href="#">Life Style</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">NewsLetter</h2>
          <div className="flex flex-col">
            <input
              type="text"
              className="focus:outline-none border-b-1 mb-2"
              placeholder="Enter your email"
            />
            <button className="bg-buyBtn border-b-2 border-[#65b4ad] hover:bg-buyBtn/90 cursor-pointer transition-colors duration-300 text-white rounded px-4 py-2 ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
<hr className=" border-t border-gray-300" />
      {/* Bottom Footer */}
      <div className="max-w-screen-2xl mx-auto container py-4 px-8 md:px-15 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:text-center gap-4 text-left text-black ">
        <p> &copy; {new Date().getFullYear()} Clever Course. All rights reserved.</p>
        <p className="flex gap-4">
          <Link href="/">Terms & Conditions</Link>
          <Link href="/">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
