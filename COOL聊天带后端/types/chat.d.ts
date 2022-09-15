import { Ref } from "vue";

declare namespace Message {
	interface Item {
		id?: number | string;
		// 模式
		mode?: "send" | "receive" | "tips";
		// 头像
		avatar?: string;
		// 昵称
		nickName?: string;
		// 消息内容
		content?: {
			text?: string;
			imageUrl?: string;
			videoUrl?: string;
			voiceUrl?: string;
			duration?: number;
			[key: string]: any;
		};
		// 消息格式
		contentType?: 0 | 1 | 2 | 3 | 4;
		// 创建时间
		createTime?: string;
		// 错误信息
		error?: string;
		// 上传进度
		progress?: Number;
		[key: string]: any;
	}
}

declare namespace Session {
	interface Info extends Message.Item {
		id?: number;
		name: string;
		sessionId?: string;
		fromId?: string;
		objectId: string;
		type: 0 | 1;
		[key: string]: any;
	}
}

declare namespace Chat {
	interface Provide {
		list: Ref<Message.Item[]>;
		touches: any;
		send(data: Message.Item, isAppend?: boolean): Promise<any>;
		append(data: Message.Item, isMy?: boolean): void;
		update(data: Message.Item): void;
		scrollBottom(): void;
		refresh(params?: any): void;
	}
}

export { Chat, Message, Session };
