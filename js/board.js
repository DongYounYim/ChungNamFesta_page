let tb_board = document.getElementById("tb_board");
let bd_list = new Array();
var last_page;
var now_page;
let search = document.getElementById("search");
let select = document.getElementById("my_option");
search.addEventListener("change", do_search);
var myobj;

$(document).ready(function() {
  let loginfo = document.getElementById("log_info");
  if(sessionStorage.id != null && sessionStorage.name != null) {
      loginfo.innerHTML = sessionStorage.name + " 님";
      loginfo.href = "sub_update.html";     //회원정보 수정.
  }
  //DB에서 게시물 목록 받아와서 넣기.
  db.collection("board")
  .get()
  .then((querySanpshot) => {
    querySanpshot.forEach((doc) => {
      let my_table = document.createElement("table");
      my_table.className = "board";

      let my_tr = document.createElement("tr");
      my_table.appendChild(my_tr);
      let date = document.createElement("td");
      date.className = "w_date";
      date.innerHTML = `${doc.data().date}`
      my_tr.appendChild(date);

      let title = document.createElement("td");
      title.className = "w_title can_click";
      title.addEventListener("click", function() {
        load_board_page(`${doc.data().timestamp}`, `${doc.data().view}`);
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

      myobj = {
        metb: my_table,
        title: `${doc.data().title}`,
        writer: `${doc.data().writer}`
      }

      bd_list.push(myobj);
      //element 모두 만들어 놓고 obj객체 형태로 저장 후 list에 저장
    })
  })
  .then(() => {
    bd_list.reverse();  //timestamp가 역순으로 되어있어서 reverse
    pageload();         
  })
})

function pageload() {   // 페이지 내부에서 이동하느 nav바 만듬. 
  now_page = 1
  let nav_td = document.getElementById("ma_td");
  let back_a = document.createElement("a");
  back_a.id = "back";
  back_a.innerHTML = "이전";
  back_a.addEventListener("click", back_click);
  nav_td.appendChild(back_a);
  
  for(var i = 0; i < bd_list.length/10; i++) {
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

function pageMove(pageNum) {    //nav var 정보에 맞게 게시물 보여줌
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
      if(!bd_list[j]) {
          break;
      }
      tb_board.appendChild(bd_list[j].metb);
  }
} 

function back_click() {     //이전 버튼 클릭
  if(now_page == 1) {
    alert("이전 페이지가 없습니다.");
  } else{
    pageMove(now_page-1);
  }
}

function next_click() {     //다음 버튼 클릭
  if(now_page == last_page) {
    alert("다음 페이지가 없습니다.");
  } else {
    pageMove(now_page+1);
  }
}
function load_board_page(this_timestamp, this_view) {     //제목 클릭시 내용으로 이동
  db.collection("board").doc(String(this_timestamp)).update({
    view: Number(this_view) + 1
  })
  .then(() => {
    sessionStorage.setItem("from", "board");
    sessionStorage.setItem("timestamp", this_timestamp);
    location.href = "sub_read.html";
  })
}

function show_write() {     //글쓰기 버튼 클릭시
  if(!sessionStorage.id) {
    alert("로그인 후 이용가능합니다.");
  } else {
    window.location.href = "./sub_write.html";
  }
}

function do_search() {      //검색기능
  var option_val = select.value;
  var search_val = search.value;
  if(search_val == "") {    //아무것도 입력안했을때
    pageload();
    return;
  }
  while(tb_board.firstElementChild != tb_board.lastElementChild) { //게시글 초기화
    tb_board.removeChild(tb_board.lastElementChild);
  }
  let nav_td = document.getElementById("ma_td");
  while(nav_td.hasChildNodes()) {
    nav_td.removeChild(nav_td.firstChild);
  }
  if(option_val == "tt") {
    //제목으로 검색
    for(var i = 0; i < bd_list.length; i++) {
      if(bd_list[i].title.includes(search_val)) {
        tb_board.appendChild(bd_list[i].metb);
      }
    }
  } else {
    //작성자로 검색
    for(var i = 0; i < bd_list.length; i++) {
      if(bd_list[i].writer.includes(search_val)) {
        tb_board.appendChild(bd_list[i].metb);
      }
    }
  }
}

let write = document.getElementById("write");
write.addEventListener("click", show_write);

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