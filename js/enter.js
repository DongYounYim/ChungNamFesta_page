let sign_btn = document.getElementById("signup");
sign_btn.addEventListener("click", sign);

let input_id = document.getElementById("id");
let input_pw = document.getElementById("pw");
let input_pwcheck = document.getElementById("pw_check");
let input_name = document.getElementById("name");
let input_phone = document.getElementById("phone");
let input_mail = document.getElementById("mail");
let input_agree = document.getElementById("agree");

var Reg_pw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var Reg_mail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

function sign() {
    var pass = true;
    if(input_id.value == "") {
        alert("아이디를 입력하세요");
    } else if(input_pw.value == "") {
        alert("비밀번호를 입력하세요");
    } else if(input_pwcheck.value == "") {
        alert("비밀번호 재확인 해주세요.");
    } else if(input_name.value == "") {
        alert("이름을 입력하세요");
    } else if(input_mail.value == "") {
        alert("메일을 입력하세요");
    } else if(input_agree.checked == false) {
        alert("약관을 동의해주세요");
    } else if(input_id.value.length < 6) {
        alert("아이디가 양식에 맞지않습니다.");
    } else if(!Reg_pw.test(input_pw.value)) {
        alert("비밀번호 양식이 맞지않습니다.");
    } else if(!Reg_mail.test(input_mail.value)) {
        alert("이메일 양식이 맞지않습니다.");
    } else {
        if(input_pw.value != input_pwcheck.value) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }
        if(input_phone.value == "") {
            input_phone.value = null;
        }
        db.collection("member")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(`${doc.data().id}` == input_id.value) {
                    alert("존재하는 아이디입니다.");
                    pass = false;
                } 
            })
            if(pass) {
                db.collection("member").doc(input_id.value)
                .set({
                    id: input_id.value,
                    password: input_pw.value,
                    name: input_name.value,
                    phone: input_phone.value,
                    mail: input_mail.value
                })
                .then((docRef) => {
                    alert("회원가입 성공");
                })
                .catch((error) => {
                    console.log("Error adding document: ", error);
                })
            }
        })
    }
}

