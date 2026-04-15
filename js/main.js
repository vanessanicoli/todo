// -------------------------------------------------- LIST OF TASKS  ---------------------------------------------------

let taskList = [
    {   id: crypto.randomUUID(), //browser creates random id
        name: "Go shopping", isCompleted: false, isEditing: false, priority: "low", tempPriority: "low" },
    { id: crypto.randomUUID(), name: "Go to the gym", isCompleted: false, isEditing: false, priority: "medium", tempPriority: "medium" },
    { id: crypto.randomUUID(), name: "Finish work", isCompleted: false, isEditing: false, priority: "high", tempPriority: "high" },
];

// ----------------------------------------------------- SELECTORS -----------------------------------------------------

let showTaskBtn = document.querySelector('#showTaskBtn');
let wrapperList = document.querySelector('#wrapperList');

let checkShow = false;

let addNewTaskBtn = document.querySelector('#addNewTaskBtn');
let addNewTaskInput = document.querySelector('#addNewTaskInput'); 

// ----------------------------------------------------- FUNCTIONS -----------------------------------------------------
// viewTaskMode(task) : creates layout for the view mode of task
function viewTaskMode(task){
    let fragment = document.createElement('div');
    fragment.classList.add('d-flex', 'justify-content-center', 'w-100');

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

    // EVENT
    deleteIcon.addEventListener('click', ()=> deleteTask(task.id));

    if(!task.isCompleted){
        let completeIcon = document.createElement('i');
        completeIcon.classList.add('iconComplete', 'icon', 'bi', 'bi-check-lg', 'fs-3');
        completeIcon.title = 'Mark as completed';
    
        let editIcon = document.createElement('i');
        editIcon.classList.add('iconEdit', 'icon', 'bi', 'bi-pencil-fill');
        editIcon.title = 'Edit your task';
    
        col2.append(completeIcon, editIcon, deleteIcon);

        // EVENTS
        completeIcon.addEventListener('click', ()=> completeTask(task.id));
        editIcon.addEventListener('click', ()=> isEditingTask(task.id));
    }
    else{
        
        let notCompletedIcon = document.createElement('i');
        notCompletedIcon.classList.add('iconNotComplete', 'icon', 'bi', 'bi-arrow-counterclockwise', 'fs-4');
        notCompletedIcon.title = 'Mark as not completed';
        
        col2.append(notCompletedIcon, deleteIcon);

        // EVENTS
        notCompletedIcon.addEventListener('click', ()=> notCompletedTask(task.id));
    }

    fragment.append(col1, col2);

    if(task.isCompleted){
        fragment.classList.add('completed');
    } 
    return fragment;
}

// editTaskMode(task) : creates layout for the edit mode of task
function editTaskMode(task){
    let fragment = document.createElement('div');
    fragment.classList.add('d-flex', 'justify-content-center', 'w-100');

    let col1 = document.createElement('div');
    col1.classList.add('col-8');
    
    let editTitle = document.createElement('input');
    editTitle.type = "text";
    editTitle.id = "editTitleInput";
    editTitle.classList.add('form-edit' , 'me-4');
    editTitle.value = task.name;
    
    let priorityWrapper = document.createElement('div');
    priorityWrapper.classList.add('d-flex', 'flex-column', 'flex-md-row');

    let priority = document.createElement('p');
    priority.classList.add('d-inline', 'me-4','mb-0', 'mt-3', 'mt-md-0' ,'text-uppercase', 'fs-6');
    priority.textContent = `Priority: `;
    
    priorityWrapper.append(
        priority,
        createRadio(task,'low','Low'),
        createRadio(task,'medium','Medium'),
        createRadio(task,'high','High')
    );
    
    col1.append(editTitle, priorityWrapper);
    
    let col2 = document.createElement('div');
    col2.classList.add('col-4', 'col-md-2', 'd-flex', 'justify-content-around', 'align-items-center', 'p-0');
    
    let saveIcon = document.createElement('i');
    saveIcon.classList.add('iconSave', 'icon', 'bi', 'bi-check-lg', 'fs-3');
    saveIcon.title = 'Save changes';

    saveIcon.addEventListener('click', ()=>{
        task.name = editTitle.value;

        task.priority = task.tempPriority;
        task.isEditing = false;
        renderList();
    });
    
    let cancelIcon = document.createElement('i');
    cancelIcon.classList.add('iconCancel', 'icon', 'bi', 'bi-x-lg', 'fs-4');
    cancelIcon.title = 'Cancel changes';
    
    cancelIcon.addEventListener('click', ()=>{
        task.isEditing = false;
        task.tempPriority = task.priority;
        renderList();
    });

    col2.append(saveIcon, cancelIcon);
        
    fragment.append(col1, col2);

    return fragment;
}

