$(document).ready(function() {
    let cur_timestamp = sessionStorage.timestamp;
    let cur_from = sessionStorage.from;
    let board_title = document.getElementById("board_title");
    let read_contents = document.getElementById("read_contents");

    if(cur_from == "video") {
        $('#read_contents').css({'border': '0px'});
        db.collection(cur_from)
        .get()
        .then((querySanpshot) => {
            querySanpshot.forEach((doc) => {
                if(`${doc.data().timestamp}` == cur_timestamp) {
                    board_title.innerHTML = `${doc.data().title}`
                    var my_frame = document.createElement("iframe");
                    my_frame.width = 800;
                    my_frame.height = 600;
                    my_frame.src = `${doc.data().link}`;
                    read_contents.appendChild(my_frame);
                }
            })
        })
    } else if(cur_from == "board") {
        //자유게시판에서 넘어옴
    }
    
})