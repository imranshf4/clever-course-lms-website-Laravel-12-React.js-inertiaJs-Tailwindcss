<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    
    //add quiz
    public function addQuiz()
    {
        //admin id related all courses
        $courses = Course::where('admin_id', Auth::id())->get();
        $modules = Module::get();
        return inertia('admin/backend/quizzes/addQuiz',[
            'courses' => $courses,
            'modules' => $modules,
        ]);
    } //end method

    //store quiz
    public function storeQuiz(Request $request)
    {
        $request->validate([
            'course_id' => 'required',
            'module_id' => 'required',
            'question' => 'required',
            'option_a' => 'required',
            'option_b' => 'required',
            'option_c' => 'required',
            'option_d' => 'required',
            'correct_answer' => 'required',
        ]);

        Quiz::insert([
            'course_id' => $request->course_id,
            'module_id' => $request->module_id,
            'question' => $request->question,
            'option_a' => $request->option_a,
            'option_b' => $request->option_b,
            'option_c' => $request->option_c,
            'option_d' => $request->option_d,
            'correct_answer' => $request->correct_answer,
            'created_at' => now(),
        ]);

        return redirect()->back()->with('success', "Quiz added successfully");
    } //end method

    //all quiz
    public function allQuiz()
    {
        $quizzes = Quiz::with('course', 'module')->get();
        $courses = Course::where('admin_id', Auth::id())->get();
        $modules = Module::get();
        return inertia('admin/backend/quizzes/allQuiz', [
            'quizzes' => $quizzes,
            'courses' => $courses,
            'modules' => $modules,
        ]);
    } //end method


    //edit quiz
    public function editQuiz($id)
    {
        $quiz = Quiz::findOrFail($id);
        $courses = Course::where('admin_id', Auth::id())->get();
        $modules = Module::get();
        return inertia('admin/backend/quizzes/editQuiz', [
            'quiz' => $quiz,
            'courses' => $courses,
            'modules' => $modules,
        ]);
    } //end method

    //update quiz
    public function updateQuiz(Request $request)
    {
        $request->validate([
            'course_id' => 'required',
            'module_id' => 'required',
            'question' => 'required',
            'option_a' => 'required',
            'option_b' => 'required',
            'option_c' => 'required',
            'option_d' => 'required',
            'correct_answer' => 'required',
        ]);

        Quiz::findOrFail($request->id)->update([
            'course_id' => $request->course_id,
            'module_id' => $request->module_id,
            'question' => $request->question,
            'option_a' => $request->option_a,
            'option_b' => $request->option_b,
            'option_c' => $request->option_c,
            'option_d' => $request->option_d,
            'correct_answer' => $request->correct_answer,
        ]);

        return redirect()->route('all.quiz')->with('success', "Quiz updated successfully");
    } //end method

    //delete quiz
    public function deleteQuiz($id)
    {
        Quiz::findOrFail($id)->delete();
        return redirect()->back()->with('success', "Quiz deleted successfully");
    } //end method
    
}
