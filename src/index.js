//Category List



//task Prototype Methods
const taskProto = {
    editTitle(newTitle) {
        this.title = newTitle;
    },
    editDetails(newDetails) {
        this.details = newDetails;
    },
    editDueDate(newDueDate) {
        this.dueDate = newDueDate;
    },
    editPriority(newPriority) {
        this.priority = newPriority;
    },
    editCategory(newCategory) {
        this.category = newCategory;
    },
    toggleStatus() {
        if (this.completed === false) {
            this.completed = true;
        } else {
            this.completed = false
        }
    },
}

//task Factory Function
const taskFactory = (title,details,dueDate,priority,category,active) => {

    let task = Object.create(taskProto);
    let completed = false;  

    task.title = title;
    task.details = details;
    task.dueDate = dueDate;
    task.priority = priority;
    task.category = category;
    task.active = active;
    task.completed = completed;
    task.id = Date.now().toString();
    
    return task;
} 

const categoryProto = {
    editTitle(newTitle) {
        this.title = newTitle;
    }
}

const categoryFactory = (title,active) => {
    let category = Object.create(categoryProto);

    category.title = title;
    category.id = Date.now().toString();
    category.active = active;

    return category;
}

const addCategory = (categoryList,title,active) => {
    categoryList.push(categoryFactory(title,active));
}

const addTask = (taskList,title,details,dueDate,priority,category) => {
    taskList.push(taskFactory(title,details,dueDate,priority,category));
}

//DOM Below ----------------------------------------------------------------
//Query Selectors
let taskContainer = document.querySelector("#taskContainer")
let addNewTask = document.querySelector('#addNewTask');
let taskListTable = document.querySelector('#taskListTable');
let taskForm = document.querySelector('#taskForm');
let categoryContainer = document.querySelector('#categoryContainer')
let categoryListContainer = document.querySelector("#categoryListContainer")
let addCategoryContainer = document.querySelector('#addCategoryContainer')



//Draw Add Task Button
const drawAddTask = () => {
    let addTaskDiv = document.createElement('div');
    addTaskDiv.setAttribute('id','addTaskDiv');
    let addNewTaskButton = document.createElement('button');
    addNewTaskButton.setAttribute('class','add-new-task-button');
    addNewTaskButton.innerHTML = 'Add New Task';
    addTaskDiv.appendChild(addNewTaskButton);
    addNewTask.appendChild(addTaskDiv);
}

