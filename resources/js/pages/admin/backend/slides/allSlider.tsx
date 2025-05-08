import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import AppLayout from '@/admin/layouts/AppLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/admin/components/ui/table';
import { HeroSlider, HeroSliderWithId } from '@/types';
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

interface AllSliderProps {
    sliders: HeroSliderWithId[];
}
const AllSlider = ({ sliders }: AllSliderProps) => {
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

    const multiOptions = [
        { value: '1', text: 'Option 1', selected: false },
        { value: '2', text: 'Option 2', selected: false },
        { value: '3', text: 'Option 3', selected: false },
        { value: '4', text: 'Option 4', selected: false },
        { value: '5', text: 'Option 5', selected: false },
    ];

    const handleDelete = (id: number) => {
        router.delete(`/delete/slider/${id}`);
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="All Slider" subTitle='Add Slider'  link='/add/slider'  />
            <Head title="All Slider" />
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Hero Image
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Hero Heading
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Hero Title
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Hero SubTitle
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Hero Button Title
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Hero Button Link
                                </TableCell>
                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {sliders.map((slider, index) => (
                                <TableRow key={index}>
                                    <TableCell className="px-5 py-4 text-start sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="overflow-hidden">
                                                <img
                                                    className="h-12 w-32 object-cover"
                                                    src={typeof slider.hero_image === 'string' ? slider.hero_image : '/backend/no_image.jpg'}
                                                    alt={slider.hero_heading}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {slider.hero_heading}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {slider.hero_title}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {slider.hero_subtitle}
                                    </TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-gray-500 dark:text-gray-400">{slider.hero_button_text}</TableCell>
                                    <TableCell className="text-theme-sm px-4 py-3 text-gray-500 dark:text-gray-400">
                                        {slider.hero_button_link}
                                    </TableCell>
                                    <TableCell className="text-theme-sm space-x-2 px-4 py-3 text-gray-500 dark:text-gray-400">
                                        <Link
                                            href={`/edit/slider/${slider.id}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                                        >
                                            Edit
                                        </Link>
                                        <span>|</span>
                                        <button
                                            onClick={() => handleDelete(slider.id)}
                                            className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 inline-flex items-center
                                             justify-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition"
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

export default AllSlider;
