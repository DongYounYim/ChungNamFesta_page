// Just popup on main page

$( document ).ready(function() {
   cookiedata = document.cookie;

   if ( cookiedata.indexOf("close_today=yes") >= 0 ){
       console.log("has cooo");
   } else {
      window.onload =function () {
         window.open("./Popup/popup.html",  "popupNo1", "left=200, top=200");
      }
   }
});


