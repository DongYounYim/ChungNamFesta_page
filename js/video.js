let tb_board = document.getElementById("tb_board");

// $(document).ready(function() {
    //DB에서 게시물 목록 받아와서 넣기.
// })

function load_video_page() {
    //일단은 바로 youtube로 넘어가지만
    //비디오 페이지 DB필요
    window.location.href = "https://youtu.be/WEwiqXaZoOs";
}

//임시 게시물 1
let my_table = document.createElement("table");
my_table.className = "board";

tb_board.appendChild(my_table);

let my_tr = document.createElement("tr");
my_table.appendChild(my_tr);
let date = document.createElement("td");
date.className = "w_date";
date.innerHTML = "2021-11-21";
my_tr.appendChild(date);

let title = document.createElement("td");
title.className = "w_title";
title.addEventListener("click", load_video_page);
title.innerHTML = "천안공연 영상(FULL)";
my_tr.appendChild(title);

let writer = document.createElement("td");
writer.className = "w_writer";
writer.innerHTML = "관리자";
my_tr.appendChild(writer);

let view = document.createElement("td");
view.className = "w_view";
view.innerHTML = "0";
my_tr.appendChild(view);

