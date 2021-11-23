let now_check = "";

function show_mail() {
    now_check = "mail";
    while(show_box.hasChildNodes()) {
        show_box.removeChild(show_box.firstChild);
    }
    let make_tr1 = document.createElement("tr");
    let id_td = document.createElement("td");
    id_td.innerHTML = "아이디";
    show_box.appendChild(make_tr1);
    make_tr1.appendChild(id_td)
    let id_input_td = document.createElement("td");
    let id_input = document.createElement("input");
    id_input.type = "text";
    id_input.id = "ID";
    make_tr1.appendChild(id_input_td);
    id_input_td.appendChild(id_input);

    let make_tr2 = document.createElement("tr");
    let name_td = document.createElement("td");
    name_td.innerHTML = "이름";
    show_box.appendChild(make_tr2);
    make_tr2.appendChild(name_td);
    let name_input_td = document.createElement("td");
    let name_input = document.createElement("input");
    name_input.type = "text";
    name_input.id = "my_name";
    make_tr2.appendChild(name_input_td);
    name_input_td.appendChild(name_input);

    let make_tr3 = document.createElement("tr");
    let email_td = document.createElement("td");
    email_td.innerHTML = "메일주소";
    show_box.appendChild(make_tr3);
    make_tr3.appendChild(email_td);
    let email_input_td = document.createElement("td");
    let email_input = document.createElement("input");
    email_input.type = "email";
    email_input.id = "my_email";
    make_tr3.appendChild(email_input_td);
    email_input_td.appendChild(email_input);
}

function show_phone() {
    now_check = "phone";
    while(show_box.hasChildNodes()) {
        show_box.removeChild(show_box.firstChild);
    }
    //아이디, 이름, 핸드폰 번호,
    let make_tr1 = document.createElement("tr");
    let id_td = document.createElement("td");
    id_td.innerHTML = "아이디";
    show_box.appendChild(make_tr1);
    make_tr1.appendChild(id_td)
    let id_input_td = document.createElement("td");
    let id_input = document.createElement("input");
    id_input.type = "text";
    id_input.id = "ID";
    make_tr1.appendChild(id_input_td);
    id_input_td.appendChild(id_input);

    let make_tr2 = document.createElement("tr");
    let name_td = document.createElement("td");
    name_td.innerHTML = "이름";
    show_box.appendChild(make_tr2);
    make_tr2.appendChild(name_td);
    let name_input_td = document.createElement("td");
    let name_input = document.createElement("input");
    name_input.type = "text";
    name_input.id = "my_name";
    make_tr2.appendChild(name_input_td);
    name_input_td.appendChild(name_input);

    let make_tr3 = document.createElement("tr");
    let phone_td = document.createElement("td");
    phone_td.innerHTML = "핸드폰 번호";
    show_box.appendChild(make_tr3);
    make_tr3.appendChild(phone_td);
    let phone_input_td = document.createElement("td");
    let phone_input = document.createElement("input");
    phone_input.type = "text";
    phone_input.id = "phone_num";
    make_tr3.appendChild(phone_input_td);
    phone_input_td.appendChild(phone_input);
}

function find() {
    let pass = false
    let user_doc = ""
    if(now_check == "") {
        alert("이메일과, 휴대전화 중 선택해주세요");
    } else if(now_check == "phone"){
        let get_id = document.getElementById("ID").value;
        let get_name = document.getElementById("my_name").value;
        let get_phone = document.getElementById("phone_num").value;
        db.collection("member")
        .get()
        .then((querySanpshot) => {
            querySanpshot.forEach((doc) => {
                if(get_id == `${doc.data().id}` && get_name == `${doc.data().name}` && get_phone == `${doc.data().phone}`) {
                    user_doc = `${doc.data().id}`;
                    pass = true;
                }
            })
        })
        .then(() => {
            if(pass) {
                db.collection("member")
                .doc(user_doc)
                .update({
                    password: "0000"
                })
                alert("비밀번호가 \"0000\" 으로 초기화 되었습니다.");
            } else {
                alert("일치하는 사용자를 찾을 수 없습니다.");
            }
        })
    } else if(now_check == "mail") {
        let get_id = document.getElementById("ID").value;
        let get_name = document.getElementById("my_name").value;
        let get_email = document.getElementById("my_email").value;
        db.collection("member")
        .get()
        .then((querySanpshot) => {
            querySanpshot.forEach((doc) => {
                if(get_id == `${doc.data().id}` && get_name == `${doc.data().name}` && get_email == `${doc.data().mail}`) {
                    user_doc = `${doc.data().id}`;
                    pass = true;
                }
            })
        })
        .then(() => {
            if(pass) {
                console.log(db.collection("member").doc(user_doc));
                db.collection("member")
                .doc(user_doc)
                .update({
                    password: "0000"
                })
                alert("비밀번호가 \"0000\" 으로 초기화 되었습니다.");
            } else {
                alert("일치하는 사용자를 찾을 수 없습니다.");
            }
        })
    }
}

let table_body = document.getElementsByTagName("tbody");
let radio_email = document.getElementById("radio_email");
let radio_phone = document.getElementById("radio_phone");
let show_box = document.getElementById("show_box");
let find_btn = document.getElementById("find");

radio_email.addEventListener("click", show_mail);
radio_phone.addEventListener("click", show_phone);
find_btn.addEventListener("click", find)