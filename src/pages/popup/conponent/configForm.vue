<template>
	<el-form :model="config" label-width="auto">
		<el-form-item label="模式" prop="mode" style="margin-bottom: 10px">
			<el-select v-model="config.mode" placeholder="请选择" clearable>
				<el-option label="CBC" value="CBC" />
				<el-option label="ECB" value="ECB" />
				<el-option label="CFB" value="CFB" />
				<el-option label="CTR" value="CTR" />
				<el-option label="OFB" value="OFB" />
			</el-select>
		</el-form-item>
		<el-form-item label="填充" prop="padding" style="margin-bottom: 10px">
			<el-select v-model="config.padding" placeholder="请选择" clearable>
				<el-option label="Pkcs7" value="Pkcs7" />
				<el-option label="Iso97971" value="Iso97971" />
				<el-option label="AnsiX923" value="AnsiX923" />
				<el-option label="Iso10126" value="Iso10126" />
				<el-option label="ZeroPadding" value="ZeroPadding" />
				<el-option label="NoPadding" value="NoPadding" />
			</el-select>
		</el-form-item>
		<el-form-item label="偏移量" prop="size" style="margin-bottom: 10px">
			<el-input-number
				v-model="config.size"
				:controls="false"
				placeholder="ECB模式不需要"
				style="width: 100%; text-align: left"
				clearable
			/>
		</el-form-item>
		<el-form-item label="密钥" prop="key" style="margin-bottom: 10px">
			<el-input v-model="config.key" placeholder="不填写该字段不进行解密" clearable />
		</el-form-item>
		<el-form-item label="iv" prop="iv" style="margin-bottom: 10px">
			<el-input v-model="config.iv" placeholder="请输入" clearable />
		</el-form-item>
		<el-form-item label="字段" prop="field">
			<el-input
				v-model="config.field"
				disabled
				placeholder="请求时承载加密信息的字段，未完善"
				clearable
			/>
		</el-form-item>
	</el-form>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
	name: "configForm",
	props: {
		modelValue: [Object]
	},
	setup(props, { emit }) {
		return {
			config: computed(() => {
				return props.modelValue || {};
			})
		};
	}
});
</script>
