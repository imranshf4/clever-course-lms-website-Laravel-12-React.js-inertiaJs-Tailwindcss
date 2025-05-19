<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //add category
    public function addCategory()
    {
        return Inertia::render('admin/backend/categories/addCategory');
    }

    //store category
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Category::insert([
            'name' => $request->name,
            'slug' => strtolower(str_replace(' ', '-', $request->name)),
            'created_at' => now(),

        ]);

        return redirect()->route('all.category')->with('success', 'Category created successfully.');
    }

    //all category
    public function allCategory()
    {
        $categories = Category::latest()->get();
        return Inertia::render('admin/backend/categories/allCategory', [
            'categories' => $categories,
        ]);
    }

    //delete category
    public function deleteCategory($id)
    {
        Category::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

    //edit category
    public function editCategory($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('admin/backend/categories/editCategory', [
            'category' => $category,
        ]);
    }

    //update category
    public function updateCategory(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Category::findOrFail($id)->update([
            'name' => $request->name,
            'slug' => strtolower(str_replace(' ', '-', $request->name)),
            'updated_at' => now(),
        ]);

        return redirect()->route('all.category')->with('success', 'Category updated successfully.');
    }
}
