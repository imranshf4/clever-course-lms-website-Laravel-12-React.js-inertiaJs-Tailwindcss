import AppLayout from '@/admin/layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/admin/components/ui/table';
import { CategoryWithId, CourseWithId, LessonWithId, ModuleWithId } from '@/types';
import { useEffect } from 'react';

export interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
    errors?: any;
    [key: string]: unknown;
}

interface AllCategoryProps {
    categories: CategoryWithId[];
}

const AllCategory = ({ categories }: AllCategoryProps) => {
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
        router.delete(`/delete/category/${id}`);
    };

    return (
        <AppLayout>
            <Head title="All Category" />
            <PageBreadcrumb pageTitle="All Category" subTitle="Add Category" link="/add/category" />

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
                                    Category Name
                                </TableCell>

                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400 capitalize">
                                    category Slug
                                </TableCell>

                                <TableCell isHeader className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {categories.map((category, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">{index + 1}</TableCell>
                                    <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {category.name}
                                    </TableCell>

                                    <TableCell className="text-theme-sm px-5 py-3 text-start text-gray-500 dark:text-gray-400">{category.slug}</TableCell>
                                    {/* Actions */}

                                    <TableCell className="text-theme-sm space-x-4 px-5 py-3 text-start text-gray-500 dark:text-gray-400">
                                        <button onClick={() => router.get(`/edit/category/${category.id}`)} className="text-blue-500 hover:text-blue-700">
                                            Edit
                                        </button>
                                        <span>|</span>
                                        <button
                                            onClick={() => handleDelete(category.id)}
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

            {/* Table */}
        </AppLayout>
    );
};

export default AllCategory;
