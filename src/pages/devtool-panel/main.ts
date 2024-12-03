/*
 * @Author: mulingyuer
 * @Date: 2024-11-26 09:05:05
 * @LastEditTime: 2024-11-26 09:05:06
 * @LastEditors: mulingyuer
 * @Description: devtool-panel
 * @FilePath: \chrome-extension-template\src\pages\devtool-panel\main.ts
 * 怎么可能会有bug！！！
 */

// main.ts
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
export default app;
