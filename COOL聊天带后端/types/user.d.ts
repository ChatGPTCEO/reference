declare namespace User {
	interface Info {
		id: number;
		// 头像
		avatar: string;
		// 昵称
		nickName: string;
		// 手机号
		phone: string;
		// 性别
		sex: 1 | 0;
		// 会话ID
		socketId: Date;
		// 账号
		num: string;
		[key: string]: any;
	}
}

export { User };
