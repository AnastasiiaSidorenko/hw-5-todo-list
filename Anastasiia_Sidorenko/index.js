function addTask() {
    var task = document.getElementById('task');
    var list = document.getElementById('list');
    var deadline = document.getElementById('deadline');

    if (task.value === '') {
        alert('Please, add the task!');
    } else if (deadline.value === '') {
        alert('Please, choose the date!');
    } else {
        list.appendChild(createTask(task.value, deadline.value));
        task.value = '';
        deadline.value = '';
    }
}

var addButton = document.querySelector('button.add');
addButton.addEventListener('click', addTask);

function createTask(text, date) {
    var listItem = document.createElement('li');
    listItem.classList.add('task-list__item');
    var label = document.createElement('label');
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    var p = document.createElement('p');
    p.innerHTML = new Date(date).toLocaleDateString();
    var button = document.createElement('button');
    button.classList.add('delete');
    button.innerHTML = 'Delete';
    button.addEventListener('click', deleteTask);
    label.appendChild(input);
    label.appendChild(document.createTextNode(text));
    listItem.appendChild(label);
    listItem.appendChild(p);
    listItem.appendChild(button);
    return listItem;
}

function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var statusFilter = document.getElementById('status-filter');
statusFilter.addEventListener('change', filterStatus);

function filterStatus() {
    for (var element of document.getElementsByClassName('task-list__item')) {
        removeStatusClass(element);
        var elementStatus = element.childNodes[0].childNodes[0].checked;

        if (elementStatus === false && statusFilter.value === 'Completed tasks') {
            hideStatusElement(element);
        } else if (elementStatus === true && statusFilter.value === 'Uncomplited tasks') {
            hideStatusElement(element);
        }
    }
}

function hideStatusElement(item) {
    item.classList.add('hiddenStatus');
}

function removeStatusClass(item) {
    if (item.classList.contains('hiddenStatus')) {
        item.classList.remove('hiddenStatus');
    }
}

var deadlineFilter = document.getElementById('deadline-filter');
deadlineFilter.addEventListener('change', filterDeadline);

function filterDeadline() {
    for (var element of document.getElementsByClassName('task-list__item')) {
        var elementDateString = element.childNodes[1].innerHTML;
        var elementDate = new Date(elementDateString.split('.').reverse().join('-'));
        elementDate.setHours(0, 0, 0, 0);

        var tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        var lastDayOfWeek = new Date();
        lastDayOfWeek.setHours(0, 0, 0, 0);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);

        if (deadlineFilter.value === 'Tomorrow') {
            elementDate.getTime() === tomorrow.getTime() ?
                removeDeadlineClass(element) :
                hideDeadlineElement(element);
        } else if (deadlineFilter.value === 'Week') {
            elementDate.getTime() >= tomorrow.getTime() && elementDate.getTime() <= lastDayOfWeek.getTime() ?
                removeDeadlineClass(element) :
                hideDeadlineElement(element);
        } else {
            removeDeadlineClass(element);
        }
    }
}

function hideDeadlineElement(item) {
    item.classList.add('hiddenDeadline');
}

function removeDeadlineClass(item) {
    if (item.classList.contains('hiddenDeadline')) {
        item.classList.remove('hiddenDeadline');
    }
}


