let regist_btn = document.getElementById("regist_btn");

$(document).ready(function() {
    let loginfo = document.getElementById("log_info");
    if(sessionStorage.id != null && sessionStorage.name != null) {
        loginfo.innerHTML = sessionStorage.name + " 님";
        loginfo.href = "sub_update.html";     //회원정보 수정.
    }
    if(sessionStorage.mod == "modify") {
        document.getElementById("write_head").innerHTML = "게시물 수정";
        regist_btn.innerHTML = "게시물 수정";
        regist_btn.removeEventListener("click", register);
        regist_btn.addEventListener("click", modify);
        
        db.collection("board")
        .get()
        .then((querySanpshot) => {
            querySanpshot.forEach((doc) => {
                if(doc.data().timestamp == sessionStorage.timestamp) {
                    document.getElementById("board_title").value = `${doc.data().title}`;
                    document.getElementById("board_contents").value = `${doc.data().content}`;
                }
            })
        })
        sessionStorage.removeItem("mod");
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

function register() {
    let timestamp = new Date().getTime();
    let date = new Date().toISOString().substr(0, 10);
    let title = document.getElementById("board_title").value;
    let content = document.getElementById("board_contents").value;
    content = content.replace(/\n/gi, "<br>");

    if(title == "" || content == "") {
        alert("제목이나 내용이 비었습니다.");
        return;
    }
    
    db.collection("board").doc(String(timestamp)).set({
        title: title,
        content: content,
        date: date,
        writer: sessionStorage.name + "(" + sessionStorage.id + ")",
        view: 0,
        timestamp: timestamp
    })
    .then(() => {
        alert("게시물 등록 완료");
        location = "sub_자유게시판.html";
    })
}

function modify() {
    db.collection("board").doc(String(sessionStorage.timestamp)).update({
        title: document.getElementById("board_title").value,
        content: document.getElementById("board_contents").value
    })
    .then(() => {
        alert("게시물이 수정되었습니다.");
        location.href = "sub_자유게시판.html";
    }).catch((error) => {
        alert("에러가 발생하여 수정이 되지 않았습니다.");
    })
}

regist_btn.addEventListener("click", register);