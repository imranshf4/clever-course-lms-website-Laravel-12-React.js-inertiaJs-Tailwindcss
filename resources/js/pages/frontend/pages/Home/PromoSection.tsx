import { Link } from '@inertiajs/react';

const PromoSection = () => {
    return (
        <div className=" bg-gray-100">
            <div className="section-container flex flex-col items-center justify-center gap-8  sm:flex-row sm:justify-between sm:gap-0">
                <div className="w-full space-y-2 text-center sm:w-3/4 sm:text-start">
                    <h1 className="text-xl font-medium uppercase">Risus Ultricies Magna</h1>
                    <div className="flex justify-center">
                        <p className="w-3/4 sm:w-full">Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla.</p>
                    </div>
                </div>

                <div>
                    <button className="mt-1 w-full cursor-pointer bg-gray-700 px-5 py-3 text-white capitalize transition-colors hover:bg-gray-600">
                        <Link href={'#'} className="text-md font-bold">
                            Learn more
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromoSection;
