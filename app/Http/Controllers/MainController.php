<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index() {
        $title = 'Книга контактов';
        return view('main', compact('title'));
    }
}
