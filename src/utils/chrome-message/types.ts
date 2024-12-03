/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 14:07:56
 * @LastEditTime: 2024-11-04 10:20:28
 * @LastEditors: mulingyuer
 * @Description: 谷歌插件事件订阅类型
 * @FilePath: \chrome-extension\src\utils\chrome-message\types.ts
 * 怎么可能会有bug！！！
 */
import { EventName } from "./event-name";

/** 自定义消息类型 */
export interface EventMessage {
	type: EventName;
	data?: any;
}

/** 监听消息的回调函数类型 */
// export type ChromeMessageCallback = Parameters<typeof chrome.runtime.onMessage.addListener>[0];

/** 事件订阅的回调函数类型，返回true表示异步处理，接收消息处会调用sendResponse函数，返回void表示接收处不调用sendResponse */
export type EventCallback = (
	message: EventMessage,
	sender: chrome.runtime.MessageSender,
	sendResponse: (response?: any) => void
) => void | true;

/** 事件订阅map */
export type EventMap = Map<EventName, Array<EventCallback>>;