//Task Creation Form
const drawTaskForm = (mode,taskId,taskList) => {

    taskForm.innerHTML = '';
    let currentTitle, currentDetails, currentDueDate, currentPriority,currentTask;

    if (mode === 'editTask'){
        taskForm.dataset.id = taskId;
        currentTask = taskList.find(task => task.id === taskId);
        currentTitle = currentTask.title;
        currentDetails = currentTask.details;
        currentDueDate = currentTask.dueDate;
        currentPriority = currentTask.priority;
    } else {
        taskForm.dataset.id = null;
    }

    let h1 = document.createElement('h1');

    if (mode === 'newTask') {
        h1.innerHTML = "Add New Task:"
    } else if (mode === 'editTask') {
        h1.innerHTML = "Edit Task";
    }



    taskForm.appendChild(h1);

    //Create Form
    // taskForm.setAttribute('class','add-task-form-inactive')
    
    //Input Fields for Title
    let titleDiv = document.createElement('div');
    let titleLabel = document.createElement('label');
    titleLabel.innerHTML = 'Title:'
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type','text');
    titleInput.setAttribute('id',"taskTitleInput");
    if (mode === 'editTask'){
        titleInput.value = currentTitle;
    }
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    taskForm.appendChild(titleDiv);

    //Input fields for details
    let detailsDiv = document.createElement('div');
    let detailsLabel = document.createElement('label');
    detailsLabel.innerHTML = 'Details:'
    let detailsInput = document.createElement('input');
    detailsInput.setAttribute('type','text');
    detailsInput.setAttribute('id',"taskDetailsInput");
    if (mode === 'editTask') {
        detailsInput.value = currentDetails;
    }
    detailsDiv.appendChild(detailsLabel);
    detailsDiv.appendChild(detailsInput);
    taskForm.appendChild(detailsDiv);

    //Input fields for dueDate
    let dueDateDiv = document.createElement('div');
    let dueDateLabel = document.createElement('label');
    dueDateLabel.innerHTML = 'Due Date:'
    //TODO ADD Moment.js to ensure date has not passed here ***
    let dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type','date');
    dueDateInput.setAttribute('id',"taskDueDateInput")
    if (mode === 'editTask') {
        dueDateInput.value = currentDueDate;
    }
    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDateInput);
    taskForm.appendChild(dueDateDiv);

    //Input fields for priority
    let priorityDiv = document.createElement('div');
    let priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = 'Priority:'
    let prioritySelector = document.createElement('select');
    prioritySelector.setAttribute('id','taskPrioritySelector')
    let option1 = document.createElement('option');
    option1.setAttribute('value','normal');
    option1.innerHTML = 'Normal';
    let option2 = document.createElement('option');
    option2.setAttribute('value','high');
    option2.innerHTML = 'High';
    let option3 = document.createElement('option');
    option3.setAttribute('value','low');
    option3.innerHTML = 'Low';  
 
    prioritySelector.appendChild(option1);
    prioritySelector.appendChild(option2);
    prioritySelector.appendChild(option3);

    if (mode === 'editTask') {
        console.log(currentPriority)
        if (currentPriority === 'low') {
            prioritySelector.value = 'low';
        } else if (currentPriority === 'normal') {
            prioritySelector.value = 'normal';
        } else if (currentPriority === 'high') {
            prioritySelector.value = 'high';
        }       
    }

    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(prioritySelector);
    taskForm.appendChild(priorityDiv);

    //TO DO? Input fields for category

    //Create Task Button
    let submitTaskButton = document.createElement('button');
    submitTaskButton.setAttribute('id', 'submitTaskButton');
    if (mode === 'newTask') {
        submitTaskButton.innerHTML = 'Submit New Task';
    } else if (mode === 'editTask') {
        submitTaskButton.innerHTML = 'Edit Task';
    }
    taskForm.appendChild(submitTaskButton);
}

//Draw Task List
const drawTaskList = (taskList,activeCategory) => {
    taskListTable.innerHTML = '';

    let tasksToDisplay = taskList.filter(task => task.category === activeCategory);

    tasksToDisplay.forEach(task => {

        //Create a table row and assign id from taskList Object
        let taskRow = document.createElement('tr');
        taskRow.setAttribute('class','task-row');
        taskRow.dataset.id = task.id;

        //Create completed check box and append to table Row        
        let completedCheckBox = document.createElement('input');
        completedCheckBox.setAttribute('type','checkbox');
        completedCheckBox.setAttribute('class','completed-check-box');

        //Toggle check box based on completed value in object 
        if (task.completed === false) {
            completedCheckBox.checked = false;
        } else {
            completedCheckBox.checked = true;
        }

        taskRow.appendChild(completedCheckBox);

        //Create Title Data Element and append to table row
        let tdTitle = document.createElement('td');
        tdTitle.innerHTML = task.title;

        taskRow.appendChild(tdTitle);

        //Create due date data element and append to table row
        let tdDueDate = document.createElement('td');

        //If not date entered, set dueDate to 'None'
        if (task.dueDate === '') {
            tdDueDate.innerHTML = 'None'
        } else {
            tdDueDate.innerHTML = task.dueDate;
        }

        taskRow.appendChild(tdDueDate);

        //Create priority data element
        let tdPriority = document.createElement('td');
        tdPriority.innerHTML = task.priority;
        taskRow.appendChild(tdPriority);

        //Create deleteTask button element and append to table row
        let tdDeleteTask = document.createElement('td');
        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.setAttribute('class','delete-task-button')
        deleteTaskButton.innerHTML = 'Delete';
        taskRow.appendChild(tdDeleteTask).appendChild(deleteTaskButton);

        //Create editTask button
        let tdEditTask = document.createElement('td');
        let editTaskButton = document.createElement('button');
        editTaskButton.setAttribute('class','edit-task-button');
        editTaskButton.innerHTML = 'Edit';
        taskRow.appendChild(tdEditTask).appendChild(editTaskButton)

        //Append task row to task table
        taskListTable.appendChild(taskRow);  
    })
}

