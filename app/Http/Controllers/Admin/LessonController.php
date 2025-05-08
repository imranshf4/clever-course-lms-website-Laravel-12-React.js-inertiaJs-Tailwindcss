<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LessonController extends Controller
{
    //add lesson
    public function addLesson()
    {
        $courses = Course::where("admin_id", Auth::id())->get();
        $modules = Module::get();
        return inertia('admin/backend/lessons/addLesson', [
            'courses' => $courses,
            'modules' => $modules
        ]);
        
    }

    //store lesson
    public function storeLesson(Request $request)
    {

        //video url file validation
        $request->validate([
            'module_id' => 'required',
            'course_id' => 'required',
            'title' => 'required',
            'video_url' => 'required|file|mimes:mp4,avi,mkv,flv|max:1073741824', 
            'duration' => 'required|numeric',
        ]);

        //video url file upload
        if ($request->hasFile('video_url')) {
            $video = $request->file('video_url');
            // $name_gen = hexdec(uniqid()).'.'.$video->getClientOriginalExtension();
            $name_gen = $video->getClientOriginalName();
            $video_url = '/backend/lessons/' . $name_gen;
            $video->move(public_path('backend/lessons/'), $name_gen);
        }
 

        // Store the lesson with the file path
        Lesson::insert([
            'module_id' => $request->module_id,
            'course_id' => $request->course_id,
            'title' => $request->title,
            'video_url' => $video_url,
            'duration' => $request->duration,
            "created_at" => now(),
        ]);

        return redirect()->route('all.lesson')->with('success', 'Lesson created successfully.');
    }

    //all lesson   
    public function allLesson()
    {
        $courses = Course::where("admin_id", Auth::id())->get();
        $modules = Module::get();
        $lessons = Lesson::with('module')->get();
        return inertia('admin/backend/lessons/allLesson', [
            'lessons' => $lessons,
            'modules' => $modules,
            'courses' => $courses
        ]);
    }
    

    //edit lesson
    public function editLesson($id)
    {
        $courses = Course::where("admin_id", Auth::id())->get();
        $modules = Module::get();
        $lesson = Lesson::findOrFail($id);
        return inertia('admin/backend/lessons/editLesson', [
            'lesson' => $lesson,
            'modules' => $modules,
            'courses' => $courses
        ]);
    }

    //update lesson
    public function updateLesson(Request $request, $id)
    {

        $lesson = Lesson::findOrFail($id);
        //video url file validation
        $request->validate([
            'module_id' => 'required',
            'course_id' => 'required',
            'title' => 'required',
            'duration' => 'required|numeric',
        ]);

        //video url file upload and if file exist its unlink
        if ($request->hasFile('video_url')) {
            $video = $request->file('video_url');
            $name_gen = $video->getClientOriginalName();
            $video_url = '/backend/lessons/' . $name_gen;
            $video->move(public_path('backend/lessons/'), $name_gen);

            if (file_exists(public_path($lesson->video_url))) {
                unlink(public_path($lesson->video_url));
            }
        } else {
            // If no new file is uploaded, keep the old file path
            $video_url = $lesson->video_url;
        }
        // Update the lesson with the file path
        Lesson::findOrFail($id)->update([
            'module_id' => $request->module_id,
            'course_id' => $request->course_id,
            'title' => $request->title,
            'video_url' => $video_url,
            'duration' => $request->duration,
            "updated_at" => now(),
        ]);
        return redirect()->route('all.lesson')->with('success', 'Lesson updated successfully.');
    }

    //delete lesson
    public function deleteLesson($id)
    {
        $lesson = Lesson::findOrFail($id);
        if (file_exists(public_path($lesson->video_url))) {
            unlink(public_path($lesson->video_url));
        }
        $lesson->delete();

        return redirect()->back()->with('success', 'Lesson deleted successfully.');
    }//end method
    
}
