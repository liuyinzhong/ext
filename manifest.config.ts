/*
 * @Author: mulingyuer
 * @Date: 2024-11-11 11:58:04
 * @LastEditTime: 2024-11-26 09:15:30
 * @LastEditors: mulingyuer
 * @Description: manifest 配置文件
 * @FilePath: \chrome-extension-template\manifest.config.ts
 * 怎么可能会有bug！！！
 */
import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

export default defineManifest(async (env) => {
	return {
		manifest_version: 3,
		name: env.mode === "production" ? packageJson.name : `[dev] ${packageJson.name}`,
		description: packageJson.description,
		version: packageJson.version,
		minimum_chrome_version: "116",
		icons: {
			"16": "images/icons/icon-16.png",
			"32": "images/icons/icon-32.png",
			"48": "images/icons/icon-48.png",
			"128": "images/icons/icon-128.png"
		},
		permissions: [
			"sidePanel",
			"tabs",
			"storage",
			"nativeMessaging",
			"notifications",
			"contextMenus",
			"activeTab",
			"scripting"
		],
		content_scripts: [
			{
				js: ["src/pages/content/main.ts"],
				matches: ["https://www.google.com/*"]
			}
		],
		background: {
			service_worker: "src/background/background.ts",
			type: "module"
		},
		action: {
			default_popup: "src/pages/popup/index.html"
		},
		side_panel: {
			default_path: "src/pages/side-panel/index.html"
		},
		devtools_page: "src/pages/devtool/index.html",
		web_accessible_resources: [
			{
				resources: [
					"src/pages/404/index.html",
					"images/notifications-icon/error.png",
					"images/notifications-icon/warning.png",
					"favicon.ico"
				],
				matches: ["<all_urls>"]
			}
		]
	};
});
