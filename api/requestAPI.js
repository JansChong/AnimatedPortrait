/*
* @Author: JansChong
* @Date: 2023-06-04 18:18:32
* @LastEditors: JansChong
* @LastEditTime: 2023-06-09 01:03:10
* @FilePath: /api/requestAPI.js
* @Description: In User Settings Edit
*/

// 获取人脸识别key: 百度智能云 - 产品 - 人脸与人体  https://cloud.baidu.com/product/face
let client_id = "F6kIdvWs1iUneYlHWm2dyxLN";
let client_secret = "Dv1BqjCYqVTXAkFYmx3ptCCoTIm0jWiR";

// 获取人像动漫化token: 百度智能云 - 产品 - 图像技术 - 图像特效 - 人像动漫化  https://cloud.baidu.com/product/imageprocess/selfie_anime
let client_id_anime = "2GBIMbINRigGZDY69sOpIQnB";
let client_secret_anime = "B1rUDX2GbSKSinhNXzLAuvvEjKhxcjsW";

// 获取人脸检测token
let getFaceAccessToken = ()=>{
	return uni.request({
		url:"https://aip.baidubce.com/oauth/2.0/token",
		method: "GET",
		data:{ 
			grant_type: "client_credentials",
				
			// 人脸识别 appkey 和 secretKey
			client_id,
			client_secret,
		},
		dataType:"json"
	})
};

// 
let getAnimeAccessToken=()=>{
	return uni.request({
		url:"https://aip.baidubce.com/oauth/2.0/token",
		method: "GET",
		data:{ 
			grant_type: "client_credentials",
				
			// 动漫人像
			client_id: client_id_anime,
			client_secret: client_secret_anime
		},
		dataType:"json"
	})
};



// 导出模块
export {getFaceAccessToken, getAnimeAccessToken}