<template>
	<view class="content">
		<view class="body">
			<text class="name">{{data.name}}</text>
			<text class="summary">{{data.summary}}</text>
			<view class="detail">
				<!-- <rich-text style="word-wrap: break-word;word-break: break-all;" :nodes="data.content" selectable="true"></rich-text> -->
				<text user-select="true">{{data.content}}</text>
			</view>
		</view>
		<yzb-back-top :scroll-top="scrollTop" top="600"></yzb-back-top>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { formatDate } from '@/common/date';
import yzbBackTop from '@/components/yzb/yzb-back-top.vue';
export default {
	components: {
		yzbBackTop
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			scrollTop: 0,
			data: {}
		};
	},

	onLoad(options) {
		console.log(options);
		this.id = options.id;
		this.getLawDetail();
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},

	methods: {
		async getLawDetail() {
			let res = await this.$apis.getLawDetail({ id: this.id });
			console.log('getLawDetail===', res);
			if (res) {
				this.data = res;
				console.log('data===', this.data);
			}
		},

		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g, '/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		}
	}
};
</script>

<style lang="scss">
.body {
	margin-bottom: 100upx;
	width: 100%;
	box-sizing: border-box;
	padding: 20upx;
	display: flex;
	flex-direction: column;

	.name {
		text-align: center;
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 20upx 0;
	}

	.summary {
		color: $font-color-333;
		font-size: $font-base-more;
	}
	.detail {
		margin-top: 50upx;
		text{
			font-size: $font-base-more;
			color: $font-color-333;
		}
	}
}
</style>
