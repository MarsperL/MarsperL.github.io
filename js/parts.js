/*************************随机一篇*************************/
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
    fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        while (true) {
            let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
            if (location.href == url) continue;
            location.href = url;
            return;
        }
    })
}
/*************************随机一篇*************************/


/*************************页脚显示网站运行时间*************************/
const CREATE_TIME = new Date('2024-03-07T21:51:00').getTime(); //使用ISO 8601日期格式，兼容所有浏览器
const TIME_UNITS = [
    { value: 31536000000, label: ' 年' },  // 年（毫秒）
    { value: 86400000, label: ' 天' },    // 天
    { value: 3600000, label: ' 时' },     // 小时
    { value: 60000, label: ' 分' },       // 分钟
    { value: 1000, label: ' 秒' }         // 秒
];
let currentFormat = 0; // 0:年天时分秒 1:天时分秒 2:时分秒 3:分秒

function formatDuration(ms) {
    let remaining = ms;
    return TIME_UNITS.map((unit, index) => {
        if (index < currentFormat) return null;
        const value = Math.floor(remaining / unit.value);
        remaining %= unit.value;
        return value > 0 ? `${value}${unit.label}` : '';
    }).filter(Boolean).join(' ');
}

function updateRuntime() {
    const now = Date.now();
    const runtimeText = formatDuration(now - CREATE_TIME);
    document.getElementById('runtime').textContent = `本站已运行：${runtimeText}`;
}

// 点击事件监听
document.getElementById('runtime').addEventListener('click', () => {
    currentFormat = (currentFormat + 1) % 4;
    updateRuntime();
});

// 初始化
updateRuntime();
setInterval(updateRuntime, 1000);
/*************************页脚显示网站运行时间*************************/


/*************************自定页数跳转*************************/ 
var icattoPage = {
  toPage: function() {
      console.log("执行跳转");
      var e = document.querySelectorAll(".page-number")
        , t = parseInt(e[e.length - 1].innerHTML)
        , n = document.getElementById("toPageText")
        , a = parseInt(n.value);
      if (!isNaN(a) && a > 0 && "0" !== ("" + a)[0] && a <= t) {
          var s = 1 == a ? "/" : "/page/" + a + "/#content-inner";
          document.getElementById("toPageButton").href = s
      }
  },
  listenToPageInputPress() {
      var e = document.getElementById("toPageText")
        , t = document.getElementById("toPageButton");
      e && (e.addEventListener("keydown", (e=>{
          13 === e.keyCode && (icattoPage.toPage(),
          pjax.loadUrl(t.href))
      }
      )),
      e.addEventListener("input", (function() {
          "" === e.value || "0" === e.value ? t.classList.remove("haveValue") : t.classList.add("haveValue");
          var n = document.querySelectorAll(".page-number")
            , a = +n[n.length - 1].innerHTML;
          +document.getElementById("toPageText").value > a && (e.value = a)
      }
      )))
  }
}
icattoPage.listenToPageInputPress();
/*************************自定页数跳转*************************/ 


/*************************分类页面美化*************************/
// 获取所有类别列表项
const categoryItems = document.querySelectorAll('.category-list-item');

// 为每个类别列表项生成随机颜色渐变背景和图标
categoryItems.forEach((item, index) => {
    // 为每个类别列表项创建随机颜色渐变背景
    function randomBgImg() {
        const deg = Math.floor(Math.random() * 360);
        const randomBg = `linear-gradient(${deg}deg, #${Math.floor(Math.random()*16777215).toString(16)} 0%, #${Math.floor(Math.random()*16777215).toString(16)} 100%)`;
        item.style.backgroundImage = randomBg;
    }

    // 生成随机图标（这里使用了 Font Awesome 图标库）
    const icons = ['📑', '📚', '🦋', '💻', '💬', '✨']; // 可以根据需要添加更多图标
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    // 更新类别列表项的 HTML 内容，设置背景和图标
    item.innerHTML = `
    <div>${item.innerHTML}</div>
    <div class="category-list-icon">${randomIcon}</div>`;

    // 调用随机颜色渐变背景函数
    randomBgImg();
});

function postAddToc() {
  const postContent = document.querySelector('#post > #article-container.post-content');
  const cardToc = document.getElementById('card-toc');

  if (postContent && cardToc) {
    const tocItems = cardToc.querySelectorAll('.toc-link');
    const targetElements = {};

    tocItems.forEach(tocLink => {
      const href = decodeURIComponent(tocLink.getAttribute('href').slice(1));
      const targetElement = document.getElementById(href);
      const tocNumber = tocLink.querySelector('.toc-number').textContent;

      if (targetElement) {
        targetElements[href] = { element: targetElement, tocNumber };
      }
    });

    // 设置 dataset.toc 属性
    Object.entries(targetElements).forEach(([href, { element, tocNumber }]) => {
      element.dataset.toc = tocNumber;
    });
  }
}

postAddToc();
/*************************分类页面美化*************************/