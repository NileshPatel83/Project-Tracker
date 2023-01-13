let dateInputEl = $('#datepicker');
let addProjectEl = $('#add-project');
let projDisplayEl = $('#project-display');

// function displayProjectForm(){

// }

// addButtonEl.on('submit', displayProjectForm());

// Datepicker widget
$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

var today = dayjs();
$('#current-day').text(today.format('MMM D, YYYY'));

let timeInterval = setInterval(function () {
    $('#current-time').text(dayjs().format('h:mm:ss A'));
}, 1000);  