let tb_board = document.getElementById("tb_board");

$(document).ready(function() {
    let loginfo = document.getElementById("log_info");
    if(sessionStorage.id != null && sessionStorage.name != null) {
        loginfo.innerHTML = sessionStorage.name + " 님";
        loginfo.href = "sub_update.html";     //회원정보 수정.
    }
    //DB에서 게시물 목록 받아와서 넣기.
    db.collection("video")
    .get()
    .then((querySanpshot) => {
      querySanpshot.forEach((doc) => {
        let my_table = document.createElement("table");
        my_table.className = "board";

        tb_board.appendChild(my_table);

        let my_tr = document.createElement("tr");
        my_table.appendChild(my_tr);
        let date = document.createElement("td");
        date.className = "w_date";
        date.innerHTML = `${doc.data().date}`
        my_tr.appendChild(date);

        let title = document.createElement("td");
        title.className = "w_title";
        title.addEventListener("click", function() {
          load_video_page(`${doc.data().timestamp}`, `${doc.data().view}`);
        });
        title.innerHTML = `${doc.data().title}`;
        my_tr.appendChild(title);

        let writer = document.createElement("td");
        writer.className = "w_writer";
        writer.innerHTML = `${doc.data().writer}`
        my_tr.appendChild(writer);

        let view = document.createElement("td");
        view.className = "w_view";
        view.innerHTML = `${doc.data().view}`;
        my_tr.appendChild(view);
      })
    })
})

function load_video_page(timestamp, view) {
  db.collection("video").doc(timestamp).update({
    "view": Number(view) + 1
  })
  .then(() => {
    sessionStorage.setItem("from", "video");
    sessionStorage.setItem("timestamp", timestamp);
    window.location.href = "sub_read.html";
  })
}


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
