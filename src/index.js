//Category List



//task Prototype Methods
const taskProto = {
    editTitle(newTitle) {
        this.title = newTitle;
    },
    editDescription(newDetails) {
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
        if (this.status === 'notDone') {
            this.status = 'done';
        } else {
            this.status = 'notDone'
        }
    },
    // addTodo() {
    //     taskList.push(this);
    // },
    // deleteTodo() {
    //     for (let i = 0; i < taskList.length; i++) {
    //         if (taskList[i] === this) {
    //             taskList.splice(i,1);
    //             return;
    //         }
    //     }
    // },
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
    return categoryList;
}

const addTask = (taskList,title,details,dueDate,priority,category) => {
    taskList.push(taskFactory(title,details,dueDate,priority,category));
    return taskList;
}

//DOM Below ----------------------------------------------------------------
//Query Selectors
let taskContainer = document.querySelector("#taskContainer")
let taskListContainer = document.querySelector('#taskListContainer');
let addTaskContainer = document.querySelector('#addTaskContainer');
let categoryContainer = document.querySelector('#categoryContainer')
let categoryListContainer = document.querySelector("#categoryListContainer")
let addCategoryContainer = document.querySelector('#addCategoryContainer')

//Draw Add Task DOM
const drawAddTask = () => {
    let addTaskDiv = document.createElement('div');
    addTaskDiv.setAttribute('id','addTaskDiv')
    let addTaskButton = document.createElement('button');
    addTaskButton.innerHTML = 'Add New Task';
    addTaskDiv.appendChild(addTaskButton);
    addTaskContainer.appendChild(addTaskDiv);
}

//Task Creation Form
const drawAddTaskForm = () => {

    // let addTaskDiv = document.querySelector('#addTaskDiv')

    //Create Form
    let addTaskForm = document.createElement('form');
    addTaskForm.setAttribute('id', 'addTaskForm');
    
    //Input Fields for Title
    let titleDiv = document.createElement('div');
    let titleLabel = document.createElement('label');
    titleLabel.innerHTML = 'Title:'
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type','text');
    titleInput.setAttribute('id',"taskTitleInput")
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    addTaskForm.appendChild(titleDiv);

    //Input fields for details
    let detailsDiv = document.createElement('div');
    let detailsLabel = document.createElement('label');
    detailsLabel.innerHTML = 'Details:'
    let detailsInput = document.createElement('input');
    detailsInput.setAttribute('type','text');
    detailsInput.setAttribute('id',"taskDetailsInput")
    detailsDiv.appendChild(detailsLabel);
    detailsDiv.appendChild(detailsInput);
    addTaskForm.appendChild(detailsDiv);

    //Input fields for dueDate
    let dueDateDiv = document.createElement('div');
    let dueDateLabel = document.createElement('label');
    dueDateLabel.innerHTML = 'Due Date:'
    //TODO ADD Moment.js to ensure date has not passed here ***
    let dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type','date');
    dueDateInput.setAttribute('id',"taskDueDateInput")
    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDateInput);
    addTaskForm.appendChild(dueDateDiv);

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
    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(prioritySelector);
    addTaskForm.appendChild(priorityDiv);

    //TO DO? Input fields for category

    //Create Task Button
    let submitTaskButton = document.createElement('button');
    submitTaskButton.setAttribute('id', 'submitTaskButton')
    submitTaskButton.innerHTML = 'Submit Task';
    addTaskForm.appendChild(submitTaskButton);
    
    addTaskContainer.appendChild(addTaskForm)
}

const drawTaskList = (taskList,activeCategory) => {
    taskListContainer.innerHTML = '';

    let tasksToDisplay = taskList.filter(task => task.category === activeCategory);

    tasksToDisplay.forEach(task => {
        let taskDiv = document.createElement('div');
        let pTitle = document.createElement('p');
        let pDueDate = document.createElement('p');
        
        pTitle.innerHTML = task.title;
        pDueDate.innerHTML = task.dueDate;

        taskDiv.appendChild(pTitle);
        taskDiv.appendChild(pDueDate);

        taskListContainer.appendChild(taskDiv)
    })
}

//Category List DOM
const drawAddCategory = () => {

    let addCategoryDiv = document.createElement('div');
    addCategoryDiv.setAttribute('id','addCategoryDiv')
    let addCatergoryButton = document.createElement('button');
    addCatergoryButton.setAttribute('id','addCategoryButton');
    addCatergoryButton.innerHTML = 'Add New Category'
    addCategoryDiv.appendChild(addCatergoryButton);

    //TODO Add Category List Viewer

    addCategoryContainer.appendChild(addCategoryDiv);
}

//Add New Category DOM
const drawAddCategoryForm = () => {

    let addCategoryForm = document.createElement('form');
    addCategoryForm.setAttribute('id','addCategoryForm')
    let addCategoryLabel = document.createElement('label');
    addCategoryLabel.innerHTML = 'Category Name';

    let submitCategoryInput = document.createElement('input');
    submitCategoryInput.setAttribute('id','submitCategoryInput');

    let submitCategoryButton = document.createElement('button');
    submitCategoryButton.innerHTML = 'Submit Category';
    submitCategoryButton.setAttribute('id','submitCategoryButton');
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
drawAddTaskForm();
drawAddCategory();
drawAddCategoryForm();
// drawCategoryList(categoryList);

let submitCategoryButton = document.querySelector('#submitCategoryButton');
let submitCategoryInput = document.querySelector('#submitCategoryInput');

//Submit new category button event listener
submitCategoryButton.addEventListener('click', function(e) {
    e.preventDefault();
    categoryList = addCategory(categoryList,submitCategoryInput.value,false);
    drawCategoryList(categoryList);
})


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

let submitTaskButton = document.querySelector('#submitTaskButton');
let taskTitleInput = document.querySelector('#taskTitleInput');
let taskDetailsInput = document.querySelector('#taskDetailsInput');
let taskDueDateInput = document.querySelector('#taskDueDateInput');
let taskPrioritySelector = document.querySelector('#taskPrioritySelector');

submitTaskButton.addEventListener('click',function(e) {
    // e.preventDefault();
    let title = taskTitleInput.value;
    let details = taskDetailsInput.value;
    let dueDate = taskDueDateInput.value;
    let priority = taskPrioritySelector.value;

    addTask(taskList,title,details,dueDate,priority,activeCategory);
    drawTaskList(taskList,activeCategory);

    console.log(taskList)
})









//Next - Work on Deleting Categories




// taskList.push(taskFactory('title','details','dueDate','priority','category'));








