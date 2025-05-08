<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            // Foreign key to users table (instructor)
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('admin_id')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('admin_id')->references('id')->on('users')->onDelete('cascade');

            // Course fields
            $table->string('title');
            $table->string('slug')->nullable(); 
            $table->string('image')->nullable();
            $table->string('type')->nullable(); 
            $table->string('start_date')->nullable(); 
            $table->string('duration')->nullable(); // e.g., "3 months", "6 weeks"
            $table->string('end_date')->nullable(); 
            $table->integer('enrolled')->default(0);
            $table->string('price')->nullable();
            $table->string('discount_price')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
