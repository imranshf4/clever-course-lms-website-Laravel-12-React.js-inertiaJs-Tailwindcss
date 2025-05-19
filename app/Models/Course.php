<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class, 'course_id', 'id');
    }

    //user id users
    public function user()
    {
        return $this->belongsTo(User::class, 'admin_id', 'id');
    }

    //order table user count
    public function userCount()
    {
        return $this->order()->count();
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    //sum of all ratings
    public function sumRatings()
    {
        return $this->ratings()->sum('rating');
    }


    public function getRatingCountAttribute()
    {
        return $this->ratings()->count();
    }
    
    //category
    public function category()
    {
        return $this->belongsTo(Category::class, 'type', 'id');
    }
}
