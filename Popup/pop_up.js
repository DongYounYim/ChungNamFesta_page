// Just popup on main page

$( document ).ready(function() {
   cookiedata = document.cookie;
   console.log(getCookie("close_today"));
   if ( getCookie("close_today") == "yes" ){
       console.log(getCookie("close_today"));
   } else {
      window.onload =function () {
         window.open("./Popup/popup.html",  "popupNo1", "left=200, top=200");
      }
   }
});

function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
     x=x.replace(/^\s+|\s+$/g,"");
     if (x==c_name)
   {
      return unescape(y);
   }
     }
}