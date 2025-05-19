<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class InstructorCourseController extends Controller
{
    // add course
    public function addCourse()
    {
        $categories = Category::latest()->get();
        return inertia('instructor/backend/courses/addCourse', [
            'categories' => $categories,
        ]);
    } //end method

    // store course
    public function storeCourse(Request $request)
    {


        $validateData = $request->validate([
            'title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'type' => 'required',
            'duration' => 'required|numeric',
            'price' => 'required',
            'discount_price' => 'nullable|numeric',
        ]);

        
        // Handle file upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = hexdec(uniqid()) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('backend/courses'), $filename);
            $validateData['image'] = '/backend/courses/' . $filename;
        }

        // Create a new course
        $course = new Course();
        $course->instructor_id = Auth::id();
        $course->title = $request->title;
        $course->slug = strtolower(str_replace(' ', '-', $request->title));
        $course->image = $validateData['image'];
        $course->type = $request->type;

        // Parse the start date
        try {
            // Directly parse the valid date string
            $start_date = Carbon::parse($request->start_date);

            $course->start_date = $start_date->format('Y-m-d');
            $course->end_date = $start_date->copy()->addMonths((int)$request->duration)->format('Y-m-d');
        } catch (\Exception $e) {
            return back()->withErrors(['start_date' => 'The start date is invalid.']);
        }

        $course->duration = $request->duration;
        $course->price = $request->price;
        $course->discount_price = $request->discount_price;

        $course->save();

        return redirect()->route('instructor.all.course')->with('success', 'Course added successfully.');
    }
    //end method

    // all course
    public function allCourse()
    {
        $courses = Course::with('category')->where('admin_id', Auth::id())->latest()->get();
        return inertia('instructor/backend/courses/allCourse', [
            'courses' => $courses,
        ]);
    } //end method

    //delete course
    public function deleteCourse($id)
    {
        $course = Course::findOrFail($id);
        if (file_exists(public_path($course->image))) {
            unlink(public_path($course->image));
        }
        $course->delete();

        return redirect()->back()->with('success', 'Course deleted successfully.');
    } //end method

    //edit course
    public function editCourse($id)
    {
        $course = Course::findOrFail($id);
        $categories = Category::latest()->get();
        return inertia('instructor/backend/courses/editCourse', [
            'course' => $course,
            'categories' => $categories,
        ]);
    } //end method

    //update course no validation use
    public function updateCourse(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        // Handle file upload
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($course->image && file_exists(public_path($course->image))) {
                unlink(public_path($course->image));
            }
        
            // Upload new image
            $file = $request->file('image');
            $filename = hexdec(uniqid()) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('backend/courses'), $filename);
            $course->image = '/backend/courses/' . $filename;
        }else {
            // If no new image is uploaded, keep the old image URL
            $course->image = $course->image;
        }



        // Update course details
        $course->title = $request->title;
        $course->slug = strtolower(str_replace(' ', '-', $request->title));
        $course->type = $request->type;

        // Parse the start date
        try {
            // Directly parse the valid date string
            $start_date = Carbon::parse($request->start_date);

            $course->start_date = $start_date->format('Y-m-d');
            $course->end_date = $start_date->copy()->addMonths((int)$request->duration)->format('Y-m-d');
        } catch (\Exception $e) {
            return back()->withErrors(['start_date' => 'The start date is invalid.']);
        }

        $course->duration = $request->duration;
        $course->price = $request->price;
        $course->discount_price = $request->discount_price;

        // Save the updated course
        $course->save();

        return redirect()->route('instructor.all.course')->with('success', 'Course updated successfully.');
    } //end method
}
