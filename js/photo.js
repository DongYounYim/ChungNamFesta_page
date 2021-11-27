var last_page;
var now_page;

$(document).ready(function() {
    sessionStorage.setItem("photo_nav", 1);
    obj_list = new Array()
    //처음에 ready될 때 사진 경로 다 가져옴
    db.collection("photo")
    .get()
    .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
            //사진 모두 가져오기
            let c_item = document.createElement("div");
            c_item.className = "c-item";
            let main_item = document.createElement("div");
            main_item.className = "main_item"
            let my_a = document.createElement("a");
            let my_img = document.createElement("img");
            my_img.className = "my_photo";
            let main_item2 = document.createElement("div");
            main_item2.className = "main_item";
            let my_h4 = document.createElement("h4");
            my_h4.innerHTML = `${doc.data().title}`;
            storageRef.child(`${doc.data().path}`).getDownloadURL().then(function(url) {
            
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                var blob = xhr.response;
                };
                xhr.open('GET', url);
            
                my_a.href = url;
                my_img.src = url;
            }).catch(function(error) {
                    console.log(error);
            })
            c_item.appendChild(main_item);
            c_item.appendChild(main_item2);
            main_item.appendChild(my_a);
            my_a.appendChild(my_img);
            main_item2.appendChild(my_h4);
            //배열 미리 저장
            obj_list.push(c_item);
        })
    })
    .then(() => {
        now_page = 1;
        let nav_td = document.getElementById("ma_td");
        let back_a = document.createElement("a");
        back_a.id = "back";
        back_a.innerHTML = "이전";
        back_a.addEventListener("click", back_click);
        nav_td.appendChild(back_a);
        //obj_list.length/8 + 1 은 nav의 마지막 페이지
        for(var i = 0; i < obj_list.length/8; i++) {
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
    })
    //nav가 움직일때 photo_nav로 값을 표기하고
    //리스트에 사진 link를 다 박아놓고
    //nav가 움직이면 사진 정보 바꿔서 넣어주고
})

function pageMove(pageNum) {
    now_page = pageNum;
    let select_a = document.getElementsByClassName("nav_a");
    for(var s = 0; s < select_a.length; s++) {
        if(s == now_page-1) {
            select_a[s].style.color = "red";
            continue;
        }
        select_a[s].style.color = "black";
    }
    let img_div = document.getElementById("img_div");
    while(img_div.hasChildNodes()) {
        img_div.removeChild(img_div.lastChild);
    }
    for(var j = (8*pageNum - 8); j < 8*pageNum; j++) {
        if(obj_list[j] == undefined) {
            break;
        }
        img_div.appendChild(obj_list[j]);
    }
}

function back_click() {
    if(now_page == 1) {
        alert("이전 페이지가 없습니다.");
    } else{
        pageMove(now_page-1);
    }
}

function next_click() {
    if(now_page == last_page) {
        alert("다음 페이지가 없습니다.");
    } else {
        pageMove(now_page+1);
    }
}