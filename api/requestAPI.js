/*
 * @Author: JansChong
 * @Date: 2023-06-04 18:18:32
 * @LastEditors: JansChong
* @LastEditTime: 2023-06-14 01:26:46
 * @FilePath: /api/requestAPI.js
 * @Description: In User Settings Edit
 */

import {
	client_id,
	client_secret,
	client_id_anime,
	client_secret_anime
} from "api/keys.js"

// 人脸token 和 动漫token的promise对象,  用于promise.all()
let faceToken = getAccessToken(client_id, client_secret);
let animeToken = getAccessToken(client_id_anime, client_secret_anime);

// 获取人脸检测token
function getAccessToken(client_id, client_secret) {
	// Vue2 对部分 API 进行了 Promise 封装，返回数据的第一个参数是错误对象，第二个参数是返回数据。此时使用 catch 是拿不到报错信息的，因为内部对错误进行了拦截。
	return uni.request({
		url: "https://aip.baidubce.com/oauth/2.0/token",
		method: "GET",
		data: {
			grant_type: "client_credentials",
			// 人脸识别 appkey 和 secretKey
			client_id,
			client_secret,
		},
		dataType: "json"
	}).then(res => {
		// Vue2 对部分 API 进行了 Promise 封装，返回数据的第一个参数是错误对象，第二个参数是返回数据。此时使用 catch 是拿不到报错信息的，因为内部对错误进行了拦截。
		// [null, {}]	
		// 去除错误对象null, 直接返回数据{} 
		return new Promise((resolve, reject) => resolve(res[1].data))
	})

};

// promise.all(), 返回两个必须的access_token
function accessTokenAll() {
	return Promise.all([faceToken, animeToken]); // 返回promise对象, [{face_token},{anime_token}]
}



// 导出模块
export {
	accessTokenAll
}
