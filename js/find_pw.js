function show_mail() {
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

let table_body = document.getElementsByTagName("tbody");
let radio_email = document.getElementById("radio_email");
let radio_phone = document.getElementById("radio_phone");
let show_box = document.getElementById("show_box");

radio_email.addEventListener("click", show_mail);
radio_phone.addEventListener("click", show_phone);
