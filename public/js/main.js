let currentId = 0;  // для отладки на фронте

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
    divDel.onclick = delContact;

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

function addContact(e) {
    e.preventDefault();

    const newContactHTML = createContactHTML('el' + currentId,
        $('#inputName').val(), $('#inputPhone').val());

    if (currentId++ === 0) {
        $('#elementEmpty').toggle();
    }

    $('#listElements').prepend(newContactHTML);
    console.log(currentId);
}

function delContact(e) {
    const id = e.target.getAttribute('element-id');
    $('#' + id).remove();
    if (--currentId === 0) {
        $('#elementEmpty').toggle();
    }
    console.log(currentId);
}

$(document).ready(() => {
    $('#buttonAdd').on('click', addContact);
});
