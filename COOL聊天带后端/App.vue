<script>
import { useStore, socket } from "/@/cool";
import { useChat } from "/@/hooks";

export default {
	onLaunch: function () {
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
		const { user } = useStore();

		if (user.token) {
			const { friend } = useChat();

			user.get();
			friend.get();
			socket.connect();
		}
	},
	onHide: function () {
		console.log("App Hide");
	},
};
</script>

<style lang="scss">
@import "/@/static/css/index.scss";
@import "/@/cool/ui/index.scss";
</style>
