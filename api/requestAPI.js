/*
* @Author: JansChong
* @Date: 2023-06-04 18:18:32
* @LastEditors: JansChong
* @LastEditTime: 2023-06-04 18:19:00
* @FilePath: /api/requestAPI.js
* @Description: In User Settings Edit
*/

// 获取人脸检测token
let getFaceAccessToken = ()=>{
	return uni.request({
		url:"https://aip.baidubce.com/oauth/2.0/token",
		method: "GET",
		data:{ 
			grant_type: "client_credentials",
				
			// 人脸识别 appkey 和 secretKey
			client_id:"F6kIdvWs1iUneYlHWm2dyxLN",
			client_secret:"Dv1BqjCYqVTXAkFYmx3ptCCoTIm0jWiR"
		},
		dataType:"json"
	})
};

// 获取人像动漫化token
let getAnimeAccessToken=()=>{
	return uni.request({
		url:"https://aip.baidubce.com/oauth/2.0/token",
		method: "GET",
		data:{ 
			grant_type: "client_credentials",
				
			// 动漫人像
			client_id: "2GBIMbINRigGZDY69sOpIQnB",
			client_secret: "B1rUDX2GbSKSinhNXzLAuvvEjKhxcjsW"
		},
		dataType:"json"
	})
};



// 导出模块
export {getFaceAccessToken, getAnimeAccessToken}