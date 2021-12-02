let img_upload = document.getElementById("img_upload");
let video_upload = document.getElementById("video_upload");

function p_upload() {
    let upload_img = document.getElementById("upload_img")
    let upload_title = document.getElementById("upload_title");
    let fileName = String(upload_img.value).substr(String(upload_img.value).lastIndexOf("\\")+1);
    let timestamp = new Date().getTime();
    console.log(fileName);

    db.collection("photo").doc(String(timestamp)).set({
        path: "photos/" + fileName,
        title: upload_title.value
    })

    var file = upload_img.files[0]
    var path = storageRef.child("photos/" + fileName);
    var Upload = path.put(file);

    alert("사진 등록 완료");
}

function v_upload() {
    let upload_link = document.getElementById("upload_link");
    let video_title = document.getElementById("video_title");
    let timestamp = new Date().getTime();
    let date = new Date().toISOString().substr(0, 10);

    db.collection("video").doc(String(timestamp)).set({
        date: date,
        link: upload_link.value,
        timestamp: timestamp,
        title: video_title.value,
        view: 0,
        writer: "관리자"
    })

    alert("비디오 등록 완료");
}

img_upload.addEventListener("click", p_upload);
video_upload.addEventListener("click", v_upload);