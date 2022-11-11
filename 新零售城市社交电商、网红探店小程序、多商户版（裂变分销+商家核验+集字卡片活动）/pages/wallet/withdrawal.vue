<template>
	<view>
    <view class="">
      <u-cell-group>
        <u-cell-item title="提现至" :title-style="titleStyle" center @click="showPayType = true">
          <view class="pay-ment">
            <u-icon 
              :name="nowPay.icon" 
              :label="nowPay.label" 
              size="48" 
              :color="nowPay.color" 
              label-size="28">
            </u-icon>
          </view>
        </u-cell-item>
        <template v-if="nowPay.value != 0">
          <u-cell-item title="提现账号" :title-style="titleStyle" center hover-class="none" :arrow="false">
            <view class="wechat-account">
              <u-input v-model="account" input-align="right" placeholder="请输入提现账号" :clearable="false"></u-input>
            </view>
          </u-cell-item>
        </template>
        <template v-else>
          <u-cell-item title="持卡人" :title-style="titleStyle" center hover-class="none" :arrow="false">
            <view class="wechat-account">
              <u-input v-model="card.name" input-align="right" placeholder="请输入持卡人" :clearable="false"></u-input>
            </view>
          </u-cell-item>
          <u-cell-item title="卡号" :title-style="titleStyle" center hover-class="none" :arrow="false">
            <view class="wechat-account">
              <u-input v-model="card.account" input-align="right" placeholder="请输入卡号" :clearable="false"></u-input>
            </view>
          </u-cell-item>
          <u-cell-item title="银行" :title-style="titleStyle" center hover-class="none" :arrow="false">
            <view class="wechat-account">
              <u-input v-model="card.bank" input-align="right" placeholder="请选择银行" type="select"
                @click="showSeltBank = true">
              </u-input>
            </view>
          </u-cell-item>
        </template>
        <u-cell-item title="提现金额" :arrow="false" :title-style="titleStyle">
          <view class="symbol-amount" slot="label">
            <text class="text-symbol">¥</text>
            <view class="input-num">
              <input type="number"  v-model="amount" class="input-box" />
            </view>
          </view>
        </u-cell-item>
      </u-cell-group>
    </view>
    <view class="amount-all">
      <text>可提现余额: ¥{{ Number(maxAmount).toFixed(2) }}</text>
      <text class="link-color" @click="amount = maxAmount">全部提现</text>
    </view>
		<view class="u-padding-40">
			<u-button 
        :disabled="!Number(amount)"
        type="warning" 
        :custom-style="{color: '#333 !important'}" 
        @click="showPop(true)">
        确认提现
			</u-button>
		</view>		
    
    <!-- 选择提现方式 -->
    <u-popup v-model="showPayType" mode="bottom" length="36%" border-radius="20" closeable>
      <view>
        <view class="paytype-title">
          <text>选择提现方式</text>
        </view>
        <view class="">
          <u-cell-group>
          	<u-cell-item 
              v-for="(item, index) in drawList" :key="index"
              :icon="item.icon" 
              :title="item.label" icon-size="60"
              :icon-style="{color: item.color}"
              @click="onSeletPay(item)">
            </u-cell-item>
          </u-cell-group>
        </view>
      </view>
    </u-popup>
    <!-- select bank -->
    <u-select label-name="name" value-name="name" v-model="showSeltBank" :list="bankList" 
      @confirm="onSeletBank"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        card: {
          name: '',
          account: '',
          bank: ''
        },
        bankList: [],
        showSeltBank: false,
        drawList: [
          {
            icon: 'weixin-circle-fill',
            color: 'green',
            label: '微信提现',
            value: 2
          },
          {
            icon: 'zhifubao-circle-fill',
            color: '#3B75FB',
            label: '支付宝提现',
            value: 1
          },
          {
            icon: 'coupon-fill',
            color: '#f29100',
            label: '银行卡提现',
            value: 0
          }
        ],
        nowPay: {
          icon: 'weixin-circle-fill',
          color: 'green',
          label: '微信提现',
          value: 2
        },
        showPayType: false,
        maxAmount: 0,
        amount: '',
        account: '',
				show:false,
				password:'',
        titleStyle: {
          fontSize: '36rpx',
          color: '#333'
        },
        type: 0
			}
		},
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
		onLoad(options) {
			this.type = options.type
      if (this.type == 0) {
        uni.setNavigationBarTitle({
          title: '佣金提现'
        })
        this.queryMaxAmount()
      } else {
        this.maxAmount = this.userInfo.now_money
      }
      if (this.nowPay.value == 0) {
        this.getBankList()
      }
		},
		methods: {
      getBankList () {
        this.$u.get('/api/user/extract/banklst')
        .then(({ data }) => {
          this.bankList = data
          this.card.bank = data[0].name
        })
      },
      onSeletBank (e) {
        this.card.bank = e[0].value
      },
      onSeletPay (item) {
        this.nowPay = item
        this.showPayType = false
        if (this.nowPay.value == 0) {
          this.getBankList()
        }
      },
      // 查询最大提现金额
      queryMaxAmount () {
        this.$u.get('/api/user/spread_info')
        .then(({ data }) => {
          this.maxAmount = Number(data.brokerage_price)
        })
      },
			onChange(val){
				if(this.password.length<6){
					this.password += val;
				}
				
				if(this.password.length>=6){
          this.pay();
				}
			},
			onBackspace(e){
				if(this.password.length>0){
					this.password = this.password.substring(0,this.password.length-1);
				}
			},
			pay(){
        uni.showLoading({
          title:'提现中'
        })
        if (isNaN(Number(this.amount))) {
          return uni.showToast({
            title: '请输入数字!',
            icon: 'none'
          })
        }
        let params = {}
        switch (this.nowPay.value) {
          case 0: // 银行卡
          params = {
            bank_code: this.card.account,
            bank_name: this.card.bank,
            real_name: this.card.name
          }
          break; 
          case 1: // 支付宝
          params = {
            alipay_code: this.account
          }
          break;
          case 2: // 微信
          params = {
            wechat: this.account
          }
          break;
        }
        this.$u.post('/api/user/extract/create', {
          ...params,
          extract_price: Number(this.amount),
          extract_type: this.nowPay.value
        }).then((res) => {
          uni.hideLoading();
          this.show = false;
          uni.showToast({
            icon:'success',
            title: res.message || '申请成功'
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        })
			},
			showPop(flag = true){
        if (this.amount > this.maxAmount) {
          uni.showToast({
            title: '余额不足!',
            icon: 'none'
          })
        } else {
          this.password = '';
          this.show = flag;
          if (this.account) {
            this.pay();
          } else {
            uni.showToast({
              title: '请输入提现帐号',
              icon: 'none'
            })
          }
        }
			},
			finish(){
			}
		}
	}
</script>

<style lang="scss">
	.money{
		font-size: 80rpx;
		color: $u-type-warning;
		position: relative;
		
		.close{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			line-height: 28rpx;
			font-size: 28rpx;
		}
	}
	.tips{
		color:$u-tips-color;
	}
  .wechat-account {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 380rpx;
    margin-left: auto;
  }
  .pay-ment {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 200rpx;
    margin-left: auto;
  }
  .symbol-amount {
    display: flex;
    align-items: flex-end;
    padding-top: 20rpx;
    .text-symbol {
      font-size: 36rpx;
      color: #333;
      font-weight: bold;
      padding-bottom: 12rpx;
    }
    .input-num {
      flex: 1;
      width: 100%;
      padding-left: $gutter;
      .input-box {
        width: 100%;
        font-size: 48rpx;
        color: #000;
      }
    }
  }
  .amount-all {
    padding: 20rpx 40rpx 0;
    color: red;
    .link-color {
      color: #3B75FB;
      margin: 0 10rpx;
    }
  }
  .paytype-title {
    position: relative;
    text-align: center;
    padding: 26rpx 0;
    font-size: 32rpx;
    font-weight: bold;
  }
  .orange-m {
    color: #f29100;
  }
</style>