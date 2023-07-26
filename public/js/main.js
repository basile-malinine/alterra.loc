/**
 * Функция createContactHTML() создаёт 'плитку' (div) Контакта
 * для добавления в Список контактов на страницу.
 *
 * @returns {HTMLDivElement}
 */
function createContactHTML(id, name, phone) {
    // Сама 'плитка'
    let divElement = document.createElement('div');
    divElement.classList.add('element-div');
    divElement.setAttribute('id', id);

    // Обёртка для Имени Контакта и значка для удаления Контакта
    let divElementPerson = document.createElement('div');
    divElementPerson.classList.add('element-person');

    // Имя Контакта
    let divPersonName = document.createElement('div');
    divPersonName.classList.add('person-name');
    divPersonName.innerText = name;

    // Значок для удаления Контакта
    let divDel = document.createElement('div');
    divDel.classList.add('element-del');
    divDel.setAttribute('element-id', '');
    divDel.innerText = 'x';
    divDel.setAttribute('element-id', id);
    divDel.onclick = sendDelContact;

    // Телефон Контакта
    let divElementPhone = document.createElement('div');
    divElementPhone.classList.add('element-phone');
    divElementPhone.innerText = phone;

    // Определение иерархии блоков
    divElement.appendChild(divElementPerson);
    divElement.appendChild(divElementPhone);
    divElementPerson.appendChild(divPersonName);
    divElementPerson.appendChild(divDel);

    return divElement;
}

/**
 * Ф-ция insertContact вставляет блок с добавленной записью
 * в начало Списка контактов
 *
 * @param id
 * @param name
 * @param phone
 * @param emptyDB
 */


function insertContact(id, name, phone, emptyDB) {
    // Приводим формат строки телефона к требованиям ТЗ
    phone = phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');

    // Получаем заполненный блок
    const newContactHTML = createContactHTML('el' + id, name, phone);

    // Если в БД не было записей прячем блок Список пуст
    if (emptyDB) {
        $('#elementEmpty').attr('hidden', '');
    }

    // Вставляем заполненный блок в начало списка
    $('#listElements').prepend(newContactHTML);
}

/**
 * Ф-ция removeContact удаляет выбранный блок с записью
 * из Списка контактов
 *
 * @param id
 * @param emptyDB
 */
function removeContact(id, emptyDB) {
    // Удаляем блок из модели DOM страницы
    $('#' + id).remove();

    // Если в БД больше нет записей отображаем блок Список пуст
    if (emptyDB) {
        $('#elementEmpty').removeAttr('hidden');
    }
}

/**
 * Ф-ция sendAddContact отправляет AJAX запрос серверу
 * на добавление записи
 *
 * @param e
 */
function sendAddContact(e) {
    // Отключаем реакцию по умолчанию кнопки Добавить (submit)
    e.preventDefault();

    // Очищаем информацию об ошибках на форме
    $('#inputNameError').text('');
    $('#inputPhoneError').text('');

    // Введённые пользователем данные данные в поле Телефон
    let inpPhone = [];

    // Чистим введённые данные, убираем все символы кроме цифр,
    // match() вернёт массив
    let phone = '';
    inpPhone = $('#inputPhone').val().match(/\d+/g, '');

    // Если после чистки данные присутствуют, преобразуем inpPhone[]
    // в строку и записываем в phone
    if (inpPhone) {
        inpPhone.map((num) => phone += num);
    }
    // ...иначе очищаем поле ввода на форме
    else {
        $('#inputPhone').val('');
    }
    // Отправляем AJAX запрос
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        url: '/contact/add',
        type: 'POST',
        data: {
            name: $('#inputName').val(),
            phone: phone,
        },
        success: (response) => {
            // Если запись добавлена в БД
            if (response.id > 0) {
                insertContact(response.id, response.name, response.phone, response.emptyDB);
            }
            // Если не удалось добавить запись в БД
            else {
                alert('Не удалось добавить запись!');
            }
        },
        error: (response) => {
            $('#inputNameError').text(response.responseJSON.errors.name);
            $('#inputPhoneError').text(response.responseJSON.errors.phone);
        },
    })
}

/**
 * Ф-ция sendDelContact отправляет AJAX запрос серверу
 * на удоление записи
 *
 * @param e
 */
function sendDelContact(e) {
    // Получаем идентификатор записи для БД
    let id = e.target.getAttribute('element-id');
    id = +id.replace('el', '');

    // Отправляем AJAX запрос
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        url: '/contact/del',
        type: 'POST',
        data: {
            id: id,
        },
        success: (response) => {
            // Если запись удалена из БД
            if (response.id > 0) {
                removeContact('el' + response.id, response.emptyDB);
            }
            // Если не удалось удалить запись из БД
            else {
                alert('Не удалось удалить запись!');
            }
        },
        error: (response) => {
            alert('Ошибка на сервере!');
        },
    })
}

function sendGetAll() {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        url: '/contact/all',
        type: 'POST',
        success: (response) => {
            response.records.map((el) => {
                insertContact(el.id, el.name, el.phone, false);
            });
            if (response.records.length === 0) {
                $('#elementEmpty').removeAttr('hidden');
            }
        },
        error: (response) => {
            alert('Ошибка на сервере!');
        },
    })
}
// Событие onclick для кнопки Добавить
$(document).ready(() => {
    $('#buttonAdd').on('click', sendAddContact);

    sendGetAll();
});
