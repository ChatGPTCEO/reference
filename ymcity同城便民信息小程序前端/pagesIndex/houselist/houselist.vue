<template>
	<view class="pageCont">
		<u-dropdown style="background-color: white;" ref="uDropdown" active-color="#f44c01">
			<u-dropdown-item v-model="search.room" title="户型" :options="options1" @change="refload"></u-dropdown-item>
			<u-dropdown-item v-model="search.rent" title="租金" :options="options2" @change="refload"></u-dropdown-item>
			<u-dropdown-item title="更多">
				<view class="slot-content">
					<view class="slot-cell">
						<text>面积</text>
						<view class="gird">
							<view class="gitem" v-for="(item,index) in acreageTag" :key="index"
								@click="seltag('acreage',item)" :class="{active:search.acreage==item.value?true:false}">
								<text>{{item.label}}</text>
							</view>
						</view>
					</view>
					<view class="slot-cell">
						<text>装修</text>
						<view class="gird">
							<view class="gitem" v-for="(item,index) in decorationTag" :key="index"
								@click="seltag('decoration',item)"
								:class="{active:search.decoration==item.value?true:false}">
								<text>{{item.label}}</text>
							</view>
						</view>
					</view>
					<view class="slot-cell">
						<text>标签</text>
						<view class="gird">
							<view class="gitem" v-for="(item,index) in labelTag" :key="index"
								@click="seltag('label',item)" :class="{active:search.lable_ids==item.value?true:false}">
								<text>{{item.label}}</text>
							</view>
						</view>
					</view>
					<view class="cellbtn">
						<view class="btn" @click="resSearch">
							<text>重置</text>
						</view>
						<view class="btn1" @click="subSearch">
							<text>查询</text>
						</view>
					</view>
				</view>
			</u-dropdown-item>
		</u-dropdown>
		<z-paging ref="paging" @query="queryList" :list.sync="houseData" :style="{height: scrollHeight+'px'}">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<HouseList :houseData="houseData"></HouseList>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import HouseList from '@/components/HouseList/HouseList.vue';
	export default {
		components: {
			HouseList
		},
		data() {
			return {
				search: {
					type: 'house',
					room: 'all',
					rent: 'all',
					acreage: 'all',
					decoration: 'all',
					lable_ids: 'all',
					info_type: 'rent',
					page:1
				},
				options1: [{
					"label": "全部",
					"value": "all"
				}, {
					"label": "1室",
					"value": 1
				}, {
					"label": "2室",
					"value": 2
				}, {
					"label": "3室",
					"value": 3
				}, {
					"label": "4室",
					"value": 4
				}, {
					"label": "5室以上",
					"value": '5-all'
				}],
				options2: [{
						"label": "不限",
						"value": "all"
					},
					{
						"label": "1000以下",
						"value": "0-1000"
					},
					{
						"label": "1000-2000",
						"value": "1000-2000"
					},
					{
						"label": "2000-3000",
						"value": "2000-3000"
					},
					{
						"label": "3000-5000",
						"value": "3000-5000"
					},
					{
						"label": "5000以上",
						"value": "5000-0"
					}
				],
				acreageTag: [{
						"label": "50㎡以下",
						"value": "0-50"
					},
					{
						"label": "50-80㎡",
						"value": "50-80"
					}, {
						"label": "80-120㎡",
						"value": "80-120"
					}, {
						"label": "120-150㎡",
						"value": "120-150"
					},
					{
						"label": "150-200㎡",
						"value": "150-200"
					}, {
						"label": "200㎡以上",
						"value": "200-0"
					}
				],
				decorationTag: [{
						"label": "毛坯",
						"value": "1"
					},
					{
						"label": "简装",
						"value": "2"
					}, {
						"label": "精装",
						"value": "3"
					}
				],
				labelTag: [{
						"label": "押一付一",
						"value": "1"
					},
					{
						"label": "拎包入住",
						"value": "2"
					}, {
						"label": "精装修",
						"value": "3"
					}, {
						"label": "随时看房",
						"value": "4"
					}, {
						"label": "交通便利",
						"value": "5"
					}
				],
				scrollHeight: 500,
				houseData: [],
			}
		},
		onLoad(e) {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let windowHeight = res.windowHeight;
					let windowWidth = res.windowWidth;
					let headHeight = 80 / 750 * windowWidth;
					let scrollHeight = (windowHeight - headHeight);
					that.scrollHeight = scrollHeight;
				}
			});
			if (e.type) {
				this.search.type = e.type;
			}
			if (e.info_type) {
				this.search.info_type = e.info_type;
			}
		},
		methods: {
			seltag(type, item) {
				if (type === 'acreage') {
					this.search.acreage = item.value;
				}
				if (type === 'decoration') {
					this.search.decoration = item.value;
				}
				if (type === 'label') {
					this.search.lable_ids = item.value;
				}
			},
			resSearch() {
				this.search.acreage = 'all';
				this.search.decoration = 'all';
				this.search.lable_ids = 'all';
			},
			subSearch() {
				this.$refs.paging.reload();
				this.$refs.uDropdown.close();
			},
			refload(e){
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/house/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pageCont {
		height: 100%;
		width: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.slot-content {
		background-color: white;

		.slot-cell {
			display: flex;
			flex-direction: column;
			padding: 20rpx;

			.gird {
				display: flex;
				flex-direction: row;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 20rpx;

				.gitem {
					width: 226.6rpx;
					height: 80rpx;
					background-color: #e1e1e1;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					margin: 5rpx;
					border-radius: 10rpx;
					font-size: 30rpx;
				}

				.active {
					background-color: #F44C01;
					color: white;
				}
			}
		}

		.cellbtn {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			padding: 20rpx;

			.btn {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 260rpx;
				height: 90rpx;
				border-radius: 50rpx;
				border: 1rpx solid #e6e6e6;
				font-size: 32rpx;
			}

			.btn1 {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 260rpx;
				height: 90rpx;
				border-radius: 50rpx;
				background-color: #F44C01;
				color: white;
				font-size: 32rpx;
			}
		}
	}
</style>
