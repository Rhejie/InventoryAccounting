<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConstantsController extends Controller
{
    public function __construct() {

    }

    public function taxes()
    {

        return view('accounting.constant.taxes');

    }

    public function category()
    {

        return view('accounting.constant.category');

    }

    public function unit()
    {

        return view('accounting.constant.unit');

    }
}
