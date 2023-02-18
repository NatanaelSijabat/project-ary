<?php

use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\CheckTransaksiController;
use App\Http\Controllers\PajakController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::group(['middleware' => 'auth'], function () {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
    Route::get('/redirectAuthenticatedUsers', [RedirectAuthenticatedUsersController::class, 'home']);
    Route::group(['middleware' => 'checkRole:admin'], function () {
        Route::inertia('/adminDashboard', 'AdminDashboard')->name('adminDashboard');
        Route::get('/user', [UserController::class, 'index'])->name('user.index');
        Route::resource('/cek', CheckTransaksiController::class)
            ->only('index', 'update')
            ->middleware('auth', 'verified');
    });

    Route::group(['middleware' => 'checkRole:user'], function () {
        Route::inertia('/userDashboard', 'UserDashboard')->name('userDashboard');
        Route::resource('/transaksi', TransaksiController::class)
            ->only('index', 'store')
            ->middleware('auth', 'verified');
        Route::get('/transaksi/pdf/{id}', [PdfController::class, 'generatePDF'])->name('pdf');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('/pajak', PajakController::class)
    ->only('index', 'store', 'update', 'destroy')
    ->middleware('auth', 'verified');

require __DIR__ . '/auth.php';
