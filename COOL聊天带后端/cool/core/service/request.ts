import { useStore } from "../store";

export default function request(options: any) {
	// 缓存信息
	const { user } = useStore();

	// 标识
	let Authorization = user.token || "";

	// 忽略验证
	const ignore: string[] = [];

	ignore.forEach((e) => {
		if (options.url.includes(e)) {
			Authorization = "";
		}
	});

	return new Promise(async (resolve, reject) => {
		console.log(`[${options.method || "GET"}] ${options.url}`);

		uni.request({
			...options,

			header: {
				Authorization,
				...options.header,
			},

			success(res: any) {
				const { code, data, message } = res.data;

				// 无权限
				if (res.statusCode === 401) {
					user.logout();
				}

				// 服务异常
				if (res.statusCode === 502) {
					return reject({
						message: "服务异常",
					});
				}

				// 未找到
				if (res.statusCode === 404) {
					return reject({
						message: `[404] ${options.url}`,
					});
				}

				// 成功
				if (res.statusCode === 200) {
					switch (code) {
						case 1000:
							resolve(data);
							break;
						default:
							reject({ message, code });
					}
				}
			},

			fail: (err) => {
				reject({ message: err.errMsg });
			},
		});
	});
}
