/*
 * @Author: mulingyuer
 * @Date: 2024-11-26 08:47:46
 * @LastEditTime: 2024-11-26 09:22:41
 * @LastEditors: mulingyuer
 * @Description: devtool main
 * @FilePath: \chrome-extension-template\src\pages\devtool\main.ts
 * 怎么可能会有bug！！！
 */
/** 创建panel入口 */
chrome.devtools.panels.create(
	"Aes加解密",
	"images/icons/icon-16.png",
	"src/pages/devtool-panel/index.html",
	() => {
		console.log("打开了自定义devtool");
	}
);

/** 给elements开发工具添加侧边栏 */
chrome.devtools.panels.elements.createSidebarPane("自定义DOM侧边栏", function (sidebar) {
	sidebar.setObject({ name: "巴拉巴拉" });
});
