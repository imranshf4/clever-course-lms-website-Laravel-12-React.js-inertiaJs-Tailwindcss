import AppLayout from '@/layouts/AppLayout';
import { Orders } from '@/types';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
interface attendCourseWithProps {
    Orders: Orders[];
}

const AttendedCourse = ({ Orders }: attendCourseWithProps) => {
    return (
        <AppLayout>
            <Head title="Attended Courses" />
            <div className="space-y-3 rounded-md bg-white p-8 dark:bg-gray-900">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Attended Courses</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <thead className="bg-brand-900 text-left text-base font-semibold text-white dark:text-white/80">
                            <tr>
                                <th className="w-full px-4 py-3 md:w-6/8">Course Name</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Order Number</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Invoice Number</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {Orders.map((order, index) => (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="space-y-2">
                                            <h1 className="text-brand-900 text-base font-medium">{order.course.title }</h1>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium">Date:</h1>
                                                <p>
                                                    {dayjs(order.order_date).format('MMM D, YYYY')}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium">Price:</h1>
                                                <p>{order.amount == 0 ? 'Free' : `$${order.amount}`}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3 text-center uppercase dark:border-gray-700">
                                        <span className={`text-sm} inline-block rounded px-2 py-1 font-medium`}>{order.order_number}</span>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3 text-center uppercase dark:border-gray-700">
                                        <span className={`text-sm} inline-block rounded px-2 py-1 font-medium`}>{order.invoice_no}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm font-medium uppercase">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default AttendedCourse;
