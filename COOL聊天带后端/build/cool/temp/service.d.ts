declare interface Crud {
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data: any): Promise<any>;
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data: { ids?: number[] | string[]; [key: string]: any }): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data: { id?: number | string; [key: string]: any }): Promise<any>;
	/**
	 * 详情
	 * @returns Promise<any>
	 */
	info(data: { id?: number | string; [key: string]: any }): Promise<any>;
	/**
	 * 全部
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 分页
	 * @returns Promise<PageResponse>
	 */
	page(data?: {
		page?: number | string;
		size?: number | string;
		[key: string]: any;
	}): Promise<PageResponse>;
}

declare interface PageResponse {
	list: any[];
	pagination: { size: number; page: number; total: number };
	[key: string]: any;
}

declare interface RequestOptions {
	params?: any;
	data?: any;
	url: string;
	method?: "GET" | "get" | "POST" | "post" | string;
	[key: string]: any;
}

declare interface BaseComm {
	/**
	 * 文件上传模式
	 * @returns Promise<any>
	 */
	uploadMode(data?: any): Promise<any>;
	/**
	 * 文件上传
	 * @returns Promise<any>
	 */
	upload(data?: any): Promise<any>;
	/**
	 * 实体信息与路径
	 * @returns Promise<any>
	 */
	eps(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		uploadMode: string;
		upload: string;
		eps: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface ChatFriend {
	/**
	 * search
	 * @returns Promise<any>
	 */
	search(data?: any): Promise<any>;
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		search: string;
		delete: string;
		list: string;
		info: string;
		add: string;
		page: string;
		update: string;
	};
}

declare interface ChatGroup {
	/**
	 * dissolve
	 * @returns Promise<any>
	 */
	dissolve(data?: any): Promise<any>;
	/**
	 * create
	 * @returns Promise<any>
	 */
	create(data?: any): Promise<any>;
	/**
	 * invite
	 * @returns Promise<any>
	 */
	invite(data?: any): Promise<any>;
	/**
	 * remove
	 * @returns Promise<any>
	 */
	remove(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * quit
	 * @returns Promise<any>
	 */
	quit(data?: any): Promise<any>;
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		dissolve: string;
		create: string;
		invite: string;
		remove: string;
		update: string;
		quit: string;
		info: string;
		list: string;
		page: string;
		delete: string;
		add: string;
	};
}

declare interface ChatMessage {
	/**
	 * 未读消息
	 * @returns Promise<any>
	 */
	unreadCount(data?: any): Promise<any>;
	/**
	 * 清除会话记录
	 * @returns Promise<any>
	 */
	clear(data?: any): Promise<any>;
	/**
	 * read
	 * @returns Promise<any>
	 */
	read(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		unreadCount: string;
		clear: string;
		read: string;
		page: string;
		list: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface ChatSession {
	/**
	 * detail
	 * @returns Promise<any>
	 */
	detail(data?: any): Promise<any>;
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		detail: string;
		delete: string;
		list: string;
		page: string;
		info: string;
		update: string;
		add: string;
	};
}

declare interface DemoCache {
	/**
	 * set
	 * @returns Promise<any>
	 */
	set(data?: any): Promise<any>;
	/**
	 * get
	 * @returns Promise<any>
	 */
	get(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		set: string;
		get: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoConfig {
	/**
	 * get
	 * @returns Promise<any>
	 */
	get(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		get: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoEs {
	/**
	 * test
	 * @returns Promise<any>
	 */
	test(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		test: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoEvent {
	/**
	 * send
	 * @returns Promise<any>
	 */
	send(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		send: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoFile {
	/**
	 * 下载并上传
	 * @returns Promise<any>
	 */
	downAndUpload(data?: any): Promise<any>;
	/**
	 * 获得上传模式
	 * @returns Promise<any>
	 */
	uploadMode(data?: any): Promise<any>;
	/**
	 * 文件上传
	 * @returns Promise<any>
	 */
	upload(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		downAndUpload: string;
		uploadMode: string;
		upload: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoGoods {
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		delete: string;
		update: string;
		info: string;
		page: string;
		list: string;
		add: string;
	};
}

declare interface DemoPay {
	/**
	 * aliNotify
	 * @returns Promise<any>
	 */
	aliNotify(data?: any): Promise<any>;
	/**
	 * wxNotify
	 * @returns Promise<any>
	 */
	wxNotify(data?: any): Promise<any>;
	/**
	 * alipay
	 * @returns Promise<any>
	 */
	alipay(data?: any): Promise<any>;
	/**
	 * wx
	 * @returns Promise<any>
	 */
	wx(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		aliNotify: string;
		wxNotify: string;
		alipay: string;
		wx: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoQueue {
	/**
	 * addGetter
	 * @returns Promise<any>
	 */
	addGetter(data?: any): Promise<any>;
	/**
	 * getter
	 * @returns Promise<any>
	 */
	getter(data?: any): Promise<any>;
	/**
	 * 发送队列数据
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		addGetter: string;
		getter: string;
		add: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
	};
}

declare interface DemoRpc {
	/**
	 * 分布式事务
	 * @returns Promise<any>
	 */
	transaction(data?: any): Promise<any>;
	/**
	 * 集群事件
	 * @returns Promise<any>
	 */
	event(data?: any): Promise<any>;
	/**
	 * 远程调用
	 * @returns Promise<any>
	 */
	call(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		transaction: string;
		event: string;
		call: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoSwagger {
	/**
	 * 创建
	 * @returns Promise<any>
	 */
	create(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		create: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoTag {
	/**
	 * data
	 * @returns Promise<any>
	 */
	data(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		data: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface UserUser {
	/**
	 * createQRCodeForAlipay
	 * @returns Promise<any>
	 */
	createQRCodeForAlipay(data?: any): Promise<any>;
	/**
	 * loginByOnekey
	 * @returns Promise<any>
	 */
	loginByOnekey(data?: any): Promise<any>;
	/**
	 * loginByWechat
	 * @returns Promise<any>
	 */
	loginByWechat(data?: any): Promise<any>;
	/**
	 * loginByAlipay
	 * @returns Promise<any>
	 */
	loginByAlipay(data?: any): Promise<any>;
	/**
	 * loginByApple
	 * @returns Promise<any>
	 */
	loginByApple(data?: any): Promise<any>;
	/**
	 * phoneBinding
	 * @returns Promise<any>
	 */
	phoneBinding(data?: any): Promise<any>;
	/**
	 * createQRCode
	 * @returns Promise<any>
	 */
	createQRCode(data?: any): Promise<any>;
	/**
	 * loginByCode
	 * @returns Promise<any>
	 */
	loginByCode(data?: any): Promise<any>;
	/**
	 * getOpenId
	 * @returns Promise<any>
	 */
	getOpenId(data?: any): Promise<any>;
	/**
	 * getCode
	 * @returns Promise<any>
	 */
	getCode(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		createQRCodeForAlipay: string;
		loginByOnekey: string;
		loginByWechat: string;
		loginByAlipay: string;
		loginByApple: string;
		phoneBinding: string;
		createQRCode: string;
		loginByCode: string;
		getOpenId: string;
		getCode: string;
		update: string;
		info: string;
		list: string;
		page: string;
		delete: string;
		add: string;
	};
}

declare interface Test {
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare type Service = {
	request(data: RequestOptions): Promise<any>;
	base: { comm: BaseComm };
	chat: { friend: ChatFriend; group: ChatGroup; message: ChatMessage; session: ChatSession };
	demo: {
		cache: DemoCache;
		config: DemoConfig;
		es: DemoEs;
		event: DemoEvent;
		file: DemoFile;
		goods: DemoGoods;
		pay: DemoPay;
		queue: DemoQueue;
		rpc: DemoRpc;
		swagger: DemoSwagger;
		tag: DemoTag;
	};
	user: { user: UserUser };
	test: Test;
};
