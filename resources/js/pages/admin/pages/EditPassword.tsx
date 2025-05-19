
import AppLayout from '@/admin/layouts/AppLayout';
import { UserWithPassword } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const EditPassword = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<UserWithPassword>>({
        old_password: '',
        new_password_confirmation: '',
        new_password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.password.update'), {
            forceFormData: true,
            onFinish: () => {
                reset('old_password', 'new_password_confirmation', 'new_password');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Update Password" />
            <div className="space-y-3 rounded-md bg-white p-8 dark:bg-gray-900">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Edit Password</h1>

                <form onSubmit={submit} encType="multipart/form-data">
                    {/* first and last name */}
                    <div>
                        <div className="w-full space-y-2">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Old Password *</h1>
                            <input
                                type="text"
                                id="old_password"
                                value={data.old_password}
                                onChange={(e) => setData('old_password', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>

                        {errors.old_password && <p className="text-red-500">{errors.old_password}</p>}
                    </div>

                    {/* Email and Phone */}
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full space-y-2 md:w-1/2 mt-4">
                            <h1 className="text-base text-gray-500 dark:text-white/60">New Password *</h1>
                            <input
                                type="text"
                                id="new_password"
                                value={data.new_password}
                                onChange={(e) => setData('new_password', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            {errors.new_password && <p className="text-red-500">{errors.new_password}</p>}
                        </div>
                        <div className="w-full space-y-2 md:w-1/2 mt-4">
                            <h1 className="text-gray-500 dark:text-white/60">Confirm Password *</h1>
                            <input
                                type="text"
                                id="new_password_confirmation"
                                value={data.new_password_confirmation}
                                onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-8 py-2 text-white transition-colors mt-4"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditPassword;
