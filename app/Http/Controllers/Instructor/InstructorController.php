<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function dashboard()
    {
        return inertia('instructor/dashboard');
    }//end method
}
