import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import FileInput from '@/admin/components/form/input/FileInput';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import AppLayout from '@/admin/layouts/AppLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import { Button } from '@/admin/components/ui/button';
import { HeroSlider, HeroSliderWithId } from '@/types';
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

interface EditSliderProps {
    slider: HeroSliderWithId;
}

const EditSlider = ({ slider } : EditSliderProps) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
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

    const { data, setData, post, processing, errors, reset } = useForm<Required<HeroSlider>>({
        hero_heading: slider.hero_heading,
        hero_title: slider.hero_title,
        hero_subtitle: slider.hero_subtitle,
        hero_image: slider.hero_image,
        hero_button_text: slider.hero_button_text,
        hero_button_link: slider.hero_button_link,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('update.slider', { id: slider.id }), {
            onFinish: () => reset('hero_heading', 'hero_title', 'hero_subtitle', 'hero_image', 'hero_button_text', 'hero_button_link'),
        });
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="Edit Slider" subTitle='All Slider' link='/all/slider' />
            <Head title="Add Slider" />
            <div>
                <div className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* Hero Title */}
                        <div className="space-y-2">
                            <Label htmlFor="inputTwo" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400">
                                Hero Heading
                            </Label>
                            <Input
                                type="text"
                                id="hero_heading"
                                name="hero_heading"
                                placeholder="Enter your heading"
                                value={data.hero_heading}
                                onChange={(e) => setData('hero_heading', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        {/* Hero Title */}
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="inputTwo" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400">
                                Hero Title
                            </Label>
                            <Input
                                type="text"
                                id="hero_title"
                                name="hero_title"
                                placeholder="Enter your Title"
                                value={data.hero_title}
                                onChange={(e) => setData('hero_title', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        {/* Hero SubTitle */}
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="inputTwo" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400">
                                Hero SubTitle
                            </Label>
                            <Input
                                type="text"
                                id="hero_subtitle"
                                name="hero_subtitle"
                                value={data.hero_subtitle}
                                onChange={(e) => setData('hero_subtitle', e.target.value)}
                                disabled={processing}
                                placeholder="Enter your sub heading"
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        {/* hero button title */}
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="inputTwo" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400">
                                Hero Button Title
                            </Label>
                            <Input
                                type="text"
                                id="hero_button_text"
                                name="hero_button_text"
                                placeholder="Enter your button title"
                                value={data.hero_button_text}
                                onChange={(e) => setData('hero_button_text', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        {/* Hero Slug */}
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="inputTwo" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400">
                                Hero Button Link
                            </Label>
                            <Input
                                type="text"
                                id="hero_button_link"
                                name="hero_button_link"
                                placeholder="Enter your slug"
                                value={data.hero_button_link}
                                onChange={(e) => setData('hero_button_link', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        {/* Default File Input */}
                        <div className="mt-4">
                            <Label className="dark:text-gray-400">Upload file</Label>
                            <FileInput
                                className="custom-class mt-1"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('hero_image', file);
                                        setPreviewUrl(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </div>

                        {/* Image Preview */}
                        <div className="mt-4">
                            <img
                                src={previewUrl ? previewUrl : (typeof slider.hero_image === 'string' ? slider.hero_image : '/backend/no_image.jpg')}
                                alt="Uploaded Preview"
                                className="w-48 h-29 rounded-md shadow-md"
                            />
                        </div>

                        <div>
                            <Button
                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Update Slider
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditSlider;
