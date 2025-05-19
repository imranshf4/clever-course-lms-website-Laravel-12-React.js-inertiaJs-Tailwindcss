import React from "react";
import BannerSection from "../../components/BannerSection";
import Search from "../Home/Search";

const CourseSearch = () => {
  return (
    <>
      <BannerSection heading={"Courses Searching"} />

      <Search
        heading={"Easily Search For Courses"}
        subheading={"Choose category and fill keywords"}
      />
    </>
  );
};

export default CourseSearch;
