/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 15:39:46
 * @LastEditTime: 2024-11-15 15:39:46
 * @LastEditors: mulingyuer
 * @Description: 请求类型
 * @FilePath: \chrome-extension-template\src\request\types.ts
 * 怎么可能会有bug！！！
 */
import type { Options } from "ky";

/** 请求参数 */
export interface BaseOptions extends Options {
	/** 请求地址 */
	url: string;
	/** 是否关闭错误消息提示 */
	showErrorMessages?: boolean;
}

export interface JSONOptions extends BaseOptions {
	responseType: "json";
}

export interface TextOptions extends BaseOptions {
	responseType: "text";
}

export interface BlobOptions extends BaseOptions {
	responseType: "blob";
}

export interface ArrayBufferOptions extends BaseOptions {
	responseType: "arrayBuffer";
}

export interface FormDataOptions extends BaseOptions {
	responseType: "formData";
}

export type RequestOptions =
	| JSONOptions
	| TextOptions
	| BlobOptions
	| ArrayBufferOptions
	| FormDataOptions;
