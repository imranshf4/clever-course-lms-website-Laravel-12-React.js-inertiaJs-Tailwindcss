import AppLayout from '@/layouts/AppLayout';
import { useState } from 'react';
const courses = [
    {
        name: 'Intro to React',
        status: 'pending',
    },
    {
        name: 'Advanced JavaScript',
        status: 'pending',
    },
    {
        name: 'UI/UX Design Basics',
        status: 'pending',
    },
];

const BookedCourse = () => {
    const [isSetPaymentModal, setPaymentModal] = useState(false);

    const openModal = () => setPaymentModal(true);
    const closeModal = () => setPaymentModal(false);

    return (
        <AppLayout>
            <div className="space-y-3 dark:bg-gray-900 bg-white p-8 rounded-md">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">booked Courses</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-200  dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                        <thead className="bg-brand-900 text-left text-base font-semibold text-white dark:text-white/80">
                            <tr>
                                <th className="w-full px-4 py-3 md:w-5/8">Course Name</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Status</th>
                                <th className="w-full px-4 py-3 text-center md:w-2/8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {courses.map((course, index) => (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-3">
                                        <h1 className="text-brand-900 text-base font-medium">{course.name}</h1>
                                    </td>
                                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center">
                                        <span className={`text-sm} inline-block rounded px-2 py-1 font-medium`}>{course.status}</span>
                                    </td>
                                    <td className="text-brand-900 px-4 py-3 text-center text-sm font-medium capitalize">
                                        <span onClick={openModal} className="cursor-pointer">
                                            submit payment
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* modal */}
            {isSetPaymentModal && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/70">
                    <div className="relative w-full max-w-lg rounded-lg bg-white/90 p-5 shadow-lg">
                        <button
                            className="absolute top-3 right-3 rounded-full bg-black px-2 text-lg text-white hover:text-white"
                            onClick={closeModal}
                        >
                            {' '}
                            &times;{' '}
                        </button>

                        <div className="py-15">
                            <div className="space-y-4 px-8">
                                <h1 className="w-full text-center">Online Payment Method</h1>
                                <button className="bg-buyBtn hover:bg-buyBtn/90 mt-1 w-full cursor-pointer border-b-2 border-[#65b4ad] px-4 py-2 text-center text-white transition-colors sm:px-5 sm:py-3">
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default BookedCourse;
