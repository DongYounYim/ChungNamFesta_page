//창 크기 재설정
window.onload = function() {
    let my_width = $('#poster').width();
    let my_height = $('#poster').height() + 22;

    window.resizeTo(my_width, my_height);
}

//쿠키로 오늘 하루 보지 않기.
// let today = document.getElementById("today");

// function closeToday() {
//     setCookie("close_today", "yes", "");
//     getCookie("close_today");
//     window.close();
// }

// function setCookie(name, value, exp) {
//     var date = new Date();
//     date.setTime(date.getTime() + exp*24*60*60*1000);
//     document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';Domain=http://www.cnfesta.co.kr';
// };

// function getCookie(name) {
//     var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
//     console.log(value);
//     return value ? value[2] : null;
// };

// today.addEventListener("click", closeToday);