const SERVER_URL = 'http://localhost:3000';

async function serverAddStudent(obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj),
    })

    let data = await response.json();

    return data;
}

async function serverGetStudent() {
    let responseList = await fetch(SERVER_URL + '/api/students', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    let dataList = await responseList.json();

    return dataList;
}

async function serverDeleteStudent(id) {
    let response = await fetch(SERVER_URL + '/api/students/' + id, {
        method: 'DELETE',
    })

    let dataDelete = await response.json();

    return dataDelete;
}

let studentsList = [];

// Полные ФИО
function getFullName(studentsList) {
    return studentsList.surname + ' ' + studentsList.name + ' ' + studentsList.lastname;
}

// Срок обучения
function getLearnPeriod(studentsList) {
    let currentDate = new Date();
    let learnTotal = currentDate.getFullYear() - studentsList.studyStart;
    let LearnPeriod = studentsList.studyStart + '-' + currentDate.getFullYear();
    let learnCours = `(${learnTotal + 1} курс)`;

    if (learnTotal > 4 || learnTotal === 4 && currentDate.getMonth() > 8) {
        LearnPeriod = `${studentsList.studyStart}-${studentsList.studyStart + 4}`;
        learnCours = '(окончил)';
    } else if (learnTotal <= 4 && currentDate.getMonth() < 8) {
        learnCours = '(' + learnTotal + ' курс)';
    } else if (learnTotal === 0 && currentDate.getMonth() > 8) {
        LearnPeriod = currentDate.getFullYear();
        learnCours = ' (1 курс)';
    }

    return LearnPeriod + ' ' + learnCours;
}

// Полное название колонки возраст
// Дата рождения в формате dd.mm.yyyy
function getBirthdayFormat(studentsList) {
    let yyyy = studentsList.birthday.getFullYear();
    let mm = studentsList.birthday.getMonth() + 1;
    let dd = studentsList.birthday.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    return dd + '.' + mm + '.' + yyyy;
}

// Выисление возраста студента
function getAge(studentsList) {
    let today = new Date();
    let age = today.getFullYear() - studentsList.birthday.getFullYear();
    let month = today.getMonth() - studentsList.birthday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < studentsList.birthday.getDate())) {
        age--;
    }
    return age;
}

// Строковое слово к возрасту (год/года/лет)
function getAgeWord(studentsList) {
    let age = getAge(studentsList);
    if (age % 10 === 0 || age % 10 >= 5 || (10 < age % 100 && age % 100 < 20)) {
        return 'лет';
    } else if (age % 10 === 1) {
        return 'год';
    } else {
        return 'года';
    }
}
// Полуение полного названия колонки "Возраст"
function getBirthdayAgeWord(studentsList) {
    return getBirthdayFormat(studentsList) + ' (' + getAge(studentsList) + ' ' + getAgeWord(studentsList) + ')';
}

// Создание заголовка.
function createStudentListTitle(title) {
    let listTitle = document.createElement('h1');
    listTitle.innerHTML = title;
    return listTitle;
}

