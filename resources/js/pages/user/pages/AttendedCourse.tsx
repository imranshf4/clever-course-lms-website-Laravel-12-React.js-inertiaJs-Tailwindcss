import AppLayout from '@/layouts/AppLayout';
const courses = [
    {
        name: 'Intro to React',
        date: '2025-04-10',
        price: '$99',
        status: 'pending',
        code: 'REACT101',
    },
    {
        name: 'Advanced JavaScript',
        date: '2025-03-22',
        price: '$149',
        status: 'paid',
        code: 'JS202',
    },
    {
        name: 'UI/UX Design Basics',
        date: '2025-02-15',
        price: '$129',
        status: 'paid',
        code: 'UX301',
    },
];

const AttendedCourse = () => {
    return (
        <AppLayout>
            <div className="space-y-3 dark:bg-gray-900 bg-white p-8 rounded-md">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">Attended Courses</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                        <thead className="bg-brand-900 text-left text-base font-semibold text-white dark:text-white/80">
                            <tr>
                                <th className="w-full px-4 py-3 md:w-6/8">Course Name</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Status</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Code</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {courses.map((course, index) => (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="space-y-2">
                                            <h1 className="text-brand-900 text-base font-medium">{course.name}</h1>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium ">Date:</h1>
                                                <p>{course.date}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium">Price:</h1>
                                                <p>{course.price}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center uppercase">
                                        <span className={`text-sm} inline-block rounded px-2 py-1 font-medium`}>{course.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm font-medium uppercase">{course.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default AttendedCourse;
