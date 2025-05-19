import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    photo: File | null;
    username: string | null;
    title: string | null;
    phone: string | null;
    website: string | null;
    linkedin: string | null;
    facebook: string | null;
    twitter: string | null;
    location: string | null;
    current_work: string | null;
    past_work: string | null;
    specialist_in: string | null;
    experience: string | null;
    biography: string | null;
    short_info: string | null;
    last_seen: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UserWithProfile {
    name: string;
    username: string;
    email: string;
    gender: string;
    birthdate: string;
    location: string;
    photo: File | null;
    phone: string;
}

export interface UserWithPassword{
    old_password: string;   
    new_password_confirmation: string;
    new_password: string;
}

export interface HeroSlider {
    hero_heading: string;
    hero_title: string;
    hero_subtitle: string;
    hero_image: File | null;
    hero_button_text: string;
    hero_button_link: string;
}

interface HeroSliderWithId extends HeroSlider {
    id: number;
    created_at: string;
    updated_at: string;
}

interface HeroProps extends HeroSliderWithId {
    heroSliders: strong[];
    heroHeading: string;
}

export interface Course {
    title: string;
    image: File | null;
    type: string;
    start_date: string;
    duration: string;
    price: string;
    discount_price: string;
}

interface CourseWithId extends Course {
    id: number;
    admin_id: number;
    end_date: string;
    description: string;
    end_date: string;
    recentCourse:string[];
    slug: string;
    sumRatings: number;
    user_count: number;
    user: User;
    order: Order;
    modules: ModuleWithId[];
    getRatingCountAttribute: number;
    category: CategoryWithId;
    created_at: string;
    updated_at: string;
}

interface ratings {
    rating: number;
    comment: string;
}


export interface Module {
    title: string;
    course_id: string;
}

interface ModuleWithId extends Module {
    id: number;
    course: CourseWithId;
    lessons: LessonWithId[];
}

export interface Rating {
    rating: string;
    comment: string;
    course_id: number;
}

interface RatingWithId extends Rating {
    id: number;
    user_id: number;
    course: CourseWithId;
    user: User;
}

export interface Quiz {
    course_id: string;
    module_id: string;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
}

interface QuizWithId extends Quiz {
    id: number;
    module: ModuleWithId;
    course: CourseWithId;
    created_at: string;
    updated_at: string;
}

interface QuizResult {
    quiz_id: number;
    user_id: number;
    score: number;
    total_questions: number;
    correct_answers: number;
    wrong_answers: number;
    created_at: string;
    updated_at: string;
}

interface QuizResultWithId extends QuizResult {
    id: number;
    quiz: QuizWithId;
    user: User;
}

interface Lesson {
    title: string;
    module_id: string;
    course_id: string;
    video_url: File | null;
    duration: string;
}

interface LessonWithId extends Lesson {
    id: number;
    module: ModuleWithId;
    created_at: string;
    updated_at: string;
}

interface Category {
    name: string;
}

interface CategoryWithId extends Category {
    id: number;
    slug: string;
    created_at: string;
    updated_at: string;
}


interface Order {
    order_number: string;
    status: string;
    currency: string;
    amount: number;
}

export interface Orders {
  id:number;
  course: CourseWithId;
  user_id: number;
  
  order_number: string;
  status: string;
  order_status: string;
  payment_method?: string | null;
  transaction_id?: string | null;
  currency: string;
  amount: number;
  invoice_no: string;
  order_date: string;
  order_month: string;
  order_year: string;
  confirmed_date?: string | null;

}

interface OrderWithId extends Order {
    id: number;
    user: User;
    course_id: number;
    course: CourseWithId;
    course: CourseWithId;
    created_at: string;
    updated_at: string;
}