//Category List DOM
const drawAddCategory = () => {

    let addCategoryDiv = document.createElement('div');
    addCategoryDiv.setAttribute('id','addCategoryDiv')
    let toggleCategoryFormButton = document.createElement('button');
    toggleCategoryFormButton.setAttribute('id','toggleCategoryFormButton');
    toggleCategoryFormButton.innerHTML = 'Add New Category'
    addCategoryDiv.appendChild(toggleCategoryFormButton);

    //TODO Add Category List Viewer

    addCategoryContainer.appendChild(addCategoryDiv);
}

//Add New Category DOM
const drawAddCategoryForm = () => {

    let addCategoryForm = document.createElement('form');
    addCategoryForm.setAttribute('id','addCategoryForm');

    addCategoryForm.setAttribute('class','add-category-form-inactive')

    let addCategoryLabel = document.createElement('label');
    addCategoryLabel.innerHTML = 'Category Name';

    let submitCategoryInput = document.createElement('input');
    submitCategoryInput.setAttribute('id','submitCategoryInput');

    let submitCategoryButton = document.createElement('button');
    submitCategoryButton.setAttribute('id','submitCategoryButton'); //NEED TO FIX THIS ISSUE HERE - Causes date picker to not appear
    submitCategoryButton.innerHTML = 'Submit Category';

    addCategoryForm.appendChild(addCategoryLabel);
    addCategoryForm.appendChild(submitCategoryInput)
    addCategoryForm.appendChild(submitCategoryButton);
    
    addCategoryContainer.appendChild(addCategoryForm);
}

//Draw the category list and set active category
const drawCategoryList = (categoryList) => {
    categoryListContainer.innerHTML = '';
    
    categoryList.forEach(category => {
        let categoryDiv = document.createElement('div');
        categoryDiv.setAttribute('data-id',category.id);
        categoryDiv.setAttribute('class','category-div')
        if (category.active === true) {
            categoryDiv.className += ' active-category';
        }
        let categoryP = document.createElement('p');
        categoryP.setAttribute('class','category-name')
        categoryP.innerHTML = category.title;
        let categoryDeleteButton = document.createElement('button');
        categoryDeleteButton.setAttribute('class','category-delete-button');
        categoryDeleteButton.innerHTML = 'Delete'
        categoryDiv.appendChild(categoryP);
        categoryDiv.appendChild(categoryDeleteButton);
        categoryListContainer.appendChild(categoryDiv);
    });
}

//Draw the current category task list

const deleteCategory = (categoryList,id) => {
    categoryList = categoryList.filter(category => category.id != id);
    return categoryList
}

//Logic Below --------------------------------------

let taskList = [];
let categoryList = [];
let activeCategory

//Initialize Category List and Set Default Category
const initializeCategoryList = (categoryList,mainCategoryName) => {
    addCategory(categoryList,mainCategoryName,true);
    drawCategoryList(categoryList);
    activeCategory = mainCategoryName;
}

initializeCategoryList(categoryList,'Default Task List');

drawAddTask();
// drawTaskForm('newTask');
drawAddCategory();
drawAddCategoryForm();

let submitCategoryButton = document.querySelector('#submitCategoryButton');
let submitCategoryInput = document.querySelector('#submitCategoryInput');

