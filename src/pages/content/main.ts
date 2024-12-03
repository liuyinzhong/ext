/*
 * @Author: mulingyuer
 * @Date: 2024-11-11 11:27:59
 * @LastEditTime: 2024-11-11 15:55:19
 * @LastEditors: mulingyuer
 * @Description: 内容脚本
 * @FilePath: \chrome-extension-template\src\content\main.ts
 * 怎么可能会有bug！！！
 */
import { createApp } from "vue";
import App from "./App.vue";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

const app = createApp(App);
app.mount(root);
