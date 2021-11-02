//창 크기 재설정

window.onload = function() {
    let my_width = $('#poster').width();
    let my_height = $('#poster').height() + 22;

    window.resizeTo(my_width, my_height);
}