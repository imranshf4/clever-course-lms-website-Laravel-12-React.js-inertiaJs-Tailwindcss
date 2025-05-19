<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends Controller
{
    public function profile()
    {
        return inertia('user/pages/Profile');
    } //end function

    public function editProfile()
    {
        $user = User::find(Auth::id());
        return inertia(
            'user/pages/EditProfile',
            [
                'user' => $user,
            ]
        );
    } //end function

    public function editPassword()
    {
        $user = User::find(Auth::id());
        return inertia(
            'user/pages/EditPassword',
            [
                'user' => $user,
            ]
        );
    } //end function

    //update profile
    public function updateProfile(Request $request)
    {
        $user = User::find(Auth::id());

        if ($request->hasFile('photo')) {
            // Save the old path BEFORE updating
            $oldPhotoPath = $user->photo ? public_path($user->photo) : null;

            // Handle file upload
            $file = $request->file('photo');
            $filename = hexdec(uniqid()) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('backend/users'), $filename);
            $user->photo = '/backend/users/' . $filename;

            // Delete old file if it exists
            if (file_exists($oldPhotoPath) && is_file($oldPhotoPath)) {
                unlink($oldPhotoPath);
            }
        }

        // Update other fields
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->gender = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->location = $request->location;
        $user->phone = $request->phone;
        $user->save();

        return redirect()->route('user.profile')->with('success', 'Profile updated successfully.');
    }

    //update password
    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|confirmed',
        ]);

        if (!Hash::check($request->old_password, Auth::user()->password)) {
            return redirect()->back()->with('error', 'Old password is incorrect.');
        }

        User::find(Auth::id())->update([
            'password' => Hash::make($request->new_password),
        ]);


        return redirect()->route('user.profile')->with('success', 'Password updated successfully.');
    } //end function

}
