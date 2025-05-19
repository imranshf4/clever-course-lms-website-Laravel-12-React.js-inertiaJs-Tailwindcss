<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    protected $guarded = [];

    //user id related all courses
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    //course id related all courses
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
