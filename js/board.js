function show_write() {
    window.location.href = "./sub_write.html";
}

let write = document.getElementById("write");
write.addEventListener("click", show_write);

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