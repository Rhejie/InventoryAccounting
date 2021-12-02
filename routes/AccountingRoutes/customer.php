<?php

Route::group(['prefix' => 'customer', 'middleware' => 'auth'], function () {

    Route::get('/get-customers', [App\Http\Controllers\Accounting\CustomersController::class, 'getCustomers']);
    Route::post('/store-customer', [App\Http\Controllers\Accounting\CustomersController::class, 'storeCustomer']);
    Route::post('/update-customer/{id}', [App\Http\Controllers\Accounting\CustomersController::class, 'updateCustomer']);
    Route::post('/delete-customer/{id}', [App\Http\Controllers\Accounting\CustomersController::class, 'deleteCustomer']);

});