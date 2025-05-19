import AppLayout from '@/admin/layouts/AppLayout';
import { CourseWithId, ModuleWithId, QuizWithId } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import { Label } from '@/admin/components/ui/label';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/admin/components/ui/table';
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

interface AllQuizProps {
    quizzes: QuizWithId[];
    courses: CourseWithId[];
    modules: ModuleWithId[];
}
const AllQuiz = ({ quizzes, courses, modules }: AllQuizProps) => {
    const { flash } = usePage<CustomPageProps>().props;
    const [filteredModules, setFilteredModules] = useState<ModuleWithId[]>([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState<QuizWithId[]>([]);

    // Inside component:
    const searchParams = new URLSearchParams(window.location.search);
    const initialCourseId = searchParams.get('course_id') || '';
    const initialModuleId = searchParams.get('module_id') || '';
    const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
    const [selectedModuleId, setSelectedModuleId] = useState(initialModuleId);

    // Filtered modules based on selected course
    useEffect(() => {
        if (selectedCourseId === '') {
            setFilteredModules([]);
        } else {
            setFilteredModules(modules.filter((m) => String(m.course_id) === selectedCourseId));
        }
    }, [selectedCourseId, modules]);

    // Filtered quizzes based on selected module
    useEffect(() => {
        if (selectedModuleId === '') {
            setFilteredQuizzes([]);
        } else {
            setFilteredQuizzes(quizzes.filter((q) => String(q.module_id) === selectedModuleId));
        }
    }, [selectedModuleId, quizzes]);

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
        router.delete(`/delete/quiz/${id}`); // Adjust URL as needed
    };

    return (
        <AppLayout>
            <Head title="All Quizzes" />
            <PageBreadcrumb pageTitle="All Quiz" subTitle="Add Quiz" link="/add/quiz" />

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

            {/* Filter by Module */}
            <div className="mt-4 w-full space-y-2">
                <Label htmlFor="module_id" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                    Filter by Module
                </Label>
                <select
                    id="module_id"
                    name="module_id"
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                >
                    <option value="">Select Module Name</option>
                    {filteredModules.map((module) => (
                        <option key={module.id} value={module.id}>
                            {module.title}
                        </option>
                    ))}
                </select>
            </div>
            {filteredQuizzes.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-4">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        ID
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Module Title
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Question
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Option A
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Option B
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Option C
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Option D
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Correct Answer
                                    </TableCell>
                                    <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {quizzes.map((quiz, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {quiz.module.title}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400 w-1/6">
                                            {quiz.question}
                                        </TableCell>

                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {quiz.option_a}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {quiz.option_b}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {quiz.option_c}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {quiz.option_d}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                            {quiz.correct_answer}
                                        </TableCell>
                                        <TableCell className="text-theme-sm space-x-2 px-4 py-3 text-gray-500 dark:text-gray-400">
                                            <Link
                                                href={`/edit/quiz/${quiz.id}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                                            >
                                                Edit
                                            </Link>
                                            <span>|</span>
                                            <button
                                                onClick={() => handleDelete(quiz.id)}
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
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">No quizzes found for the selected module.</div>
            )}
        </AppLayout>
    );
};

export default AllQuiz;
