<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Charge;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class UserOrderController extends Controller
{
    //buy course
    public function buyCourse($slug, $id, Request $request)
    {
        if ($request->amount == 0) {

            // create order
            $order = new Order();
            $order->course_id = $id;
            $order->amount = $request->amount; // Assuming you pass the amount in the request
            $order->currency = 'USD';
            $order->invoice_no = 'INV-' . strtoupper(mt_rand(1000, 9999));
            $order->order_number = 'ORD-' . strtoupper(mt_rand(1000, 9999));
            $order->payment_method = 'free';

            $order->user_id = Auth::id();
            $order->order_date = Carbon::now()->format('Y-m-d');
            $order->order_month = Carbon::now()->format('F');
            $order->order_year = Carbon::now()->format('Y');
            $order->status = 'confirmed';
            $order->order_status = 'paid';
            $order->save();

            return redirect()->route('frontend.courses')->with('success', 'Course purchased successfully.');
        }
    } //end of buyCourse

    //buy card course
    public function buyCardCourse($slug, $id, Request $request)
    {
        $orderNumber = 'ORD-' . strtoupper(mt_rand(1000, 9999));
        $invoiceNumber = 'INV-' . strtoupper(mt_rand(1000, 9999));
        $request->validate([
            'amount' => 'required|numeric|min:0.5',
            'stripeToken' => 'required|string',
        ]);
        // Set your Stripe secret key
       

        try {
            // Create the charge
            $charge = Charge::create([
                'amount' => $request->amount * 100, // Stripe requires cents
                'currency' => 'usd',
                'description' => 'Payment for Order #' . $orderNumber,
                'source' => $request->stripeToken,
            ]);

            // Update order info'
            $order = new Order();
            $order->course_id = $id;
            $order->amount = $request->amount; // Assuming you pass the amount in the request
            $order->currency = 'USD';
            $order->invoice_no = $invoiceNumber;
            $order->order_number = $orderNumber;
            $order->payment_method = 'card';

            $order->user_id = Auth::id();
            $order->order_date = Carbon::now()->format('Y-m-d');
            $order->order_month = Carbon::now()->format('F');
            $order->order_year = Carbon::now()->format('Y');
            $order->status = 'confirmed';
            $order->order_status = 'paid';
            $order->save();

            return redirect()->route('frontend.courses')->with('success', 'Payment completed successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Stripe Error: ' . $e->getMessage()]);
        }
    }

    public function stripeOrder(Request $request, $id)
    {

        $request->validate([
            'order_number' => 'required|string',
            'amount' => 'required|numeric',
            'stripeToken' => 'required|string',
        ]);

        $order = Order::findOrFail($id);

        // Set your Stripe secret key
      

        try {
            // Create the charge
            $charge = Charge::create([
                'amount' => $request->amount * 100, // Stripe requires cents
                'currency' => 'usd',
                'description' => 'Payment for Order #' . $request->order_number,
                'source' => $request->stripeToken,
            ]);

            // Update order info
            $order->status = 'confirmed';
            $order->order_status = 'paid';
            $order->save();

            return redirect()->route('user.confirmed.course')->with('success', 'Payment completed successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Stripe Error: ' . $e->getMessage()]);
        }
    }
}
