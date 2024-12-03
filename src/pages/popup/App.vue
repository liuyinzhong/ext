<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { EventName, chromeMessage } from "@/utils/chrome-message";
import { ElMessage } from "element-plus";
import { onMounted, toRaw } from "vue";
import { configsFace } from "./interface.ts";
import { rules } from "./rules.ts";
import { getChildren } from "./getChildren.ts";
import configForm from "./conponent/configForm.vue";
let tabIndex = 1;
//
const editableTabsValue = ref("config1");
const editableTabs = ref<Array<tabFace>>([]);

// 创建一个连接到 background.js 的端口
const port = chrome.runtime.connect();
// 发送一条连接消息（可以用于调试）
port.postMessage({ type: "popup init" });

chromeMessage.on(EventName.DEV_CONFIG, (msg) => {
	if (msg.data && msg.data.length > 0) {
		editableTabs.value = msg.data;
		editableTabsValue.value = msg.data[0].name;
	} else {
		editableTabs.value = [{ name: "config1", http: "", children: getChildren() }];
	}
});

onMounted(() => {});

function onOpenSidePanel() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length > 0) {
			const tab = tabs[0];
			// 打开侧边栏
			chrome.sidePanel.open({
				tabId: tab.id,
				windowId: tab.windowId
			});
		}
	});
}

function onSendMessageToSidePanel() {
	chromeMessage.emit(EventName.EXAMPLE_EVENT, "示例消息");
}

function onOpen404Page() {
	chrome.tabs.create({
		url: chrome.runtime.getURL("src/pages/404/index.html")
	});
}

function clearCache() {
	chrome.storage.sync.clear();
}

const formRefs = ref<Record<string, any>>({});
const submitForm = async (index: number) => {
	await formRefs.value[index].validate((valid, fields) => {
		if (valid) {
			debugger;
			chrome.storage.sync.set({ configList: toRaw(editableTabs.value) }, function () {
				// 发送一条连接消息
				port.postMessage({ type: "popup save" });
			});
			ElMessage({
				message: "ok",
				type: "success"
			});
		}
	});
};

const handleTabsEdit = (targetName: TabPaneName | undefined, action: "remove" | "add") => {
	if (action === "add") {
		const newTabName = `${++tabIndex}`;
		editableTabs.value.push({
			name: "config" + newTabName,
			http: "",
			children: getChildren()
		});
		editableTabsValue.value = "config" + newTabName;
	} else if (action === "remove") {
		const tabs = editableTabs.value;
		let activeName = editableTabsValue.value;
		if (activeName === targetName) {
			tabs.forEach((tab, index) => {
				if (tab.name === targetName) {
					const nextTab = tabs[index + 1] || tabs[index - 1];
					if (nextTab) {
						activeName = nextTab.name;
					}
				}
			});
		}

		editableTabsValue.value = activeName;
		editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
	}
};
const changeName = (e) => {
	editableTabsValue.value = e;
};
</script>

<template>
	<header>
		<el-space :size="20">
			<button @click="onOpenSidePanel">打开侧边栏</button>
			<button @click="onSendMessageToSidePanel">给侧边栏发送一个消息</button>
			<button @click="onOpen404Page">打开404页面</button>
			<button @click="clearCache">清理缓存</button>
		</el-space>
		<br />
		<br />

		<el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
			<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="index"
				:label="item.name"
				:name="item.name"
			>
				<el-form ref="formRefs" :model="item" :rules="rules" label-width="50px">
					<el-form-item label="名称" prop="name">
						<el-input v-model="item.name" @input="changeName" clearable placeholder="请输入" />
					</el-form-item>
					<el-form-item label="域名" prop="http">
						<el-input v-model="item.http" placeholder="www.baidu.com" clearable />
					</el-form-item>
					<el-form-item label="方法">
						<el-tabs type="border-card" modelValue="GET" style="width: 100%">
							<el-tab-pane
								v-for="(item2, index2) in item.children"
								:key="index2"
								:label="item2.method"
								:name="item2.method"
							>
								<el-collapse>
									<el-collapse-item :title="item2.method + ' 请求配置'" name="request">
										<configForm v-model="item2.request" ref="configFormReqRef"></configForm>
									</el-collapse-item>
									<el-collapse-item :title="item2.method + ' 响应配置'" name="response">
										<configForm v-model="item2.response" ref="configFormResRef"></configForm>
									</el-collapse-item>
								</el-collapse>
							</el-tab-pane>
						</el-tabs>
					</el-form-item>

					<el-form-item>
						<el-button @click="submitForm(index)" style="width: 100%" type="primary"
							>保存</el-button
						>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</header>
</template>

<style scoped>
header {
	width: 500px;
}
</style>
