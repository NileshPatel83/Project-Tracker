var today = dayjs();
$('#current-day').text(today.format('MMM D, YYYY'));

let timeInterval = setInterval(function () {
    $('#current-time').text(dayjs().format('h:mm:ss A'));
}, 1000);  

