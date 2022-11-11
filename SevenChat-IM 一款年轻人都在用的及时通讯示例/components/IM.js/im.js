let connectSocketInit = function() {
	// 创建websocket连接
	uni.connectSocket({
		url: "",   //wss协议链接地址
		success(res) {
			console.log("websocket连接成功");
		},
	});
	//监听WebSocket连接打开事件
	uni.onSocketOpen(function(res) {
		uni.showToast({
			title:"WebSocket连接已打开！",
			icon:"none"
		})
	})
}

/*导出*/
export default {
	connectSocketInit
}
