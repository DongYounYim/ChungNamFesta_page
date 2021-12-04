let tb_board = document.getElementById("tb_board");
let my_list = new Array();
var last_page;
var now_page;

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

        my_list.push(my_table);
        //list에 만들어 놓은 element들 저장
      })
    })
    .then(() => {
      my_list.reverse()   //timestamp가 반대로 정렬되어있어서 reverse
      pageload()    //pageload에서 정보 띄움
    })
})

function pageload() { //하위 nav 생성
  now_page = 1
  let nav_td = document.getElementById("ma_td");
  let back_a = document.createElement("a");
  back_a.id = "back";
  back_a.innerHTML = "이전";
  back_a.addEventListener("click", back_click);
  nav_td.appendChild(back_a);
  
  for(var i = 0; i < my_list.length/10; i++) {
      let nav_a = document.createElement("a");
      nav_a.className = "nav_a";
      nav_a.innerHTML = i+1;
      last_page = i+1;
      nav_a.addEventListener("click", function() {
          pageMove(Number(nav_a.innerHTML));
      })
      nav_td.appendChild(nav_a);
  }
  let next_a = document.createElement("a");
  next_a.id = "next";
  next_a.innerHTML = "다음";
  next_a.addEventListener("click", next_click);
  nav_td.appendChild(next_a);
  pageMove(1)
}

function pageMove(pageNum) {  //하위 nav에 맞는 페이지 보이게
  now_page = pageNum;
  let select_a = document.getElementsByClassName("nav_a");
  for(var s = 0; s < select_a.length; s++) {
      if(s == now_page-1) {
          select_a[s].style.color = "red";
          continue;
      }
      select_a[s].style.color = "black";
  }
  while(tb_board.firstElementChild != tb_board.lastElementChild) {
      tb_board.removeChild(tb_board.lastElementChild);
  }
  for(var j = (10*pageNum - 10); j < 10*pageNum; j++) {
      if(my_list[j] == undefined) {
          break;
      }
      tb_board.appendChild(my_list[j]);
  }
} 

function back_click() { //이전 페이지 클릭
  if(now_page == 1) {
    alert("이전 페이지가 없습니다.");
  } else{
    pageMove(now_page-1);
  }
}

function next_click() { //다음 페이지 클릭
  if(now_page == last_page) {
    alert("다음 페이지가 없습니다.");
  } else {
    pageMove(now_page+1);
  }
}

function load_video_page(timestamp, view) {   //video페이지에서 read로 넘어가게
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
