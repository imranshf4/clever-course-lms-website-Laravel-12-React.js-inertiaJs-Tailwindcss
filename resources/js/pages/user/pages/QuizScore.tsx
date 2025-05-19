import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
const coursesScore = [
    {
        name: 'Intro to React',
        instructor_name: 'Simon Snow',
        part: [1, 2, 3, 4, 5],
        score: [10, 12, 11, 23, 22],
    },
    {
        name: 'Mastering Node.js',
        instructor_name: 'Olivia Hart',
        part: [1, 2, 3, 4],
        score: [14, 15, 18, 20],
    },
];

const QuizScore = () => {
    return (
        <AppLayout>
            <Head title="Quiz Score" />
            <div className="space-y-3 dark:bg-gray-900 bg-white p-8 rounded-md">
                <h1 className="text-xl text-gray-500 uppercase dark:text-white/80">View Quiz Score( Online courses )</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-700 shadow-sm">
                        <thead className="bg-brand-900 text-left text-base font-semibold text-white">
                            <tr>
                                <th className="w-full px-4 py-3 md:w-6/8">Student</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Part</th>
                                <th className="w-full px-4 py-3 text-center md:w-1/8">Score</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {coursesScore.map((qScore, index) => (
                                <tr key={index} className="border-t border-gray-700">
                                    <td className="flex items-start px-4 py-3">
                                        <div className="space-y-2">
                                            <h1 className="text-brand-900 text-base font-medium">{qScore.name}</h1>
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-base font-medium dark:text-white/60">Date:</h1>
                                                <p className="text-gray-500 dark:text-white/60">{qScore.instructor_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="space-y-2 border border-gray-700 px-4 py-3 text-center text-sm font-medium capitalize">
                                        {qScore.part.map((score, index) => (
                                            <div key={index} className='dark:text-white/60'>{score}</div>
                                        ))}
                                        <h1 className='dark:text-white/60'>Total:</h1>
                                    </td>
                                    <td className="space-y-2 px-4 py-3 text-center text-sm font-medium uppercase">
                                        {qScore.score.map((score, index) => (
                                            <div key={index} className='dark:text-white/60'>{score}</div>
                                        ))}
                                        <h1 className='dark:text-white/60'>
                                            {qScore.score.reduce((total, value) => total + value, 0)}/{qScore.score.length * 25}
                                        </h1>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default QuizScore;
