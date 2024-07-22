<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CityController;
use App\Http\Controllers\WeatherController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




// Define your API routes here
Route::get('/weather', [WeatherController::class, 'getWeather']);
Route::get('/search-city', [CityController::class, 'searchCity']);