let img_upload = document.getElementById("img_upload");

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

img_upload.addEventListener("click", p_upload);