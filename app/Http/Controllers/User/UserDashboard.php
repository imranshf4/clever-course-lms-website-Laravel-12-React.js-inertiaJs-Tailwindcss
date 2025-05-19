<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserDashboard extends Controller
{

    public function index()
    {
        return inertia('user/dashboard');
    } //end function

    //quiz score
    public function quizScore()
    {
        return inertia('user/pages/QuizScore');
    } //end function

    //attended course
    public function attendedCourse()
    {
        $Orders = Order::with('course')->where("user_id", Auth::id())->where('order_status','paid')->get();
        return inertia('user/pages/AttendedCourse', [
            'Orders' => $Orders
        ]);
    } //end function

    //booked course
    public function bookedCourse()
    {

        $orders = Order::with('course')
            ->where('user_id', Auth::id())
            ->where('status', 'pending')
            ->where('order_status','paid')
            ->get();
        return inertia('user/pages/BookedCourse', [
            'orders' => $orders
        ]);
    } //end function

    //confirm course
    public function confirmedCourse()
    {
        $orders = Order::with('course')
            ->where('user_id', Auth::id())
            ->where('status', 'confirmed')
            ->where('order_status','paid')
            ->get();
        return inertia('user/pages/ConfirmedCourse', [
            'orders' => $orders
        ]);
    } //end function



}
