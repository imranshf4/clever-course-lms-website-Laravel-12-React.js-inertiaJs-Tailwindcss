<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserDashboard extends Controller
{
    
    public function index()
    {
        return inertia('user/dashboard');
    }//end function

    public function profile()
    {
        return inertia('user/pages/Profile');
    }//end function

    public function editProfile()
    {
        return inertia('user/pages/EditProfile');
    }//end function

    public function editPassword()
    {
        return inertia('user/pages/EditPassword');
    }//end function

    //quiz score
    public function quizScore()
    {
        return inertia('user/pages/QuizScore');
    }//end function

    //attended course
    public function attendedCourse()
    {
        return inertia('user/pages/AttendedCourse');
    }//end function

    //booked course
    public function bookedCourse()
    {
        return inertia('user/pages/BookedCourse');
    }//end function

    //confirm course
    public function confirmedCourse()
    {
        return inertia('user/pages/ConfirmedCourse');
    }//end function


}
