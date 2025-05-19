import AppLayout from '@/instructor/layouts/AppLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/instructor/components/ui/table';
import { useEffect, useState } from 'react';
import { CourseWithId } from '@/types';
import PageBreadcrumb from '@/instructor/components/common/PageBreadCrumb';

export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}

interface AllCourseProps {
    courses: CourseWithId[]; // Adjust type based on the structure of your courses
}

const AllCourse = ({ courses }: AllCourseProps) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [message, setMessage] = useState('');

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

    const handleDelete = (id: number) => {
        router.delete(`/delete/course/${id}`); // Adjust URL as needed
    };

    return (
        <AppLayout>
            <Head title="All Courses" />
            <PageBreadcrumb pageTitle="All Course" subTitle="Add Course"  link='/add/course'  />
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    ID
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course Title
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course Type
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course Price
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Discount Price
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course Duration
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course Start Date
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course End Date
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Course Image
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {courses.map((course, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">{index+1}</TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400 w-1/6">{course.title}</TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {course.category.name}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {course.price == '0' ? 'Free' : `$${course.price}`}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {course.discount_price ? `$${course.discount_price}` : 'No Discount'} 
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {course.duration} Months
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {course.start_date}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {course.end_date}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        <img src={typeof course.image === "string" ? course.image : '/backend/no_image.jpg'} alt={course.title} className="h-12 w-32 object-cover" />
                                    </TableCell>
                                    <TableCell className="text-theme-sm space-x-2 px-4 py-3 text-gray-500 dark:text-gray-400">
                                        <Link
                                            href={`/edit/course/${course.id}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                                        >
                                            Edit
                                        </Link>
                                        <span>|</span>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition"
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
};

export default AllCourse;
