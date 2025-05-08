import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';

const EditProfile = () => {
    return (
        <AppLayout>
            <div className="space-y-3 dark:bg-gray-900 bg-white p-8 rounded-md">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Edit Profile</h1>

                {/* first and last name */}
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-base text-gray-500 dark:text-white/60">First Name *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-gray-500 dark:text-white/60">Last Name *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                </div>

                {/* gender and birth date */}
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-base text-gray-500 dark:text-white/60">Gender *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-gray-500 dark:text-white/60">Birth Date *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                </div>

                {/* Email and Phone */}
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-base text-gray-500 dark:text-white/60">Email *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-gray-500 dark:text-white/60">Phone *</h1>
                        <input type="text" className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                </div>

                {/* first and last name */}
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="w-full space-y-2 md:w-1/2">
                        <h1 className="text-base text-gray-500 dark:text-white/60">Address *</h1>
                        <textarea rows={4} className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " />
                    </div>
                    <div className="w-full space-y-2 md:w-1/2"></div>
                </div>

                <button className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-8 py-1 text-white transition-colors sm:py-3">
                    <Link href="#">Update</Link>
                </button>
            </div>
        </AppLayout>
    );
};

export default EditProfile;
