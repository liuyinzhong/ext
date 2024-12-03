/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 15:39:36
 * @LastEditTime: 2024-11-15 16:08:51
 * @LastEditors: mulingyuer
 * @Description: 请求封装
 * @FilePath: \chrome-extension-template\src\request\index.ts
 * 怎么可能会有bug！！！
 */
import ky from "ky";
import type {
	ArrayBufferOptions,
	BlobOptions,
	FormDataOptions,
	JSONOptions,
	RequestOptions,
	TextOptions
} from "./types";

/** ky 实例 */
const kyInstance = ky.create({
	timeout: 3000000 // 单位ms, 30s
});

export function request<T>(op: JSONOptions): Promise<T>;
export function request(op: TextOptions): Promise<string>;
export function request(op: BlobOptions): Promise<Blob>;
export function request(op: ArrayBufferOptions): Promise<ArrayBuffer>;
export function request(op: FormDataOptions): Promise<FormData>;
export async function request(options: RequestOptions): Promise<unknown> {
	const { url, responseType, showErrorMessages = true, ...opt } = options;

	try {
		const res = await kyInstance(url, opt)[responseType]();

		return res as any;
	} catch (error) {
		if (showErrorMessages) {
			if ((error as Error).name === "AbortError") {
				// 取消请求
				console.warn("请求已取消");
			} else {
				console.error((error as Error)?.message ?? "请求失败");
			}
		}

		return Promise.reject(error as Error);
	}
}
