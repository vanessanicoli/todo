// LIST OF TASKS
let taskList = [
    { name: "Go shopping", isCompleted: false, isEditing: false, priority: "low" },
    { name: "Go to the gym", isCompleted: true, isEditing: false, priority: "medium" },
    { name: "Finish work", isCompleted: false, isEditing: false, priority: "high" },
];

// SELECTORS
let showTaskBtn = document.querySelector('#showTaskBtn');
let wrapperList = document.querySelector('#wrapperList');

let checkShow = false;

let addNewTaskBtn = document.querySelector('#addNewTaskBtn');
let addNewTaskInput = document.querySelector('#addNewTaskInput'); 


// FUNCTIONS
function createTaskElement(task, index){
    let row = document.createElement('div');
    row.classList.add('row', 'justify-content-center', 'align-items-center', 'rowTask');
    
    let col1 = document.createElement('div');
    col1.classList.add('col-8');
    
    let title = document.createElement('h4');
    title.classList.add('m-0');
    title.textContent = task.name;
    
    let priority = document.createElement('p');
    priority.classList.add('d-inline', 'me-4', 'text-uppercase', 'fs-6');
    priority.textContent = `Priority: ${task.priority}`;

    col1.append(title, priority);

    let col2 = document.createElement('div');
    col2.classList.add('col-4', 'col-md-2', 'd-flex', 'justify-content-around', 'align-items-center', 'p-0');

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('iconDelete', 'icon', 'bi', 'bi-trash3-fill');
    deleteIcon.title = 'Delete your task';

    if(!task.isCompleted){
        let completeIcon = document.createElement('i');
        completeIcon.classList.add('iconComplete', 'icon', 'bi', 'bi-check-lg', 'fs-3');
        completeIcon.title = 'Mark as completed';
    
        let editIcon = document.createElement('i');
        editIcon.classList.add('iconEdit', 'icon', 'bi', 'bi-pencil-fill');
        editIcon.title = 'Edit your task';
    
        col2.append(completeIcon, editIcon, deleteIcon);
    }
    else{
        
        let notCompletedIcon = document.createElement('i');
        notCompletedIcon.classList.add('iconNotComplete', 'icon', 'bi', 'bi-x-lg', 'fs-4');
        notCompletedIcon.title = 'Mark as not completed';

        col2.append(notCompletedIcon, deleteIcon);
    }

    row.append(col1, col2);

    
    if(task.isCompleted){
        row.classList.add('completed');
    }

    return row;
}

function renderList(){
    let activeTasks = taskList.filter((task)=> !task.isCompleted);
    let completedTasks = taskList.filter((task)=> task.isCompleted);

    // ACTIVE
    let header2 = document.createElement('header');
    let h2 = document.createElement('h2');
    
    let header3 = document.createElement('header');
    let h3 = document.createElement('h3');

    h2.classList.add('text-center','display-6', 'mb-3', 'text-sg', 'fw-bold');
    h2.textContent = `YOUR TO-DO LIST`
    header2.appendChild(h2);
    wrapperList.appendChild(header2);
    
    activeTasks.forEach((task,index)=>{
        wrapperList.appendChild(createTaskElement(task, index));
    });

    // COMPLETED
    h3.classList.add('text-center','display-7', 'mb-3', 'mt-5', 'text-sg', 'fw-bold');
    h3.textContent = `YOUR COMPLETED TASKS`

    header3.appendChild(h3);
    wrapperList.appendChild(header3);

    completedTasks.forEach((task,index)=>{
        wrapperList.appendChild(createTaskElement(task, index));
    });
};

function showList() {
    if(!checkShow){
        showTaskBtn.innerHTML = `Hide task list`
        checkShow = true;
        wrapperList.classList.remove('d-none');
        renderList();
    } 
    else {
        showTaskBtn.innerHTML = `Show task list`
        checkShow = false;
        wrapperList.classList.add('d-none');
        wrapperList.innerHTML = ``
    }
};

function addNewTask(){

    let checkInput = document.querySelector('.form-check-input:checked');

    if(addNewTaskInput.value == ''){
        addNewTaskInput.classList.add('is-invalid','input-error');
        addNewTaskInput.placeholder = `Insert a name for your task`;
    } 
    else {
        addNewTaskInput.classList.remove('is-invalid','input-error');

        taskList.push({name: addNewTaskInput.value, isCompleted: false, isEditing: false, priority: checkInput.value});

        addNewTaskInput.value = '';
        addNewTaskInput.placeholder = `Name of your new task`;

        if(checkShow){
            renderList();
        }
        else{
            showList();
        }
    }
    
};

// EVENT: SHOW TASK LIST

showTaskBtn.addEventListener('click', showList);

// EVENT: ADD NEW TASK
addNewTaskBtn.addEventListener('click', addNewTask);

// EVENT: COMPLETE TASK 
// EVENT: MODIFY TASK
// EVENT: DELETE TASK

// PLUS: ORDER BY NAME .sort()
// PLUS: FILTER BY PRIORITY .filter()