const keyText = 'project-tracker';

let dateInputEl = $('#datepicker');
let addProjectFormEl = $('#add-project-form')
let projNameEl = $('#project-name');
let projTypeEl = $('#project-type');
let projDisplayEl = $('#project-display');

function getNewProectData(){

    let projName = projNameEl.val();
    let projType = projTypeEl.val();
    let dueDate = dateInputEl.val();

    if (!projName || !projType || !dueDate) return null;

    let projectData = {
        projectName : projName,
        projectType : projType,
        dueDate : dueDate
    };

    return projectData;
}

function processProjectData (event){

    event.preventDefault();
    
    //Gets the project data.
    let projectData = getNewProectData();
    if(projectData == null) return;

    //Displays project data in table.
    displayProjectData();

    //Get project data counter for local storage.

    //Store project data to local storage.
}

addProjectFormEl.on('submit', processProjectData);

// // Datepicker widget
// $(function () {
//     dateInputEl.datepicker({
//       changeMonth: true,
//       changeYear: true,
//     });
//   });

var today = dayjs();
$('#current-day').text(today.format('MMM D, YYYY'));

let timeInterval = setInterval(function () {
    $('#current-time').text(dayjs().format('h:mm:ss A'));
}, 1000);  