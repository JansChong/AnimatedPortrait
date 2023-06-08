<!--
* @Author: JansChong
* @Date: 2023-06-04 18:19:17
* @LastEditors: JansChong
* @LastEditTime: 2023-06-04 18:19:38
* @FilePath: /pages/index/index.vue
* @Description: In User Settings Edit
-->
<template>
	<view class="index">

		<!-- 相机组件 -->
		<camera :flash="
		flash_state == 0 ? 'off' :
		flash_state == 1 ? 'on' : 'auto'" :device-position="orientation==true?'front':'back'"></camera>

		<!-- 拍摄按钮 -->
		<view class="shot" @click="takePhoto">
			<view class="circle"></view>
		</view>

		<!-- 闪光灯开关 -->
		<view class="flash" @click="toggleFlash">
			<image class="auto-img" :src="flashs[flash_state]" mode="widthFix"></image>
		</view>

		<!-- 反转镜头 -->
		<view class="transform" @click="orientation=!orientation">
			<image class="auto-img" src="../../static/icons/transform.png" mode="widthFix"></image>
		</view>

		<!-- 弹窗组件 -->
		<van-dialog use-slot title="请选择" :show="showDialog" confirmButtonText="人像动漫化" cancelButtonText="人脸检测"
			cancel-button-color="#ee0a24" confirm-button-color="#333" overlay show-cancel-button
			@close="showDialog = false" @confirm="animatedPortrait" @cancel="faceDetection">
			<image :src="temp_photo" mode="aspectFit" />
		</van-dialog>

	</view>
</template>

<script>
	import "../../static/less/index.less";
	// vant 弹出层
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';

	export default {
		data() {
			return {
				// 闪关灯状态 0关闭1打开2自动
				flash_state: 0,
				// 闪关灯图片路径
				flashs: [
					"../../static/icons/flash_off.png",
					"../../static/icons/flash_on.png",
					"../../static/icons/flash_auto.png"
				],
				// 摄像头朝向: true前置, false后置
				orientation: true,

				// 拍摄照片的临时路径
				temp_photo: "",

				// 显示弹窗
				showDialog: false
			}
		},
		onLoad() {
			// Dialog.alert({
			// 	title: '标题',
			// 	message: '弹窗内容',
			// }).then(() => {
			// 	// on close
			// });
		},
		methods: {
			// 拍摄照片
			takePhoto() {
				// 相机上下文
				let cc = uni.createCameraContext();
				// 拍摄
				cc.takePhoto({
					quality: "low",
				}).then(res => {
					console.log("临时图片路径 =>", res.tempImagePath);
					// 拍摄照片的临时路径展示
					this.temp_photo = res.tempImagePath;
					// 显示弹窗(展示拍摄的照片)
					this.showDialog = true;
				})
			},
			// 人像动漫化
			animatedPortrait() {
				console.log("人像动漫化");
				uni.navigateTo({
					url: "/pages/anime/anime?temp_photo=" + this.temp_photo
				})
			},
			// 人脸检测
			faceDetection() {
				console.log("人脸检测");
				uni.navigateTo({
					url: "/pages/detection/detection?temp_photo=" + this.temp_photo
				})
			},
			// 切换闪关灯
			toggleFlash() {
				this.flash_state++;
				this.flash_state = this.flash_state > 2 ? 0 : this.flash_state;
				console.log(this.flash_state);
			}
		}
	}
</script>
