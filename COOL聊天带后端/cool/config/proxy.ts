const dev = "https://chat.cool-js.com";

export const proxy = {
	"/dev": {
		target: dev,
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, "/api"),
	},

	"/socket.io": {
		target: dev,
		changeOrigin: true,
		ws: true,
	},

	"/prod": {
		target: "https://chat.cool-js.com",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, "/api"),
	},
};
