<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Массив с ответом на AJAX запрос
    public array $response = [
        'id' => 0,
        'name' => '',
        'phone' => '',
        'emptyDB' => true,  // true - в БД нет записей
    ];

    /**
     * Ф-ция main принимает AJAX запрос с фронта и перенаправляет его
     * для выполнения нужной операции (добавить / удалить) в зависимости
     * от параметра $target (add / del)
     *
     * @param Request $request
     * @param string $target
     * @return JsonResponse
     */
    public function main(Request $request, string $target): JsonResponse
    {
        // Выбор оперциии
        match ($target) {
            'add' => $this->addContact($request),
            'del' => $this->delContact($request),
        };

        // Отправляем ответ
        return Response()->json($this->response);
    }

    /**
     * Ф-ция addContact добавляет запись в БД
     *
     * @param Request $request AJAX запрос с фронта типа {name: 'Имя', phone: 'Телефон'}
     * @return void
     */
    private function addContact(Request $request): void
    {
        // true - в БД нет записей
        $emptyDB = !(Contact::query()->count() > 0);

        // Получаем экземпляр модели Контакт
        $contacts = new Contact();

        // Добавляем запись
        $contacts->name = $request->name;
        $contacts->phone = $request->phone;
        $res = $contacts->save();

        // Получаем только что созданную запись
        $rec = $contacts->orderBy('id', 'desc')->first();
        $id = $rec->id;
        $name = $rec->name;
        $phone = $rec->phone;

        // Готовим ответ на фронт
        if ($res) {
            $this->response['id'] = $id;
            $this->response['name'] = $name;
            $this->response['phone'] = $phone;
            $this->response['emptyDB'] = $emptyDB;
        }
        // Если добавление не выполнено...
        else {
            $this->response['id'] = 0;
        }
    }

    /**
     * Ф-ция delContact удаляет запись из БД по идентификатору
     *
     * @param Request $request AJAX запрос с фронта типа {id: n} n - идентификатор записи
     * @return void
     */
    private function delContact(Request $request): void
    {
        // Получаем экземпляр модели Контакт
        $contacts = new Contact();

        // Удаляем запись
        $res = $contacts->find($request->id)->delete();

        if ($res) {
            // true - в БД нет записей
            $emptyDB = !(Contact::query()->count() > 0);
            // Готовим ответ на фронт
            $this->response['id'] = $request->id;
            $this->response['emptyDB'] = $emptyDB;
        }
        // Если удаление не выполнено...
        else {
            $this->response['id'] = 0;
        }
    }
}
