import AppLayout from '@/admin/layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import Label from '@/admin/components/form/Label';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/admin/components/ui/table';
import { CourseWithId, LessonWithId, ModuleWithId } from '@/types';
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

interface AllModuleProps {
    modules: ModuleWithId[];
    courses: CourseWithId[];
    lessons: LessonWithId[];
}

const AllLesson = ({ modules, courses, lessons }: AllModuleProps) => {
    const [message, setMessage] = useState('');

    // Inside component:
    const searchParams = new URLSearchParams(window.location.search);
    const initialCourseId = searchParams.get('course_id') || '';
    const initialModuleId = searchParams.get('module_id') || '';

    const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
    const [selectedModuleId, setSelectedModuleId] = useState(initialModuleId);
    const [filteredModules, setFilteredModules] = useState<ModuleWithId[]>([]);
    const [filteredLessons, setFilteredLessons] = useState<LessonWithId[]>([]);

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
        router.delete(`/delete/lesson/${id}`);
    };

    // filter by course id
    useEffect(() => {
        if (selectedCourseId === '') {
            setFilteredModules([]);
        } else {
            setFilteredModules(modules.filter((m) => String(m.course_id) === selectedCourseId));
        }
    }, [selectedCourseId, modules]);

    // filter by module id
    useEffect(() => {
        if (selectedModuleId === '') {
            setFilteredLessons([]);
        } else {
            setFilteredLessons(lessons.filter((lesson) => String(lesson.module_id) === selectedModuleId));
        }
    }, [selectedModuleId, lessons]);

    
    return (
        <AppLayout>
            <Head title="All Lesson" />
            <PageBreadcrumb pageTitle="All Lesson" subTitle="Add Lesson" link="/add/lesson" />

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
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                >
                    <option value="">Select Course Name</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filter by Module */}
            <div className="mt-4 w-full space-y-2">
                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                    Filter by Module
                </Label>
                <select
                    id="module_id"
                    name="module_id"
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                >
                    <option value="">Select Module Name</option>
                    {filteredModules.map((module) => (
                        <option key={module.id} value={module.id}>
                            {module.title}
                        </option>
                    ))}
                </select>
            </div>

            {filteredLessons.length != 0 ? (
                <div className="mt-6 overflow-hidden border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        ID
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Module Name
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Lesson Name
                                    </TableCell>

                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400 w-1/6">                                       
                                        Video file
                                    </TableCell>

                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Duration
                                    </TableCell>

                                    

                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredLessons.map((lesson, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {lesson.module.title}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {lesson.title}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {String(lesson.video_url)}
                                        </TableCell>

                                        <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {lesson.duration}
                                        </TableCell>

                                        <TableCell className="text-theme-sm space-x-4 px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                            <button
                                                onClick={() => router.get(`/edit/lesson/${lesson.id}`)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <span>|</span>
                                            <button
                                                onClick={() => handleDelete(lesson.id)}
                                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm text-white transition"
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
                <div className="mt-4 w-full space-y-2 text-center text-gray-500 dark:text-gray-400">
                    <p>No lessons found for the selected module.</p>
                </div>
            )}

            {/* Table */}
        </AppLayout>
    );
};

export default AllLesson;
