<?php

use App\Http\Controllers\Api\KategoriController;
use App\Http\Controllers\Api\PajakController;
use App\Http\Controllers\Api\TransaksiController;
use App\Http\Controllers\KategoriPajakController;
use App\Http\Controllers\TransaksiController as ControllersTransaksiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('/transaksi', TransaksiController::class);
// Route::get('/kategori/{pajak_id}', [KategoriController::class, 'Api\KategoriController@search']);
Route::apiResource('/kategori', KategoriController::class);
Route::get('/kategori/pajak/{pajak_id}', [KategoriController::class, 'pajak'])->name('pajak');
Route::apiResource('/pajak', PajakController::class);
