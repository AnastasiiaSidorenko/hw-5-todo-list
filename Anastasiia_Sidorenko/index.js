function addTask() {
    var task = document.getElementById('task');
    var list = document.getElementById('list');
    var deadline = document.getElementById('deadline');

    if (task.value === "") {
        alert("Please, add the task!");
    } else {
        list.appendChild(createTask(task.value, deadline.value));
        task.value = '';
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
    var button = document.createElement('button');
    button.classList.add('delete');
    button.innerHTML = 'Delete';
    button.addEventListener('click', deleteTask);
    label.appendChild(input);
    label.appendChild(document.createTextNode(text + ' ' + date));
    listItem.appendChild(label)
    listItem.appendChild(button);
    return listItem;
}

function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}



