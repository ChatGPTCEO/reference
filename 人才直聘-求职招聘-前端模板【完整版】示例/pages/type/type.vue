<template>
	<view>
		<view class="top">
			<view class="search">
				<view class="search-input">
					<text class="yzb yzb-search"></text>
					<input class="text-normal" type="text" :value="searchValue" :placeholder="placeholder" @input="searchInput" />
				</view>
				<view class="btn-cancel" @click="cancelSearch">取消</view>
			</view>
			<yzbfilterDropdown
				:menuTop="0"
				:filterData="userInfo.memberRole == 1 ? filterData2 : filterData"
				:defaultSelected="defaultSelected"
				:updateMenuName="true"
				@confirm="confirm"
				dataFormat="Object"
			></yzbfilterDropdown>
		</view>
		<view class="body">
			<template v-if="userInfo.memberRole == 1">
				<yzb-resume :list="list" @click="resumeDetail"></yzb-resume>
			</template>
			<template v-else>
				<m-position :positions="list" @click="positionDetail"></m-position>
			</template>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import yzbfilterDropdown from '@/components/yzb/yzb-filterDropdown.vue';
import mPosition from '@/components/yzb/yzb-position.vue';
import yzbResume from '@/components/yzb/yzb-resume.vue';
export default {
	components: {
		yzbfilterDropdown: yzbfilterDropdown,
		mPosition,
		yzbResume
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			list: [],
			status: '',
			query: {
				page: 1,
				limit: 10,
				positionType: 0,
				keyword: '',
				postId: '',
				industryId: '',
				salary: '',
				nature: ''
			},

			indexArr: '',
			valueArr: '',

			searchValue: '',
			placeholder: '请输入关键词搜索相关内容',
			defaultSelected: [[null,null,null],[null,null],[null],[null]],
			filterData: [
				{
					name: '职位筛选',
					type: 'hierarchy',
					child: []
				},
				{
					name: '行业筛选',
					type: 'hierarchy',
					child: []
				},
				{
					name: '薪资范围',
					type: 'hierarchy',
					child: [
						{
							name: '不限',
							id: '不限'
						},
						{
							name: '面议',
							id: '面议'
						},
						{
							name: '1-3K',
							id: '1-3K'
						},
						{
							name: '3-5K',
							id: '3-5K'
						},
						{
							name: '5-8K',
							id: '5-8K'
						},
						{
							name: '8-12K',
							id: '8-12K'
						},
						{
							name: '12-15K',
							id: '12-15K'
						},
						{
							name: '15-20K',
							id: '15-20K'
						},
						{
							name: '20K以上',
							id: '20K以上'
						}
					]
				},
				{
					name: '企业性质',
					type: 'hierarchy', //filter
					child: [
						{
							name: '不限',
							id: '不限'
						},
						{
							name: '外资企业',
							id: '外资企业'
						},
						{
							name: '中外合资企业',
							id: '中外合资企业'
						},
						{
							name: '私营/民营企业',
							id: '私营/民营企业'
						},
						{
							name: '国有企业',
							id: '国有企业'
						},
						{
							name: '国内上市公司',
							id: '国内上市公司'
						},
						{
							name: '跨国公司',
							id: '跨国公司'
						},
						{
							name: '政府/非盈利机构',
							id: '政府/非盈利机构'
						},
						{
							name: '事业单位',
							id: '事业单位'
						},
						{
							name: '其他',
							id: '其他'
						}
					]
				}
			],
			filterData2: [
				{
					name: '职位筛选',
					type: 'hierarchy',
					child: []
				},
				// {
				// 	name: '行业筛选',
				// 	type: 'hierarchy',
				// 	child: []
				// },
				{
					name: '薪资范围',
					type: 'hierarchy',
					child: [
						{
							name: '不限',
							id: '不限'
						},
						{
							name: '面议',
							id: '面议'
						},
						{
							name: '1-3K',
							id: '1-3K'
						},
						{
							name: '3-5K',
							id: '3-5K'
						},
						{
							name: '5-8K',
							id: '5-8K'
						},
						{
							name: '8-12K',
							id: '8-12K'
						},
						{
							name: '12-15K',
							id: '12-15K'
						},
						{
							name: '15-20K',
							id: '15-20K'
						},
						{
							name: '20K以上',
							id: '20K以上'
						}
					]
				},
				{
					name: '学历筛选',
					type: 'hierarchy', //filter
					child: [
						{
							name: '不限',
							id: '不限'
						},
						{
							name: '高中以下',
							id: '高中以下'
						},
						{
							name: '高中',
							id: '高中'
						},
						{
							name: '中专/技校',
							id: '中专/技校'
						},
						{
							name: '大专',
							id: '大专'
						},
						{
							name: '本科',
							id: '本科'
						},
						{
							name: '硕士',
							id: '硕士'
						},
						{
							name: '博士',
							id: '博士'
						}
					]
				}
			],
			selectPostId: ''
		};
	},
	
	
	onLoad(options) {
		this.initData();
	},
	onShow() {
		this.updateTabbar();
		this.query.page = 1;
		this.list = [];
		if(this.userInfo.memberRole!=1){
			if (getApp().globalData.postId) {
				this.selectPostId = getApp().globalData.postId;
				getApp().globalData.postId = null;
				this.initSelectPost();
			}else{
				if(this.selectPostId){
					this.defaultSelected=[[null],[null],[null],[null]];
					this.selectPostId='';
					this.query.postId=''
				}
				this.getPositionList();
			}
		}else{
			this.getResumeList();
		}
	},

	onPullDownRefresh() {
		this.query.page = 1;
		this.list = [];
		if (this.userInfo.memberRole == 1) {
			this.getResumeList();
		} else {
			this.getPositionList();
		}
	},

	onReachBottom() {
		this.query.page++;
		if (this.userInfo.memberRole == 1) {
			this.getResumeList();
		} else {
			this.getPositionList();
		}
	},

	methods: {
		
		updateTabbar(){
			if(this.userInfo.memberRole!=1){
				uni.setTabBarItem({
				  index: 1,
				  text: '职位',
				});
				uni.setNavigationBarTitle({
					title:'职位'
				})
			}else{
				uni.setTabBarItem({
				  index: 1,
				  text: '简历',
				});
				uni.setNavigationBarTitle({
					title:'简历'
				})
			}
		},
		
		async initData() {
			let all = {
				name: '全部',
				id: '不限'
			};
			let industryList = await this.$apis.getIndustryList();
			let postList = await this.$apis.getPostList();
			industryList.unshift(all);
			postList.unshift(all);
			this.filterData[0].child = postList;
			this.filterData[1].child = industryList;
			this.filterData2[0].child = postList;
			if(this.userInfo.memberRole!=1){
				if (this.selectPostId) {
					this.initSelectPost();
				}
			}
		},

		/**
		 * 初始化默认选中职位
		 */
		initSelectPost() {
			let postList;
			if(this.filterData[0].child){
				postList=this.filterData[0].child;
			}else{
				console.log("数据为空");
				return;
			}
			console.log('list=====================', postList);
			//根据postlist获取id
			let tmp = [];
			let that = this;
			try {
				postList.forEach(function(item, index) {
					console.log(item, index);
					if (item.id == that.selectPostId) {
						tmp = [index];
						throw new Error('End Loop')
					}
					if (item.child) {
						item.child.forEach(function(item2, index2) {
			 			console.log(item2);
							if (item2.id == that.selectPostId) {
								tmp = [index, index2];
								throw new Error('End Loop')
							}
							if (item2.child) {
								item2.child.forEach(function(item3, index3) {
									if (item3.id == that.selectPostId) {
										tmp = [index, index2, index3];
										throw new Error('End Loop')
									}
									console.log(item3);
								});
							}
						});
					}
				});
			} catch (e) {
				console.log("终止循环",tmp);
				this.defaultSelected[0]=tmp;
				console.log("终止循环",this.defaultSelected);
				this.query.postId=this.selectPostId;
				this.query.page=1;
				this.list=[];
				this.getPositionList();
			}
		},

		async getPositionList() {
			this.status = '请求中';
			this.query.latitude = getApp().globalData.location.latitude;
			this.query.longitude = getApp().globalData.location.longitude;
			this.query.pcitycode = getApp().globalData.location.pcitycode;
			let res = await this.$apis.getPositionList(this.query);
			if (res) {
				let data = res.data;
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',');
					}
				}
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
			uni.stopPullDownRefresh();
		},

		async getResumeList() {
			this.status = '请求中';
			let res = await this.$apis.getResumeList(this.query);
			if (res) {
				let data = res.data;
				this.list = this.list.concat(data || []);
				console.log('--getResumeList---', this.list);
				this.changeStatus(res);
				this.$forceUpdate();
			}
			uni.stopPullDownRefresh();
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

		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					id: item.id
				}
			});
		},
		resumeDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.resumeDetail,
				query: {
					id: item.id
				}
			});
		},

		searchInput(e) {
			this.searchValue = e.detail.value;
			console.log('searchInput', this.searchValue);
			if (this.searchValue) {
				this.query.keyword = this.searchValue;
				this.query.page = 1;
				this.list = [];
				if (this.userInfo.memberRole == 1) {
					this.getResumeList();
				} else {
					this.getPositionList();
				}
			} else {
				this.cancelSearch();
			}
		},
		// 取消搜索
		cancelSearch() {
			this.searchValue = '';
			this.query.keyword = '';
			this.query.page = 1;
			this.list = [];
			if (this.userInfo.memberRole == 1) {
				this.getResumeList();
			} else {
				this.getPositionList();
			}
		},

		confirm(options) {
			console.log('--confirm--', options);
			if (this.userInfo.memberRole == 1) {
				if (options.value[0][2] != null && options.value[0][2] != '不限') {
					this.query.postId = options.value[0][2];
				} else {
					this.query.postId = '';
				}
				if (options.value[1][0] != null && options.value[1][0] != '不限') {
					this.query.salary = options.value[1][0];
				} else {
					this.query.salary = '';
				}
				if (options.value[2][0] != null && options.value[2][0] != '不限') {
					this.query.education = options.value[2][0];
				} else {
					this.query.education = '';
				}
				this.query.page = 1;
				this.list = [];
				this.getResumeList();
			} else {
				if (options.value[0][2] != null) {
					this.query.postId = options.value[0][2];
				} else {
					this.query.postId = '';
				}
				if (options.value[1][1] != null) {
					this.query.industryId = options.value[1][1];
				} else {
					this.query.industryId = '';
				}
				if (options.value[2][0] != null && options.value[2][0] != '不限') {
					this.query.salary = options.value[2][0];
				} else {
					this.query.salary = '';
				}
				if (options.value[3][0] != null && options.value[3][0] != '不限') {
					this.query.nature = options.value[3][0];
				} else {
					this.query.nature = '';
				}
				this.query.page = 1;
				this.list = [];
				this.getPositionList();
			}
		}
	}
};
</script>
<style lang="scss">
.body {
	margin-top: 170upx;
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
</style>
