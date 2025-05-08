<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    // add slider
    public function addSlider()
    {
        return inertia('admin/backend/slides/addSlider');
    }//end method

    // store slider
    public function storeSlider(Request $request)
    {
        $validated = $request->validate([
            'hero_button_text' => 'required|string|max:255',
            'hero_button_link' => 'required|string|max:255',
            'hero_image' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Handle the file upload
        if ($request->hasFile('hero_image')) {
            $image = $request->file('hero_image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image_url = '/backend/heroSlider/' . $name_gen;
            $image->move(public_path('backend/heroSlider/'), $name_gen);
        }
    
        // Store the slider with the file path
        HeroSlider::insert([
            "hero_heading" => $request->hero_heading,
            'hero_title' => $request->hero_title,
            'hero_subtitle' => $request->hero_subtitle,
            'hero_button_text' => $request->hero_button_text,
            'hero_button_link' => $request->hero_button_link,
            'hero_image' => $image_url,
            "created_at" => now(),
        ]);
      
        return redirect()->route('all.slider')->with('success', 'Slider added successfully.');
    }//end method

    // all slider
    public function allSlider()
    {
        $sliders = HeroSlider::latest()->get();
        return inertia('admin/backend/slides/allSlider', [
            'sliders' => $sliders,
        ]);
    }//end method

    // delete slider
    public function deleteSlider($id)
    {
        $slider = HeroSlider::findOrFail($id);
        $image_path = public_path($slider->hero_image);
        if (file_exists($image_path)) {
            unlink($image_path);
        }
        $slider->delete();
        return redirect()->back()->with('success', 'Slider deleted successfully.');
    }//end method

    // edit slider
    public function editSlider($id)
    {
        $slider = HeroSlider::findOrFail($id);
        return inertia('admin/backend/slides/editSlider', [
            'slider' => $slider,
        ]);
        
    }//end method

    // update slider
    public function updateSlider(Request $request, $id)
    {
        
        // Handle the file upload
        if ($request->hasFile('hero_image')) {
            $image = $request->file('hero_image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image_url = '/backend/heroSlider/' . $name_gen;
            $image->move(public_path('backend/heroSlider/'), $name_gen);
    
            // Delete the old image
            $slider = HeroSlider::findOrFail($id);
            $old_image_path = public_path($slider->hero_image);
            if (file_exists($old_image_path)) {
                unlink($old_image_path);
            }
        } else {
            // If no new image is uploaded, keep the old image URL
            $image_url = HeroSlider::findOrFail($id)->hero_image;
        }
    
        // Update the slider with the new data
        HeroSlider::findOrFail($id)->update([
            "hero_heading" => $request->hero_heading,
            'hero_title' => $request->hero_title,
            'hero_subtitle' => $request->hero_subtitle,
            'hero_button_text' => $request->hero_button_text,
            'hero_button_link' => $request->hero_button_link,
            'hero_image' => $image_url,
        ]);
    
        return redirect()->route('all.slider')->with('success', 'Slider updated successfully.');
    }//end method
}
