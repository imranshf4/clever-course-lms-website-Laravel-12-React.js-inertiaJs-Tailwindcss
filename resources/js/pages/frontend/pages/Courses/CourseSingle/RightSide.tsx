import React from "react";
import { classImages, courseSections } from "../../../utilities/singleCourse";
import { CourseWithId } from "@/types";

interface CourseInfo {
    course: CourseWithId;
}
const RightSide = ({course}:CourseInfo) => {
  return (
    <div className="space-y-6">
      <img src={typeof course.image == "string" ? course.image : "/backend/no_image.jpg"} alt="image1" className="w-full" />

      {/* long description */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold capitalize">Tellus Sem Ornare</h1>
        <p className="text-md text-gray-600/70">
          Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
          nibh, ut fermentum massa justo sit amet risus. Fusce dapibus, tellus
          ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
          justo sit amet risus. Fusce dapibus, tellus ac cursus commodo, tortor
          mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          Aenean lacinia bibendum nulla sed consectetur.
        </p>

        <ul className="text-gray-600/70 list-disc pl-8">
          <li className="decoration-dotted">Donec sed odio dui.</li>
          <li className="decoration-dotted">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget sem nec elit.
          </li>
          <li className="decoration-dotted">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </li>
          <li className="decoration-dotted">
            Maecenas faucibus mollis interdum.
          </li>
          <li className="decoration-dotted">
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </li>
        </ul>

        <p className="text-md text-gray-600/70">
          Nulla vitae elit libero, a pharetra augue. Nullam quis risus eget urna
          mollis ornare vel eu leo. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus
          commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
          amet risus. Duis mollis, est non commodo luctus, nisi erat porttitor
          ligula, eget lacinia odioใ
        </p>

        <h1 className="text-2xl font-semibold capitalize mt-2">
          Pellentesque Tortor Mollis
        </h1>
        <p className="text-md text-gray-600/70">
          Nulla vitae elit libero, a pharetra augue. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non
          commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
          elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
          venenatis vestibulum. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros. Cum sociis natoque penatibus et magnis dis
          parturient montes.
        </p>
      </div>

      {/* Pictures From Class */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold capitalize">
          Pictures From Class
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {classImages.map((classImage, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-center">
                <img src={classImage.image} alt={classImage.title} />
              </div>
              <p className="text-center text-md text-gray-600/70">
                {classImage.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* courseSections */}
      <div className="space-y-4">
        {course.modules.map((module, index) => (
          <>
            <div key={index}>
              <h2 className="font-bold text-xl capitalize">{module.title}</h2>
              {
                module.lessons.map((lesson, index) => (
                  <p className=""><span className="font-bold capitalize">Lesson {index+1}</span><span className="font-bold text-2xl">.</span> {lesson.title}</p>
                ))
              }
            </div>
            <p className="border border-b-2 border-gray-400/50" />
          </>
        ))}
      </div>
    </div>
  );
};

export default RightSide;
