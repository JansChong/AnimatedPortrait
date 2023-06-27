<!--
* @Author: JansChong
* @Date: 2023-06-04 18:20:19
* @LastEditors: JansChong
* @LastEditTime: 2023-06-27 16:34:52
* @FilePath: /pages/detection/detection.vue
* @Description: In User Settings Edit
-->
<template>
	<view class="detection">

		<view class="face-show-box">
			<image class="auto-img" :src="temp_photo" mode="widthFix"></image>
		</view>

		<view class="msg-show-box">
			<view class="">{{age}}</view>
			<view class="">{{gender.type}}</view>
			<view class="">{{beauty}}</view>
			<view class="">{{face_shape.type}}</view>
			<view class="">{{expression.type}}</view>
			<view class="">{{emotion.type}}</view>
			<view class="">{{glasses.type}}</view>
			<view class="">{{location}}</view>
		</view>

	</view>
</template>

<script>
	// 人脸数据请求
	import {
		faceRequest
	} from "@/api/requestAPI.js";

	export default {
		data() {
			return {
				temp_photo: null, // 人脸图片
				age: null, // 年龄
				gender: null, // 性别
				beauty: null, // 颜值
				face_shape: null, // 脸型
				expression: null, // 表情
				emotion: null, // 情绪
				glasses: null, // 眼镜
				location: null, // 人脸框
				landmark72: null, // 72特征点
			}
		},

		// 页面加载
		async onLoad(res) {
			// 拍摄照片的临时路径
			this.temp_photo = res.temp_photo;

			// 图片转base64编码
			let base64 = await this.base_encoding(res.temp_photo);
			// 获取人脸token
			let face_token = await this.getFaceToken();

			// 获取人脸信息 数据
			this.getFaceResult(face_token, base64);
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
			getFaceToken() {
				return uni.getStorage({
					key: "access_token",
				}).then(res => res.data.face_token); // 返回 face_token
			},

			// 获取人脸信息 数据
			getFaceResult(access_token, base64) {
				faceRequest(access_token, base64).then(res => {
					console.log("人脸数据 =>", res);

					// 出错了
					if (res.data.error_code != 0) {
						uni.showToast({
							title: "出错啦," + res.data.error_msg
						})
					} else {
						let {
							age, // 年龄
							gender, // 性别
							beauty, // 颜值
							face_shape, // 脸型
							expression, // 表情
							emotion, // 情绪
							glasses, // 眼镜
							location, // 人脸框
							landmark72, // 72特征点
						} = res.data.result.face_list[0]; // { }


						this.age = age;
						this.gender = gender;
						this.beauty = beauty;
						this.face_shape = face_shape;
						this.expression = expression;
						this.emotion = emotion;
						this.glasses = glasses;
						this.location = location;
						this.landmark72 = landmark72;

					}
				})
			}

		}
	}
</script>

<style>
	.detection .face-show-box {
		width: 640upx;
		margin: 0 auto;
	}
</style>
