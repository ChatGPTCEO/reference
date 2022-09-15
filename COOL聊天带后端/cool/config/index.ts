import dev from "./dev";
import prod from "./prod";

// 是否开发模式
export const isDev = import.meta.env.MODE === "development";

// 配置
export const config = {
	// 项目信息
	app: {
		// 名称
		name: "酷聊 COOL-CHAT",
		// 描述
		desc: "基于 Ts + Vue3 + Pinia 构建。",
		// 页面配置
		pages: {
			login: "/pages/user/login",
			chat: "/pages/chat/index",
		},
		// 微信配置
		wx: {
			// 小程序
			mini: {
				appid: "",
			},
			// 公众号
			mp: {
				appid: "",
				debug: false,
			},
			// App
			app: {
				appid: "",
			},
		},
	},

	// 调试
	test: {
		token: "",
		mock: false,
		eps: true,
	},

	// 当前环境
	...(isDev ? dev : prod),
};

export * from "./proxy";
