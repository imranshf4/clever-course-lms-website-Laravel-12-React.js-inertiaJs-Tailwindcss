import AppLayout from '@/admin/layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import Label from '@/admin/components/form/Label';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/admin/components/ui/table';
import { CourseWithId, ModuleWithId, OrderWithId } from '@/types';
import { useEffect, useState } from 'react';

export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}

interface AllPendingOrdersProps {
    orders: OrderWithId[];
    courses: CourseWithId[];
}

const AllConfirmedOrders = ({ orders, courses }: AllPendingOrdersProps) => {
    const [message, setMessage] = useState('');

    // Inside component:
    const searchParams = new URLSearchParams(window.location.search);
    const initialCourseId = searchParams.get('course_id') || '';

    const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
    const [filteredOrders, setFilteredOrders] = useState<OrderWithId[]>(orders);

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

    const handleUpdate = (id: number) => {
        router.post(`/update/order/status/${id}`);
    };

    useEffect(() => {
        if (selectedCourseId === '') {
            setFilteredOrders([]);
        } else {
            setFilteredOrders(orders.filter((order) => String(order.course_id) === selectedCourseId));
        }
    }, [selectedCourseId, orders]);

    return (
        <AppLayout>
            <Head title="Confirmed Orders" />
            <PageBreadcrumb pageTitle="Confirmed Orders" subTitle="Confirmed Orders" link="/confirmed/order" />

            {/* Filter by Course */}
            <div className="mt-4 w-full space-y-2">
                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                    Filter by Course
                </Label>
                <select
                    id="course_id"
                    name="course_id"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                >
                    <option value="">Select Course Name</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>

            {filteredOrders.length != 0 ? (
                <div className="mt-4 overflow-hidden border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        ID
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Order Number
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                       Instructor Name
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Course Name
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Price
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredOrders.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {order.order_number}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {order.course.user.name}
                                        </TableCell>

                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {order.course.title}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {order.amount}
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">No Orders found for the selected course.</div>
            )}

            {/* Table */}
        </AppLayout>
    );
};

export default AllConfirmedOrders;
