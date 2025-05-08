<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
    //all course
    public function allCourse()
    {
        $courses = Course::with('modules', 'user','category')->latest()->get();

        // Calculate user count separately
        foreach ($courses as $course) {
            $course->user_count = $course->userCount();
            $course->sumRatings = $course->sumRatings();
            $course->getRatingCountAttribute = $course->getRatingCountAttribute();
        }
        return Inertia::render(
            "frontend/pages/Courses/Courses",
            [
                'courses' => $courses,
            ]
        );


    }//end all course

    //single course 
    public function singleCourse($slug, $id)
    {
        $course = Course::with(['modules.lessons', 'user', 'category', 'order'])->findOrFail($id);
        $course->user_count = $course->userCount();
        $course->sumRatings = $course->sumRatings();
        $course->getRatingCountAttribute = $course->getRatingCountAttribute();

        return Inertia::render(
            "frontend/pages/Courses/CourseSingle/CourseSingle",
            [
                'course' => $course,
            ]
        );
    }
}

// import React from "react";

// const CourseSingle = ({ course }) => {
//   return (
//     <div>
//       {course.modules.map((module) => (
//         <div key={module.id} className="module">
//           <h2>{module.title}</h2>

//           <ul>
//             {module.lessons.map((lesson) => (
//               <li key={lesson.id}>{lesson.title}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseSingle;

// $course = Course::with(['modules.quizzes'])->find($id);

// foreach ($course->modules as $module) {
//     $quizCount = $module->quizzes->count();
//     echo "Module: {$module->title} has {$quizCount} quizzes.";
// }
