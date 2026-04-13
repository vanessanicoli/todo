// LIST OF TASKS
let taskList = [
    { name: "Go shopping", isCompleted: false, isEditing: false, priority: "low" },
    { name: "Go to the gym", isCompleted: false, isEditing: false, priority: "medium" },
    { name: "Finish work", isCompleted: false, isEditing: false, priority: "high" },
];

// SELECTORS
let showTaskBtn = document.querySelector('#showTaskBtn');
let wrapperList = document.querySelector('#wrapperList');

let checkShow = false;

let addNewTaskBtn = document.querySelector('#addNewTaskBtn');
let addNewTaskInput = document.querySelector('#addNewTaskInput'); 

// FUNCTIONS
function renderList(){
    let tasks = ``;
    taskList.forEach((task) => {
        tasks += `
            <div class="row justify-content-center align-items-center rowTask">
                <div class="col-8">
                    <h4 class="m-0">${task.name}</h4>
                    <p class="d-inline me-4 text-uppercase fs-6">Priority: ${task.priority}</p>
                </div>
                <div class="col-4 col-md-2 d-flex justify-content-around align-items-center p-0">
                    <i id="iconComplete" class="icon bi bi-check-lg fs-3" title="Mark as completed"></i>
                    <i id="iconModify" class="icon bi bi-pencil-fill" title="Modify your task"></i>
                    <i id="iconDelete" class="icon bi bi-trash3-fill" title="Delete your task"></i>
                </div>
            </div>
        `
    })
    
    wrapperList.innerHTML = `
        <header>
            <h2 class="text-center display-6 mb-3 text-sg fw-bold">YOUR TO-DO LIST</h2>
        </header>
        ${tasks}
    `
};

function showList() {
    if(checkShow == false){
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
        showList();

    }
    
};

// EVENT: SHOW TASK LIST

showTaskBtn.addEventListener('click', showList);

// EVENT: ADD NEW TASK
addNewTaskBtn.addEventListener('click', addNewTask);