// Создание формы для ввода нового студента
function createNewStudentForm() {
    let studentForm = document.createElement('form');
    let formWrapper = document.createElement('div');
    let formColLeft = document.createElement('div');
    let formColRight = document.createElement('div');
    let labelSurname = document.createElement('label');
    let inputSurname = document.createElement('input');
    let labelName = document.createElement('label');
    let inputName = document.createElement('input');
    let labelLastname = document.createElement('label');
    let inputLastname = document.createElement('input');
    let labelStudyStart = document.createElement('label');
    let inputStudyStart = document.createElement('input');
    let labelBirthday = document.createElement('label');
    let inputBirthday = document.createElement('input');
    let labelFaculty = document.createElement('label');
    let inputFaculty = document.createElement('input');
    let inputWrapper = document.createElement('div')
    let formButton = document.createElement('button');

    inputBirthday.setAttribute('type', 'date');
    inputSurname.setAttribute('data-surname', 'true');
    inputName.setAttribute('data-name', 'true');
    inputLastname.setAttribute('data-lastname', 'true');
    inputFaculty.setAttribute('data-faculty', 'true');
    inputStudyStart.setAttribute('data-studystart', '2000');
    inputBirthday.setAttribute('data-birthday', '01.01.1900');

    formWrapper.classList.add('form-group', 'row');
    formColLeft.classList.add('col');
    formColRight.classList.add('col');
    inputSurname.classList.add('form-control', 'mb-3');
    inputName.classList.add('form-control', 'mb-3');
    inputLastname.classList.add('form-control', 'mb-3');
    inputStudyStart.classList.add('form-control', 'mb-3');
    inputBirthday.classList.add('form-control', 'mb-3');
    inputFaculty.classList.add('form-control', 'mb-3');
    labelSurname.textContent = 'Фамилия студента:';
    inputSurname.placeholder = 'Введите фамилию студента';
    labelName.textContent = 'Имя студента:';
    inputName.placeholder = 'Введите имя студента';
    labelLastname.textContent = 'Отчество студента:';
    inputLastname.placeholder = 'Введите отчество студента';
    labelStudyStart.textContent = 'Год начала обучения:';
    inputStudyStart.placeholder = 'Введите год начала обучения';
    labelBirthday.textContent = 'Дата рождения:';
    inputBirthday.placeholder = 'Введите дату рождения';
    labelFaculty.textContent = 'Факультет:';
    inputFaculty.placeholder = 'Введите факультет';

    formButton.classList.add('btn', 'btn-primary', 'mb-4');
    formButton.textContent = 'Добавить нового студента';


    formWrapper.append(formColLeft);
    formColLeft.append(labelSurname);
    formColLeft.append(inputSurname);
    formColLeft.append(labelName);
    formColLeft.append(inputName);
    formColLeft.append(labelLastname);
    formColLeft.append(inputLastname);
    formWrapper.append(formColRight);
    formColRight.append(labelBirthday);
    formColRight.append(inputBirthday);
    formColRight.append(labelStudyStart);
    formColRight.append(inputStudyStart);
    formColRight.append(labelFaculty);
    formColRight.append(inputFaculty);
    studentForm.append(formWrapper);
    studentForm.append(formButton);

    return {
        studentForm,
        inputName,
        inputSurname,
        inputLastname,
        inputBirthday,
        inputStudyStart,
        inputFaculty,
    }
}

// Вывода одного студента в таблицу
function getStudentItem(studentObj) {
    let studentsTable = document.getElementById('students-table');

    let studentsTableTR = document.createElement('tr');
    let tdFIO = document.createElement('td');
    let tdFaculty = document.createElement('td');
    let tdDateAge = document.createElement('td');
    let tdLearnTime = document.createElement('td');
    let tdDelete = document.createElement('td');
    let btnDelete = document.createElement('button');

    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('id', 'btn-delete');
    btnDelete.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-delete');

    tdFIO.textContent = getFullName(studentObj);
    tdFaculty.textContent = studentObj.faculty;
    tdDateAge.textContent = getBirthdayAgeWord(studentObj);
    tdLearnTime.textContent = getLearnPeriod(studentObj);
    btnDelete.textContent = 'Удалить';

    studentsTableTR.append(tdFIO);
    studentsTableTR.append(tdFaculty);
    studentsTableTR.append(tdDateAge);
    studentsTableTR.append(tdLearnTime);
    tdDelete.append(btnDelete);
    studentsTableTR.append(tdDelete);

    studentsTable.append(studentsTableTR);

    btnDelete.addEventListener('click', async () => {
        let confirmation = confirm('Вы действительно хотите удалить данные студента?');
        if (confirmation) {
            await serverDeleteStudent(studentObj.id);
            studentsTableTR.remove();
            studentsList.splice(studentsList.indexOf(studentObj), 1);
        }
    })

    return {
        studentsTable,
        tdFIO,
        tdFaculty,
        tdDateAge,
        tdLearnTime,
        studentsTableTR,
        btnDelete,
    }
}

// Вывод всех студентов в таблицу
function renderStudentsTable(studentsArray) {
    for (let item of studentsArray) {
        getStudentItem(item);
    }
}

