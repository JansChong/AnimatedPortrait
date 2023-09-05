/*
 * @Author: JansChong
 * @Date: 2023-09-04 20:18:32
 * @LastEditors: JansChong
* @LastEditTime: 2023-06-18 10:10:56
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

// 获取两个Token
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

/***
 * @description: 获取人脸数据
 * @param {string} access_token "百度鉴权认证机制"
 * @param {string} base64 "图片base64位编码"
 * @return {{}} 人脸数据promise对象
 * @author: JansChong
 */
function faceRequest(access_token, base64) {
	return uni.request({

		url: "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=" + access_token,
		// POST请求需要格式化请求体
		method: "POST",
		// 格式化请求体
		header: {
			"Content-Type": "application/json"
		},
		data: {
			image: base64,
			image_type: "BASE64",
			face_field: "age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,quality,eye_status,emotion,face_type,mask,spoofing"
		},
		dataType: "json"
	})
}

/***
 * @description: 获取动漫人像
 * @param {string} access_token "百度鉴权认证机制"
 * @param {string} base64 "图片base64位编码"
 * @return {{}} 动漫人像promise对象
 * @author: JansChong
 */
function animeRequest(access_token, base64) {
	return uni.request({
		url: "https://aip.baidubce.com/rest/2.0/image-process/v1/selfie_anime?access_token=" + access_token,
		// POST请求需要格式化请求体
		method: "POST",
		// 格式化请求体
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: {
			"image": base64,
			"type": "anime"
		},
		dataType: "json",
	})
}



// 导出模块
export {
	accessTokenAll,
	faceRequest,
	animeRequest
}








