import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';

const EditPassword = () => {
    return (
        <AppLayout>
            <div className="space-y-3 dark:bg-gray-900 bg-white p-8 rounded-md">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Edit Password</h1>

                {/* first and last name */}
                <div>
                    <div className="w-full space-y-2">
                        <h1 className="text-base text-gray-500 dark:text-white/60">Current Password *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                </div>

                {/* Email and Phone */}
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-base text-gray-500 dark:text-white/60">New Password *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-gray-500 dark:text-white/60">Confirm Password *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                </div>

                <button className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-8 py-2 text-white transition-colors">
                    <Link href="#">Update</Link>
                </button>
            </div>
        </AppLayout>
    );
};

export default EditPassword;
