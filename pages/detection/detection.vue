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

		<view class="face-show-box" v-if="temp_photo">
			<!-- 图片 -->
			<image class="auto-img" :src="temp_photo" mode="widthFix" @click="toggleType"></image>

			<!-- 人脸框 -->
			<view class="face-box" :style=" {
				width: `${location.width * count}px;` ,
				height: `${location.height * count}px;` ,
				left: `${location.left * count}px;` ,
				top: `${location.top * count}px;` ,
				transform: `rotate(${location.rotation}deg)`
			} " v-if="targetCount == -1" @click="toggleType"></view>

			<!-- 特征点 -->
			<view class="face_mark" v-else @click="toggleType">
				<view v-for="(item, index) in targetArr[targetCount]" :style="{
					left: `${item.x * count}px;`,
					top: `${item.y * count}px;`,
				}">
				</view>
			</view>

		</view>
		<van-skeleton  v-else avatar avatar-size="343px" avatar-shape="square"/>

		<!-- 用年龄判断是否有数据 -->
		<view class="msg-show-box" v-if="age">
			<view>
				<text>年龄:</text> <text>{{age}}</text>
			</view>
			<view>
				<text>性别:</text> <text>{{gender.type == "male" ? "男性" : "女性"}}</text>
			</view>
			<view>
				<text>颜值:</text> <text>{{beauty}}</text>
			</view>
			<view>
				<text>脸型:</text> <text>{{
						face_shape.type == "square" ? "正方形" : 
						face_shape.type == "triangle" ? "三角形" :
						face_shape.type == "oval" ? "椭圆" :  
						face_shape.type == "heart" ? "心形" : "圆形"
					}}</text>
			</view>

			<view>
				<text>情绪:</text> <text>{{
					emotion.type == "angry" ? "愤怒" :
					emotion.type == "disgust" ? "厌恶" :
					emotion.type == "fear" ? "恐惧" :  
					emotion.type == "happy" ? "高兴" :
					emotion.type == "sad" ? "伤心" :
					emotion.type == "surprise" ? "惊讶" :
					emotion.type == "neutral" ? "无表情" :
					emotion.type == "pouty" ? "撅嘴" : "鬼脸"
				}}</text>
			</view>

			<view>
				<text>表情:</text> <text>{{expression.type== "none" ? "不笑" :
				 expression.type == "smile" ?  "微笑": "大笑"}}</text>
			</view>

			<view>
				<text>眼镜:</text> <text>{{glasses.type}}</text>
			</view>

		</view>
		<van-skeleton  row-width="100%" v-else  row="8" />
		
	</view>
</template>

<script>
	import "../../static/less/detection.less";
	// 人脸数据请求
	import {
		faceRequest
	} from "@/api/requestAPI.js";

	export default {
		data() {
			return {
				count: 0, //缩放比例
				temp_photo: null, // 人脸图片
				age: null, // 年龄
				gender: null, // 性别
				beauty: null, // 颜值
				face_shape: null, // 脸型
				expression: null, // 表情
				emotion: null, // 情绪
				glasses: null, // 眼镜
				
				location: null, // 人脸框
				
				// landmark: null, // 4特征点
				// landmark72: null, // 72特征点
				// landmark150: [], // 150特征点
				
				targetCount: -1 ,// 人脸特征类型  -1:人脸框,  0:四特征点,  1:72特征点,  2:150特征点
				targetArr: [null, null, []] // 人脸特征点数据  [4, 72, 150]
				
			}
		},

		// 页面加载
		async onLoad(res) {
			// 拍摄照片的临时路径
			this.temp_photo = res.temp_photo;
			// 获取拍摄照片的原图尺寸
			uni.getImageInfo({
				src: res.temp_photo,
				success: res => {
					console.log("原图的宽度 =>", res.width);
					// 比例  320/大图片的宽
					this.count = 320 / res.width;
				}
			})


			// 图片转base64编码
			let base64 = await this.base_encoding(res.temp_photo);
			// 获取人脸token
			let face_token = await this.getFaceToken();

			// 获取人脸信息 数据
			this.getFaceResult(face_token, base64);
		},

		methods: {
			// 修改 特征点类型
			toggleType(){
				this.targetCount++;
				if(this.targetCount>2) this.targetCount = -1 ;
			},

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
							landmark, // 72特征点
							landmark72, // 72特征点
							landmark150, // 72特征点
						} = res.data.result.face_list[0]; // { }


						this.age = age;
						this.gender = gender;
						this.beauty = beauty;
						this.face_shape = face_shape;
						this.expression = expression;
						this.emotion = emotion;
						this.glasses = glasses;
						this.location = location;
						
						this.targetArr[0] = landmark;
						this.targetArr[1] = landmark72;
						for (var key in landmark150) {
							this.targetArr[2].push(landmark150[key]);
						}

						// console.log(this.landmark);
						// console.log(this.landmark72);
						// console.log(this.landmark150);
						console.log(this.targetArr);
					}
				})
			}

		}
	}
</script>