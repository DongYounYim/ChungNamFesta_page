//창 크기 재설정
window.onload = function() {
    let my_width = $('#poster').width();
    let my_height = $('#poster').height() + 22;

    window.resizeTo(my_width, my_height);
}

//쿠키로 오늘 하루 보지 않기.
let today = document.getElementById("today");

function closeToday() {
    console.log("closeToday_click");
    setCookie("close_today", "yes", 1);
    getCookie("close_today");
    //window.close();
}

function setCookie(c_name,value,exdays) {
   var exdate=new Date();
   exdate.setDate(exdate.getDate() + exdays);
   var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate) + ";path=/";
   document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)  {
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) {
            return unescape(y);
        }
    }
}

today.addEventListener("click", closeToday);