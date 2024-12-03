<template>
	<div>这是一个侧边栏</div>
	<div>接收到消息：{{ message }}</div>
</template>

<script setup lang="ts">
import { EventName, chromeMessage } from "@/utils/chrome-message";

const message = ref("暂无消息");
chromeMessage.on(EventName.EXAMPLE_EVENT, (msg) => {
	const { data } = msg;

	message.value = data;
});
</script>

<style scoped></style>
