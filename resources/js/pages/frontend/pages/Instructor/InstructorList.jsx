import React from "react";
import BannerSection from "../../components/BannerSection";
import { instructorList } from "../../utilities/instructorList";
import { Link } from "react-router";

const InstructorList = () => {
  return (
    <>
      <BannerSection heading={"Instructor List Style 1"} />

      <section className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 h-full">
          {instructorList.map((person) => (
            <div
              key={person.id}
              className="bg-gray-100 text-center px-6 pt-6 md:px-10 space-y-4"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <div>
                <h3 className="text-lg text-buyBtn font-semibold">
                  {person.name}
                </h3>
                <p className="text-sm text-gray-500 pt-1">{person.role}</p>
              </div>
              <p className="text-sm text-gray-600">{person.bio}</p>
              <Link
                to={person.profileLink}
                className="mt-3 inline-block bg-buyBtn hover:bg-buyBtn/90 text-white px-4 sm:px-5 py-2 sm:py-3 transition-colors cursor-pointer border-b-2 border-[#65b4ad] rounded"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default InstructorList;
