<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BankingController extends Controller
{
    public function __construct()
    {


    }

    public function account()
    {

        return view('accounting.banking.account');

    }

    public function transfer()
    {

        return view('accounting.banking.transfer');

    }
}
