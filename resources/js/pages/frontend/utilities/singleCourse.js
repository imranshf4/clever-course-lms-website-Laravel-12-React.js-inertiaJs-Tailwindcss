import image1 from "../../../../../public/frontend/assets/courses/singleCourse/ricardo-150x150.jpg";

import image5 from "../../../../../public/frontend/assets/courses/singleCourse/icon/enrolled.png";


import image7 from "../../../../../public/frontend/assets/courses/singleCourse/Fotolia_5365890_Subscription_Monthly_XXL-300x209.jpg";
import image8 from "../../../../../public/frontend/assets/courses/singleCourse/Fotolia_24720505_Subscription_Monthly_XXL-300x200.jpg";
import image9 from "../../../../../public/frontend/assets/courses/singleCourse/Fotolia_22324506_Subscription_Monthly_XL-300x199.jpg";
import image10 from "../../../../../public/frontend/assets/courses/singleCourse/Fotolia_26408928_Subscription_Monthly_XXL-300x200.jpg";
import image11 from "../../../../../public/frontend/assets/courses/singleCourse/Fotolia_1181532_Subscription_Monthly_L-300x200.jpg";
import image12 from "../../../../../public/frontend/assets/courses/singleCourse/Fotolia_4244474_Subscription_Monthly_XL-300x200.jpg";

export const courseSections = [
  { id: 1, section: "Section 1", title: "Introduction" },
  { id: 2, section: "Section 2", title: "Speech Technique" },
  { id: 3, section: "Section 3", title: "Dos and Don'ts" },
  { id: 4, section: "Section 4", title: "Study Your Competitor" },
  { id: 5, section: "Section 5", title: "Making A Good Team" },
  { id: 6, section: "Section 6", title: "Conclusion" },
];

export const courseInfo = {
  instructor: "Ricardo Paulson",
  // instructorIcon: image2,
  image: image1,
  // typeIcon: image3,
  type: "Onsite Course",
  // dateIcon: image6,
  date: {
    start: "Mar 2, 2015",
    end: "Mar 6, 2015",
  },
  location: "Hilton Hotel, Grand Ballroom, East Street, London",
  // locationIcon: image4,
  enrollment: {
    enrolled: 222,
    available: 1778,
  },
  // enrollmentIcon: image5,
  ratings: 1,
  price: {
    original: "$99",
    discounted: "$89",
  },
};

export const classImages = [
  {
    id: 1,
    image: image7,
    title: "Smile",
  },
  {
    id: 2,
    image: image8,
    title: "Working",
  },
  {
    id: 3,
    image: image9,
    title: "Students",
  },
  {
    id: 4,
    image: image10,
    title: "Student",
  },
  {
    id: 5,
    image: image11,
    title: "Library",
  },
  {
    id: 6,
    image: image12,
    title: "Clock",
  },
];
