/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 16:11:57
 * @LastEditTime: 2024-11-16 13:36:26
 * @LastEditors: mulingyuer
 * @Description: 谷歌浏览器通知
 * @FilePath: \chrome-extension-template\src\utils\chrome-notifications\index.ts
 * 怎么可能会有bug！！！
 */
import type { ErrorNotificationOptions, WarningNotificationOptions } from "./types";

export class ChromeNotifications {
	/** 错误通知 */
	static error(options: ErrorNotificationOptions | string) {
		let title = "发生错误";
		let message = "";

		if (typeof options === "string") {
			message = options;
		} else {
			title = options.title ?? title;
			message = options.message;
		}

		chrome.notifications.create({
			type: "basic",
			iconUrl: "images/notifications-icon/error.png",
			title,
			message,
			priority: 0
		});
	}

	/** 警告通知 */
	static warning(options: WarningNotificationOptions | string) {
		let title = "警告";
		let message = "";

		if (typeof options === "string") {
			message = options;
		} else {
			title = options.title ?? title;
			message = options.message;
		}

		chrome.notifications.create({
			type: "basic",
			iconUrl: "images/notifications-icon/warning.png",
			title,
			message,
			priority: 0
		});
	}
}
