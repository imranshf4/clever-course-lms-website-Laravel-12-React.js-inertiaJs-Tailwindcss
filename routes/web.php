<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProfileController;
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
use App\Http\Controllers\Instructor\InstructorController;
use App\Http\Controllers\Instructor\InstructorCourseController;
use App\Http\Controllers\Instructor\InstructorLessonController;
use App\Http\Controllers\Instructor\InstructorModuleController;
use App\Http\Controllers\Instructor\InstructorQuizController;
use App\Http\Controllers\Instructor\InstructorRatingController;
use App\Http\Controllers\Instructor\InstructorSliderController;
use App\Http\Controllers\User\UserDashboard;
use App\Http\Controllers\User\UserOrderController;
use App\Http\Controllers\User\UserProfileController;

//home routes
Route::get('/', [HomeController::class, 'index'])->name('home');

//course routes
Route::get('/courses', [FrontendCourseController::class, 'allCourse'])->name('frontend.courses');
Route::get('/single/course/{slug}/{id}', [FrontendCourseController::class, 'singleCourse'])->name('single.courses');

//user routes
Route::middleware(['auth', 'role:user'])->group(function () {
    // User all Routes
    Route::controller(UserDashboard::class)->group(function () {
        Route::get('dashboard', 'index')->name('dashboard');
        Route::post('/user/password/update', 'updatePassword')->name('user.password.update');
        Route::get('/user/quiz-score', 'quizScore')->name('user.quiz.score');
        Route::get('/user/attended/course', 'attendedCourse')->name('user.attended.course');
        Route::get('/user/booked/course', 'bookedCourse')->name('user.booked.course');
        Route::get('/user/confirmed/course', 'confirmedCourse')->name('user.confirmed.course');
    });

    // User Profile Routes
    Route::controller(UserProfileController::class)->group(function () {
        Route::get('/user/profile', 'profile')->name('user.profile');
        Route::get('/user/edit/profile', 'editProfile')->name('user.profile.edit');
        Route::post('/user/profile/update', 'updateProfile')->name('user.profile.update');
        Route::get('/user/edit/password', 'editPassword')->name('user.password.edit');
        Route::post('/user/password/update', 'updatePassword')->name('user.password.update');
    });

    //User order routes
    Route::controller(UserOrderController::class)->group(function () {
        Route::match(['get', 'post'], '/buy/{slug}/{id}', 'buyCourse')->name('buy.course');
        Route::match(['get', 'post'], '/buy/card/{slug}/{id}', 'buyCardCourse')->name('buy.card.course');
        Route::post('/book/{slug}/{id}', 'bookCourse')->name('book.course');
        Route::post('/stripe/order/{id}', 'stripeOrder')->name('stripe.order');
       
    });

});


