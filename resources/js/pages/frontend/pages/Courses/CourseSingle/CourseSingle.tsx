import FrontendLayout from '@/pages/layouts/FrontendLayout';
import { CourseWithId } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import BannerSection from '../../../components/BannerSection';
import RightSide from './RightSide';

interface CheckoutFormProps {
    onPaymentSuccess: (token: string) => void;
}

const stripePromise = loadStripe('pk_test_51RPCy1PglUmB3GStuJg3aPJIPc2D2TPyVuXriZGayOy52IVBi2AZl5yEKohBdVZFmJHn52suiB0EohNBHtkdEBqK00FmjUHjGx');

const CheckoutForm = ({ onPaymentSuccess }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { post, data, setData } = useForm({
        stripeToken: '',
    });
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Card element not found.');
            return;
        }

        const result = await stripe.createToken(card);

        if (result.error) {
            setError(result.error.message || 'Payment failed.');
            return;
        }

        onPaymentSuccess(result.token.id);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
            <label className="mb-2 block">Credit or debit card</label>
            <CardElement className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 py-3 pr-6 pl-4" />
            {error && <div className="mt-2 text-red-500">{error}</div>}
            <button type="submit" className="bg-brand-600 mt-4 rounded px-4 py-2 text-white" disabled={!stripe}>
                Submit Payment
            </button>
        </form>
    );
};

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

    const handleBuyNow = () => {
        router.post(`/buy/${course.slug}/${course.id}`, {
            amount: course.discount_price ? course.discount_price : course.price,
        });
    };
    const handleBuyNowCard = (stripeToken: string) => {
        router.post(
            `/buy/card/${course.slug}/${course.id}`,
            {
                stripeToken,
                amount: course.discount_price ? course.discount_price : course.price,
            },
            {
                onError: () => {
                    alert('Payment failed. Please try again.');
                },
            },
        );
    };

    //modal
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const openModal = () => {
        setIsPaymentModalOpen(true);
    };
    const closeModal = () => setIsPaymentModalOpen(false);

    const handleBookNow = () => {};

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
                <div className="order-1 w-full bg-gray-50 py-8 md:order-2 md:w-3/8">
                    <div className="flex justify-center">
                        <img
                            src={typeof course.user.avatar === 'string' && course.user.avatar ? course.user.avatar : '/backend/no_image.jpg'}
                            className="rounded-full"
                            alt={course.user.name}
                        />{' '}
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
                            {course.price && <p className="text-buyBtn text-2xl font-bold">{course.price == '0' ? 'Free' : `$${course.price}`}</p>}
                        </div>
                        <hr className="w-full text-gray-400/50" />

                        <div className="flex items-center gap-6 px-6">
                            {course.price == '0' ? (
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-4 
                                    py-2 text-white transition-colors sm:px-5 sm:py-3"
                                >
                                    Buy Now
                                </button>
                            ) : (
                                <button
                                    onClick={openModal}
                                    className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-4
                                     py-2 text-white transition-colors sm:px-5 sm:py-3"
                                >
                                    Buy Now
                                </button>
                            )}

                            <Link href={`/book/${course.slug}/${course.id}`}>
                                <button className="bg-bookBtn hover:bg-bookBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-4
                                 py-2 text-white transition-colors sm:px-5 sm:py-3">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            {isPaymentModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/70">
                    <div className="relative w-full max-w-lg rounded-lg bg-white/90 p-5 shadow-lg">
                        <button
                            className="absolute top-3 right-3 rounded-full bg-black px-2 text-lg text-white hover:text-white"
                            onClick={closeModal}
                        >
                            {' '}
                            &times;{' '}
                        </button>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm onPaymentSuccess={handleBuyNowCard} />
                        </Elements>

                        {/* <div className="py-15">
                            <div className="space-y-4 px-8">
                                <h1 className="w-full text-center">Online Payment Method</h1>
                                <button className="bg-buyBtn hover:bg-buyBtn/90 mt-1 w-full cursor-pointer border-b-2 border-[#65b4ad] px-4 py-2 text-center text-white transition-colors sm:px-5 sm:py-3">
                                    Pay Now
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </FrontendLayout>
    );
};

export default CourseSingle;
