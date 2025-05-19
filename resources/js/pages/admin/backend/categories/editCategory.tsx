import PageBreadcrumb from '@/admin/components/common/PageBreadCrumb';
import { Button } from '@/admin/components/ui/button';
import { Label } from '@/admin/components/ui/label';
import AppLayout from '@/admin/layouts/AppLayout';
import { Category, CategoryWithId } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
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
interface EditCategoryProps {
    category: CategoryWithId;
}
const EditCategory = ({ category }: EditCategoryProps) => {
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

    const { data, setData, post, processing, errors, reset } = useForm<Required<Category>>({
        name: category.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('update.category',{id: category.id}), {
            onFinish: () => {
                reset('name');
            },
        });
    };

    return (
        <AppLayout>
            <PageBreadcrumb pageTitle="Add Category" subTitle="All Category" link="/all/category" />
            <Head title="Add Category" />
            <div>
                <div className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* category name */}
                        <div className="mt-4 w-full space-y-2">
                            <Label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-900 capitalize dark:text-gray-400">
                                category name
                            </Label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter category name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                            {errors.name && <div className="mt-2 text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div>
                            <Button
                                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Update Category
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditCategory;
