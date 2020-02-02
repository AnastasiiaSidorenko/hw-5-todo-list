var Module = (function () {
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

    function filterStatus(event) {
        for (var element of document.getElementsByClassName('task-list__item')) {
            removeStatusClass(element);
            var elementStatus = element.childNodes[0].childNodes[0].checked;

            if (elementStatus === false && event.target.value === 'Completed tasks') {
                hideStatusElement(element);
            } else if (elementStatus === true && event.target.value === 'Uncompleted tasks') {
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

    function filterDeadline(event) {
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

            if (event.target.value === 'Tomorrow') {
                elementDate.getTime() === tomorrow.getTime() ?
                    removeDeadlineClass(element) :
                    hideDeadlineElement(element);
            } else if (event.target.value === 'Week') {
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

    function initWidget(rootId) {
        var h1 = document.createElement('h1');
        h1.classList = 'main-caption';
        h1.innerHTML = 'TO DO LIST';

        var divTasksFilter = document.createElement('div');
        divTasksFilter.classList.add('tasks-filter');

        var selectStatusFilter = document.createElement('select');
        selectStatusFilter.id = 'status-filter';
        selectStatusFilter.addEventListener('change', filterStatus);
        var optionAllTasksStatus = document.createElement('option');
        optionAllTasksStatus.innerHTML = 'All tasks';
        var optionCompletedTasksStatus = document.createElement('option');
        optionCompletedTasksStatus.innerHTML = 'Completed tasks';
        var optionUncompletedTasksStatus = document.createElement('option');
        optionUncompletedTasksStatus.innerHTML = 'Uncompleted tasks';
        selectStatusFilter.appendChild(optionAllTasksStatus);
        selectStatusFilter.appendChild(optionCompletedTasksStatus);
        selectStatusFilter.appendChild(optionUncompletedTasksStatus);

        var selectDeadlineFilter = document.createElement('select');        
        selectDeadlineFilter.id = 'deadline-filter';        
        var optionAllTasksDeadline = document.createElement('option');
        optionAllTasksDeadline.innerHTML = 'All tasks';
        var optionTomorrowTasksDeadline = document.createElement('option');
        optionTomorrowTasksDeadline.innerHTML = 'Tomorrow';
        var optionWeekTasksDeadline = document.createElement('option');
        optionWeekTasksDeadline.innerHTML = 'Week';
        
        selectDeadlineFilter.appendChild(optionAllTasksDeadline);
        selectDeadlineFilter.appendChild(optionTomorrowTasksDeadline);
        selectDeadlineFilter.appendChild(optionWeekTasksDeadline);
        selectDeadlineFilter.addEventListener('change', filterDeadline);

        divTasksFilter.appendChild(selectStatusFilter);
        divTasksFilter.appendChild(selectDeadlineFilter);

        var divTaskDetails = document.createElement('div');
        divTaskDetails.classList = 'task-details';
        var inputTask = document.createElement('input');
        inputTask.id = 'task';
        inputTask.setAttribute('type', 'text');
        var inputDeadline = document.createElement('input');
        inputDeadline.id = 'deadline';
        inputDeadline.setAttribute('type', 'date');
        var buttonAdd = document.createElement('button');
        buttonAdd.classList = 'add';
        buttonAdd.addEventListener('click', addTask);
        buttonAdd.innerHTML = 'Add';
        divTaskDetails.appendChild(inputTask);
        divTaskDetails.appendChild(inputDeadline);
        divTaskDetails.appendChild(buttonAdd);

        var divAddedTasks = document.createElement('div');
        divAddedTasks.classList = 'added-tasks';
        var h2AddedTasksCaption = document.createElement('h2');
        h2AddedTasksCaption.classList = 'added-tasks__caption';
        h2AddedTasksCaption.innerHTML = 'TO DO';
        var ulTaskList = document.createElement('ul');
        ulTaskList.id = 'list';
        ulTaskList.classList = 'task-list';
        divAddedTasks.appendChild(h2AddedTasksCaption);
        divAddedTasks.appendChild(ulTaskList);

        var root = document.getElementById(rootId);
        root.classList = 'container';
        root.appendChild(h1);
        root.appendChild(divTaskDetails);
        root.appendChild(divTasksFilter);
        root.appendChild(divAddedTasks);
    }

    function applyStyles() {
        var css = '@font-face { src: url("https://fonts.googleapis.com/css?family=Oxygen&display=swap"); } .container { font-family: "Oxygen", sans-serif; display: flex; flex-direction: column; border: 1px solid #708090; border-radius: 10px; width: 400px; height: 500px; margin: 0 auto; padding: 10px; top: 50%; transform: translateY(-50%); position: relative; background: url(images/container-image.jpg) no-repeat; color: #404040; } .added-tasks { display: flex; flex-direction: column; overflow: auto; } .main-caption, .added-tasks__caption { align-self: center; } .task-details { margin-bottom: 5px; } .task-list { padding: 0; margin: 0; } .task-list__item { display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 10px 0; list-style: none; border-bottom: 1px solid #404040; } .hiddenStatus, .hiddenDeadline { display: none; }';
        var style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    return {
        init: function (elementId) {
            initWidget(elementId);
            applyStyles();
        }
    }
})();


Module.init('widget');