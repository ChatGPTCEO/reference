import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "../types";
import { service } from "/@/cool";
import { Session } from "../types";
import { reject } from "lodash";

// 好友
const friendStore = defineStore("friend", function () {
	// 好友列表
	const list = ref<User.Info[]>([]);

	// 获取好友
	async function get() {
		return service.chat.friend.list().then((res) => {
			list.value = res;
			return res;
		});
	}

	return {
		list,
		get,
	};
});

// 会话
const sessionStore = defineStore("session", function () {
	// 会话信息
	const info = ref<Session.Info>();

	// 获取用户，组的会话信息
	async function get(ids: { sessionId?: string; userId?: string; groupId?: string }) {
		return new Promise(async (resolve) => {
			const { sessionInfo, userInfo } = await service.chat.session.detail(ids);

			let d: any = null;

			// 已存在会话
			if (sessionInfo) {
				d = sessionInfo;
			} else {
				// 临时会话
				d = {
					name: userInfo.nickName,
					objectId: userInfo.id,
					type: 0,
				};
			}

			if (d) {
				set(d);
				resolve(d);
			} else {
				reject("创建会话消息失败");
			}
		});
	}

	// 设置
	function set(data: Session.Info) {
		info.value = data;
	}

	return {
		info,
		get,
		set,
	};
});

export function useChat() {
	const friend = friendStore();
	const session = sessionStore();

	return {
		friend,
		session,
	};
}
