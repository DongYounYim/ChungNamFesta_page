let img_list = document.getElementsByClassName("profile");

for(var i = 0; i < img_list.length; i++) {    //이미지들 300/300고정크기
    img_list[i].width = 300;
    img_list[i].height = 300;
    let para_src = img_list[i].src
    img_list[i].addEventListener("click", function(para_src) {
        view_image(para_src);
    });
}

$(document).ready(function() {
  let loginfo = document.getElementById("log_info");
    if(sessionStorage.id != null && sessionStorage.name != null) {
      loginfo.innerHTML = sessionStorage.name + " 님";
      loginfo.href = "sub_update.html";     //회원정보 수정.
    }
})

//축제상세일정클릭 
let dangjin = document.getElementById("dangjin");
dangjin.addEventListener("click", dangjin_click)
let asan = document.getElementById("asan");
asan.addEventListener("click", asan_click);

function dangjin_click() {
  sessionStorage.setItem("locate", "dangjin");
}

function asan_click() {
  sessionStorage.setItem("locate", "asan");
}