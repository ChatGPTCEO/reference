<template>
	<view>
		<!-- tabs -->
		<view class="tabs">
			<u-tabs :list="tabsList" :is-scroll="false" :current="tabsCurrent" bg-color="#fff" show-bar active-color="#333"
			 :bar-style="{backgroundColor: '#f29100'}" @change="tabsChange">
			</u-tabs>
		</view>
		<!-- list -->
		<view class="list">
			<template v-if="!tabsCurrent ? sureList.length : notList.length">
				<view class="c-item" v-for="(item, index) in (!tabsCurrent ? sureList : notList)" :key="index">
					<coupon-item :amount="item.coupon_price" :label="Number(item.use_min_price) > 0 ? `满${item.use_min_price}可用` : '无门槛优惠券'"
					 :rule-text="`${item.start_time} 至 ${item.end_time}可用`" :title="item.coupon_title" :type-text="typeText[item.coupon.type]"
					 :btn-text="btnText[item.status]" :btnStyle="btnStyle(item.status)">
					</coupon-item>
				</view>
			</template>
			<view class="u-padding-80" v-else>
				<u-empty text="您还没有相关记录呢" mode="coupon"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnText: ['可使用', '已使用', '已过期'],
				typeText: ['店铺券', '商品券', '品类券'],
				tabsList: [{
					name: '可使用'
				}, {
					name: '已过期/使用'
				}],
				tabsCurrent: 0,
				list: []
			};
		},
		computed: {
			sureList() {
				return this.list.filter((item) => !item.status)
			},
			notList() {
				return this.list.filter((item) => item.status)
			},
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			btnStyle(index) {
				return index != 0 ? {
					backgroundColor: '#ccc !important',
					color: '#fff'
				} : {};
			},
			getList() {
				this.$u.get('/api/coupon/list')
					.then(({
						data
					}) => {
						this.list = data.list
					})
			},
			tabsChange(index) {
				this.tabsCurrent = index;
			}
		}
	}
</script>

<style lang="scss">
	.c-item {
		margin: $gutter;
	}
</style>
