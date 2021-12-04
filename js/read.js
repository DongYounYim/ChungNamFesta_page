let see_comment = document.getElementById("see_comment");
let regist_comment = document.getElementById("regist_comment");
let see_tbody = document.getElementById("see_tbody");
let comment_arr = new Array();
let MF = true;
var cur_timestamp = sessionStorage.timestamp;
var cur_from = sessionStorage.from;

$(document).ready(function() {
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
                //게시물 삭제와 수정. 작성자에게만 보임.
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

function del_board() {    //게시물 삭제
  db.collection("board").doc(sessionStorage.timestamp).delete()
  .then(() => {
    alert("삭제되었습니다.");
    location.href = "sub_자유게시판.html";
  }).catch((error) => {
    alert("Error removing document: ", error);
  })
}

function mod_board() {  //게시물 수정
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

function checkByte(obj) {   //댓글 바이트 수 확인
  const maxByte = 200;
  const text_val = obj.value; //입력한 문자
  const text_len = text_val.length; //입력한 문자수
  
  let totalByte=0;
  for(let i=0; i<text_len; i++){
    const each_char = text_val.charAt(i);
    const uni_char = escape(each_char) //유니코드 형식으로 변환
    if(uni_char.length>4){
      // 한글 : 2Byte
      totalByte += 2;
    }else{
      // 영문,숫자,특수문자 : 1Byte
      totalByte += 1;
    }
  }
  
  if(totalByte>maxByte){
    alert('최대 200Byte까지만 입력가능합니다.');
    document.getElementById("nowByte").innerText = totalByte;
    document.getElementById("nowByte").style.color = "red";
    }
    else{
      document.getElementById("nowByte").innerText = totalByte;
      document.getElementById("nowByte").style.color = "green";
    }
}

function none_comment() { //댓글 숨기기
  see_comment.innerHTML = "댓글 보기";
  see_comment.removeEventListener("click", none_comment);
  see_comment.addEventListener("click", get_comment);

  while(see_tbody.hasChildNodes()) { //댓글 없애기
    see_tbody.removeChild(see_tbody.firstChild);
  }
}

function get_comment() {  //댓글 펼치기
  see_comment.innerHTML = "댓글 접기";
  see_comment.removeEventListener("click", get_comment);
  see_comment.addEventListener("click", none_comment);

  if(MF) {  //처음 눌렀을 때만 db에서 받아옴.
    MF = false;
    db.collection(cur_from)
    .doc(cur_timestamp)
    .collection("comment")
    .get()
    .then((querySanpshot) => {
      querySanpshot.forEach((doc) => {
        c_tr = document.createElement("tr");
        see_tbody.appendChild(c_tr);
        comment_arr.push(c_tr);
        c_td1 = document.createElement("td");
        c_td1.innerHTML = `${doc.data().writer}`
        c_td2 = document.createElement("td");
        c_td2.innerHTML = `${doc.data().comment}`;
        c_td3 = document.createElement("td");
        c_td3.innerHTML = new Date(doc.data().timestamp).toLocaleDateString();
        c_tr.appendChild(c_td1);
        c_tr.appendChild(c_td2);
        c_tr.appendChild(c_td3);
      })
    })
    .then(() => {
      comment_arr.reverse()
      for(var c = 0; c < comment_arr.length; c++) {
        see_tbody.appendChild(comment_arr[c]);
      }
    })
  }
  else {
    for(var c = 0; c < comment_arr.length; c++) {
      see_tbody.appendChild(comment_arr[c]);
    }
  }
  
  
}

function register_c() {   //댓글 등록하기
  let nowB = document.getElementById("nowByte");
  if(Number(nowB.innerHTML) > 200 || Number(nowB.innerHTML) <= 0) {
    alert("댓글 바이트 수를 확인하세요.");
    return;
  }
  else if(!sessionStorage.id) {
    alert("로그인 후 이용가능합니다.");
  }
  else {
    let my_timestamp = new Date().getTime()

    db.collection(cur_from)
    .doc(cur_timestamp)
    .collection("comment")
    .doc(String(my_timestamp))
    .set({
      writer: sessionStorage.name + "(" + sessionStorage.id + ")",
      comment: document.getElementById("my_comment").value.replace(/\n/gi, "<br>"),
      timestamp: my_timestamp
    }).then(() => {
      alert("댓글이 등록됐습니다.");
      window.location.reload();
    })
  }
  
}

see_comment.addEventListener("click", get_comment);
regist_comment.addEventListener("click", register_c);