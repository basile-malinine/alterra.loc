<?php

use App\Models\Contact;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use \App\Http\Controllers\MainController;

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

/**
 * Маршрут к главной странице
 */
Route::get('/', [MainController::class, 'index']);

/**
 * Маршрут для работы с Контактами.
 * В target передаётся 'all' / 'add' / 'del'
 * (получение всех Контактов / добавление / удаление Контакта).
 */
Route::post('/contact/{target}', [ContactController::class, 'main']);
