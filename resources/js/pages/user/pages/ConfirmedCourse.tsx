import AppLayout from '@/layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Orders } from '@/types';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';
import { useEffect } from 'react';
interface confirmedCourseWithProps {
    orders: Orders[];
}
export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}


const ConfirmedCourse = ({ orders }: confirmedCourseWithProps) => {
    const { flash } = usePage<CustomPageProps>().props;
    useEffect(() => {
        if (flash?.success) {
            toastr.success(flash.success);
        }
        if (flash?.error) {
            toastr.error(flash.error);
        }
        if (flash?.warning) {
            toastr.warning(flash.warning);
        }
    }, [flash]);
    return (
        <AppLayout>
            <Head title="Confirmed Courses" />
            <div className="space-y-3 dark:bg-gray-900 bg-white p-8 rounded-md">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Confirmed Courses</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                        <thead className="bg-brand-900 text-left text-base font-semibold text-white dark:text-white/80">
                            <tr>
                                <th className="w-full px-4 py-3 md:w-6/8">Course Name</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Status</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Code</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {orders.map((order, index) => (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="space-y-2">
                                            <Link href="/course/details" className="text-brand-900 text-base font-medium">
                                                {order.course.title}
                                            </Link>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium">Date:</h1>
                                                <p>{order.order_date}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium">Price:</h1>
                                                <p>{order.amount}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center uppercase">
                                        <span className={`text-sm} inline-block rounded px-2 py-1 font-medium`}>{order.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm font-medium uppercase">{ order.order_number }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default ConfirmedCourse;