//Delete Category Button Event Listener
document.addEventListener('click',function(e) {
    e.preventDefault();
    if (e.target.className === 'category-delete-button') {
        let id = e.target.parentNode.dataset.id;
        categoryList = deleteCategory(categoryList,id)
        drawCategoryList(categoryList);
    }
});

//Active Category Selector Event Listener
document.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'category-name') {
        let clickedCategoryIndex = categoryList.findIndex((category) => category.id === e.target.parentNode.dataset.id);
        categoryList[clickedCategoryIndex].active = true;
        for (let i = 0; i < categoryList.length; i++) {
            if (i != clickedCategoryIndex) {
                categoryList[i].active = false;
            }
        }
        activeCategory = categoryList.find(category => category.active === true).title;
        drawCategoryList(categoryList);
        drawTaskList(taskList,activeCategory)
    }
})

//Submit Task Event Listener
window.addEventListener('click',function(e) {
    if (e.target.id === 'submitTaskButton') {

        let title = taskTitleInput.value;
        let details = taskDetailsInput.value;
        let dueDate = taskDueDateInput.value;
        let priority = taskPrioritySelector.value;

        if (e.target.parentNode.className === 'add-new-task-form') { 
            addTask(taskList,title,details,dueDate,priority,activeCategory);
            drawTaskList(taskList,activeCategory);
        } else if (e.target.parentNode.id = 'edit-task-form') {
            console.log('edit submit clicked')
            let id = e.target.parentNode.dataset.id;
            console.log(id)
            let task = taskList.find(task => task.id === id);
            task.editTitle(title);
            task.editDetails(details);
            task.editDueDate(dueDate);
            task.editPriority(priority);
            drawTaskList(taskList,activeCategory);
        }
        drawTaskForm('newTask');
    }
})

let addNewTaskButton = document.querySelector('#addNewTaskButton')


//Toggle Add or Edit Task Form
document.addEventListener('click',function(e) {
    e.preventDefault();

    // if (taskForm.className === 'task-form-inactive') {
    //     taskForm.className = 'task-form-active';
    // } else {
    //     taskForm.className = 'task-form-inactive';
    // }

    if (e.target.className === 'add-new-task-button') {
        // if (taskForm.classList.contains('task-form-active')){
        //     taskForm.className = 'task-form-inactive';
        // } else {
            drawTaskForm('newTask');
            taskForm.className = 'add-new-task-form';
            // taskForm.classList.add('add-new-task-form');
        //}
    } else if (e.target.className === "edit-task-button") {
        let taskId = e.target.parentNode.parentNode.dataset.id;
        drawTaskForm('editTask',taskId,taskList);
        taskForm.className = 'edit-task-form'
    }
});


//Toggle Task Completed Status
document.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'completed-check-box') {
        let id = e.target.parentNode.dataset.id;
        taskList.find(task => task.id === id).toggleStatus();
        drawTaskList(taskList,activeCategory);
    }
})

//Delete Task
document.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-task-button'){
        let id = e.target.parentNode.parentNode.dataset.id;
        console.log(id)
        taskList = taskList.filter(task => task.id != id)
        drawTaskList(taskList,activeCategory);
    }
})

//Toggle Add New Category Form
toggleCategoryFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (addCategoryForm.className === 'add-category-form-active') {
        addCategoryForm.className = 'add-category-form-inactive';
    } else {
        addCategoryForm.className = 'add-category-form-active';
    }
})

//Submit new category button event listener
submitCategoryButton.addEventListener('click', function(e) {
    e.preventDefault();
    //Check if Category Exists already
    for (i = 0; i < categoryList.length; i++) {
        if ((categoryList[i].title).toLowerCase() === (submitCategoryInput.value).toLowerCase()) {
            alert('Category Exists');
            return;
        }
    };
    // if (categoryList.indexOf(submitCategoryInput.value))
    addCategory(categoryList,submitCategoryInput.value,false);
    drawCategoryList(categoryList);
});












//Next - Work on Deleting Categories




// taskList.push(taskFactory('title','details','dueDate','priority','category'));








