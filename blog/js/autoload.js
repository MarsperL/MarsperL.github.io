// 注意：live2d_path 参数应使用绝对路径，记得修改哦
const live2d_path = "https://oss.amogu.cn/blog/live2d/";
const tips_path = "https://oss.amogu.cn/blog/live2d/";
//const live2d_path = "";
//const live2d_path = "/live2d-widget/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
Promise.all([
	loadExternalResource(live2d_path + "waifu.min.css", "css"),
	loadExternalResource(live2d_path + "live2d.min.js", "js"),
	loadExternalResource(live2d_path + "waifu-tips.js", "js")
]).then(() => {
	initWidget({
		waifuPath: tips_path + "waifu-tips.min.json",
		apiPath: "https://api.amogu.cn/api/live2d/",
		cdnPath: "https://oss.amogu.cn/blog/live2d/api/"
	});
});