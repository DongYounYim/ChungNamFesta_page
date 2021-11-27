$(document).ready(function() {
    let loginfo = document.getElementById("log_info");
    if(sessionStorage.id != null && sessionStorage.name != null) {
        loginfo.innerHTML = sessionStorage.name + " 님";
        loginfo.href = "sub_update.html";     //회원정보 수정.
    }

    let cur_location = sessionStorage.locate
    if(cur_location == "dangjin") {
        let feti_img = document.getElementById("feti_img");
        let q_sheet = document.getElementById("q_sheet");
        let q_sheet2 = document.getElementById("q_sheet2");
        let place = document.getElementById("place");
        let placeName = document.getElementById("placeName");
        let time = document.getElementById("time");
        let t_name = document.getElementById("t_name");
        let s_name = document.getElementById("s_name");
        s_name.innerHTML = "당진 공연";
        t_name.innerHTML = "당진공연 (11/28)";
        db.collection("schedule")
        .get()
        .then((querySanpshot) => {
            querySanpshot.forEach((doc) => {
                if(`${doc.data().name}` == "Dangjin") {
                    console.log(`${doc.data().poster}`);
                    storageRef.child('dangjin/' + `${doc.data().poster}`).getDownloadURL().then(function(url) {
                        // `url` is the download URL for 'images/stars.jpg'
                    
                        // This can be downloaded directly:
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = function(event) {
                        var blob = xhr.response;
                        };
                        xhr.open('GET', url);
                    
                        feti_img.src = url;
                    }).catch(function(error) {
                            console.log(error);
                    });
                    storageRef.child('dangjin/' + `${doc.data().q_sheet}`).getDownloadURL().then(function(url) {
                        // `url` is the download URL for 'images/stars.jpg'
                    
                        // This can be downloaded directly:
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = function(event) {
                        var blob = xhr.response;
                        };
                        xhr.open('GET', url);
                    
                        q_sheet.src = url;
                        q_sheet2.href = url;
                    }).catch(function(error) {
                            console.log(error);
                    });
                    place.src = `${doc.data().locate}`;
                    placeName.innerHTML = "장소 : " + `${doc.data().locateName}`;
                    time.innerHTML = "일시 : " + `${doc.data().time}`;
                }
            })
        })
    } else if(cur_location == "asan") {
        //defalut
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