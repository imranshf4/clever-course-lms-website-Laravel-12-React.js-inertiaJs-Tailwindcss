import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import { Label } from '@/admin/components/ui/label';
import AppLayout from '@/admin/layouts/AppLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import { Button } from '@/admin/components/ui/button';
import { CourseWithId, Module, ModuleWithId } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}


interface EditModuleProps {
    module: ModuleWithId;
    courses: ModuleWithId[]; // Replace with the actual type of courses if available
}

const EditModule = ({ courses,module }: EditModuleProps) => {
    const [message, setMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

    const { data, setData, post, processing, errors, reset } = useForm<Required<Module>>({
        course_id: module.course.id.toString(),
        title: module.title,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('update.module',{id: module.id}), {
            onFinish: () => reset('course_id', 'title'),
        });
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="Edit Module" subTitle="All Module" link="/all/module" />
            <Head title="Edit Module" />
            <div>
                <div className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div>
                            {/* Title */}
                            <div className="w-full">
                                <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Course title
                                </Label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    placeholder="Enter your course title"
                                    onChange={(e) => setData('title', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />

                                {errors.title && <div className="mt-2 text-sm text-red-500">{errors.title}</div>}
                            </div>
                        </div>
                        {/* Course ID */}
                        <div className="mt-4 w-full space-y-2">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                Select Course
                            </Label>
                            <select
                                id="course_id"
                                name="course_id"
                                value={data.course_id}
                                onChange={(e) => setData('course_id', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            >
                                <option value="">Select Course Name</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>

                            {errors.course_id && <div className="mt-2 text-sm text-red-500">{errors.course_id}</div>}
                        </div>

                        <div>
                            <Button
                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Update Module
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditModule;
