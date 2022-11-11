<template>
	<view>
		<view>
			<u-tabs :list="list1" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view v-for="(item,index) in listData" :key="index">
			<view class="u-page">
				<view class="album">
					<view class="album__avatar">
						<image :src="item.logo" mode="" style="width: 32px;height: 32px;"></image>
					</view>
					<view class="album__content">
						<view class="name">{{item.umame}} {{item.ctime}} <text class="bo_st del" v-if="current==4" @click="del(item.id)">删除</text></view>
						<view class="content">{{item.content}}</view>
						<u-album :urls="item.picture.split(',')" multipleSize="90"></u-album>
					</view>
				</view>

			</view>
			<u-gap height="2" bgColor="#efefef"></u-gap>
		</view>
		<view v-if="listData.length==0">
			<u-empty
			        mode="history"
			        icon="http://cdn.uviewui.com/uview/empty/history.png"
			>
			</u-empty>
			
			<view v-if="current==4&&userInfo.bid==0" class="bu">
				兴趣圈参与，请联系客服，前往公众号发布相关信息！
			</view> 
		</view>
		<view class="tubua" @click="yian" v-if="userInfo && userInfo.bid==1">
			<u-icon name="plus" color="#fff" size="30" ></u-icon>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				page: 1,
				labelsid: 0,
				uid: 0,
				userInfo: null,
				listData: [],
				list1: [{
					name: '综合排序',
				}, {
					name: '最新排序',
				}, {
					name: '推荐排序'
				}, {
					name: '精选排序'
				}, {
					name: '关于我的'
				}],
				albumWidth: 0
			}
		},
		onLoad(e) {
			this.labelsid = e.id
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.uid = userInfo.id;
				this.userInfo = userInfo;
			}

			this.getlist()
		},
		onShow() {

		},
		methods: {
			change(e) {
				this.current = e.index;
				this.listData = [];
				this.page = 1;
				this.getlist()
			},
			getlist() {
				let than = this;
				uni.$u.http.post('Forum/list', {
						uid: this.uid,
						page: this.page,
						lx: this.current,
						labelsid: this.labelsid
					})
					.then(res => {
						if (res.data.length > 0) {

							var sumData = [];

							sumData = sumData.concat(than.listData).concat(res.data);
							// than.listData.concat(res.data)
							// console.log(sumData)
							than.listData = sumData;
							than.page = than.page + 1;
						}

						// this.listData=res.data
					})
			},
			del(id){
				uni.$u.http.post('Forum/del',{
					id:id
				})
				 .then(res => {
					uni.$u.toast('删除成功')
					this.page=1;
					this.listData = [];
					this.getlist();
					
				})
			},
			yian(){
				uni.$u.route({
					url: "/pages/garden/huoadd?id="+this.labelsid
				})
			}

		},
		onReachBottom() {
			console.log(1)
			this.getlist()

		}
		
	}
</script>

<style lang="scss">
	.u-page {
		padding: 20rpx;
	}
.tubua{
		position: fixed;
		right: 30rpx;
		bottom: 15vh;
		border-radius: 50%;
		padding: 10rpx;
		background-color: #007affc7;
		display:block;
	}
	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}

	.content {
		margin: 20rpx 0;
		font-size: 26rpx;
		color: #444;
	}

	.name {
		font-size: 26rpx;
		color: #444;
	}
	.bo_st{
		font-size: 22rpx;
		// margin-left: 10rpx;
		border:2rpx solid #F56c6c;
		padding: 7rpx 10rpx;
		border-radius: 15rpx;
		color: #F56c6c;
	}
	
	.del{
		float: right;
	}
	.bu{
		padding:  10px 10vw;
		color: #444;
	}
</style>
