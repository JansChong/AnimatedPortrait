<!--
* @Author: JansChong
* @Date: 2023-06-04 18:20:16
* @LastEditors: JansChong
* @LastEditTime: 2023-06-04 18:21:00
* @FilePath: /pages/anime/anime.vue
* @Description: In User Settings Edit
-->
<template>
	<view class="anime">
		<view class="face-show-box">
			<!-- 图片 -->
			<image class="auto-img" :src="temp_photo" mode="widthFix"></image>
			<image class="auto-img" :src="temp_photo2" mode="widthFix"></image>
		</view>
		
		<view class="tips">
			注: 点击图片切换原图/动漫
		</view>
	</view>
</template>

<script>
	import "../../static/less/anime.less";
	
	// 人脸数据请求
	import {
		animeRequest
	} from "@/api/requestAPI.js";


	export default {
		data() {
			return {
				temp_photo: null, // 人脸图片
				temp_photo2: null, // 人脸图片
			}
		},
		// 页面加载
		async onLoad(res) {
			// 拍摄照片的临时路径
			this.temp_photo = res.temp_photo;

			// 图片转base64编码
			let base64 = await this.base_encoding(res.temp_photo);
			// 获取人脸token
			let anime_token = await this.getAnimeToken();

			// 获取人脸信息 数据
			this.getAnimeImage(anime_token, base64);
		},
		methods: {
			// 图片编码 base64
			base_encoding(filePath) {
				// 文件管理器
				var fileManager = uni.getFileSystemManager();

				return new Promise((resolv, reject) => {
					// 读取本地文件内容 (不支持 promise)
					fileManager.readFile({
						filePath,
						encoding: "base64",
						success(res) {
							resolv(res.data);
						}
					});
				})
			},

			// 获取缓存 access_token
			getAnimeToken() {
				return uni.getStorage({
					key: "access_token",
				}).then(res => res.data.anime_token); // 返回 face_token
			},

			// 获取动漫人像
			getAnimeImage(anime_token, base64) {
				animeRequest(anime_token, base64).then(res => {
					console.log(res.data.image)
					
					this.temp_photo2 = "data:image/jpg;base64,"+res.data.image
					// data:image/jpg;base64,
					
					// console.log(JSON.stringify(res.data))
				})
			}
		}
	}
</script>