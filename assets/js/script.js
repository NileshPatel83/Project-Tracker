const keyText = 'project-tracker';

let dateInputEl = $('#datepicker');
let addProjectFormEl = $('#add-project-form')
let projNameEl = $('#project-name');
let projTypeEl = $('#project-type');
let projDisplayEl = $('#project-display');

var today = dayjs();
$('#current-day').text(today.format('MMM D, YYYY'));

let timeInterval = setInterval(function () {
    $('#current-time').text(dayjs().format('h:mm:ss A'));
}, 1000);  

//Event handler when new project form is submitted.
addProjectFormEl.on('submit', processProjectData);

projDisplayEl.on('click', '.btn-delete-project', deleteProject);

function deleteProject(event){
    event.preventDefault();
}

//Processes project data entered in modal form.
function processProjectData (event){

    event.preventDefault();
    
    //Gets the project data.
    let projectData = getNewProjectData();
    if(projectData === null) return;

    //Removes current project data from browser.
    removeProjectDataDisplay();

    //Stores current project data to local storage.
    storeCurrentProjectToLocalStorage(projectData);

    //Displays all project data in ascending order.
    displayAllProjectData();
}

//Displays all project data in ascending order.
function displayAllProjectData(){

    //Gets all local storage for projects.
    let projectStorage = getAllProjectStorage();

    //Displays all project data in table.
    for (let i = 0; i < projectStorage.length; i++) {
        displayProjectData(projectStorage[i], i);
    }
}

function getAllProjectStorage(){

    let projectStorage = [];

    let storage = localStorage.getItem(keyText);   
    if(storage !== null){
        projectStorage = JSON.parse(storage);
    }

    //Returns the storage.
    return projectStorage;
}

//Displays project data in table.
function displayProjectData(projectData, index){

    // get date/time for start of today
    let today = dayjs().startOf('day');

    let projectDate = dayjs(projectData.dueDate);

    let tableRowEl = $('<tr>');

    let projectNameEl = $('<td>');
    projectNameEl.text (projectData.projectName);

    let projectTypeEl = $('<td>');
    projectTypeEl.text (projectData.projectType);

    let dueDateEl = $('<td>');
    dueDateEl.text (projectDate.format('DD/MM/YYYY'));

    let deleteEl = $('<td><button class="btn btn-sm btn-delete-project" data-index="' + index + '">X</button></td>');
    
    if(projectDate.isBefore(today)){
        tableRowEl.addClass('project-late');
    } else if (projectDate.isSame(today)){
        tableRowEl.addClass('project-today');
    }

    tableRowEl.append(projectNameEl, projectTypeEl, dueDateEl, deleteEl);
    projDisplayEl.append(tableRowEl);
}

//Stores current project data to local storage.
function storeCurrentProjectToLocalStorage(projectData){

    //Gets all project.
    let projectStorage = getAllProjectStorage();

    //Adds current project to the array.
    projectStorage.push(projectData);

    //Stores all projects to local storage.
    localStorage.setItem(keyText, JSON.stringify(projectStorage));
}

//Removes current project data from browser.
function removeProjectDataDisplay(){
    
    //Gets all direct children elements of project display element.
    let contentChildren = projDisplayEl.children();

    //Loops through all children and removed them from content element and makes the page clear.
    for (const child of contentChildren) {
        child.remove();
    }
}

//Gets the project data from modal form.
function getNewProjectData(){

    //Returns null if any of project name, type or due date are not set.
    if (!projNameEl.val() || !projTypeEl.val() || !dateInputEl.val()) return null;

    let projectData = {
        projectName : projNameEl.val(),
        projectType : projTypeEl.val(),
        dueDate : dateInputEl.val()
    };

    projNameEl.val('');
    projTypeEl.val('');
    dateInputEl.val('');

    return projectData;
}
