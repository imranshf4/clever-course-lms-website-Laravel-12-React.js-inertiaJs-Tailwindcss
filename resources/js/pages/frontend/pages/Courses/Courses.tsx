import FrontendLayout from '@/pages/layouts/FrontendLayout';
import { CourseWithId } from '@/types';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import BannerSection from '../../components/BannerSection';

interface CourseProps {
    courses: CourseWithId[];
}

const Courses = ({ courses }: CourseProps) => {
    const [displayedCourses, setDisplayedCourses] = useState<CourseWithId[]>([]);
    const [visitedCourses, setVisitedCourses] = useState<CourseWithId[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const coursesPerPage = 6;

    // Load visited courses and set initial display
    useEffect(() => {
        const visited = JSON.parse(String(localStorage.getItem('visitedCourses'))) || [];
        setVisitedCourses(visited);

        // On first load, show default courses if no visited courses exist
        if (visited.length === 0) {
            setDisplayedCourses(courses.slice(0, coursesPerPage));
        } else {
            setDisplayedCourses(visited.slice(0, coursesPerPage));
        }
    }, []);

    // Update displayed courses when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * coursesPerPage;
        const endIndex = startIndex + coursesPerPage;

        if (visitedCourses.length > 0) {
            setDisplayedCourses(visitedCourses.slice(startIndex, endIndex));
        } else {
            setDisplayedCourses(courses.slice(startIndex, endIndex));
        }
    }, [currentPage, visitedCourses]);

    const totalPages = Math.ceil(visitedCourses.length > 0 ? visitedCourses.length / coursesPerPage : courses.length / coursesPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const trackVisit = (courseId: number) => {
        const visited = JSON.parse(String(localStorage.getItem('visitedCourses'))) || [];
        if (!visited.includes(courseId)) {
            const updatedVisited: any = [...visited, courseId];
            localStorage.setItem('visitedCourses', JSON.stringify(updatedVisited));
            setVisitedCourses(updatedVisited);
        }
    };

    //rating calculation
    const renderRating = (rating: any) => {
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
            <Head title="Courses" />
            <BannerSection heading="Courses" />
            <div className="">
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="">
                        {displayedCourses.length > 0 ? (
                            <>
                                <div className="container mx-auto max-w-screen-2xl px-12 md:px-15">
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                        {displayedCourses.map((course) => (
                                            <div key={course.id} className="overflow-hidden rounded-lg transition duration-300">
                                                <div className="relative">
                                                    <Link href="/single/course" className="block" onClick={() => trackVisit(course.id)}>
                                                        <img
                                                            src={typeof course.image == 'string' ? course.image : "/backend/'no_image.png"}
                                                            alt={course.title}
                                                            className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className='pt-4'>
                                                    <div>
                                                        <h1 className="mt-4 mb-2 text-xl font-semibold">
                                                            <Link href={`/single/course/${course.slug}/${course.id}`} className="text-xl font-bold text-gray-900 uppercase">
                                                                {course.title}
                                                            </Link>
                                                        </h1>
                                                        {/* Rest of your course card content */}
                                                    </div>

                                                    <div className="mb-4 flex items-center">
                                                        <div className="mr-2 flex">
                                                            {course.sumRatings > 0 ? renderRating(course.sumRatings) : renderRating(0)}
                                                        </div>
                                                        <span className="text-sm text-gray-600">({course.getRatingCountAttribute} ratings)</span>
                                                    </div>

                                                    <div className="mb-4 space-y-3">
                                                        <div className="flex gap-4">
                                                            <span className="font-bold text-gray-600">Instructor</span>
                                                            <Link href={'#'} className="text-gray-400 capitalize">
                                                                {course.user.name}
                                                            </Link>
                                                        </div>

                                                        <div className="flex gap-4">
                                                            <span className="font-bold text-gray-600">Type</span>
                                                            <span className="text-gray-400 capitalize">{course.category.name}</span>
                                                        </div>

                                                        <div className="flex gap-4">
                                                            <span className="font-medium text-gray-600">Date</span>
                                                            <span className="text-gray-400">
                                                                {dayjs(course.start_date).format('MMM D, YYYY')} -{' '}
                                                                {dayjs(course.end_date).format('MMM D, YYYY')}
                                                            </span>
                                                        </div>

                                                        <div className="flex gap-4">
                                                            <span className="font-bold text-gray-600">Students Enrolled</span>
                                                            <span className="text-gray-400">{course.user_count}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mb-6 flex items-center gap-4">
                                                        <span className="font-bold text-gray-600">Price</span>
                                                        {course.discount_price ? (
                                                            <div className="flex items-center">
                                                                <span className="text-buyBtn mr-2 line-through">${course.price}</span>
                                                                <span className="text-buyBtn text-xl font-bold">${course.discount_price}</span>
                                                            </div>
                                                        ) : (
                                                            <span
                                                                className={`text-xl font-bold ${course.price === 'Free' ? 'text-buyBtn' : 'text-buyBtn'}`}
                                                            >
                                                                {course.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex space-x-3">
                                                        <button className="bg-buyBtn hover:bg-buyBtn/90 flex-1 cursor-pointer border-b-2 border-[#65b4ad] py-4 text-white transition-colors">
                                                            Buy Now
                                                        </button>
                                                        <button className="bg-bookBtn hover:bg-bookBtn/90 flex-1 cursor-pointer border-b-2 border-[#4aacc0] py-4 text-white transition-colors">
                                                            Book Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-end">
                                        <nav className="flex items-center space-x-2">
                                            {currentPage > 1 && (
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
                                                    className="text-md hover:bg-buyBtn rounded-md bg-gray-200 px-3 py-2 text-gray-700"
                                                >
                                                    ‹ Previous
                                                </button>
                                            )}

                                            {Array.from({ length: totalPages }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => paginate(index + 1)}
                                                    className={`text-md rounded-md px-3 py-2 ${
                                                        currentPage === index + 1
                                                            ? 'bg-buyBtn font-medium text-gray-700'
                                                            : 'hover:bg-buyBtn bg-gray-200 text-gray-400'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}

                                            {currentPage < totalPages && (
                                                <button
                                                    onClick={() => paginate(currentPage + 1)}
                                                    className="text-md hover:bg-buyBtn rounded-md bg-gray-200 px-3 py-2 text-gray-700"
                                                >
                                                    Next ›
                                                </button>
                                            )}
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-12 text-center">
                                <h3 className="text-xl font-semibold">No courses available</h3>
                                <p className="mt-2 text-gray-600">Please check back later</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </FrontendLayout>
    );
};

export default Courses;
