<!--
* @Author: JansChong
* @Date: 2023-06-04 18:17:48
* @LastEditors: JansChong
* @LastEditTime: 2023-06-04 18:18:01
* @FilePath: /App.vue
* @Description: In User Settings Edit
-->
<script>
	// 导入request
	import {
		getFaceAccessToken,
		getAnimeAccessToken
	} from "api/requestAPI.js";

	export default {
		onLaunch: function() {
			console.log('App Launch');

			// TODO..缓存判定

			// 全局获取Token, 有效期30天, 缓存
			
			getFaceAccessToken().then(res => {
				console.log("token =>", res.data.access_token);
			});


		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
