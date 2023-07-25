<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public array $response = [
        'id' => 0,
        'name' => '',
        'phone' => '',
        'isEmpty' => true,
    ];

    public function main(Request $request, string $target): JsonResponse
    {
        match ($target) {
            'add' => $this->addContact($request),
            'del' => $this->delContact($request),
        };

        return Response()->json($this->response);
    }

    private function addContact(Request $request)
    {
        $isEmpty = !(Contact::query()->count() > 0);

        $contacts = new Contact();
        $contacts->name = $request->name;
        $contacts->phone = $request->phone;
        $contacts->save();

        $rec = $contacts->query()->orderBy('id', 'desc')->first();
        $id = $rec->id;
        $name = $rec->name;
        $phone = $rec->phone;

        $this->response['id'] = $id;
        $this->response['name'] = $name;
        $this->response['phone'] = $phone;
        $this->response['isEmpty'] = $isEmpty;
    }

    private function delContact(Request $request)
    {
        ;
    }
}
