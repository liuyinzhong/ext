/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 16:22:54
 * @LastEditTime: 2024-11-15 16:23:00
 * @LastEditors: mulingyuer
 * @Description: 谷歌插件事件订阅
 * @FilePath: \chrome-extension-template\src\utils\chrome-message\index.ts
 * 怎么可能会有bug！！！
 */

import { EventName } from "./event-name";
import type { EventMap, EventMessage, EventCallback } from "./types";
export type * from "./types";
export * from "./event-name";

class ChromeMessage {
	private events: EventMap = new Map();

	constructor() {
		this.watchChromeMessage();
	}

	/** 订阅事件 */
	public on(eventName: EventName, callback: EventCallback) {
		let fnList = this.events.get(eventName);
		if (!fnList) {
			fnList = [];
			this.events.set(eventName, fnList);
		}

		fnList.push(callback);
	}

	/** 发布事件 */
	public emit(eventName: EventName, data?: any) {
		const message: EventMessage = {
			type: eventName,
			data
		};

		return chrome.runtime.sendMessage(message);
	}

	/** 一次性订阅 */
	public once(eventName: EventName, callback: EventCallback) {
		const onceCallback: EventCallback = (...args) => {
			callback(...args);
			this.off(eventName, onceCallback);
		};

		this.on(eventName, onceCallback);
	}

	/** 取消订阅 */
	public off(eventName: EventName, callback: EventCallback) {
		const fnList = this.events.get(eventName);
		if (!fnList) return;

		const findIndex = fnList.findIndex((fn) => fn === callback);
		if (findIndex === -1) return;
		fnList.splice(findIndex, 1);

		// 如果fnList为空，则删除该事件
		if (fnList.length === 0) {
			this.events.delete(eventName);
		}
	}

	/** 监听chrome message */
	private watchChromeMessage() {
		chrome.runtime.onMessage.addListener((message: EventMessage, sender, sendResponse) => {
			const { type } = message;

			// 判断是否有对应的事件订阅
			const fnList = this.events.get(type);
			if (fnList) {
				let hasAsync = false;

				fnList.forEach((fn) => {
					const result = fn(message, sender, sendResponse);
					// 如果需要异步响应，则将 hasAsync 设置为 true
					if (!hasAsync && result) {
						hasAsync = true;
					}
				});

				return hasAsync; // 若有异步调用，则保持消息通道开放
			}
		});
	}
}

export const chromeMessage = new ChromeMessage();
