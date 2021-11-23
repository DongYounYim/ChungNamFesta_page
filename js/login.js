let input_id = document.getElementById("id");
let input_pw = document.getElementById("pw");
let log_btn = document.getElementById("log_in");

log_btn.addEventListener("click", login);

function login() {
    var pass = false
    var user_name = ""
    var user_id = ""
    db.collection("member")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(`${doc.data().id}` == input_id.value && `${doc.data().password}` == input_pw.value) {
                //로그인 성공시
                user_name = `${doc.data().name}`;
                user_id = `${doc.data().id}`;
                pass = true;
            } else {
                
            }
        })
    })
    .then(() => {
        if(pass) {
            //현재 테스트라 
            //window.locaiton.href = "index.html";
            window.location.href = "index.html";
            //sessionStroage에 id와 name저장
            sessionStorage.setItem("id", user_id);
            sessionStorage.setItem("name", user_name);
            alert("로그인 성공");
        } else {
            alert("일치하는 회원정보가 없습니다.");
        }
    })
}