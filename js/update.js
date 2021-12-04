let cur_id = sessionStorage.id;
var Reg_pw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

$(document).ready(function() {      //현재의 회원정보 띄움
    db.collection("member")
    .get()
    .then((querySanpshot) => {
        querySanpshot.forEach((doc) => {
            if(`${doc.data().id}` == cur_id) {
                let my_id = document.getElementById("my_id");
                let my_name = document.getElementById("my_name");
                let my_eamil = document.getElementById("my_email");
                my_id.innerHTML = `${doc.data().id}`;
                my_name.innerHTML = `${doc.data().name}`;
                my_eamil.innerHTML = `${doc.data().mail}`;
                let my_phone = document.getElementById("my_phone");
                if(`${doc.data().phone}` != "") {
                    let newtd = document.createElement("td");
                    newtd.innerHTML = `${doc.data().phone}`;
                    my_phone.appendChild(newtd)
                } else {
                    let newtd1 = document.createElement("td");
                    let newtd2 = document.createElement("td");
                    let input_box = document.createElement("input");
                    input_box.id = "phone";
                    input_box.type = "text";
                    newtd1.appendChild(input_box);
                    newtd2.className = "info";
                    newtd2.innerHTML = "하이픈 없이 입력";
                    my_phone.appendChild(newtd1);
                    my_phone.appendChild(newtd2);
                }
            }
        })
    })
})

function signout_click() {      //회원탈퇴 클릭시
    db.collection("member")
    .doc(cur_id)
    .delete()
    .then(() => {
        console.log("탈퇴")
        sessionStorage.clear()
    }).catch((error) => {
        alert("알 수 없는 오류로 탈퇴 할 수 없습니다. 관리자에게 문의하세요.");
        console.error(error)
    })
    alert("회원탈퇴합니다. 확인을 누르시면 5초뒤에 메인홈페이지로 넘어갑니다.")
    setTimeout(function() {
        location.href = "index.html";
    }, 5000);
}

function modify_click() {       //회원정보 수정시
    let pw_change = document.getElementById("pw");
    let pw_check = document.getElementById("pw_check");
    if(document.getElementById("phone")) {
        let phone_num = document.getElementById("phone").value;
        if(pw_change.value == "" && phone_num == "") {
            alert('수정할 정보가 없습니다.');
            return;
        } else if(pw_change.value != "" && phone_num == "") {
            if(!Reg_pw.test(pw_change.value)) {
                alert("비밀번호 양식이 맞지 않습니다.");
                return;
            } else if(pw_change.value != pw_check.value) {
                alert("비밀번호 확인이 같지 않습니다.");
                return;
            } else {
                db.collection("member")
                .doc(cur_id)
                .update({
                    password: pw_change.value,
                })
                .then(() => {
                    alert("비밀번호 변경완료");
                }).catch((error) => {
                    alert("알 수 없는 오류로 수정되지 않습니다. 관리자에게 문의하세요.");
                    console.log(error)
                })
            }
        } else if(pw_change.value == "" && phone_num != "") {
            db.collection("member")
            .doc(cur_id)
            .update({
                phone: phone_num
            })
            .then(() => {
                alert("핸드폰 번호가 입력되었습니다.");
            }).catch((error) => {
                alert("알 수 없는 오류로 수정되지 않습니다. 관리자에게 문의하세요.");
                console.log(error)
            })
        } else {
            if(!Reg_pw.test(pw_change.value)) {
                alert("비밀번호 양식이 맞지 않습니다.");
                return;
            } else if(pw_change.value != pw_check.value) {
                alert("비밀번호 확인이 같지 않습니다.");
                return;
            } else {
                db.collection("member")
                .doc(cur_id)
                .update({
                    password: pw_change.value,
                    phone: phone_num
                })
                .then(() => {
                    alert("정상적으로 수정되었습니다.");
                }).catch((error) => {
                    alert("알 수 없는 오류로 수정되지 않습니다. 관리자에게 문의하세요.");
                    console.log(error)
                })
            }
        }
    } else {
        //핸드폰 번호 이미 기입되어있는경우
        if(pw_change != value) {
            alert("수정할 정보가 없습니다.");
        } else {
            if(!Reg_pw.test(pw_change.value)) {
                alert("비밀번호 양식이 맞지 않습니다.");
                return;
            } else if(pw_change.value != pw_check.value) {
                alert("비밀번호 확인이 같지 않습니다.");
                return;
            } else {
                db.collection("member")
                .doc(cur_id)
                .update({
                    password: pw_change.value,
                })
                .then(() => {
                    alert("비밀번호 변경완료");
                }).catch((error) => {
                    alert("알 수 없는 오류로 수정되지 않습니다. 관리자에게 문의하세요.");
                    console.log(error)
                })
            }
        }
    }
}

function logOut_click() {       //로그아웃 버튼
    sessionStorage.clear();
    location.href = "./index.html"
}

let sign_out = document.getElementById("signout");
let modify = document.getElementById("modify");
let logOut = document.getElementById("logOut");

modify.addEventListener("click", modify_click);
logOut.addEventListener("click", logOut_click);
sign_out.addEventListener("click", signout_click);
