<!--
 * @Author: mulingyuer
 * @Date: 2024-11-15 14:47:13
 * @LastEditTime: 2024-11-15 14:56:39
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \chrome-extension-template\src\pages\404\App.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div style="height: 100vh">
		<el-row :gutter="20">
			<el-col :span="8">
				<el-input type="text" @input="changeUrl" v-model="urlTOken" placeholder="ToKen" />
			</el-col>
			<el-col :span="8">
				<el-input type="text" @input="changeUrl" v-model="merchantId" placeholder="merchantId" />
			</el-col>
			<el-col :span="8">
				<el-input type="text" @input="changeUrl" v-model="inquiryId" placeholder="inquiryId" />
			</el-col>
			<el-col :span="24">
				<el-input type="text" v-model="urlTOken_Res" />
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="8">
				<el-input
					v-model="textarea1"
					type="textarea"
					placeholder="请输入密文"
					:autosize="{ minRows: 24, maxRows: 48 }"
				/>
			</el-col>

			<el-col :span="16">
				<el-link type="info" @click="copyText(JSON.stringify(jsonData))"> 复制 </el-link>
				<vue-json-pretty
					showLength
					showIcon
					showSelectController
					virtual
					:height="800"
					:data="jsonData"
					:editable="true"
					:highlightSelectedNode="true"
					:showKeyValueSpace="true"
				/>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw, computed, watch } from "vue";
import CryptoJS from "crypto-js";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ElMessage } from "element-plus";
import { EventName, chromeMessage } from "@/utils/chrome-message";
import { getChildren } from "../popup/getChildren";
import { copyText } from "@/utils/tools";

const textarea1 = ref("");
const jsonData = computed(() => {
	return decrypt(textarea1.value, {
		mode: "ECB",
		padding: "Pkcs7",
		size: 0,
		key: "qeUlOJdw9TMR3VPc",
		iv: "",
		field: ""
	});
});

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

const urlTOken = ref("");
const merchantId = ref("");
const inquiryId = ref("");
const urlTOken_Res = ref("");
const changeUrl = () => {
	urlTOken_Res.value = `http://192.168.1.59:5173/dayuan/#/packages/patient/details?inquiryId=${inquiryId.value}&token=${encodeURIComponent(urlTOken.value)}&merchantId=${merchantId.value}`;
};

onMounted(() => {
	console.log("404 Not Found");
});
</script>

<style lang="scss" scoped></style>
