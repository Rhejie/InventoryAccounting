<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProposalsController extends Controller
{
    public function __construct()
    {


    }

    public function index()
    {

        return view('accounting.proposal.index');

    }
}
