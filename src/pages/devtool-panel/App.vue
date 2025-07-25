<!--
 * @Author: mulingyuer
 * @Date: 2024-11-26 09:05:20
 * @LastEditTime: 2024-11-26 09:05:21
 * @LastEditors: mulingyuer
 * @Description: devtool-panel
 * @FilePath: \chrome-extension-template\src\pages\devtool-panel\App.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div>
		<el-table
			:data="tableData"
			size="small"
			border
			stripe
			style="width: 100%"
			@row-click="rowClick"
		>
			<el-table-column width="50">
				<template #default="scope">
					{{ scope.row.request.method }}
				</template>
				<template #header>
					<div style="text-align: center">
						<el-text type="danger" size="small" @click="clearTable" style="cursor: pointer"
							>清空</el-text
						>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="状态" width="50">
				<template #default="scope">
					{{ scope.row.response.status }}
				</template>
			</el-table-column>
			<el-table-column label="路径" show-overflow-tooltip>
				<template #default="scope">
					<el-link type="info">
						{{ getUrl(scope.row.request.url) }}
					</el-link>
				</template>
			</el-table-column>
		</el-table>

		<el-drawer v-model="drawerShow" :with-header="false" size="70%">
			<el-tabs type="border-card" modelValue="request">
				<el-tab-pane label="request" name="request">
					<el-collapse>
						<el-collapse-item title="cookies">
							<div v-for="(item, index) in activeData.request.cookies" :key="index">
								<el-link type="info" @click="copyText(item.name + ':' + item.value)">
									<el-space :size="2" alignment="flex-start">
										<el-text type="default">{{ item.name }}</el-text>
										:<el-text type="info">{{ item.value }}</el-text>
									</el-space>
								</el-link>
							</div>
						</el-collapse-item>
						<el-collapse-item title="headers">
							<div v-for="(item, index) in activeData.request.headers" :key="index">
								<el-link type="info" @click="copyText(item.name + ':' + item.value)">
									<el-space :size="2" alignment="flex-start">
										<el-text type="default">{{ item.name }}</el-text>
										:<el-text type="info">{{ item.value }}</el-text>
									</el-space>
								</el-link>
							</div>
						</el-collapse-item>
					</el-collapse>
					<div>
						<el-space :size="20">
							<el-checkbox v-model="format_JSON" size="nomoal" label="解析JSON" />
						</el-space>
					</div>
					<template v-if="format_JSON">
						<el-link type="info" @click="copyText(JSON.stringify(activeData.request.data))">
							复制
						</el-link>
						<br />
						<template v-if="activeData.request">
							<vue-json-pretty
								v-if="drawerShow"
								showLength
								showIcon
								showSelectController
								virtual
								:height="500"
								:data="activeData.request.data"
							/>
						</template>
					</template>
					<template v-else>
						<div v-if="activeData.request.method == 'GET'">
							<div style="margin-bottom: 10px">
								<el-link
									type="info"
									@click="copyText(formatObjectToQueryString(activeData.request.data))"
								>
									复制
								</el-link>
							</div>
							<div>
								<el-text size="small" type="info">
									{{ formatObjectToQueryString(activeData.request.data) }}
								</el-text>
							</div>
						</div>
						<div v-else>
							<div style="margin-bottom: 10px">
								<el-link type="info" @click="copyText(JSON.stringify(activeData.request.data))">
									复制
								</el-link>
							</div>
							<div>
								<el-text size="small" type="info">
									{{ JSON.stringify(activeData.request.data) }}
								</el-text>
							</div>
						</div>
					</template>
				</el-tab-pane>
				<el-tab-pane label="response" name="response">
					<div>
						<el-space :size="20">
							<el-checkbox v-model="format_JSON" size="nomoal" label="解析JSON" />
							<el-link type="info" @click="copyText(JSON.stringify(activeData.response.data))">
								复制
							</el-link>
						</el-space>
					</div>
					<template v-if="activeData.response && format_JSON">
						<vue-json-pretty
							v-if="drawerShow"
							showLength
							showIcon
							showSelectController
							virtual
							:height="500"
							:data="activeData.response.data"
						/>
					</template>
					<template v-else>
						<el-text size="small" type="info">{{
							JSON.stringify(activeData.response.data)
						}}</el-text>
					</template>
				</el-tab-pane>
			</el-tabs>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from "vue";
