<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstructorModuleController extends Controller
{
    //add module
    public function addModule()
    {
        //user id related all courses
        $courses = Course::where('admin_id', Auth::id())->get();
        return inertia('instructor/backend/modules/addModule',[
            'courses' => $courses,
        ]);
    } //end method

    //store module
    public function storeModule(Request $request)
    {
        $request->validate([
            'course_id' => 'required',
            'title' => 'required|string|max:255',
        ]);

        $module = new Module();
        $module->course_id = $request->course_id;
        $module->title = $request->title;
        $module->save();

        return redirect()->route('instructor.all.module')->with('success', 'Module added successfully');
    } //end method

    //all module
    public function allModule()
    {
        $modules = Module::with('course')->get();
        $courses = Course::where('admin_id', Auth::id())->get();
        return inertia('instructor/backend/modules/allModule', [
            'modules' => $modules,
            'courses' => $courses,
        ]);
    } //end method

    //edit module
    public function editModule($id)
    {
        $module = Module::with('course')->findOrFail($id);
        $courses = Course::where('admin_id', Auth::id())->get();
        return inertia('instructor/backend/modules/editModule', [
            'module' => $module,
            'courses' => $courses,
        ]);
    } //end method

    //update module
    public function updateModule(Request $request, $id)
    {
        $request->validate([
            'course_id' => 'required',
            'title' => 'required|string|max:255',
        ]);

        $module = Module::findOrFail($id);
        $module->course_id = $request->course_id;
        $module->title = $request->title;
        $module->save();

        return redirect()->route('instructor.all.module')->with('success', 'Module updated successfully');
    } //end method

    //delete module
    public function deleteModule($id)
    {
        $module = Module::findOrFail($id);
        $module->delete();

        return redirect()->back()->with('success', 'Module deleted successfully');
    } //end method
}
