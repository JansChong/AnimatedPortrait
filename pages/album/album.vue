<!--
* @Author: JansChong
* @Date: 2023-06-04 18:20:14
* @LastEditors: JansChong
* @LastEditTime: 2023-06-04 18:20:14
* @FilePath: /pages/album/album.vue
* @Description: In User Settings Edit
-->
<template>
	<view class="album">
		<button @click="choose">打开相册选择图片</button>

		<!-- 弹窗组件 -->
		<van-dialog use-slot title="请选择" :show="showDialog" confirmButtonText="人像动漫化" cancelButtonText="人脸检测"
			cancel-button-color="#ee0a24" confirm-button-color="#333" overlay show-cancel-button
			@close="showDialog = false" @confirm="animatedPortrait" @cancel="faceDetection">
			<image :src="temp_photo" mode="aspectFit" />
		</van-dialog>

	</view>
</template>

<script>
	// vant 弹出层
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';

	export default {
		data() {
			return {
				// 显示弹窗
				showDialog: false,
				// 相册图片的临时路径
				temp_photo: ""
			};
		},
		methods: {
			// 打开相册选择图片
			choose() {

				uni.chooseImage({
					// 最多可以选择的图片张数，默认9
					count: 1,
					// original 原图，compressed 压缩图，默认二者都有
					sizeType: ["compressed"],
					// 图片来源: 仅相册 
					sourceType: ["album"],

					success: res => {
						console.log("图片选择成功 =>", res.tempFilePaths[0]);

						// 拍摄照片的临时路径展示
						this.temp_photo = res.tempFilePaths[0];
						// 显示弹窗(展示拍摄的照片)
						this.showDialog = true;

					}
				})
			},
			// 人像动漫化
			animatedPortrait() {
				console.log("人像动漫化");
				// 跳转到人像动漫化
				uni.navigateTo({
					// 页面参数: temp_photo = 临时图片路径
					url: "/pages/anime/anime?temp_photo=" + this.temp_photo
				})
			},

			// 人脸检测
			faceDetection() {
				console.log("人脸检测");
				// 跳转到人脸检测
				uni.navigateTo({
					// 页面参数: temp_photo = 临时图片路径
					url: "/pages/detection/detection?temp_photo=" + this.temp_photo
				})
			},


		}
	}
</script>

<style lang="less">
	.album {
		width: 100%;
		height: 100%;
		
		&>button {
			width: 350upx;
			position: fixed;
			left: calc(50% - 350upx/2);
			bottom: 80upx;
		}
	}
</style>