// Admin all Routes
Route::middleware(['auth', 'role:admin'])->group(function () {

    // Admin all Routes
    Route::controller(AdminController::class)->group(function () {
        Route::get('/admin/dashboard', 'dashboard')->name('admin.dashboard');
        
    });

    //Admin Profile Routes
    Route::controller(AdminProfileController::class)->group(function () {
        Route::get('/admin/edit/profile', 'editProfile')->name('admin.profile.edit');
        Route::post('/admin/profile/update', 'updateProfile')->name('admin.profile.update');
        Route::get('/admin/edit/password', 'editPassword')->name('admin.password.edit');
        Route::post('/admin/password/update', 'updatePassword')->name('admin.password.update');
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

    // Admin Order Routes
    Route::controller(AdminOrderController::class)->group(function () {
        Route::get('/confirmed/order', 'confirmedOrder')->name('confirmed.order');
        Route::post('/update/order/status/{id}', 'updateOrderStatus')->name('update.order.status');
    });
});

// Instructor all Routes
Route::middleware(['auth', 'role:instructor'])->group(function () {

    // Instructor all Routes
    Route::controller(InstructorController::class)->group(function () {
        Route::get('/instructor/dashboard', 'dashboard')->name('instructor.dashboard');
        
    });

    // Instructor Slider Routes
    Route::controller(InstructorSliderController::class)->group(function () {
        Route::get('/instructor/add/slider', 'addSlider')->name('instructor.add.slider');
        Route::post('/instructor/store/slider', 'storeSlider')->name('instructor.store.slider');
        Route::get('/instructor/all/slider', 'allSlider')->name('instructor.all.slider');
        Route::delete('/instructor/delete/slider/{id}', 'deleteSlider')->name('instructor.delete.slider');
        Route::get('/instructor/edit/slider/{id}', 'editSlider')->name('instructor.edit.slider');
        Route::post('/instructor/update/slider/{id}', 'updateSlider')->name('instructor.update.slider');
    });

    // Instructor Course Routes
    Route::controller(InstructorCourseController::class)->group(function () {
        Route::get('/instructor/add/course', 'addCourse')->name('instructor.add.course');
        Route::post('/instructor/store/course', 'storeCourse')->name('instructor.store.course');
        Route::get('/instructor/all/course', 'allCourse')->name('instructor.all.course');
        Route::delete('/instructor/delete/course/{id}', 'deleteCourse')->name('instructor.delete.course');
        Route::get('/instructor/edit/course/{id}', 'editCourse')->name('instructor.edit.course');
        Route::post('/instructor/update/course/{id}', 'updateCourse')->name('instructor.update.course');
    });

    // Instructor Module Routes
    Route::controller(InstructorModuleController::class)->group(function () {
        Route::get('/instructor/add/module', 'addModule')->name('instructor.add.module');
        Route::post('/instructor/store/module', 'storeModule')->name('instructor.store.module');
        Route::get('/instructor/all/module', 'allModule')->name('instructor.all.module');
        Route::delete('/instructor/delete/module/{id}', 'deleteModule')->name('instructor.delete.module');
        Route::get('/instructor/edit/module/{id}', 'editModule')->name('instructor.edit.module');
        Route::post('/instructor/update/module/{id}', 'updateModule')->name('instructor.update.module');
    });

    // Instructor Rating Routes
    Route::controller(InstructorRatingController::class)->group(function () {
        Route::get('/instructor/all/rating', 'allRating')->name('instructor.all.rating');
        Route::delete('/instructor/delete/rating/{id}', 'deleteRating')->name('instructor.delete.rating');
        Route::get('/instructor/edit/rating/{id}', 'editRating')->name('instructor.edit.rating');
    });

    //Instructor Quiz Routes
    Route::controller(InstructorQuizController::class)->group(function () {
        Route::get('/instructor/add/quiz', 'addQuiz')->name('instructor.add.quiz');
        Route::post('/instructor/store/quiz', 'storeQuiz')->name('instructor.store.quiz');
        Route::get('/instructor/all/quiz', 'allQuiz')->name('instructor.all.quiz');
        Route::delete('/instructor/delete/quiz/{id}', 'deleteQuiz')->name('instructor.delete.quiz');
        Route::get('/instructor/edit/quiz/{id}', 'editQuiz')->name('instructor.edit.quiz');
        Route::post('/instructor/update/quiz/{id}', 'updateQuiz')->name('instructor.update.quiz');
    });

    // Instructor Lesson Routes
    Route::controller(InstructorLessonController::class)->group(function () {
        Route::get('/instructor/add/lesson', 'addLesson')->name('instructor.add.lesson');
        Route::post('/instructor/store/lesson', 'storeLesson')->name('instructor.store.lesson');
        Route::get('/instructor/all/lesson', 'allLesson')->name('instructor.all.lesson');
        Route::delete('/instructor/delete/lesson/{id}', 'deleteLesson')->name('instructor.delete.lesson');
        Route::get('/instructor/edit/lesson/{id}', 'editLesson')->name('instructor.edit.lesson');
        Route::post('/instructor/update/lesson/{id}', 'updateLesson')->name('instructor.update.lesson');
    });

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
