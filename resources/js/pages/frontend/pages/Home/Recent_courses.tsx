
import dayjs from 'dayjs';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { CourseWithId } from '@/types';
import { Link } from '@inertiajs/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
interface recentCourseProps {
    recentCourse: CourseWithId[];
}
const Recent_courses = ({ recentCourse }: recentCourseProps) => {
    return (
        <div className="">
            <section className="section-container">
                <div>
                    <h1 className="text-center text-2xl uppercase sm:text-3xl">Recent Courses</h1>
                    <div className="my-4 text-center">
                        <Link href="/courses" className="text-buyBtn capitalize">
                            View all course
                        </Link>
                    </div>
                </div>
                <div>
                    {recentCourse.length > 0 ? (
                        <>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                pagination={{
                                    clickable: false,
                                }}
                                navigation={true}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    '@0.00': {
                                        slidesPerView: 1,
                                        spaceBetween: 10,
                                    },
                                    '@0.75': {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    '@1.00': {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    '@1.50': {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                }}
                                modules={[Pagination, Autoplay, Navigation]}
                                className="mySwiper recentSlide relative"
                            >
                                {recentCourse.map((course) => (
                                    <SwiperSlide key={course.id}>
                                        <div className="overflow-hidden bg-white transition duration-300">
                                            <div className="relative">
                                                <Link href={`/single/course/${course.slug}/${course.id}`} className="block">
                                                    <img
                                                        src={typeof course.image == 'string' ? course.image : '/backend/no_image.png'}
                                                        alt={course.title}
                                                        className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                                                    />
                                                </Link>
                                            </div>

                                            {/* course description */}
                                            <div className="border-buyBtn space-y-4 border-b-2 bg-gray-100 px-4 py-6">
                                                <div>
                                                    <h1 className="mb-2 text-xl font-semibold">
                                                        <Link href={`/single/course/${course.slug}/${course.id}`} className="text-xl font-bold text-gray-900 uppercase">
                                                            {course.title}
                                                        </Link>
                                                    </h1>
                                                    {/* Rest of your course card content */}
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between space-x-3">
                                                        <div>
                                                            <button className="bg-buyBtn hover:bg-buyBtn/90 px-6 py-2 text-white transition-colors">
                                                                {course.discount_price ? `$${course.discount_price}` : (course.price == "Free" ? 'Free' : `$${course.price}`)}
                                                            </button>
                                                        </div>
                                                        <p className='text-gray-500'>{dayjs(course.start_date).format('MMM D, YYYY')} - {dayjs(course.end_date).format('MMM D, YYYY')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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
    );
};

export default Recent_courses;
