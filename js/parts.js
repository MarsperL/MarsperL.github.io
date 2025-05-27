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
      var pageElements = document.querySelectorAll(".page-number");
      var totalPages = parseInt(pageElements[pageElements.length - 1].innerHTML);
      var inputElement = document.getElementById("toPageText");
      var targetPage = parseInt(inputElement.value);
      
      // 验证输入有效性
      if (!isNaN(targetPage) && targetPage > 0 && targetPage <= totalPages) {
          var urlPath = targetPage === 1 ? "/" : "/page/" + targetPage + "/#content-inner";
          window.location.href = urlPath; // 直接修改location实现跳转
          return true; // 返回true允许表单提交（如果有form包裹）
      } else {
          alert("请输入有效的页码（1-" + totalPages + "）");
          inputElement.focus();
          return false; // 阻止默认行为
      }
  },
  
  listenToPageInputPress: function() {
      var inputElement = document.getElementById("toPageText");
      var buttonElement = document.getElementById("toPageButton");
      
      if (inputElement) {
          // 回车键监听
          inputElement.addEventListener("keydown", (e) => {
              if (e.keyCode === 13) { // 回车键
                  e.preventDefault(); // 阻止form的默认提交行为[3]
                  icattoPage.toPage();
              }
          });
          
          // 输入验证
          inputElement.addEventListener("input", function() {
              var pageElements = document.querySelectorAll(".page-number");
              var maxPage = parseInt(pageElements[pageElements.length - 1].innerHTML);
              var currentValue = parseInt(this.value) || 0;
              
              // 按钮状态控制
              buttonElement.classList.toggle("haveValue", this.value.length > 0 && this.value !== "0");
              
              // 自动修正超出范围的页码
              if (currentValue > maxPage) {
                  this.value = maxPage;
              }
          });
      }
  }
};

// 初始化监听
document.addEventListener("DOMContentLoaded", function() {
    icattoPage.listenToPageInputPress();
});
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