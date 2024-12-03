/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 16:33:16
 * @LastEditTime: 2024-11-15 16:39:07
 * @LastEditors: mulingyuer
 * @Description: chrome 右键菜单类型
 * @FilePath: \chrome-extension-template\src\utils\chrome-context-menus\types.ts
 * 怎么可能会有bug！！！
 */
import { MenuId } from "./menu-id";

/** 菜单点击的事件回调 */
export type MenuClickedCallback = Parameters<typeof chrome.contextMenus.onClicked.addListener>[0];
/** 菜单点击的事件回调参数 */
export type MenuClickedCallbackArgs = Parameters<MenuClickedCallback>;

/** 菜单配置 */
export type MenuProperties = chrome.contextMenus.CreateProperties & {
	id: MenuId;
	// NOTE: 修复update和create方法这个参数的类型定义不一致的问题
	contexts?: chrome.contextMenus.ContextType[];
};

/** 菜单事件map */
export type MenuEventMap = Map<MenuId, MenuClickedCallback[]>;

/** 创建菜单配置 */
export interface CreateMenuOptions {
	/** 菜单配置 */
	menuProperties: MenuProperties;
	/** 创建菜单的回调：失败、成功都会触发 */
	callback?: () => void;
	/** 菜单点击的回调 */
	onClicked: MenuClickedCallback;
}

/** 更新右键菜单配置 */
export interface UpdateMenuOptions {
	/** 菜单id */
	id: MenuId;
	/** 菜单配置 */
	updateProperties: chrome.contextMenus.UpdateProperties;
	/** 更新菜单的回调：失败、成功都会触发 */
	callback?: () => void;
}

/** 移除右键菜单配置 */
export interface RemoveMenuOptions {
	/** 菜单id */
	id: MenuId;
	/** 移除菜单的回调：失败、成功都会触发 */
	callback?: () => void;
}

/** 移除所有右键菜单配置 */
export interface RemoveAllMenusOptions {
	/** 移除所有菜单的回调：失败、成功都会触发 */
	callback?: () => void;
}