// createRadio(task, value, labelText) : creates radio for edit mode
function createRadio(task, value, labelText){
    let radio = document.createElement('div');
    radio.classList.add('form-check', 'form-check-inline');
    
    let radioInput = document.createElement('input');
    radioInput.classList.add('form-check-input');
    radioInput.type = 'radio';
    radioInput.id = `${value}-${task.id}`;
    radioInput.name = `priority-${task.id}`;
    radioInput.value = value;

    if(task.priority === value){
        radioInput.checked = true;
    }
    
    let radioLabel = document.createElement('label');
    radioLabel.classList.add('form-check-label');
    radioLabel.htmlFor = radioInput.id;
    radioLabel.textContent = labelText;

    radio.append(radioInput, radioLabel);

    radioInput.addEventListener('change', () => {
        task.tempPriority = value;
    });

    return radio;
}

// createTaskElement(task) : create task row to show in the task list
function createTaskElement(task){
    let row = document.createElement('div');
    row.classList.add('row', 'justify-content-center', 'align-items-center', 'rowTask');

    if(!task.isEditing){
        row.append(viewTaskMode(task));
    }
    else{
        row.classList.add('rowEdit');
        row.append(editTaskMode(task));
    }

    return row;
}

// renderList() : create headers and inserts active and completed task in relative sections
function renderList(){
    let activeTasks = taskList.filter((task)=> !task.isCompleted);
    let completedTasks = taskList.filter((task)=> task.isCompleted);

    wrapperList.innerHTML = ``;

    // ACTIVE
    let header2 = document.createElement('header');
    let h2 = document.createElement('h2');
    
    let header3 = document.createElement('header');
    let h3 = document.createElement('h3');

    h2.classList.add('text-center','display-6', 'mb-3', 'text-sg', 'fw-bold');
    h2.textContent = `YOUR TO-DO LIST`
    header2.appendChild(h2);
    wrapperList.appendChild(header2);
    
    if(activeTasks.length === 0){
        let p = document.createElement('p');
        p.classList.add('lead', 'text-uppercase', 'text-center', 'text-sg', 'fs-3', 'mb-0');
        p.textContent = `You don't have any tasks to complete`;

        wrapperList.appendChild(p);
    }
    else{
        activeTasks.forEach((task,index)=>{
            wrapperList.appendChild(createTaskElement(task));
        });
    }

    // COMPLETED
    h3.classList.add('text-center','display-7', 'mb-3', 'mt-5', 'text-sg', 'fw-bold');
    h3.textContent = `YOUR COMPLETED TASKS`

    header3.appendChild(h3);
    wrapperList.appendChild(header3);

    if(completedTasks.length === 0){
        let p = document.createElement('p');
        p.classList.add('lead', 'text-uppercase', 'text-center', 'text-sg', 'fs-4', 'mb-0');
        p.textContent = `You don't have any completed tasks`;

        wrapperList.appendChild(p);
    }
    else{
        completedTasks.forEach((task,index)=>{
            wrapperList.appendChild(createTaskElement(task));
        });
    }
};

// showList() : shows task list and changes button layout
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

// addNewTask() : add a new task and shows new task list
function addNewTask(){

    let checkInput = document.querySelector('.form-check-input:checked');

    if(addNewTaskInput.value == ''){
        addNewTaskInput.classList.add('is-invalid','input-error');
        addNewTaskInput.placeholder = `Insert a name for your task`;
    } 
    else {
        addNewTaskInput.classList.remove('is-invalid','input-error');

        taskList.push({id: crypto.randomUUID(), name: addNewTaskInput.value, isCompleted: false, isEditing: false, priority: checkInput.value, tempPriority: checkInput.value});

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

// completeTask(id) : searchs the id of the current task and sets task as completed
function completeTask(id){
    let task = taskList.find(currentTask => currentTask.id === id);
    task.isCompleted = true;
    renderList();
}

// deleteTask(id) : creates a new array with all the tasks different from the current one 
// (deleting it without losing original array)
function deleteTask(id){
    taskList = taskList.filter(allTasks => allTasks.id !== id);
    renderList();
}

// notCompletedTask(id) : searchs the id of the current task and sets task as not completed
function notCompletedTask(id){
    let task = taskList.find(currentTask => currentTask.id === id);
    task.isCompleted = false;
    renderList();
}

// isEditingTask(id) : searchs the id of the current task and sets task status as isEditing
function isEditingTask(id){
    // edit one task at a time
    taskList.forEach(taskEl => taskEl.isEditing = false);

    let task = taskList.find(currentTask => currentTask.id === id);
    task.isEditing = true;

    task.tempPriority = task.priority;

    renderList();
}

// -------------------------------------------------- EVENTS ---------------------------------------------------

// SHOW TASK LIST
showTaskBtn.addEventListener('click', showList);

// ADD NEW TASK
addNewTaskBtn.addEventListener('click', addNewTask);


// FUTURE FEATURES
// PLUS: ORDER BY NAME .sort()
// PLUS: FILTER BY PRIORITY .filter()