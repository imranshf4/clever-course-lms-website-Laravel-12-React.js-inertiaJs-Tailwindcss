<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function course()
    {
        return $this->belongsTo(Course::class);
    } //end method

    public function module()
    {
        return $this->belongsTo(Module::class);
    } //end method
}
