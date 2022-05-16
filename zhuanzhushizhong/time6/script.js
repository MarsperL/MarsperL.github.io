var uls = document.getElementsByTagName("ul")
function action(i, s) {
    var ul = uls[i]
    var l0 = ul.children[0]
    var l1 = ul.children[1]
    if (l0.innerHTML != s) {
        l1.innerHTML = s
        ul.style.top = "-200px"
        ul.addEventListener("transitionend", function () {
            l0.innerHTML = s
            ul.style.transition = "0s"
            ul.style.top = "0px"
        })
        ul.style.transition = "0.7s"
    }
}
function timer() {
    var now = new Date()
    var timestr = ("0" + now.getHours()).slice(-2) + ("0" + now.getMinutes()).slice(-2) + ("0" + now.getSeconds()).slice(-2)

    for (i = 0; i < timestr.length; i++) {
        action(i, timestr[i])
    }
}
setInterval(timer, 1000);