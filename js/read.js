$(document).ready(function() {
    let cur_timestamp = sessionStorage.timestamp;
    let cur_from = sessionStorage.from;
    let board_title = document.getElementById("board_title");
    let read_contents = document.getElementById("read_contents");
    let regist_div = document.getElementById("regist_div");

    if(cur_from == "video") {
      //비디오갤러리에서 넘어옴
        $('#read_contents').css({'border': '0px'});
        db.collection(cur_from)
        .get()
        .then((querySanpshot) => {
            querySanpshot.forEach((doc) => {
                if(`${doc.data().timestamp}` == cur_timestamp) {
                    board_title.innerHTML = `${doc.data().title}`;
                    var my_frame = document.createElement("iframe");
                    my_frame.width = 800;
                    my_frame.height = 600;
                    my_frame.src = `${doc.data().link}`;
                    read_contents.appendChild(my_frame);
                }
            })
        })
        var to_list_a = document.createElement("a");
        to_list_a.id = "to_list";
        to_list_a.innerHTML = "목록으로";
        to_list_a.href = "sub_공연영상.html";
        regist_div.appendChild(to_list_a);

    } else if(cur_from == "board") {
        //자유게시판에서 넘어옴
        db.collection(cur_from)
        .get()
        .then((querySanpshot) => {
          querySanpshot.forEach((doc) => {
            if(`${doc.data().timestamp}` == cur_timestamp) {
              board_title.innerHTML = `${doc.data().title}`;
              read_contents.innerHTML = `${doc.data().content}`;
              if(`${doc.data().writer}` == sessionStorage.name + "(" + sessionStorage.id + ")") {
                //게시물 삭제와 수정.
                var del_btn = document.createElement("button");
                del_btn.innerHTML = "게시물 삭제";
                del_btn.className = "option_btn";
                del_btn.addEventListener("click", del_board);
                var mod_btn = document.createElement("button");
                mod_btn.innerHTML = "게시물 수정";
                mod_btn.className = "option_btn";
                mod_btn.addEventListener("click", mod_board);
                regist_div.appendChild(del_btn);
                regist_div.appendChild(mod_btn);
              }
            }
          })
        })
        .then(() => {
          var to_list_a = document.createElement("a");
          to_list_a.id = "to_list";
          to_list_a.innerHTML = "목록으로";
          to_list_a.href = "sub_자유게시판.html";
          regist_div.appendChild(to_list_a);
        })
    }
})

function del_board() {
  db.collection("board").doc(sessionStorage.timestamp).delete()
  .then(() => {
    alert("삭제되었습니다.");
    location.href = "sub_자유게시판.html";
  }).catch((error) => {
    alert("Error removing document: ", error);
  })
}

function mod_board() {
  sessionStorage.setItem("mod", "modify");
  location.href = "sub_write.html";
}

let loginfo = document.getElementById("log_info");
  if(sessionStorage.id != null && sessionStorage.name != null) {
    loginfo.innerHTML = sessionStorage.name + " 님";
    loginfo.href = "sub_update.html";     //회원정보 수정.
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