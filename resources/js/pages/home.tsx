import { CourseWithId, HeroProps, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import FourColumn from './frontend/pages/Home/FourColumn';
import Hero from './frontend/pages/Home/Hero';
import PromoSection from './frontend/pages/Home/PromoSection';
import Recent_courses from './frontend/pages/Home/Recent_courses';
import Search from './frontend/pages/Home/Search';
import Testimonials from './frontend/pages/Home/Testimonials';
import FrontendLayout from './layouts/FrontendLayout';


interface homeProps {
    heroSliders: HeroProps[];
    recentCourse: CourseWithId[];
}
export default function Home({ heroSliders,recentCourse }: homeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <FrontendLayout>
                <Head title="Clever Course: Pathway to Knowledge"></Head>

                <Hero heroSliders={heroSliders} />
                <FourColumn />
                <PromoSection />
                <Recent_courses recentCourse={recentCourse} />
                <Search image="1" heading={'Search For Courses'} subheading={'Fill keywords to seek for courses'} />
                <Testimonials />
            </FrontendLayout>
        </>
    );
}
