import PageBreadcrumb from '@/instructor/components/common/PageBreadCrumb';
import { Button } from '@/instructor/components/ui/button';
import { Label } from '@/instructor/components/ui/label';
import AppLayout from '@/instructor/layouts/AppLayout';
import { CourseWithId, Lesson, ModuleWithId } from '@/types';
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

const AddLesson = ({ courses, modules }: CoursesProps) => {
    const { flash } = usePage<CustomPageProps>().props;
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
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

    const { data, setData, post, processing, errors, reset } = useForm<Required<Lesson>>({
        module_id: '',
        course_id: '',
        title: '',
        video_url: null,
        duration: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('store.lesson'), {
            forceFormData: true,
            onProgress: (progress) => {
                if (progress && progress.percentage !== undefined) {
                    setUploadProgress(progress.percentage || 0);
                }
            },
            onFinish: () => {
                setUploadProgress(null);
                reset('module_id', 'course_id', 'title', 'video_url', 'duration');
                setSelectedCourseId('');
                setFilteredModules([]);
            },
        });
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="Add Lesson" subTitle="All Lesson" link="/all/lesson" />
            <Head title="Add Lesson" />
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
                        </div>

                        {/* lesson title */}
                        <div className="mt-4 w-full space-y-2">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                Lesson Title
                            </Label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter Lesson Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                            {errors.title && <div className="mt-2 text-sm text-red-500">{errors.title}</div>}
                        </div>

                        {/* Video file upload  */}
                        <div className="mt-4 w-full space-y-2">
                            <Label htmlFor="video_url" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                Video Upload
                            </Label>
                            <input
                                type="file"
                                id="video_url"
                                name="video_url"
                                placeholder="Upload Video"
                                accept="video/*"
                                onChange={(e) => setData('video_url', e.target.files?.[0] || null)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                            {errors.video_url && <div className="mt-2 text-sm text-red-500">{errors.video_url}</div>}
                        </div>

                        {uploadProgress !== null && (
                            <div className="mt-4 w-full">
                                <div className="mb-1 text-sm font-medium text-gray-700 dark:text-white">Uploading: {uploadProgress.toFixed(0)}%</div>
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="bg-brand-500 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Duration */}
                        <div className="mt-4 w-full space-y-2">
                            <Label htmlFor="duration" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                Duration
                            </Label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                placeholder="Enter Duration"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                            {errors.duration && <div className="mt-2 text-sm text-red-500">{errors.duration}</div>}
                        </div>

                        <div>
                            <Button
                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Add Lesson
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default AddLesson;
