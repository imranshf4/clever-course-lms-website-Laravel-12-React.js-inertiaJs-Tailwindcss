import AppLayout from '@/layouts/AppLayout';
import { UserWithProfile } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

interface UserProfileProps {
    user: UserWithProfile;
}
const EditProfile = ({ user }: UserProfileProps) => {

    const { data, setData, post, processing, errors, reset } = useForm<Required<UserWithProfile>>({
        name: user.name,
        username: user.username,
        email: user.email,
        gender: user.gender,
        birthdate: user.birthdate,
        location: user.location,
        photo: null,
        phone: user.phone,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.profile.update'), {
            forceFormData: true,
            onFinish: () => {
                reset('photo', 'name', 'username', 'email', 'gender', 'birthdate', 'location', 'phone');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Profile" />

            <div className="space-y-3 rounded-md bg-white p-8 dark:bg-gray-900">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Edit Profile</h1>

                <form onSubmit={submit} encType="multipart/form-data">
                    {/* full name */}
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full space-y-2 md:w-1/2">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Full Name *</h1>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                        <div className="w-full space-y-2 md:w-1/2">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Username *</h1>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    {/* gender and birth date */}
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full space-y-2 md:w-1/2 mt-4">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Gender *</h1>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                placeholder="Enter your gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                        <div className="w-full space-y-2 md:w-1/2">
                            <h1 className="text-gray-500 dark:text-white/60">Birth Date *</h1>
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                placeholder="Enter your birth date"
                                value={data.birthdate}
                                onChange={(e) => setData('birthdate', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full space-y-2 md:w-1/2 mt-4">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Email *</h1>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                        <div className="w-full space-y-2 md:w-1/2">
                            <h1 className="text-gray-500 dark:text-white/60">Phone *</h1>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    {/* first and last name */}
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full space-y-2 md:w-1/2 mt-4">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Address *</h1>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter your address"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                        <div className="w-full space-y-2 md:w-1/2">
                            <h1 className="text-base text-gray-500 dark:text-white/60">Profile Photo *</h1>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                placeholder="Upload your profile photo"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('photo', file);
                                    }
                                }}
                                accept="image/*"
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-4 pl-4 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-buyBtn hover:bg-buyBtn/90 mt-1 cursor-pointer border-b-2 border-[#65b4ad] px-8 py-1 text-white transition-colors sm:py-3"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditProfile;
