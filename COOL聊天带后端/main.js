import { createSSRApp } from "vue";
import { bootstrap, router, socket } from "/@/cool";
import "/@/mock";
import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);

	// 启动
	bootstrap(app);

	// 登录后重新连接
	router.afterLogin(() => {
		socket.connect();
	});

	return {
		app,
	};
}
