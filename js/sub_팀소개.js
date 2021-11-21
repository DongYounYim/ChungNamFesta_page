let img_list = document.getElementsByClassName("profile");

for(var i = 0; i < img_list.length; i++) {
    img_list[i].width = 300;
    img_list[i].height = 300;
    let para_src = img_list[i].src
    img_list[i].addEventListener("click", function(para_src) {
        view_image(para_src);
    });
}