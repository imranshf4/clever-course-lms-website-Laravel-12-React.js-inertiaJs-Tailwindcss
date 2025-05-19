<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstructorRatingController extends Controller
{
    //all rating
    public function allRating()
    {
        $courses = Course::where('admin_id', Auth::id())->get();
        $ratings = Rating::with('user', 'course')->where("admin_id",Auth::id())->get();
        return inertia('admin/backend/ratings/allRating', [
            'ratings' => $ratings,
            'courses' => $courses,
        ]);
    } //end method
    
    //delete rating
    public function deleteRating($id)
    {
        $rating = Rating::findOrFail($id);
        $rating->delete();

        return redirect()->back()->with('success', 'Rating deleted successfully');
    } //end method
}
