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

    // Получаем заполненный блок
    const newContactHTML = createContactHTML(id, name, phone);

    // Если в БД не было записей прячем блок Список пуст
    if (emptyDB) {
        $('#elementEmpty').toggle();
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
        $('#elementEmpty').toggle();
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

    // Отправляем AJAX запрос
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        url: '/contact/add',
        type: 'POST',
        data: {
            name: $('#inputName').val(),
            phone: $('#inputPhone').val(),
        },
        success: (response) => {
            // Если запись добавлена в БД
            if (response.id > 0) {
                console.log(response);
                insertContact('el' + response.id, response.name, response.phone, response.emptyDB);
            }
            // Если не удалось добавить запись в БД
            else {
                outMessage('Не удалось добавить запись');
            }
        },
        error: (response) => {
            console.log(response);
            outMessage('Ошибка сервера!');
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
                console.log(response);
                removeContact('el' + response.id, response.emptyDB);
            }
            // Если не удалось удалить запись из БД
            else {
                outMessage('Не удалось удалить запись')
            }
        },
        error: (response) => {
            console.log(response);
            outMessage('Ошибка сервера!');
        },
    })
}

function outMessage(msg) {
    alert(msg);
}

$(document).ready(() => {
    $('#buttonAdd').on('click', sendAddContact);

});
