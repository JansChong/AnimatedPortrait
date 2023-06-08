# animatedPortrait

########### 环境依赖
+ node 16.15.1
+ vant/weapp 1.10.19
+ vue 2.x
+ uniapp  

########### 部署步骤
1. 修改`/api/requestAPI.js`文件:
	+ `client_id`
	+ `client_secret`
	+ `client_id_anime`
	+ `client_secret_anime`
2. npm install  // 安装node运行环境
3. HbuilderX - 运行 - 小程序模拟器 - 微信开发者工具  // 前端编译

########### 目录结构描述
├── README.md                   // help
├── api                         // 请求模块
├── pages                       // 页面
│   ├── album					// 相册选择
│   ├── anime          		    // 动漫化
│   ├── detection               // 人像检测
│   ├── index                   // 首页(相机)
│   ├── mine                    // 个人中心
├── static						// 静态资源
│	├── icons					// 图标
│	├── less					// 页面样式
│	├── logo.png
├── unpackage                   // 非工程代码，运行或发行的编译结果
├── wxcomponents				// 存放小程序组件的目录
├── App.vue						// 应用配置，用来配置App全局样式以及监听应用生命周期
├── index.html
├──	main.js               		// Vue初始化入口文件
├── manifest.json         		// 配置应用名称、appid、logo、版本等打包信息，详见
├── package.json     			// 项目依赖关系
├── package-lock.json     		// `node_modules`的快照, npm install 时会根据这份快照生成一模一样的node_modules
├── pages.json           	 	// 配置页面路由、导航条、选项卡等页面类信息，详见
└── uni.scss              		// 这里是uni-app内置的常用样式变量

########### V1.0.0 版本内容更新
1. 新功能     拍摄图片, 相册上传图片
2. 新功能     新增照片弹窗, 人像动漫化选项


########### 关于作者及交流方式
1. Author: JansChong
2. Email: houanz@163.com