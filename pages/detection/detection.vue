<!--
* @Author: JansChong
* @Date: 2023-06-04 18:20:19
* @LastEditors: JansChong
* @LastEditTime: 2023-06-04 18:20:58
* @FilePath: /pages/detection/detection.vue
* @Description: In User Settings Edit
-->
<template>
	<view class="detection">
		人像检测
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(res){
			// 拍摄照片的临时路径
			console.log(res.temp_photo);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
