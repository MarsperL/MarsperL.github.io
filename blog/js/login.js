 window.history.replaceState(null, null, window.location.href);
function PwdLogin() {
    var login = document.getElementsByClassName("login_con");
    login[0].classList.remove("hidden");
    login[0].classList.add("show");
    login[1].classList.remove("show");
    login[1].classList.add("hidden");
    var tags = document.getElementsByClassName("top_tag");
    tags[0].classList.add("active");
    tags[1].classList.remove("active");
    var ad = document.getElementById("AdImg");
    ad.style.height = "558px";
}
function QrcodeLogin() {
    var login = document.getElementsByClassName("login_con");
    login[0].classList.remove("show");
    login[0].classList.add("hidden");
    login[1].classList.remove("hidden");
    login[1].classList.add("show");
    var tags = document.getElementsByClassName("top_tag");
    tags[1].classList.add("active");
    tags[0].classList.remove("active");
    var ad = document.getElementById("AdImg");
    ad.style.height = "558px";
}

// 用户输入错误提示

var inputs = document.getElementsByTagName('input');
var tips = document.getElementsByClassName('tips');

function InputNull(a){
    tips[a].classList.add('show');
    tips[a].classList.remove('hidden');
}
function InputNoNull(a){
    tips[a].classList.add('hidden');
    tips[a].classList.remove('show');
}

var UserName     = inputs[0];
var UserPwd      = inputs[1];
var AuthCode     = inputs[2];
var UserNameTips = tips[0];
var UserPwdTips  = tips[1];
var AuthCodeTips = tips[2];

UserName.oninput = function () {
    if (UserName.value == '') {
        InputNull(0);
        UserNameTips.innerHTML="请检查用户名，用户名不能为空";
    } else{
        InputNoNull(0);
    }
}
UserName.onblur = function () {
    if (UserName.value == '') {
        InputNull(0);
        UserNameTips.innerHTML="请检查用户名，用户名不能为空";

    } 
}

UserPwd.oninput = function () {
    if (UserPwd.value == '') {
        InputNull(1);
        UserPwdTips.innerHTML="请检查您的密码，密码不能为空";
    } else{
        InputNoNull(1);
    }
}
UserPwd.onblur = function () {
    if (UserPwd.value == '') {
        InputNull(1);
        UserPwdTips.innerHTML="请检查您的密码，密码不能为空";
    } 
}


