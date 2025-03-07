<?php

use Illuminate\Support\Facades\Route;

Route::any('/{any}', function () {
    return view('welcome');
})->where(['any' => '.*']);