const keyText = 'project-tracker-';

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

//Processes project data entered in modal form.
function processProjectData (event){

    event.preventDefault();
    
    //Gets the project data.
    let projectData = getNewProectData();
    if(projectData === null) return;

    //Removes current project data from browser.
    removeProjectData();

    //Get project data counter for local storage.
    let storageCounter = getStorageCounter();

    //Stores current project data to local storage.
    storeCurrentProjectToLocalStorage(storageCounter, projectData);

    //Displays all project data in ascending order.
    displayAllProjectData();
}

//Displays all project data in ascending order.
function displayAllProjectData(){

    //Gets all local storage for projects.
    let projectStorage = getAllProjectStorage();

    //Displays all project data in table.
    projectStorage.forEach(project => {
        displayProjectData(project);
    });
}

function getAllProjectStorage(){

    let projectStorage = [];

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);
    keys = keys.sort();

    //Loops through all keys and gets the key pair.
    for (let i = 0; i < keys.length; i++) {

        //Only processes key if it includes the word 'quizscore-'.
        if(keys[i].includes(keyText)) {

            //Gets the key pair object and adds it to an array.
            let storage = JSON.parse(localStorage.getItem(keys[i]));
            if(storage !== null) projectStorage.push(storage);
        }
    }

    //Returns the storage.
    return projectStorage;
}

//Displays project data in table.
function displayProjectData(projectData){

    let projectDate = dayjs(projectData.dueDate);

    let tableRowEl = $('<tr>');

    let projectNameEl = $('<td>');
    projectNameEl.text (projectData.projectName);

    let projectTypeEl = $('<td>');
    projectTypeEl.text (projectData.projectType);

    let dueDateEl = $('<td>');
    dueDateEl.text (projectDate.format('DD/MM/YYYY'));

    let deleteEl = $('<td>');
    let deleteBtnEl = $('<button>');
    deleteBtnEl.text('X');
    deleteBtnEl.addClass('btn btn-sm btn-delete-project');
    deleteEl.append(deleteBtnEl);
    
    // if(projectDate.isBefore(today)){
    //     tableRowEl.addClass('project-late');
    // } else if (projectDate.isSame(today)){
    //     tableRowEl.addClass('project-today');
    // }

    tableRowEl.append(projectNameEl, projectTypeEl, dueDateEl, deleteEl);
    projDisplayEl.append(tableRowEl);
}

//Stores current project data to local storage.
function storeCurrentProjectToLocalStorage(storageCounter, projectData){

    //Creates key.
    let key = keyText + storageCounter;

    //Stores current project to local storage.
    localStorage.setItem(key, JSON.stringify(projectData));
}

//Gets the storage counter for current project.
//This is done by getting all keys for the projects, finding the last counter and incrementing it.
function getStorageCounter(){

    let counter = 0;

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);

    //Loops through all keys and gets the key pair.
    for (let i = 0; i < keys.length; i++){

        //Only processes key if it includes the word 'quizscore-'.
        //Compares the localstorage counter and stores the max value.
        if(keys[i].includes(keyText)){
            let number = parseInt(keys[i].replace(keyText, '', 10));

            if(number > counter) counter = number;
        }
    }

    return counter + 1;
}

//Removes current project data from browser.
function removeProjectData(){
    
        //Gets all direct children elements of project display element.
        let contentChildren = projDisplayEl.children();

        //Loops through all children and removed them from content element and makes the page clear.
       for (const child of contentChildren) {
        child.remove();
       }
}

//Gets the project data from modal form.
function getNewProectData(){

    //Returns null if any of project name, type or due date are not set.
    if (!projNameEl.val() || !projTypeEl.val() || !dateInputEl.val()) return null;

    let projectData = {
        projectName : projNameEl.val(),
        projectType : projTypeEl.val(),
        dueDate : dateInputEl.val()
    };

    return projectData;
}
