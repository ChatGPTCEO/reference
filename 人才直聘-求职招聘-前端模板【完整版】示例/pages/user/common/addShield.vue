<template>
	<yzb-page class="">
		<view class="top">
			<view class="search">
				<view class="search-input">
					<text class="yzb yzb-search"></text>
					<input class="text-normal" type="text" :value="searchValue" :placeholder="placeholder" @input="searchInput" />
				</view>
				<view class="btn-cancel" @click="cancelSearch">清空</view>
			</view>
		</view>
		<view class="body">
			<uni-list>
				<uni-list-item :title="item.fullName" v-for="(item,index) in list" :key="index">
					<template v-slot:footer>
						<text class="unbind" @click="addShield(item)">屏蔽</text>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- <view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view> -->
		</view>
	</yzb-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mSwiper from '@/components/m-swiper/m-swiper.vue';
import yzbPosition from '@/components/yzb/yzb-position.vue';
import mAd from '@/components/m-ad/m-ad.vue';
import yzbfilterDropdown from '@/components/yzb/yzb-filterDropdown.vue';
export default {
	components: {
		mSwiper,
		yzbPosition,
		mAd,
		yzbfilterDropdown
	}, 
	computed: {
		...mapState(['forcedLogin']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			list: [],
			status: '',
			query:{
				page: 1,
				limit: 30,
				keyword:'',
			},
			searchValue: '',
			placeholder: '请输入公司名称',
			type:0,
		};
	},
	async onLoad(options) {
		console.log(options);
		if(options.type==0){
			uni.setNavigationBarTitle({
				title:'添加屏蔽公司'
			});
			this.type=0;
		}else if(options.type==1){
			uni.setNavigationBarTitle({
				title:'添加不感兴趣公司'
			});
			this.type=1;
		}
	},
	
	methods: {
		async getList() {
			this.status = '请求中';
			let res = await this.$apis.getCompanyListForSelect(this.query);
			if (res) {
				let data = res.data;
				this.list = data;
				// this.changeStatus(res);
			}
		},
		
		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '暂无数据';
			} else if (this.query.page >= Math.ceil(data.count / this.query.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},
		
		async addShield(item){
			console.log("type===",this.type);
			let param={
				type:this.type,
				companyId:item.id,
			}
			let res = await this.$apis.updateShield(param);
			if (res) {
				uni.showToast({
					icon:'none',
					title:'添加成功'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				}, 1000)
			}
		},
		
		searchInput(e) {
			this.searchValue = e.detail.value;
			console.log('searchInput', this.searchValue);
			if (this.searchValue) {
				this.query.page=1;
				this.query.keyword=this.searchValue;
				this.list=[];
				this.getList();
			} else {
				this.cancelSearch();
			}
		},
		// 取消搜索
		cancelSearch() {
			this.searchValue = '';
			this.query.keyword='';
			this.query.page=1;
			this.list=[];
			// this.getList();
		},
		
	}
};
</script>

<style lang="scss" scoped>
.body {
	margin-top: 90upx;
}

.top {
	width: 100%;
	// height: 180upx;
	position: fixed;
	top: 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
}

.search {
	width: 100%;
	display: flex;
	height: 90upx;
	z-index: 999;
	flex-direction: row;
	background-color: $main-color;
	color: #ffffff;
	align-items: center;
	justify-content: center;
	.yzb-search {
		color: $font-color-999;
		font-size: $uni-font-size-base;
		margin: 0 15upx;
		margin-top: 8upx;
	}
	.search-input {
		width: 77%;
		height: 65upx;
		border-radius: 50upx;
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		align-items: center;
	}
	.search-input image {
		width: 35upx;
		height: 35upx;
		margin-right: 10upx;
	}
	.search-input input {
		width: 65%;
		font-size: 28upx;
		color: $font-color-333;
	}

	.btn-search {
		margin-left: 20upx;
	}

	.btn-cancel {
		margin-left: 20upx;
	}
}
.unbind {
	color: $font-color-orange;
	background-color: $uni-bg-color-grey;
	padding: 2upx 20upx;
	border-radius: 10upx;
}
</style>