import CryptoJS from "crypto-js";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ElMessage } from "element-plus";
import { EventName, chromeMessage } from "@/utils/chrome-message";
import { getChildren } from "../popup/getChildren";
import { copyText } from "@/utils/tools";

const configs = ref<any>([]);
const tableData = ref<any>([]);
const drawerShow = ref(false);
const activeData = ref<any>({});
const format_JSON = ref(true);

// 创建一个连接到 background.js 的端口
const port = chrome.runtime.connect();

// 发送一条连接消息（可以用于调试）
port.postMessage({ type: "devtool init" });

// 监听来自 background.js 的消息
chromeMessage.on(EventName.DEV_CONFIG, (msg) => {
	if (msg.data && msg.data.length > 0) {
		configs.value = msg.data;
	} else {
		configs.value = [{ name: "config1", http: "", children: getChildren() }];
	}
});

onMounted(() => {
	chrome.devtools.network.onRequestFinished.addListener(function (request) {
		debugger;
		let http_s = configs.value.map((a) => a.http);
		let this_host = new URL(request.request.url).host;
		if (!http_s.includes(this_host)) {
			return;
		}
		// 当前匹配的域名配置
		let _config = configs.value.find((item) => item.http === this_host);

		// get 请求配置 && 响应配置
		let _getObj = _config.children.find((item) => item.method == "GET");
		let get_request_config = _getObj.request;
		let get_response_config = _getObj.response;

		// post 请求配置 && 响应配置
		let _postObje = _config.children.find((item) => item.method == "POST");
		let post_request_config = _postObje.request;
		let post_response_config = _postObje.response;

		// put 请求配置 && 响应配置
		let _putObje = _config.children.find((item) => item.method == "PUT");
		let put_request_config = _putObje.request;
		let put_response_config = _putObje.response;

		// delete 请求配置 && 响应配置
		let _deleteObje = _config.children.find((item) => item.method == "DELETE");
		let delete_request_config = _deleteObje.request;
		let delete_response_config = _deleteObje.response;
		if (request._resourceType == "xhr") {
			request.getContent((responseBody) => {
				if (request.request.method == "GET") {
					request.request.data = request.request.queryString.filter((a: any) => {
						return !["_t", "arshadowurlqueryparamid"].includes(a.name);
					});

					request.request.data = formatArrayToObject(request.request.data);
					request.request.data = decrypt(request.request.data, get_request_config);
					request.response.data = decrypt(responseBody, get_response_config);
				} else if (request.request.method == "POST") {
					request.request.data = decrypt(request.request.postData.text, post_request_config);
					request.response.data = decrypt(responseBody, post_response_config);
				} else if (request.request.method == "PUT") {
					request.request.data = decrypt(request.request.postData.text, put_request_config);
					request.response.data = decrypt(responseBody, put_response_config);
				} else if (request.request.method == "DELETE") {
					request.request.data = decrypt(request.request.postData.text, delete_request_config);
					request.response.data = decrypt(responseBody, delete_response_config);
				}
				tableData.value.push(request);
			});
		}
	});
});
const rowClick = (row) => {
	activeData.value = toRaw(row);
	drawerShow.value = true;
};

/** 解密 */
const decrypt = (result: string | CryptoJS.lib.CipherParams, _config: any) => {
	_config = toRaw(_config);
	// 无数据返回
	if (!result || !_config.key) {
		return result;
	}

	// 移除双双引号
	result = result.replace(/^["']|["']$/g, "");

	var key = CryptoJS.enc.Utf8.parse(_config.key);
	var decrypt = CryptoJS.AES.decrypt(result, key, {
		mode: CryptoJS.mode[_config.mode],
		padding: CryptoJS.pad[_config.padding],
		size: _config.size,
		iv: _config.iv
	});
	return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString() || "{}");
};

//#region 其它
const formatObjectToQueryString = (obj) => {
	return Object.keys(obj)
		.filter((key) => obj[key] !== undefined && obj[key] !== null)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join("&");
};
const formatArrayToObject = (arr) => {
	const result = {};
	arr.forEach((item) => {
		if (item && item.name) {
			result[item.name] = item.value;
		}
	});
	return result;
};
const getUrl = (url: any) => {
	let obj = new URL(url);
	return obj.pathname;
};

const clearTable = () => {
	tableData.value = [];
};
//#endregion
</script>

<style scoped></style>
