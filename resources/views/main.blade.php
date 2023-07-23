<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Книга контактов</title>

    {{-- Подключение шрифта Open Sans --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

    {{-- Подключение Bootstrap и собственных стилей --}}
    <link rel="stylesheet" href="../../public/bootstrap-5.3.0/css/bootstrap.css">
    <link rel="stylesheet" href="../../public/css/main.css">
</head>

<body>
<div class="layout d-flex flex-column m-0">
    <div class="add-container align-self-center shadow-sm">
        <div class="add-header-div d-flex align-items-center">
            Добавить контакт
        </div>
        <div class="form-container">
            <form>
                <div class="name-div">
                    <input type="text" class="form-control form-control-md" id="inputName" placeholder="Имя">
                </div>
                <div class="phone-div">
                    <input type="text" class="form-control form-control-md" id="inputPhone" placeholder="Телефон">
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary" id="buttonAdd">Добавить</button>
                </div>
            </form>
        </div>
    </div>
    <div class="list-container mb-3 align-self-center shadow-sm">
        <div class="list-header-div d-flex align-items-center">
            Список контактов
        </div>
        <div class="list-elements lh-sm" id="listElements">
            <div id="elementEmpty">
                Список пуст
            </div>
            {{-- Здесь будут добавляться Контакты --}}
        </div>
    </div>
</div>

<script src="../../public/bootstrap-5.3.0/js/bootstrap.min.js"></script>
<script src="../../public/jquery-3.7.0/jquery-3.7.0.min.js"></script>
<script src="../../public/js/main.js"></script>
</body>
</html>
