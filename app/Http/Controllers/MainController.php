<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index() {
        $title = 'Книга контактов';

        // Проверяем доступ к MySQL
        try {
            Contact::query()->count();
            return view('main', compact('title'));
        }
        catch (QueryException $e) {
            return view('err-base');
        }
    }
}
