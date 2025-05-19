<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    //pending orders
    public function confirmedOrder(){

        $courses = Course::with('order')->get();
        $orders = Order::with('course.user')->where('status', 'confirmed')->get();
        return Inertia::render('admin/backend/orders/confirmedOrders',
            [
                'courses' => $courses,
                'orders' => $orders,
            ]);

    }
}
