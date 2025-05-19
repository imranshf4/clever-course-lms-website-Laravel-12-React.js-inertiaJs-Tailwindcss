import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import { Button } from '@/admin/components/ui/button';
import { Label } from '@/admin/components/ui/label';
import AppLayout from '@/admin/layouts/AppLayout';
import { CourseWithId, ModuleWithId, Quiz } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}

interface CoursesProps {
    courses: CourseWithId[];
    modules: ModuleWithId[];
}

const AddQuiz = ({ courses, modules }: CoursesProps) => {
    const [message, setMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { flash } = usePage<CustomPageProps>().props;
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [filteredModules, setFilteredModules] = useState<ModuleWithId[]>(modules);

    useEffect(() => {
        if (selectedCourseId === '') {
            setFilteredModules([]);
        } else {
            setFilteredModules(modules.filter((m) => String(m.course_id) === selectedCourseId));
        }
    }, [selectedCourseId, modules]);

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

    const { data, setData, post, processing, errors, reset } = useForm<Required<Quiz>>({
        course_id: '',
        module_id: '',
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('store.quiz'), {
            onFinish: () => {
                reset('course_id', 'module_id', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer');
                setSelectedCourseId('');
            },
        });
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="Add Quiz" subTitle="All Quiz" link="/all/quiz" />
            <Head title="Add Quiz" />
            <div>
                <div className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div>
                            {/* Course Name */}
                            <div className="mt-4 w-full space-y-2">
                                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Course Name
                                </Label>
                                <select
                                    id="course_id"
                                    name="course_id"
                                    value={data.course_id}
                                    onChange={(e) => {
                                        setData('course_id', e.target.value);
                                        setSelectedCourseId(e.target.value);
                                    }}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                >
                                    <option value="">
                                        <div className="py-8">Select Course Name</div>
                                    </option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            <div className="py-8">{course.title}</div>
                                        </option>
                                    ))}
                                </select>

                                {errors.course_id && <div className="mt-2 text-sm text-red-500">{errors.course_id}</div>}
                            </div>

                            {/* Module Name */}
                            <div className="mt-4 w-full space-y-2">
                                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Module Name
                                </Label>
                                <select
                                    id="module_id"
                                    name="module_id"
                                    value={data.module_id}
                                    onChange={(e) => setData('module_id', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                >
                                    <option value="">Select Module Name</option>
                                    {filteredModules.map((module) => (
                                        <option key={module.id} value={module.id}>
                                            {module.title}
                                        </option>
                                    ))}
                                </select>

                                {errors.module_id && <div className="mt-2 text-sm text-red-500">{errors.module_id}</div>}
                            </div>

                            {/* Title */}
                            <div className="w-full mt-4 space-y-2">
                                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Quiz question
                                </Label>
                                <input
                                    type="text"
                                    id="question"
                                    name="question"
                                    value={data.question}
                                    placeholder="Enter your Quiz question"
                                    onChange={(e) => setData('question', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />

                                {errors.question && <div className="mt-2 text-sm text-red-500">{errors.question}</div>}
                            </div>
                        </div>

                        {/* option a */}
                        <div className="mt-4 w-full">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                option a
                            </Label>
                            <input
                                type="text"
                                id="option_a"
                                name="option_a"
                                value={data.option_a}
                                placeholder="Enter your Quiz option a"
                                onChange={(e) => setData('option_a', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            {errors.option_a && <div className="mt-2 text-sm text-red-500">{errors.option_a}</div>}
                        </div>

                        {/* option b */}
                        <div className="mt-4 w-full">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                option b
                            </Label>
                            <input
                                type="text"
                                id="option_b"
                                name="option_b"
                                value={data.option_b}
                                placeholder="Enter your Quiz option b"
                                onChange={(e) => setData('option_b', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            {errors.option_b && <div className="mt-2 text-sm text-red-500">{errors.option_b}</div>}
                        </div>

                        {/* option c */}
                        <div className="mt-4 w-full">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                option c
                            </Label>
                            <input
                                type="text"
                                id="option_c"
                                name="option_c"
                                value={data.option_c}
                                placeholder="Enter your Quiz option c"
                                onChange={(e) => setData('option_c', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            {errors.option_c && <div className="mt-2 text-sm text-red-500">{errors.option_c}</div>}
                        </div>

                        {/* option d */}
                        <div className="mt-4 w-full">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                option d
                            </Label>
                            <input
                                type="text"
                                id="option_d"
                                name="option_d"
                                value={data.option_d}
                                placeholder="Enter your Quiz option d"
                                onChange={(e) => setData('option_d', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            {errors.option_d && <div className="mt-2 text-sm text-red-500">{errors.option_d}</div>}
                        </div>

                        {/* Title */}
                        <div className="mt-4 w-full">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                correct answer
                            </Label>
                            <input
                                type="text"
                                id="correct_answer"
                                name="correct_answer"
                                value={data.correct_answer}
                                placeholder="Enter your Quiz correct answer"
                                onChange={(e) => setData('correct_answer', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            {errors.correct_answer && <div className="mt-2 text-sm text-red-500">{errors.correct_answer}</div>}
                        </div>

                        <div>
                            <Button
                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Add Quiz
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default AddQuiz;
