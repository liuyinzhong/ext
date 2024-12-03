/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 16:33:16
 * @LastEditTime: 2024-11-15 17:45:56
 * @LastEditors: mulingyuer
 * @Description: chrome 右键菜单
 * @FilePath: \chrome-extension-template\src\utils\chrome-context-menus\index.ts
 * 怎么可能会有bug！！！
 */

import type {
	CreateMenuOptions,
	MenuEventMap,
	MenuClickedCallback,
	MenuClickedCallbackArgs,
	RemoveMenuOptions,
	RemoveAllMenusOptions,
	UpdateMenuOptions
} from "./types";
import { MenuId } from "./menu-id";
import { ChromeNotifications } from "@/utils/chrome-notifications";
export * from "./types";
export * from "./menu-id";

class ChromeContextMenu {
	private menuEventMap: MenuEventMap = new Map();

	constructor() {
		this.watchContextMenuClicked();
	}

	/** 创建右键菜单 */
	public create(options: CreateMenuOptions) {
		const { menuProperties, callback, onClicked } = options;
		const { id, ...updateProperties } = menuProperties;

		chrome.contextMenus.update(id, updateProperties, () => {
			if (chrome.runtime.lastError) {
				// 如果更新失败，表示菜单项不存在，则进行创建
				chrome.contextMenus.create(menuProperties, () => {
					if (chrome.runtime.lastError) {
						// 创建失败，则抛出异常
						const message = `创建右键${id}菜单失败：${chrome.runtime.lastError.message ?? "未知错误"}`;
						ChromeNotifications.error(message);
					} else {
						// 创建成功，则注册点击事件
						this.on(id, onClicked);
					}

					// 回调函数
					if (callback) callback();
				});
			} else {
				// 更新成功，则注册点击事件
				this.on(id, onClicked);

				// 回调函数
				if (callback) callback();
			}
		});
	}

	/** 更新右键菜单 */
	public update(options: UpdateMenuOptions) {
		const { id, updateProperties, callback } = options;

		chrome.contextMenus.update(id, updateProperties, callback);
	}

	/** 移除右键菜单 */
	public remove(options: RemoveMenuOptions) {
		const { id, callback } = options;

		chrome.contextMenus.remove(id, callback);
		this.menuEventMap.delete(id);
	}

	/** 移除所有右键菜单 */
	public removeAll(options: RemoveAllMenusOptions = {}) {
		const { callback } = options;

		chrome.contextMenus.removeAll(callback);
		this.menuEventMap.clear();
	}

	/** 注册右键菜单点击事件 */
	private on(id: MenuId, callback: MenuClickedCallback) {
		let fnList = this.menuEventMap.get(id);
		if (!fnList) {
			fnList = [];
			this.menuEventMap.set(id, fnList);
		}

		fnList.push(callback);
	}

	/** 触发右键菜单点击事件 */
	public emit(id: MenuId, ...args: MenuClickedCallbackArgs) {
		const fnList = this.menuEventMap.get(id);
		if (fnList) {
			fnList.forEach((fn) => fn(...args));
		}
	}

	/** 移除右键菜单点击事件 */
	public off(id: MenuId, callback: MenuClickedCallback) {
		const fnList = this.menuEventMap.get(id);
		if (!fnList) return;
		const findIndex = fnList.findIndex((fn) => fn === callback);
		if (findIndex === -1) return;

		fnList.splice(findIndex, 1);
	}

	/** 监听chrome右键菜单点击事件 */
	private watchContextMenuClicked() {
		chrome.contextMenus.onClicked.addListener((info, tab) => {
			const menuItemId = info.menuItemId as MenuId;

			const fnList = this.menuEventMap.get(menuItemId);
			if (!fnList) return;

			fnList.forEach((fn) => {
				fn(info, tab);
			});
		});
	}
}

export const chromeContextMenu = new ChromeContextMenu();