// Отрисовка DOM-дерева
document.addEventListener('DOMContentLoaded', async function () {
    let containerStudentList = document.getElementById('students-list');
    let studentsListTitle = createStudentListTitle('Список студентов');
    let newStudentForm = createNewStudentForm();

    containerStudentList.prepend(newStudentForm.studentForm);
    containerStudentList.prepend(studentsListTitle);

    let serverData = await serverGetStudent();

    for (const studentObjItem of serverData) {
        studentObjItem.birthday = new Date(studentObjItem.birthday);
        studentObjItem.createdAt = new Date(studentObjItem.createdAt);
        studentObjItem.updatedAt = new Date(studentObjItem.updatedAt);
        studentObjItem.studyStart = Number(studentObjItem.studyStart);
    }

    if (serverData) {
        studentsList = serverData;
    }

    // Очистка полей формы
    let allInput = document.querySelectorAll('input');

    function cleanForm() {
        for (let input of allInput) {
            input.value = ''
        }
    }
    
    // Добавление нового студента
    newStudentForm.studentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Добавление объекта студента в массив
        let newStudentObj = {
            // id: getNewID(studentsList),
            name: newStudentForm.inputName.value,
            surname: newStudentForm.inputSurname.value,
            lastname: newStudentForm.inputLastname.value,
            studyStart: Number(newStudentForm.inputStudyStart.value),
            birthday: newStudentForm.inputBirthday.valueAsDate,
            faculty: newStudentForm.inputFaculty.value,
        }

        //Валидация полей формы
        function validationStudentForm(form) {

            function removeError(input) {
                let parent = input.parentNode;

                if (input.classList.contains('error')) {
                    parent.querySelector('.error-text').remove();
                    input.classList.remove('error');
                }
            }

            function createError(input, text) {
                let parent = input.parentNode;
                input.classList.add('error');
                let errorWarning = document.createElement('div');

                errorWarning.classList.add('error-text');
                errorWarning.textContent = text;
                parent.append(errorWarning);
            }

            let resultValidation = true;

            let allInput = document.querySelectorAll('input');

            for (let input of allInput) {

                removeError(input);

                let today = new Date();

                if (input.dataset.surname === 'true') {
                    if (input.value.trim() === '') {
                        removeError(input);
                        createError(input, 'Поле "Фамилия" не заполнено');
                        resultValidation = false;
                    }
                }

                if (input.dataset.name === 'true') {
                    if (input.value.trim() === '') {
                        removeError(input);
                        createError(input, 'Поле "Имя" не заполнено');
                        resultValidation = false;
                    }
                }

                if (input.dataset.lastname === 'true') {
                    if (input.value.trim() === '') {
                        removeError(input);
                        createError(input, 'Поле "Отчество" не заполнено');
                        resultValidation = false;
                    }
                }

                if (input.dataset.birthday) {
                    if (input.value.trim() === '') {
                        removeError(input);
                        createError(input, 'Поле "Дата рождения" не заполнено');
                        resultValidation = false;
                    } else if (!(Date.parse(input.value) <= Date.parse(today) && Date.parse(input.value) >= Date.parse(input.dataset.birthday))) {
                        removeError(input);
                        createError(input, 'Дата рождения должна быть в пределах от 01.01.1900 до текущей даты');
                        resultValidation = false;
                    }
                }

                if (input.dataset.studystart) {
                    if (input.value.trim() === '') {
                        removeError(input);
                        createError(input, 'Введите год начала обучения');
                        resultValidation = false;
                    } else if (!(/^\d+$/.test(input.value))) {
                        removeError(input);
                        createError(input, 'Используйте только цифры в поле "Год начала обучения"');
                        resultValidation = false;
                    } else if (input.dataset.studystart > Number(input.value) || Number(input.value) > today.getFullYear()) {
                        removeError(input);
                        createError(input, 'Год начала обучения в диапазоне от 2000-го по текущий год');
                        resultValidation = false;
                    }
                }

                if (input.dataset.faculty === 'true') {
                    if (input.value.trim() === '') {
                        removeError(input);
                        createError(input, 'Поле "Факультет" не заполнено');
                        resultValidation = false;
                    }
                }

            }

            return resultValidation;
        }

        if (validationStudentForm(newStudentForm.studentForm) === true) {
            let serverDataObj = await serverAddStudent(newStudentObj);
            serverData = await serverGetStudent();
            for (const studentObjItem of serverData) {
                studentObjItem.birthday = new Date(studentObjItem.birthday);
            }
            if (serverData) {
                studentsList = serverData;
            }
            cleanTable();
            renderStudentsTable(studentsList);
            newArr = [...studentsList];
            cleanForm();
            setTimeout(() => {
                alert('Форма проверена успешно! Данные студента добавлены в таблицу.');
            }, 300)
        }
    })

    // Очистка таблицы
    function cleanTable() {
        let studentsTable = document.getElementById('students-table');
        studentsTable.innerHTML = '';
    }

    // Фильтрация списка
    // Общая ф-ия фильтрации
    function filter(arr, prop, value) {
        let result = [],
            copyArr = [...arr];
        for (let item of copyArr) {
            if (String(item[prop]).includes(value) === true) result.push(item);
        }
        return result;
    }

    // Создание отфильтрованного списка студентов
    let newArr = [...studentsList];

    async function renderStudentsTableFilter(arr) {

        serverData = await serverGetStudent();
        for (const studentObjItem of serverData) {
            studentObjItem.birthday = new Date(studentObjItem.birthday);
            studentObjItem.studyStart = Number(studentObjItem.studyStart);
        }
        if (serverData) {
            studentsList = serverData;
        }

        let newArr = [...arr];
        newArr = [...studentsList];

        cleanTable();

        const fioVal = document.getElementById('fio-filter').value,
            facultyVal = document.getElementById('faculty-filter').value,
            learnStartVal = document.getElementById('learn-start-filter').value,
            learnEndtVal = document.getElementById('learn-end-filter').value;

        // let newArr = [...arr];
        for (const item of newArr) {
            item.fio = getFullName(item);
        }

        if (fioVal !== '') newArr = filter(newArr, 'fio', fioVal);
        if (facultyVal !== '') newArr = filter(newArr, 'faculty', facultyVal);
        if (learnStartVal !== '') newArr = filter(newArr, 'studyStart', learnStartVal);
        if (learnEndtVal !== '') newArr = filter(newArr, 'studyStart', learnEndtVal - 4);

        renderStudentsTable(newArr);
    }

    let formFilter = document.getElementById('form-filter');
    formFilter.addEventListener('submit', function (event) {
        event.preventDefault();
        cleanTable();
        renderStudentsTableFilter(newArr);
    })

    // Очистка полей фильтрации
    document.getElementById('btn-clean').addEventListener('click', function () {
        let allInpFilter = formFilter.querySelectorAll('input');
        for (const item of allInpFilter) {
            item.value = '';
        }
        renderStudentsTableFilter(studentsList);
    })

    // Сортировка таблицы студентов
    // Общая ф-ия сортировки
    function sortStudens(arr, prop, dir = false) {
        let result = arr.sort(function (a, b) {
            let dirWay = a[prop] < b[prop];
            if (dir === true) dirWay = a[prop] > b[prop];
            if (dirWay === true) return -1;
        });
        return result;
    }

    let fioSort = document.getElementById('fio');
    let facultySort = document.getElementById('faculty');
    let dateAgeSort = document.getElementById('date-age');
    let learnTimeSort = document.getElementById('learn-time');
    fioSort.classList.add('head-title');
    facultySort.classList.add('head-title');
    dateAgeSort.classList.add('head-title');
    learnTimeSort.classList.add('head-title');
    let sortWay = true;

    fioSort.addEventListener('click', function () {
        newArr = [...studentsList];
        sortWay = !sortWay;
        sortStudens(newArr, 'surname', sortWay);
        cleanTable();
        renderStudentsTable(newArr);
    })

    facultySort.addEventListener('click', async function () {
        newArr = [...studentsList];
        sortWay = !sortWay;
        sortStudens(newArr, 'faculty', sortWay);
        cleanTable();
        renderStudentsTable(newArr);
    })

    dateAgeSort.addEventListener('click', async function () {
        newArr = [...studentsList];
        sortWay = !sortWay;
        sortStudens(newArr, 'birthday', sortWay);
        cleanTable();
        renderStudentsTable(newArr);
    })

    learnTimeSort.addEventListener('click', async function () {
        newArr = [...studentsList];
        sortWay = !sortWay;
        sortStudens(newArr, 'studyStart', sortWay);
        cleanTable();
        renderStudentsTable(newArr);
    })

    renderStudentsTable(studentsList);
})
