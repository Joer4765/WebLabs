const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
    const taskText = newTaskInput.value;
    if (taskText !== '') {
        const newTask = { text: taskText, completed: false, createdAt: Date.now()};
        tasks.push(newTask);
        newTaskInput.value = '';
        updateTaskList();
        saveTasks();
    }
}

// Function to update the task list in the UI
function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="task">
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-content">${task.text}</span>
            <button class="delete" data-index="${index}">Delete</button>
        </div>
        <div class="task-date">
           <span class="created-at">${new Date(task.createdAt).toLocaleString()}</span>
        </div>              
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleTaskCompletion(index));
        taskList.appendChild(li);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    saveTasks();
}

// Function to save tasks in local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const index = event.target.dataset.index;
        deleteTask(index);
    }
});

// Initial rendering of tasks
updateTaskList();

// Function to sort tasks
function sortTasks(sortBy) {
    switch (sortBy) {
        case 'date':
            tasks.sort((a, b) => b.createdAt - a.createdAt);
            break;
        case 'status':
            tasks.sort((a, b) => b.createdAt - a.createdAt);
            break;
    }
    updateTaskList();
    saveTasks();
}

// Function to edit a task
function editTask(index) {
    const li = taskList.children[index];
    const taskText = li.querySelector('span').textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();
    input.addEventListener('blur', () => {
        tasks[index].text = input.value;
        updateTaskList();
        saveTasks();
    });
}

// Add event listener for editing tasks
taskList.addEventListener('dblclick', (event) => {
    const li = event.target.closest('li');
    if (li) {
        const index = Array.from(taskList.children).indexOf(li);
        editTask(index);
    }
});

// Get references to sort buttons
const sortByDateButton = document.getElementById('sortByDate');
const sortByStatusButton = document.getElementById('sortByStatus');

// Add event listeners to sort buttons
sortByDateButton.addEventListener('click', () => sortTasks('date'));
sortByStatusButton.addEventListener('click', () => sortTasks('status'));
