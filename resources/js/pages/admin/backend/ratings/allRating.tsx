import AppLayout from '@/admin/layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import Label from '@/admin/components/form/Label';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/admin/components/ui/table';
import { useEffect, useState } from 'react';
import { Course, CourseWithId, Rating, RatingWithId } from '@/types';

export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}

interface AllRatingProps {
    ratings: RatingWithId[];
    courses: CourseWithId[];
}

const AllRating = ({ ratings,courses }: AllRatingProps) => {
    const [message, setMessage] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [filteredModules, setFilteredModules] = useState<RatingWithId[]>([]);

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
        router.delete(`/delete/rating/${id}`);
    };

    useEffect(() => {
        if (selectedCourseId === '') {
            setFilteredModules([]);
        } else {
            setFilteredModules(ratings.filter((m) => String(m.course_id) === selectedCourseId));
        }
    }, [selectedCourseId]);

    return (
        <AppLayout>
            <Head title="All Module" />
            <PageBreadcrumb pageTitle="All Module" subTitle="Add Module" link="/add/module" />

            {/* Course ID */}
            <div className="mt-4 w-full space-y-2">
                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                    Filter by Course
                </Label>
                <select
                    id="course_id"
                    name="course_id"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full
                     appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400
                      focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                >
                    <option value="">Select Course Name</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>

            {filteredModules.length != 0 ? (
                <div className="mt-4 overflow-hidden border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Rating ID
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Rating Comment
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Rating Course 
                                    </TableCell>

                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredModules.map((rating, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {rating.comment}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {rating.course.title}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400 space-x-4">
                                           
                                            <button
                                                onClick={() => handleDelete(rating.id)}
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
            ) : (
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">No modules found for the selected course.</div>
            )}

            {/* Table */}
        </AppLayout>
    );
};

export default AllRating;
