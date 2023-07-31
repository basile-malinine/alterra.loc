<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>PHP - Тестовое задание</title>

    {{-- Подключение шрифта Open Sans --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

    {{-- Подключение Bootstrap и собственных стилей --}}
    <link rel="stylesheet" href="../../public/bootstrap-5.3.0/css/bootstrap.css">
    <link rel="stylesheet" href="../../public/css/main.css">
</head>
<body class="d-flex flex-column h-100">
<!-- Begin page content -->
<main class="flex-shrink-0">
    <div class="container">

        <div class="static-text">
            <div class="text-center display-6">Демо-проект на вакансию PHP-разработчик в компанию «Alterra»</div>
            <br>
            <h5>Суть задачи:</h5>
            <p>Реализовать книгу контактов.</p>
            <h5>Детали:</h5>
            <ul>
                <li>
                    На странице размещено два блока:
                    <ul>
                        <li>Форма добавления нового контакта.</li>
                        <li>Список всех контактов.</li>
                    </ul>
                </li>
                <li>Контакт можно добавить и удалить.</li>
                <li>Добавленные контакты необходимо хранить в базе данных mysql.</li>
                <li>Верстка должна соответствовать приложенному к заданию макету.</li>
            </ul>
        </div>

        <div class="static-text">
            <h5>Для реализации использовал:</h5>
            <ul>
                <li>PHP 8</li>
                <li>Laravel 10</li>
                <li>Bootstrap 5</li>
                <li>JavaScript + jQuery 3</li>
                <li>MySQL 8</li>
                <li>WEB-сервер Apache 2.4</li>
            </ul>
            <h5>Корневой WEB-каталог:</h5>
            <p class="fw-bold">alterra.loc/</p>
        </div>

        <div class="static-text">
            <h5 class="text-danger">Для запуска приложения необходимо:</h5>
            <ul>
                <li>Создать на сервере MySQL БД с произвольным названием</li>
                <li>Отредактироваь файл <span class="fw-bold">.env</span></li>
                <ul>
                    <li>DB_DATABASE=<span class="fst-italic">произвольное_название</span></li>
                    <li>DB_USERNAME=<span class="fst-italic">имя пользователя</span></li>
                    <li>DB_PASSWORD=<span class="fst-italic">пароль</span></li>
                </ul>
                <li>Применить миграции: в корневом каталоге <span class="fw-bold">alterra.loc/</span> выполнить команду: <span class="fw-bold">php artisan migrate</span></li>
            </ul>
        </div>

    </div>
</main>


<script src="../../public/bootstrap-5.3.0/js/bootstrap.min.js"></script>

</body>
</html>
