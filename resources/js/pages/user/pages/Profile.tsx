import AppLayout from '@/layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { FaFile, FaTrophy } from 'react-icons/fa';
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

const Profile = () => {
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

    return (
        <AppLayout>
            <Head title="Profile, Badge and Certificates" />
            <div className="space-y-6 rounded-md bg-white px-6 py-8 dark:bg-gray-900 dark:text-white">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Certificates */}
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold text-gray-500 uppercase dark:text-white">Certificates</h1>

                        <div className="flex items-center gap-2">
                            <FaFile className="text-gray-500" />
                            <Link href="#" className="text-buyBtn text-base font-medium">
                                file name
                            </Link>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold text-gray-500 uppercase dark:text-white">Badges</h1>
                        <div className="flex h-15 w-15 items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-100">
                            <FaTrophy className="text-xl text-yellow-300" />
                        </div>
                    </div>
                </div>
                <h1 className="text-xl font-bold text-gray-500 uppercase dark:text-white">Profile</h1>

                <div className="space-y-4">
                    <div className="flex">
                        <p className="text-base text-gray-500 dark:text-white">Name</p>
                        <h3 className="pl-30 text-base text-gray-700 capitalize dark:text-white/60">Peter</h3>
                    </div>
                    <div className="flex">
                        <p className="text-base text-gray-500 dark:text-white">Last Name</p>
                        <h3 className="pl-22 text-base text-gray-700 capitalize dark:text-white/60">Avado</h3>
                    </div>
                    <div className="flex">
                        <p className="text-base text-gray-500 dark:text-white">Gender</p>
                        <h3 className="pl-27 text-base text-gray-700 capitalize dark:text-white/60"> Male</h3>
                    </div>
                    <div className="flex">
                        <p className="text-base text-gray-500 dark:text-white">Birth Place</p>
                        <h3 className="pl-22 text-base text-gray-700 capitalize dark:text-white/60">09/03/25</h3>
                    </div>
                    <div className="flex">
                        <p className="text-base text-gray-500 dark:text-white">Email</p>
                        <h3 className="pl-31 text-base text-gray-700 capitalize dark:text-white/60">peter@gmail.com</h3>
                    </div>
                    <div className="flex">
                        <p className="text-base text-gray-500 dark:text-white">Name</p>
                        <h3 className="pl-30 text-base text-gray-700 capitalize dark:text-white/60">Peterad</h3>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Profile;
