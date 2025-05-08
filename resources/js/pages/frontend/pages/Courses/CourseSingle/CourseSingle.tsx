import FrontendLayout from '@/pages/layouts/FrontendLayout';
import { CourseWithId } from '@/types';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import BannerSection from '../../../components/BannerSection';
import RightSide from './RightSide';

interface CourseInfo {
    course: CourseWithId;
}
const CourseSingle = ({ course }: CourseInfo) => {
    //rating calculation
    const renderRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="inline-block text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="inline-block text-yellow-400" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="inline-block text-yellow-400" />);
        }

        return stars;
    };

    return (
        <FrontendLayout>
            <Head title="Course Single" />
            <BannerSection heading={`${course.title}`} />
            <div className="section-container flex flex-col items-start justify-between gap-8 md:flex-row">
                {/* right side */}
                <div className="order-2 md:order-1 md:w-5/8">
                    <RightSide course={course} />
                </div>

                {/* instructor info and price */}
                <div className="order-1 bg-gray-50 py-8 md:order-2 md:w-3/8 w-full">
                    <div className="flex justify-center">
                        <img src={course.user.avatar ?? '/backend/no_image.jpg'} className="rounded-full" alt={course.user.name} />
                    </div>
                    <div className="mt-8 space-y-4 md:space-y-4">
                        <div className="flex items-center gap-6 px-6">
                            <img src={'/frontend/assets/courses/singleCourse/icon/instructor.png'} alt="instructor" />
                            <h2 className="text-md text-gray-600/70">
                                <Link href="#">{course.user.name}</Link>
                            </h2>
                        </div>
                        <hr className="w-full text-gray-400/50" />

                        {course.category.name && (
                            <>
                                <div className="flex items-center gap-6 px-6">
                                    <img src="/frontend/assets/courses/singleCourse/icon/onsite-course.png" alt="" />
                                    <p className="text-md text-gray-600/70 capitalize">{course.category.name}</p>
                                </div>
                                <hr className="w-full text-gray-400/50" />
                            </>
                        )}

                        {course.start_date && (
                            <>
                                <div className="flex items-center gap-6 px-6">
                                    <img src={'/frontend/assets/courses/singleCourse/icon/calendar.png'} alt="date" />
                                    <p className="text-md text-gray-600/70">
                                        {dayjs(course.start_date).format('MMM D, YYYY')} - {dayjs(course.end_date).format('MMM D, YYYY')}
                                    </p>
                                </div>
                                <hr className="w-full text-gray-400/50" />
                            </>
                        )}

                        {course.user.location && (
                            <>
                                <div className="flex items-center gap-6 px-6">
                                    <img src={'/frontend/assets/courses/singleCourse/icon/location.png'} alt="locationIcon" className="h-7" />
                                    <p className="text-md text-gray-600/70">{course.user.location}</p>
                                </div>
                                <hr className="w-full text-gray-400/50" />
                            </>
                        )}

                        <div className="flex items-start gap-6 px-6">
                            <div>
                                <img src={'/frontend/assets/courses/singleCourse/icon/enrolled.png'} alt="" />
                            </div>

                            <div className="">
                                <p className="text-md text-gray-600/70">{course.user_count} Students Enrolled</p>
                                <p className="text-md text-gray-600/70">(50 Available)</p>
                            </div>
                        </div>
                        <hr className="w-full text-gray-400/50" />

                        <p className="text-md px-6 text-gray-600/70">
                            {renderRating(course.sumRatings)} ({course.getRatingCountAttribute} Ratings)
                        </p>
                        <hr className="w-full text-gray-400/50" />

                        <div className="flex items-center gap-4 px-6">
                            <p className="text-2xl font-bold text-gray-900">Price</p>
                            {course.discount_price && <p className="text-md text-buyBtn line-through">${course.discount_price}</p>}
                            {course.price && <p className="text-2xl font-bold text-buyBtn">{course.price == "Free"? "Free" : `$${course.price}`}</p>}
                        </div>
                        <hr className="w-full text-gray-400/50" />

                        <div className="flex items-center gap-6 px-6">
                            <button className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-4 py-2 text-white transition-colors sm:px-5 sm:py-3">
                                <Link href={'#'}>Buy Now</Link>
                            </button>

                            <button className="bg-bookBtn hover:bg-bookBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-4 py-2 text-white transition-colors sm:px-5 sm:py-3">
                                <Link href={'#'}>Book Now</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
};

export default CourseSingle;
