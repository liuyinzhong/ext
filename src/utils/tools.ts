/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 15:25:46
 * @LastEditTime: 2024-11-15 15:25:46
 * @LastEditors: mulingyuer
 * @Description: 工具函数
 * @FilePath: \chrome-extension-template\src\utils\tools.ts
 * 怎么可能会有bug！！！
 */
/** 写入持久化数据 */
export async function localStorageSet(key: string, value: any) {
	await chrome.storage.local.set({ [key]: value });
}

/** 获取持久化数据 */
export async function localStorageGet(key: string, defaultValue: any) {
	const localData = await chrome.storage.local.get(key);
	const value = localData?.[key];
	if (typeof value === "undefined" && typeof defaultValue !== "undefined") {
		return defaultValue;
	}
	return value;
}
