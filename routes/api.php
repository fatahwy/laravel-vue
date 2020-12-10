<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\ArticleController;

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

Route::post('/login', 'App\Http\Controllers\AuthController@authenticate');


Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('/articles', 'App\Http\Controllers\ArticleController@index');
    Route::post('/article/store','App\Http\Controllers\ArticleController@store');
    Route::get('/article/detail/{id}','App\Http\Controllers\ArticleController@getArticle');
    Route::put('/article/update/{id}', 'App\Http\Controllers\ArticleController@update');
    Route::delete('/article/delete/{id}', 'App\Http\Controllers\ArticleController@delete');    
});