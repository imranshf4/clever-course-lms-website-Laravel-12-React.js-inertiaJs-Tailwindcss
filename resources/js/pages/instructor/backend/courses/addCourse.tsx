import PageBreadcrumb from '@/instructor/components/common/PageBreadCrumb';
import FileInput from '@/instructor/components/form/input/FileInput';
import { Input } from '@/instructor/components/ui/input';
import { Label } from '@/instructor/components/ui/label';
import AppLayout from '@/instructor/layouts/AppLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import { Button } from '@/instructor/components/ui/button';
import { CategoryWithId, Course } from '@/types';
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

interface CoursesProps {
    categories: CategoryWithId[];
}
const AddCourse = ({ categories }: CoursesProps) => {
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

    const { data, setData, post, processing, errors, reset } = useForm<Required<Course>>({
        title: '',
        image: null,
        type: '',
        start_date: '',
        duration: '',
        price: '',
        discount_price: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('store.course'), {
            onFinish: () => reset('title', 'type', 'image', 'start_date', 'duration', 'price', 'discount_price'),
        });
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="Add Course" subTitle="All Course" link="/all/course" />
            <Head title="Add Course" />
            <div>
                <div className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* Title */}
                        <div className="w-full space-y-2">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                Course title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        <div className="flex-col items-center justify-between gap-8 lg:flex lg:flex-row">
                            {/* start_date */}
                            <div className="mt-4 w-full space-y-2 lg:w-1/2">
                                <Label htmlFor="start_date" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Course start date
                                </Label>
                                <input
                                    type="date"
                                    id="start_date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />

                                {errors.start_date && <div className="mt-2 text-sm text-red-500">{errors.start_date}</div>}
                            </div>

                            {/* duration */}
                            <div className="mt-4 w-full space-y-2 lg:w-1/2">
                                <Label htmlFor="duration" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Course duration
                                </Label>
                                <Input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="Enter your duration"
                                    value={data.duration}
                                    onChange={(e) => setData('duration', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />

                                {errors.duration && <div className="mt-2 text-sm text-red-500">{errors.duration}</div>}
                            </div>
                        </div>

                        <div className="flex-col items-center justify-between gap-8 lg:flex lg:flex-row">
                            {/* price */}
                            <div className="mt-4 w-full space-y-2 lg:w-1/2">
                                <Label htmlFor="price" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Course price
                                </Label>
                                <Input
                                    type="text"
                                    id="price"
                                    name="price"
                                    placeholder="Enter your price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />

                                {errors.price && <div className="mt-2 text-sm text-red-500">{errors.price}</div>}
                            </div>

                            {/* discount_price */}
                            <div className="mt-4 w-full space-y-2 lg:w-1/2">
                                <Label
                                    htmlFor="discount_price"
                                    className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400"
                                >
                                    Course discount price
                                </Label>
                                <Input
                                    type="text"
                                    id="discount_price"
                                    name="discount_price"
                                    placeholder="Enter your discount price"
                                    value={data.discount_price}
                                    onChange={(e) => setData('discount_price', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />

                                {errors.discount_price && <div className="mt-2 text-sm text-red-500">{errors.discount_price}</div>}
                            </div>
                        </div>

                        <div className="flex-col items-center justify-between gap-8 lg:flex lg:flex-row">
                            {/* type */}
                            <div className="mt-4 w-full space-y-2 lg:w-1/2">
                                <Label htmlFor="type" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                    Course type
                                </Label>
                                <select
                                    id="type"
                                    name="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    disabled={processing}
                                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                >
                                    <option value="">Select Course Type</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Default File Input */}
                            <div className="mt-4 w-full space-y-2 lg:w-1/2">
                                <Label className="capitalize dark:text-gray-400">Upload file</Label>
                                <FileInput
                                    className="custom-class mt-1"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('image', file);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                />

                                {/* Show error under file input */}
                                {errors.image && <div className="mt-2 text-sm text-red-500">{errors.image}</div>}
                            </div>
                        </div>

                        {/* Image Preview */}
                        <div className="mt-4">
                            <img
                                src={previewUrl ? previewUrl : '/backend/no_image.jpg'}
                                alt="Uploaded Preview "
                                className="h-29 w-38 rounded-md shadow-md"
                            />
                        </div>

                        <div>
                            <Button
                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Add Course
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default AddCourse;
