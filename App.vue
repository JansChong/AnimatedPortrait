<!--
* @Author: JansChong
* @Date: 2023-06-04 18:17:48
* @LastEditors: JansChong
* @LastEditTime: 2023-06-14 01:56:52
* @FilePath: /App.vue
* @Description: In User Settings Edit
-->
<script>
	// 导入request
	import {
		accessTokenAll
	} from "api/requestAPI.js";

	export default {
		onLaunch: function() {

			// 缓存判定
			
			// 判断是否有token缓存, 以及是否过期
			uni.getStorage({
					key: "access_token"
				}).then(res => {
					// 如果缓存过期, 重新缓存
					if (Date.now() >= res.data.outTime) this.token_storage();
				})
				// 无目标缓存, 重新缓存
				.catch(() => this.token_storage());

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

		methods: {
			// 设置缓存
			token_storage() {
				// 全局获取Token, 有效期30天, 缓存
				accessTokenAll().then(res => {
					// console.log("token =>", res); // [{}, {}]

					// 构造缓存数据 
					let data = {
						face_token: res[0].access_token,
						anime_token: res[1].access_token,
						outTime: Date.now() + (30 * 24 * 3600 * 1000) // 设置有效期30天
					}

					// 设置缓存
					uni.setStorage({
						key: 'access_token',
						data,
						success: function() {
							console.log('token 缓存成功');
						}
					});
				});

			},

		}
	}
</script>

<style>
	/* 导入vant的内置样式 */
	@import "wxcomponents/vant/dist/common/index.wxss";

	page {
		width: 100%;
		height: 100%;
	}

	.auto-img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
