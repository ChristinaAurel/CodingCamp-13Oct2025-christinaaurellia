// In-memory database to store tasks
let taskDb = [];
let filterDb = [];

function addTask() {
    let taskInput = document.getElementById('todo-input');
    let taskDate = document.getElementById('todo-date');
    let taskStatus = document.getElementById('todo-status');

    if (validateInput(taskInput.value, taskDate.value, taskStatus.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
            status: taskStatus.value
        };
        // Add the new task to the tasks database
        taskDb.push(newTask);
        
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks
    
   // Render each task from the tasks database 
    taskDb.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date} - ${taskObj.status}</li>`;
    });
}

function deleteAllTasks() {
    taskDb = []; // Clear the tasks database
    renderTasks(); // Re-render the task list

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = 'No tasks available.'; // Show no tasks message

    // Clear input fields
    let taskInput = document.getElementById('todo-input');
    let taskDate = document.getElementById('todo-date');
    let taskStatus = document.getElementById('todo-status');
    let statusFilter = document.getElementById('filter-status');
    taskInput.value = '';
    taskDate.value = '';
    taskStatus.value = '';
    statusFilter.value = ' ';
}

function filterTasks() {
    let statusFilter = document.getElementById('filter-status');
    let FilterAll = document.getElementById('filter-all');

    if (validateFilter(statusFilter.value)) {
       const filteredTasks = taskDb.filter(taskObj => taskObj.status === statusFilter.value);
        filterDb.push(filteredTasks);

        renderTasks(filteredTasks);
    } 
    
    if (statusFilter.value === 'all') {
        const allTasks = taskDb;
        filterDb.push(allTasks);
        renderTasks(allTasks);
    }
}

function renderTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    const tasksToRender = filteredTasks || taskDb;

    // Render each task from the tasks database 
    tasksToRender.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date} - ${taskObj.status}</li>`;
    });
}

function renderTasks(allTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks
    const tasksToRender = allTasks || taskDb;

    // Render each task from the tasks database
    tasksToRender.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date} - ${taskObj.status}</li>`;
    });
}

function validateInput(task,date,status) {
    if (task.trim() === '' || date.trim() === '' || status.trim() === '') {
        alert('Please enter task, due date and status.');
        return false;
    }
    return true;
}

function validateFilter(status) {
    if (status.trim() === '') {
        alert('Please select a status to filter.');
        return false;
    }
    return true;
}