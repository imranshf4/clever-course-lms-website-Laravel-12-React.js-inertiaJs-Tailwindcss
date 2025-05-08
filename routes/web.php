<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\ModuleController;
use App\Http\Controllers\Admin\QuizController;
use App\Http\Controllers\Admin\RatingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\LessonController;
use App\Http\Controllers\Frontend\CourseController as FrontendCourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\User\UserDashboard;

//home routes
Route::get('/', [HomeController::class, 'index'])->name('home');

//course routes
Route::get('/courses', [FrontendCourseController::class, 'allCourse'])->name('frontend.courses');
Route::get('/single/course/{slug}/{id}', [FrontendCourseController::class, 'singleCourse'])->name('frontend.courses');

//user routes
Route::middleware(['auth', 'role:user'])->group(function () {
     // User all Routes
     Route::controller(UserDashboard::class)->group(function () {
        Route::get('dashboard', 'index')->name('dashboard');
        Route::get('/user/profile', 'profile')->name('user.profile');
        Route::get('/user/edit/profile', 'editProfile')->name('user.profile.edit');
        Route::get('/user/edit/password', 'editPassword')->name('user.password.edit');
        Route::post('/user/profile/update', 'updateProfile')->name('user.profile.update');
        Route::post('/user/password/update', 'updatePassword')->name('user.password.update');
        Route::get('/user/quiz-score', 'quizScore')->name('user.quiz.score');
        Route::get('/user/attended/course', 'attendedCourse')->name('user.attended.course');
        Route::get('/user/booked/course', 'bookedCourse')->name('user.booked.course');
        Route::get('/user/confirmed/course', 'confirmedCourse')->name('user.confirmed.course');
    });

    //User order routes
    Route::controller(UserDashboard::class)->group(function () {
        Route::get('/user/course', 'userCourse')->name('user.course');
        Route::get('/user/course/lesson/{id}', 'userCourseLesson')->name('user.course.lesson');
        Route::get('/user/course/quiz/{id}', 'userCourseQuiz')->name('user.course.quiz');
        Route::post('/user/course/quiz/store', 'storeQuiz')->name('store.quiz');
        Route::get('/user/course/quiz/result/{id}', 'quizResult')->name('quiz.result');
    });
});

Route::middleware(['auth','role:admin'])->group(function () {

    // Admin all Routes
    Route::controller(AdminController::class)->group(function () {
        Route::get('/admin/dashboard', 'dashboard')->name('admin.dashboard');
    });

    // Admin Slider Routes
    Route::controller(SliderController::class)->group(function () {
        Route::get('/add/slider', 'addSlider')->name('add.slider');
        Route::post('/store/slider', 'storeSlider')->name('store.slider');
        Route::get('/all/slider', 'allSlider')->name('all.slider');
        Route::delete('/delete/slider/{id}', 'deleteSlider')->name('delete.slider');
        Route::get('/edit/slider/{id}', 'editSlider')->name('edit.slider');
        Route::post('/update/slider/{id}', 'updateSlider')->name('update.slider');
    });

    // Admin Course Routes
    Route::controller(CourseController::class)->group(function () {
        Route::get('/add/course', 'addCourse')->name('add.course');
        Route::post('/store/course', 'storeCourse')->name('store.course');
        Route::get('/all/course', 'allCourse')->name('all.course');
        Route::delete('/delete/course/{id}', 'deleteCourse')->name('delete.course');
        Route::get('/edit/course/{id}', 'editCourse')->name('edit.course');
        Route::post('/update/course/{id}', 'updateCourse')->name('update.course');
    });

    // Admin Module Routes
    Route::controller(ModuleController::class)->group(function () {
        Route::get('/add/module', 'addModule')->name('add.module');
        Route::post('/store/module', 'storeModule')->name('store.module');
        Route::get('/all/module', 'allModule')->name('all.module');
        Route::delete('/delete/module/{id}', 'deleteModule')->name('delete.module');
        Route::get('/edit/module/{id}', 'editModule')->name('edit.module');
        Route::post('/update/module/{id}', 'updateModule')->name('update.module');
    });

    // Admin Rating Routes
    Route::controller(RatingController::class)->group(function () {
        Route::get('/all/rating', 'allRating')->name('all.rating');
        Route::delete('/delete/rating/{id}', 'deleteRating')->name('delete.rating');
        Route::get('/edit/rating/{id}', 'editRating')->name('edit.rating');
    });

    //Admin Quiz Routes
    Route::controller(QuizController::class)->group(function () {
        Route::get('/add/quiz', 'addQuiz')->name('add.quiz');
        Route::post('/store/quiz', 'storeQuiz')->name('store.quiz');
        Route::get('/all/quiz', 'allQuiz')->name('all.quiz');
        Route::delete('/delete/quiz/{id}', 'deleteQuiz')->name('delete.quiz');
        Route::get('/edit/quiz/{id}', 'editQuiz')->name('edit.quiz');
        Route::post('/update/quiz/{id}', 'updateQuiz')->name('update.quiz');
    });

    // Admin Lesson Routes
    Route::controller(LessonController::class)->group(function () {
        Route::get('/add/lesson', 'addLesson')->name('add.lesson');
        Route::post('/store/lesson', 'storeLesson')->name('store.lesson');
        Route::get('/all/lesson', 'allLesson')->name('all.lesson');
        Route::delete('/delete/lesson/{id}', 'deleteLesson')->name('delete.lesson');
        Route::get('/edit/lesson/{id}', 'editLesson')->name('edit.lesson');
        Route::post('/update/lesson/{id}', 'updateLesson')->name('update.lesson');
    });

    //category routes
    Route::controller(CategoryController::class)->group(function () {
        Route::get('/add/category', 'addCategory')->name('add.category');
        Route::post('/store/category', 'storeCategory')->name('store.category');
        Route::get('/all/category', 'allCategory')->name('all.category');
        Route::delete('/delete/category/{id}', 'deleteCategory')->name('delete.category');
        Route::get('/edit/category/{id}', 'editCategory')->name('edit.category');
        Route::post('/update/category/{id}', 'updateCategory')->name('update.category');
    });
    
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
