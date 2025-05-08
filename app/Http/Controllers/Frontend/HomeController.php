<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\HeroSlider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //home page
    public function index()
    {
        $heroSliders = HeroSlider::get();
        $recentCourse = Course::with('modules')->latest()->get();
        return inertia(
            'home',
            [
                'heroSliders' => $heroSliders,
                'recentCourse' => $recentCourse,
            ]
        );
    }
}
