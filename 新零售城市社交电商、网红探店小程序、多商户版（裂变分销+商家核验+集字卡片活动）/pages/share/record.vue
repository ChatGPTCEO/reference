<template>
	<view>
		<view class='commission-details'>
			<view class='promoterHeader bg-color'>
				<view class='headerCon acea-row row-between-wrapper'>
					<view>
						<view class='name'>{{name}}</view>
						<view class='money' v-if="recordType == 1">￥<text class='num'>{{userInfo.total_extract}}</text></view>
						<view class='money' v-if="recordType == 2">￥<text class='num'>{{userInfo.brokerage_price}}</text></view>
					</view>
					<view>
            <u-icon name="rmb-circle" size="100" color="rgba(0,0,0,0.6)"></u-icon>
          </view>
				</view>
			</view>
			<view class='sign-record' v-if="type==1">
				<block v-for="(item,index) in recordList" :key="index" v-if="recordList.length>0">
					<view class='list'>
						<view class='item'>
							<!-- <view class='data'>{{item.create_time}}</view> -->
							<view class='listn'>
								<view class='itemn acea-row row-between-wrapper'>
									<view>
										<block v-if="item.status>=0">
											<view class='name line1' v-if="item.extract_type == 0">银行卡提现({{item.status ==0 ? '审核中':'提现成功'}})</view>
											<view class='name line1' v-if="item.extract_type == 2">微信提现({{item.status ==0 ? '审核中':'提现成功'}})</view>
											<view class='name line1' v-if="item.extract_type == 1">支付宝提现({{item.status ==0 ? '审核中':'提现成功'}})</view>
										</block>
										<block v-else>
											<view class='name line1' style="color: red;">提现失败</view>
										</block>
										<view class="small">{{item.create_time}}</view>
									</view>
									<view class='num' v-if="item.status>=0">-{{item.extract_price}}</view>
									<view class='num font-color' v-else>提现金额：{{item.extract_price}}</view>
									
									</view>
							</view>
						</view>
					</view>
				</block>
        <view class="u-padding-30"v-if="recordList.length == 0">
          <u-empty src="/static/empty-box.png" text="暂无提现记录~" icon-size="414" margin-top="50"></u-empty>
        </view>
			</view>
			<view class='sign-record' v-if="type==2">
				<block v-for="(item,index) in recordList" :key="index" v-if="recordList.length>0">
					<view class='list'>
						<view class='item'>
							<!-- <view class='data'>{{item.create_time}}</view> -->
							<view class='listn'>
								<view class='itemn acea-row row-between-wrapper'>
									<view>
											<view class='name line1'>{{item.title}}</view>
										

										<view>{{item.create_time}}</view>
									</view>
									<view class='num' v-if="item.pm==0">-{{item.number}}</view>
									<view class='num font-color' v-else>+{{item.number}}</view>
								
								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="recordList.length == 0">
          <u-empty src="/static/empty-box.png" text="暂无提现记录~" icon-size="414" margin-top="50"></u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				name: '',
				type: 0,
				page: 1,
				limit: 8,
				recordList: [],
				recordType: 0,
				recordCount: 0,
				status: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				extractCount: 0,
				userInfo:''
			};
		},
		onLoad(options) {
      this.type = options.type;
		},
		onShow: function() {
			let type = this.type;
			
			if(type == 2){
				uni.setNavigationBarTitle({
					title: "佣金记录"
				});
				this.name = '佣金明细';
				this.recordType = 2;
			}
			if(type == 1){
				uni.setNavigationBarTitle({
					title: "提现记录"
				});
				this.name = '提现总额';
				this.recordType = 1;
			}
			this.spreadInfo();
			this.getRecordList();
			// this.getRecordListCount();
		},
		methods: {
			
			getstatus(status){
				if(status ==-1)
					return '未通过'
				else if(status ==-1)
					return '审核中'
				else if(status ==1)
					return '已提现'
			},
			
			spreadInfo(){
				this.$u.get('/api/user/spread_info').then(res => {
					this.userInfo = res.data
				});
			},
			getRecordList: function() {
				let that = this;
				let page = that.page;
				let limit = that.limit;
				let status = that.status;
				let recordType = that.recordType;
				let recordList = that.recordList;
				let recordListNew = [];
				if (status == true) return;
        let url = '/api/user/extract/lst'
        if (this.type == 1) {
          url = '/api/user/extract/lst'
        } else if (this.type == 2) {
          url = '/api/user/brokerage_list'
        }
        this.$u.get(url, {
          page: page,
          limit: limit
        }).then(res => {
          let len = res.data.list.length;
          let recordListData = res.data.list;
          recordListNew = recordList.concat(recordListData);
          that.status = limit > len;
          that.page+=1;
          that.$set(that, 'recordList', recordListNew);
        });
			},
			getRecordListCount: function() {
				let that = this;
				this.$u.get('/api/commission').then(res => {
					that.recordCount = res.data.commissionCount;
					that.extractCount = res.data.extractCount;
				});
			}
		},
		onReachBottom: function() {
			this.getRecordList();
		}
	}
</script>

<style scoped lang="scss">
	.commission-details .promoterHeader .headerCon .money {
		font-size: 36rpx;
	}

	.commission-details .promoterHeader .headerCon .money .num {
		font-family: 'Guildford Pro';
	}
  .promoterHeader .headerCon{padding:0 88rpx 20rpx 55rpx;}
  .promoterHeader .headerCon .name{margin-bottom:10rpx;}
  .promoterHeader .headerCon .num{font-size:50rpx;}
  .promoterHeader .headerCon .iconfont{font-size:125rpx;}
  .listn {
    padding: 0 $gutter;
    .itemn  {
      padding: $gutter 0;
    }
    .small {
      font-size: 20rpx;
      color: #999;
    }
  }
</style>
