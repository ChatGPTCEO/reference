<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="backText"></view>
            <view slot="content">下单</view>
        </cu-custom>
        <view class="container">
            <form @submit="formSubmit">
                <view class="cu-list menu margin border-radius">
                    <block v-if="type == '1'">
                        <view class="cu-form-group white">
                            <textarea
                                maxlength="-1"
                                name="name"
                                @blur="textareaAInput"
                                :placeholder="form.showText ? '' : sysparment.qu_tips"
                                :value="form.showText ? form.showText : ''"
                            ></textarea>
                        </view>

                        <view class="cu-form-group white padding-top-sm border-bottom-radius">
                            <!-- <view>上传</view> -->
                            <view class="col-2 grid-square flex-sub">
                                <view class="up_text">上传图片</view>
                                <view style="width: 100%">
                                    <addImage :count="count" :images="images" :addedCount="addedCount" @chooseImage="chooseImages" @deleteImage="deleteImage"></addImage>
                                </view>
                                <view class="bg-img" @tap="ViewImage" :data-url="t_pic[index]" v-for="(item, index) in t_pic" :key="index">
                                    <image :src="t_pic[index]" mode="aspectFill"></image>

                                    <!-- <view class="cu-tag bg-red" catchtap="DelImg" data-type="t_pic" data-index="{{index}}">
								<text class="cuIcon-close"></text>
							</view> -->
                                </view>
                                <view class="del_remark">*长按图片可进行删除</view>

                                <!-- <view class="solids " bindtap="ChooseImage" data-type="t_pic">
							<text class="cuIcon-add adds"></text>
							<view style='margin-top:10rpx;margin-left:10rpx;'></view>
						</view> -->
                            </view>
                        </view>

                        <view class="cu-item arrow margin-top border-radius">
                            <view class="content">
                                <image class="icons" src="/static/images/quicon.png"></image>
                                <!-- <text class="cuIcon-title text-green"></text> -->
                                <text class="text-sm">在哪里取件</text>
                                <text class="text-sm text-yellow">(必填)</text>
                            </view>
                            <view class="action flex right-bt">
                                <picker @change="pointChange" range-key="title" :value="point_index" :range="point" class="point">
                                    <view class="picker text-orange text-sm">
                                        {{ !point[point_index].title ? '暂无可选快递点' : point[point_index].title }}
                                        <!-- {{point[point_index].name}} -->
                                    </view>
                                </picker>
                                <!-- <view class="text-grey text-xs text-cut">{{buyaddress.address?buyaddress.address:'暂无'}}</view> -->
                                <!-- <text class="cuIcon-locationfill text-orange"></text> -->
                            </view>
                        </view>
                        <view class="cu-item arrow" @tap="handleshaddress">
                            <view class="content">
                                <image class="icons" src="/static/images/send.png"></image>
                                <!-- <text class="cuIcon-title text-yellow"></text> -->
                                <text class="text-sm">送到哪里去</text>
                                <text class="text-sm text-yellow">(必填)</text>
                            </view>
                            <view class="action right-bt point flex">
                                <text class="text-grey text-sm">{{ !form.a_addres ? '暂无' : form.a_addres }}</text>
                                <text class="cuIcon-locationfill text-orange"></text>
                            </view>
                        </view>
                        <!-- <view class="cu-form-group">
                    <textarea bindblur="textareaAInputbuyaddress" placeholder="{{buyaddress.address?'':'在哪里取件？ 示例：xxx食堂xx商店 或xx门口xxx 外卖'}}"></textarea>
                </view> -->
                    </block>

                    <!-- <block wx:if="{{form.type=='2'}}">
				<view class="cu-form-group">
					<textarea maxlength="-1" name="name" bindblur="textareaAInput" placeholder="{{form.showText?'':'将收件人所需信息输入此处，示例：张三 1234567780(必填）旺旺号，订单号，原因（按需求填写）（寄件人信息默认为发单者信息，如有特殊要求可此说明）'}}" value='{{form.showText?form.showText:""}}'></textarea>
				</view>
				<view class="cu-item arrow margin-top" bindtap='onSelectBuyAddress'>
					<view class='content'>
						<text class="cuIcon-title text-green"></text>
						<text class="text-sm">在哪里取件</text>
						<text class="text-sm text-yellow">(非必填)</text>
					</view>
					<view class='action flex right-bt'>
						<view class="text-grey text-xs text-cut">{{buyaddress.address?buyaddress.address:'暂无'}}</view>
						<text class="cuIcon-locationfill text-orange"></text>
					</view>
				</view>
			

				<view class="cu-item arrow" bindtap='handleshaddress'>
					<view class='content'>
						<text class="cuIcon-title text-yellow"></text>
						<text class="text-sm">要寄到哪里</text>
						<text class="text-sm text-yellow">(必填)</text>
					</view>
					<view class='action'>
						<text class="text-grey text-xs">{{!form.a_name?'暂无':form.a_name}}</text>
						<text class="cuIcon-locationfill text-orange"></text>
					</view>
				</view>
			</block> -->
                    <block v-if="type == '2'">
                        <view class="cu-form-group white">
                            <textarea
                                maxlength="-1"
                                name="name"
                                @blur="textareaAInput"
                                :placeholder="form.showText ? '' : sysparment.ji_tips"
                                :value="form.showText ? form.showText : ''"
                            ></textarea>
                        </view>
                        <view class="cu-item arrow margin-top border-radius" @tap="onSelectBuyAddress">
                            <view class="content">
                                <image class="icons" src="/static/images/jiicon.png"></image>
                                <!-- <text class="cuIcon-title text-green"></text> -->
                                <text class="text-sm">要寄到哪里</text>
                                <text class="text-sm text-yellow">(必填)</text>
                            </view>
                            <view class="action flex right-bt">
                                <view class="text-grey text-df text-cut">{{ buyaddress.address ? buyaddress.address : '暂无' }}</view>
                                <text class="cuIcon-locationfill text-orange"></text>
                            </view>
                        </view>

                        <view class="cu-item arrow" @tap="handleshaddress">
                            <view class="content">
                                <image class="icons" src="/static/images/quicon.png"></image>
                                <!-- <text class="cuIcon-title text-yellow"></text> -->
                                <text class="text-sm">在哪里取件</text>
                                <text class="text-sm text-yellow">(必填)</text>
                            </view>
                            <view class="action right-bt point flex">
                                <text class="text-grey text-df">{{ !form.a_name ? '暂无' : form.a_name }}</text>
                                <text class="cuIcon-locationfill text-orange"></text>
                            </view>
                        </view>
                    </block>
                    <block v-if="type == '3'">
                        <view class="cu-form-group white">
                            <textarea
                                maxlength="-1"
                                name="name"
                                @blur="textareaAInput"
                                :placeholder="form.showText ? '' : sysparment.shi_tips"
                                :value="form.showText ? form.showText : ''"
                            ></textarea>
                        </view>
                        <!-- <view style="background: white; margin-top: 20rpx; padding-top: 10rpx">
                            <view class="text-sm margin-top choose" @tap="foold">
                                <text class="cuIcon-add text-xl"></text>
                                选择商家和商品
                            </view>
                        </view> -->
                        <view class="cu-items" v-for="(item, index) in goods_det" :key="index">
                            <view class="detals">
                                {{ item.store_name }} - {{ item.cate_name }} - {{ item.goods_name }} - {{ item.nums }}份 -
                                <span style="color: red">{{ item.sum_price }}元</span>
                            </view>
                        </view>
						
                        <!-- <view class="cu-form-group">
                    <textarea bindblur="textareaAInputbuyaddress" placeholder="{{buyaddress.address?'':'在哪里购买？ 示例：xxx食堂xx商店 或xx门口xxx 外卖'}}"></textarea>
                </view> -->

                        <view class="cu-item arrow" @tap="handleshaddress">
                            <view class="content">
                                <image class="icons" src="/static/images/send.png"></image>
                                <!-- <text class="cuIcon-title text-yellow"></text> -->
                                <text class="text-sm">送到哪里去</text>
                                <text class="text-sm text-yellow">(必填)</text>
                            </view>
                            <view class="action right-bt point flex">
                                <text class="text-grey text-sm">{{ !form.a_addres ? '暂无' : form.a_addres }}</text>
                                <text class="cuIcon-locationfill text-orange"></text>
                            </view>
                        </view>
                    </block>

                    <block v-if="type == '4'">
                        <view class="" style="padding: 20rpx 30rpx 0; background: white">
                            <input @input="titleFun" :value="title" class="input" placeholder="请输入服务标题" style="background: #f9f9f9" />
                        </view>
                        <view class="cu-form-group white">
                            <textarea
                                maxlength="-1"
                                name="name"
                                @blur="textareaAInput"
                                :placeholder="form.showText ? '' : sysparment.wan_tips"
                                :value="form.showText ? form.showText : ''"
                            ></textarea>
                        </view>
                        <!--                 <view class="cu-item arrow margin-top" bindtap='onSelectBuyAddress'>
                    <view class='content'>
                        <text class="cuIcon-title text-green"></text>
                        <text class="text-sm">地点在哪里</text>
                        <text class="text-sm text-yellow">(必填)</text>
                    </view>
                    <view class='action flex right-bt'>
                        <view class="text-grey text-xs text-cut">{{buyaddress.address?buyaddress.address:'暂无'}}</view>
                        <text class="cuIcon-locationfill text-orange"></text>
                    </view>
                </view> -->
                        <!--  <view class="cu-form-group">
                    <textarea bindblur="textareaAInputbuyaddress" placeholder="{{buyaddress.address?'':'在哪里代拿？ 示例：xxx食堂xx商店 或xx门口xxx 外卖'}}"></textarea>
                </view> -->

                        <view class="cu-item arrow margin-top border-radius" @tap="handleshaddress" v-if="sysparment.is_address_show == 1">
                        <!-- <view class="cu-item arrow margin-top" @tap="handleshaddress"> -->
                            <view class="content">
                                <image class="icons" style="width: 1.2em !important" src="/static/images/address.png"></image>
                                <text class="text-sm">地址</text>
                                <text class="text-sm text-yellow">({{ sysparment.is_address_must == 1 ? '' : '非' }}必填)</text>
                            </view>
                            <view class="action">
                                <text class="text-grey text-sm">{{ !form.a_addres ? '暂无' : form.a_addres }}</text>
                                <text class="cuIcon-locationfill text-orange"></text>
                            </view>
                        </view>
                        <view class="cu-item arrow  " @tap="uploadfile" v-if="sysparment.is_attach_show == 1">
                        <!-- <view class="cu-item arrow margin-top border-radius" @tap="uploadfile"> -->
                            <view class="content">
                                <text class="text-sm">附件上传</text>
                                <text class="text-xs text-yellow" style="font-size: 28rpx !important">(仅限doc,docx,pdf,建议1M以内)</text>
                            </view>
                            <view class="action">
                                <text class="text-grey text-sm" v-if="attach_file">已上传</text>
                                <text class="text-grey text-sm" v-else>待上传</text>
                            </view>
                        </view>
                        <view class="cu-item arrow" v-if="sysparment.is_servicetime_show == 1">
                        <!-- <view class="cu-item arrow"> -->
                            <view class="content">
                                <text class="text-sm">服务时间</text>
                            </view>
                            <view class="action">
                                <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="tlist">
                                    <view class="picker text-orange text-sm">{{ tlist[0][multiIndex[0]] }}, {{ tlist[1][multiIndex[1]] }}</view>
                                </picker>
                            </view>
                        </view>
                        <view class="cu-item" v-if="sysparment.is_servicenum_show == 1">
                            <view class="content">
                                <text class="text-sm">服务人数</text>
                            </view>
                            <view class="action">
                                <input
                                    type="number"
                                    style="width: 300rpx"
                                    @input="service_numFun"
                                    class="text-right text-sm text-grey"
                                    placeholder-class="text-grey"
                                    placeholder="请输入服务人数"
                                />
                            </view>
                        </view>
                    </block>
                    <block v-else>
                        <view class="cu-item arrow border-bottom-radius">
                            <view class="content">
                                <text class="text-sm">送达时间</text>
                            </view>
                            <view class="action">
                                <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="tlist">
                                    <view class="picker text-orange text-sm">{{ tlist[0][multiIndex[0]] }}, {{ tlist[1][multiIndex[1]] }}</view>
                                </picker>
                            </view>
                        </view>
                    </block>

                    <view class="cu-item arrow margin-top border-radius" v-if="type == '1' || type == '2' || type == '3'">
                        <view class="content">
                            <text class="text-sm">物品重量/大小</text>
                        </view>
                        <view class="action">
                            <picker @change="PickerChange" :value="index" :range="weight" data-index="weightindex" data-range="weight">
                                <view class="picker text-grey text-sm">
                                    {{ weight[weightindex] }}
                                </view>
                            </picker>
                        </view>
                    </view>
                    <view class="cu-item" v-if="type == '1' || type == '2'">
                        <view class="content">
                            <text class="text-sm">快递数量</text>
                        </view>
                        <view class="action flex">
                            <view class="text-lg num_cut" :style="express_num == 1 ? 'background:#F2F2F2' : ''" v-if="express_num==1">-</view>
                            <view class="text-lg num_cut" :style="express_num == 1 ? 'background:#F2F2F2' : ''" v-else @tap="numCut">-</view>
                            <view class="text-lg margin-left margin-right" style="line-height: 60rpx">{{ express_num }}</view>
                            <view class="text-lg num_add" @tap="numAdd">+</view>
                            <!-- <picker bindchange="PickerChange" value="{{index}}" range="{{weight}}" data-index='weightindex' data-range='weight'>
						<view class="picker text-grey text-sm">
							{{weight[weightindex]}}
						</view>
					</picker> -->
                        </view>
                    </view>
                    <view class="cu-item arrow">
                        <view class="content">
                            <text class="text-sm">抢单限制</text>
                        </view>
                        <view class="action">
                            <picker @change="PickerChange" :value="sexindex" data-index="sexindex" data-range="sex" :range="sex">
                                <view class="picker text-sm text-grey">
                                    {{ sex[sexindex] }}
                                </view>
                            </picker>
                        </view>
                    </view>

                    <view class="cu-item arrow border-bottom-radius" @tap="timeModalFun" data-target="timeModal">
                        <view class="content">
                            <text class="text-sm">订单自动取消</text>
                        </view>
                        <view class="action">
                            <view class="text-grey text-sm" v-if="!form.out_time_num">暂无</view>
                            <view class="text-grey text-sm" v-if="form.out_time_num">
                                下单后
                                <text class="text-orange">{{ form.out_time_num }}小时</text>
                                未接单
                            </view>
                        </view>
                    </view>

                    <view class="cu-item arrow margin-top border-radius" @tap="handlescupon">
                        <view class="content">
                            <text class="text-sm">优惠券</text>
                        </view>
                        <view class="action">
                            <text class="text-grey text-sm">{{ !form.co_title ? '暂无' : form.co_title }}</text>
                        </view>
                    </view>

                    <!-- <view class="cu-item arrow " bindtap="showModal" data-target="ChooseModal"> -->
                    <view class="cu-item arrow border-bottom-radius" @tap="showModal" data-target="ChooseModal">
                        <view class="content">
                            <text class="text-sm">费用</text>
                        </view>
                        <view class="action">
                            <text class="text-grey text-sm">{{ form.total == 0 ? '暂无' : '¥' + form.total + '元' }}</text>
                        </view>
                    </view>

                    <!-- <view class="cu-item arrow margin-top" bindtap="showModal" data-target="ygpice" wx:if="{{form.type=='3' || form.type=='4'}}"> -->
                    <!-- <view class="cu-item arrow margin-top" data-target="ygpice" wx:if="{{form.type=='3' || form.type=='4'}}"> -->
                    <!-- <view class="cu-item arrow margin-top" data-target="ygpice" wx:if="{{form.type=='3'}}"> 
				<view class='content'>
					<text class="text-sm">骑手垫付商品费，收货后与骑手结清</text>
				</view>
				<view class='action'>
					<text class="text-grey text-xs">{{!form.guess_prcie?'预估商品费':'¥'+form.guess_prcie}} </text>
					<text class="text-grey text-xs">{{total_prices}}元</text> 
				</view>
			</view> -->
                </view>

                <view :class="'cu-modal bottom-modal ' + (timeModal ? 'show' : '')">
                    <view class="cu-dialog" catchtap>
                        <view class="cu-bar bg-white">
                            <view class="action" style="color: black" @tap="timeHide" data-type="1">取消</view>
                            <view class="action text-m text-df" @tap="timeHide" data-type="2">确定</view>
                        </view>

                        <view class="padding-xl">
                            <view class="margin text-center text-green text-lg">{{ out_time }}小时</view>
                            <slider @change="sliderchange" min="1" max="2" show-value />
                        </view>
                    </view>
                </view>

                <view :class="'cu-modal bottom-modal ' + (modalName == 'ChooseModal' ? 'show' : '')" @tap="hideModal">
                    <view class="cu-dialog" catchtap>
                        <view class="cu-bar bg-white">
                            <view class="action" style="color: black" @tap="hideModals">取消</view>
                            <view class="action text-m text-df" @tap="hideModal">确定</view>
                        </view>
                        <!-- <view class="grid col-3 padding-sm">
					<view wx:for="{{checkbox}}" class="padding-xs" wx:key="{{index}}">
						<button class="cu-btn orange lg block {{item.checked?'bg-orange':'line-orange'}}" bindtap="ChooseCheckbox" data-index="{{index}}" data-value="{{item.value}}"> {{item.name}}元
							<view class="cu-tag sm round {{item.checked?'bg-white text-orange':'bg-orange'}}" wx:if="{{item.hot}}">HOT</view>
						</button>
					</view>
				</view> -->

                        <view class="padding-xl">
                            <view class="cu-form-group">
                                <view class="title">其他金额</view>
                                <input placeholder="点击此处输入金额" type="digit" :value="custom" @input="totalchange" />
                            </view>
                        </view>
                    </view>
                </view>

                <view :class="'cu-modal bottom-modal ' + (modalName == 'ygpice' ? 'show' : '')">
                    <view class="cu-dialog">
                        <view class="cu-bar bg-white">
                            <view class="action text-grey" @tap="hideModal">取消</view>
                            <view class="action text-main text-df" @tap="confinModal" data-target="ygpice">确定</view>
                        </view>
                        <view class="padding-xl">
                            <view class="prefee-tips padding-xl">供骑手代购时参考（可选填）</view>
                            <view class="cu-form-group">
                                <view class="title">预估￥</view>
                                <input placeholder="" type="number" @input="guess_prcieAInput" name="price" />
                            </view>
                        </view>
                    </view>
                </view>

                <view :class="'cu-modal bottom-modal ' + (modalName == 'cupon' ? 'show' : '')">
                    <view class="cu-dialog">
                        <view class="cu-bar bg-white">
                            <view class="action text-grey" @tap="hideModal">取消</view>
                            <view class="action text-main text-df" @tap="confinModal" data-target="cupon">确定</view>
                        </view>
                        <view class="padding-xl">
                            <view class="prefee-tips padding-xl">供骑手代购时参考（可选填）</view>
                            <view class="cu-form-group">
                                <view class="title">预估￥</view>
                                <input placeholder="" name="addres" :value="form.addres" />
                            </view>
                        </view>
                    </view>
                </view>

                <view :class="'cu-modal bottom-modal ' + (modalName == 'tips' ? 'show' : '')">
                    <view class="cu-dialog">
                        <view class="cu-bar bg-white">
                            <view class="action text-grey" @tap="hideModal">取消</view>
                            <view class="action text-main text-df" @tap="confinModal" data-target="tips">确定</view>
                        </view>
                        <view class="padding-xl">
                            <view class="prefee-tips padding-xl">小费 ¥{{ form.fee }}元</view>
                            <slider @change="onChangeTips" class="slide-line" :max="form.maxfee" :min="form.minfee" step="1"></slider>
                            <view class="slide-line-bottom">
                                <text class="left">
                                    <text class="left-label">{{ form.minfee }}元</text>
                                </text>
                                <text class="right">
                                    <text class="right-label">{{ form.maxfee }}元</text>
                                </text>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="cu-tabbar-height"></view>
				<view style="position: fixed;width: 90%;bottom: 10rpx;left: 5%;" class="flex">
					<view class="money_box">
						实际金额：￥
						<text class="text-white money text-xl" v-if="userInfo.is_vip == 1">{{ my.tofixed(form.total - y_money + total_prices - form.MinRunPrice) }}</text>
						<text class="text-white money text-xl" v-else>{{ my.tofixed(form.total - y_money + total_prices) }}</text>
					</view>
					<button class="cu-btn btn_bg" form-type="submit">确认提交</button>
				</view>
                <!-- <view class="cu-bar bg-white foot border shop">
                    <view class="pay">
                        实付款
                        <text class="text-orange">￥</text>
                        <text class="text-orange money" v-if="userInfo.is_vip == 1">{{ my.tofixed(form.total - y_money + total_prices - form.MinRunPrice) }}</text>
                        <text class="text-orange money" v-else>{{ my.tofixed(form.total - y_money + total_prices) }}</text>
                    </view>
                    <view class="" form-type="submit">
                        <button class="cu-btn lg btn_bg" form-type="submit">立即支付</button>
                    </view>
                </view> -->
                <!-- <view class="submit margin-top">
            <view class="padding flex flex-direction">
                <button class="cu-btn bg-yellow lg round" form-type="submit">立即支付 ¥{{form.total}}元</button>
            </view>
        </view> -->
            </form>
        </view>
    </block>
</template>
<script module="my" lang="wxs">
var tofixed = function(str) {
if(str =='NaN'){
		return 0;
}else{
		var pick = parseFloat(str).toFixed(2);
		console.log(pick);
  		return pick;
}

}
module.exports.tofixed = tofixed
</script>
<script>
import addImage from '@/colorui/components/upload/upload';
import siteInfo from '@/siteinfo.js';
var app = getApp();
export default {
    components: {
        addImage
    },
    data() {
        return {
            openid: '',
            usernick: '',
            img: '',
            longitude: '',
            latitude: '',
            address: '',
            tlist: [],
            images: [],
            count: 3,
            addedCount: 0,
            picList: [],

            school: [
                {
                    s_name: '2'
                }
            ],

            // weight: ['小于5斤', '5~10斤', '10~20斤', '20~50斤', '50斤以上（免谈）'],
            weight: [],

            sex: ['不限性别','限男生', '限女生'],
            multiIndex: [0, 0],
            schoolInfo: {},
            weightindex: 0,
            sexindex: 0,
            cuponlist: [],

            buyaddress: {
                address: false
            },

            checkbox: [
                {
                    value: 2,
                    name: '2',
                    checked: false,
                    hot: false
                },
                {
                    value: 3,
                    name: '3',
                    checked: false,
                    hot: true
                },
                {
                    value: 4,
                    name: '4',
                    checked: false,
                    hot: false
                },
                {
                    value: 5,
                    name: '5',
                    checked: false,
                    hot: false
                },
                {
                    value: 6,
                    name: '6',
                    checked: false,
                    hot: false
                }
            ],

            form: {
                out_time_num: 1,
                minfee: 0,
                maxfee: 100,
                fee: 0,
                type: 1,
                showText: '',
                total: 0,
                a_id: -1,
                a_addres: false,
                a_name: false,
                co_title: false,
                addres: '',
                MinRunPrice: 0
            },

            y_money: 0,
            goods_det: [],
            good_details: 0,
            total_prices: '',

            userInfo: {
                is_vip: 0
            },

            point_index: 0,
            point: {},
            unit_price: 0,
            qu_id: 0,
            custom: '',
            timeModal: false,
            out_time: 1,

            sysparment: {
                qu_tips: '',
                ji_tips: '',
                shi_tips: '',
                wan_tips: '',
                is_address_show: 0,
                is_address_must: 0,
                is_attach_show: 0,
                is_servicetime_show: 0,
                is_servicenum_show: 0
            },

            module_id: '',
            attach_file: '',
            is_click: true,
            extra_price: 0,
            express_num: 1,
            service_num: 0,
            title: '',
            extra_jian_price: 0,
            modalName: '',
            showsfzupload: false,
            t_pic: '',
			testtype:'',
			type:0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('传递的值', options);
		// options.type ? options.type : 1
		this.testtype = options.type
		this.type = options.type
        console.log('ghfghghfs', options);
        this.setData({
            module_id: options.id
        });
		console.log('type值是', options.type);
		// var forms = this.form
		// this.form.type = options.type
        // this.setData({
            // form:this.form
        // });
		this.getTimeList();
        this.getDefaultPrice();
        this.getconfig();
		if(uni.getStorageSync('token'))
		{
			this.getuserInfo();
		}
		// this.form = forms
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        that.jise();
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        console.log('获取地址id', currPage.data);
		if(currPage.data.form.y_money)
		{
			var y_money = Number(currPage.data.form.y_money);
			console.log('33333', y_money);
			that.y_money = y_money
		}
        that.setData({
            
			form:currPage.data.form
        }); // that.a_id = currPage.data.id;
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {},
    methods: {
        foold: function (e) {
            uni.navigateTo({
                url: '../canteen/canteen'
            });
        },

        titleFun(e) {
            this.setData({
                title: e.detail.value.replace(/\s+/g, '')
            });
        },

        numCut() {
			if(Number(this.form.total) <= this.y_money)
			{
				app.globalData.util.message('不可再减少', '', 'error');
				return false;
			}
            if (this.express_num > 1) {
                var total = (Number(this.form.total) - Number(this.form.unit_price)).toFixed(2);
                var num = this.express_num;
                var extra_jian_prices = Number(Number(this.extra_jian_price) - Number(this.form.unit_price)).toFixed(2);
                var self = this;
                this.setData({
                    form: { ...self.form, total: total },
                    express_num: num - 1,
                    extra_jian_price: extra_jian_prices
                });
            }
        },

        numAdd() {
            var total = (Number(this.form.total) + Number(this.form.unit_price)).toFixed(2);
            var num = this.express_num;
            var extra_jian_prices = Number(Number(this.extra_jian_price) + Number(this.form.unit_price)).toFixed(2);
            var self = this;
            this.setData({
                form: { ...self.form, total: total },
                express_num: num + 1,
                extra_jian_price: extra_jian_prices
            });
        },
		
        async formSubmit(e) {
			await this.login().then((res)=>{
			    console.log("您已登陆！");
			})
            console.log('33333', e);
			console.log("地址id",this.form.a_id)
			console.log("地址id",this.form)
            if (!this.form.showText || this.form.showText.replace(/\s+/g, '') == '') {
                // if ((!this.data.form.showText) ) {
                app.globalData.util.message('请输入订单内容', '', 'error');
                return false;
            }

            if (this.form.total < this.y_money) {
                app.globalData.util.message('优惠卷不可用', '', 'error');
                return false;
            }

            if (this.type == 4) {
                if (!this.title) {
                    app.globalData.util.message('请输入服务标题', '', 'error');
                    return false;
                }
            }

            if (this.type == 4 && this.sysparment.is_servicenum_show == 1) {
                if (this.service_num <= 0) {
                    app.globalData.util.message('请输入服务人数', '', 'error');
                    return false;
                }
            }

            if (this.type !== 4) {
				if((this.type==3 && !this.buyaddress) || (this.type==2 && !this.buyaddress.address))
				{
					app.globalData.util.message('请选择地址', '', 'error');
					return false;
				}
            }

            if ((this.sysparment.is_address_show == 1 && this.sysparment.is_address_must == 1 && this.type == 4) || this.type != 4) {
                if (!this.form.a_id || this.form.a_id < 0) {
                    app.globalData.util.message('请选择地址', '', 'error');
                    return false;
                }
				if(this.form.a_s_id != uni.getStorageSync('schoolId'))
				{
					app.globalData.util.message('收货学校与所选项学校不符', '', 'error');
					return false;
				}
            }

            if (this.sysparment.is_attach_show == 1 && this.sysparment.is_attach_must == 1 && this.type == 4) {
                if (!this.attach_file) {
                    app.globalData.util.message('请上传附件', '', 'error');
                    return false;
                }
            }

            console.log('989898980', this.t_pic);

            if (!this.t_pic) {
                var img = '';
            } else {
                var img = this.t_pic[0];
            }
			
            app.globalData.issub = true;
			
			//食堂超市
            if (this.type == 3) {
                if (!this.good_details) {
                    app.globalData.util.message('请选择商品', '', 'error');
                    return false;
                }

                var self = this;

                if (self.is_click) {
                    self.setData({
                        is_click: false
                    });
                    app.globalData.util.request({
                        url: 'Order/helpBuyOrder',
                        data: {
							s_id:uni.getStorageSync('schoolId'),
                            food_money: this.form.guess_prcie,
                            express_num: this.express_num,
                            store_id: uni.getStorageSync('store_id'),
                            remarks: this.form.showText,
                            qu_latitude: this.buyaddress.location_x ? this.buyaddress.location_x : uni.getStorageSync('city').location.lng,
                            qu_longitude: this.buyaddress.location_y ? this.buyaddress.location_y : uni.getStorageSync('city').location.lat,
                            qu_addres: this.buyaddress.address,
                            weight: this.weight[this.weightindex],
                            sex_limit: this.sexindex,
                            start_time: this.tlist[0][this.multiIndex[0]] + ' ' + this.tlist[1][this.multiIndex[1]],
                            food_money: this.total_prices,
                            ...this.form,
                            sh_school: uni.getStorageSync('schoolId'),
                            openid: uni.getStorageSync('openid'),
                            out_time_num: this.form.out_time_num,
                            img: this.picList,
                            attach_file: '',
                            // img: img,
                            good_details: this.good_details
                        },

                        success(res) {
                            console.log('1111111', res);

                            if (res.data.msg == '下单成功，无需支付' || res.data.msg == '会员已抵扣') {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'loading',
                                    duration: 3000
                                });
                                app.globalData.util.request({
                                    url: 'MsgSubscribe/toAllRider',
                                    data: {
                                        ordersn: res.data.data.order.ordersn
                                    }
                                });
                                setTimeout(function () {
                                    uni.navigateTo({
                                        url: '/gc_school/pages/order/index?type=1'
                                    });
                                }, 2000);
                                uni.removeStorage({
                                    key: 'json'
                                });
                            } else {
                                console.log(res.data.data.ordersn);
                                uni.requestPayment({
                                    timeStamp: res.data.data.paydata.timestamp.toString(),
                                    nonceStr: res.data.data.paydata.nonceStr,
                                    package: res.data.data.paydata.package,
                                    signType: 'MD5',
                                    paySign: res.data.data.paydata.paySign,
                                    success: function (resu) {
                                        console.log('success');
                                        console.log(res.data.data);
                                        app.globalData.util.request({
                                            url: 'MsgSubscribe/toAllRider',
                                            data: {
                                                ordersn: res.data.data.order.ordersn
                                            }
                                        });
                                        setTimeout(function () {
                                            uni.navigateTo({
                                                url: '/gc_school/pages/order/index?type=1'
                                            });
                                        }, 2000);
                                    },
                                    fail: function (res) {
                                        console.log('fail');
                                    }
                                });
                            }
                        },

                        complete() {
                            self.setData({
                                is_click: true
                            });
                        } // fail(e) {
                        //     console.log('弹框1111', e)
                        // }
                    },true);
                } else {
                    uni.showToast({
                        title: '请勿重复点击',
                        icon: 'none'
                    });
                }
            } else {
				var url = this.type==1?'Order/takeExpressOrder':this.type==2?'Order/sendExpressOrder':'Order/universalOrder';
				console.log("结果",url)
                if (this.type == 1) {
                    var qu_addr = this.qu_id;

                    if (!qu_addr) {
                        app.globalData.util.message('请选择取件快递点', '', 'error');
                        return false;
                    }
                } else {
                    var qu_addr = this.buyaddress.address;
                }

                var self = this;
				if(self.picList.length>0)
				{
					var image = self.picList.join(',')
					// var image = JSON.stringify(self.picList)
				}
				else{
					var image = self.picList
				}
				var total = Number(this.form.total)-Number(this.y_money)
				// this.form.total = Number(this.form.total)-Number(this.y_money)
				// console.log("")
                if (self.is_click) {
                    self.setData({
                        is_click: false
                    });
                    app.globalData.util.request({
                        url: url,
                        data: {
							s_id:uni.getStorageSync('schoolId'),
                            is_start_show: this.sysparment.is_servicetime_show,
                            address_must: this.sysparment.is_address_must,
                            address_show: this.sysparment.is_address_show,
                            guess_prcie: this.form.guess_prcie,
                            express_num: this.express_num,
                            service_num: this.service_num,
                            // store_id: wx.getStorageSync('store_id'),
                            remarks: this.form.showText,
                            qu_latitude: this.buyaddress.location_x ? this.buyaddress.location_x : uni.getStorageSync('city').location.lng,
                            qu_longitude: this.buyaddress.location_y ? this.buyaddress.location_y : uni.getStorageSync('city').location.lat,
                            qu_addres: qu_addr,
							sh_addres:qu_addr,
                            weight: this.weight[this.weightindex],
                            sex_limit: this.sexindex,
							// total:total,
							// co_id:,
                            attach_file: this.attach_file,
                            start_time: this.tlist[0][this.multiIndex[0]] + ' ' + this.tlist[1][this.multiIndex[1]],
                            ...this.form,
                            sh_school: uni.getStorageSync('schoolId'),
                            openid: uni.getStorageSync('openid'),
                            out_time_num: this.form.out_time_num,
                            img: image,
                            // img: img,
                            good_details: this.good_details,
                            title: this.title
                        },

                        success(res) {
                            console.log('1111111', res.data.data);

                            if (res.data.msg == '下单成功，无需支付' || res.data.msg == '会员已抵扣') {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'loading',
                                    duration: 3000
                                });
                                app.globalData.util.request({
                                    url: 'MsgSubscribe/toAllRider',
                                    data: {
                                        ordersn: res.data.data.order.ordersn
                                    }
                                });
                                setTimeout(function () {
                                    uni.navigateTo({
                                        url: '/gc_school/pages/order/index?type=1'
                                    });
                                }, 2000);
                            } else {
                                console.log(res.data.data.order.ordersn);
                                uni.requestPayment({
                                    timeStamp: res.data.data.paydata.timestamp.toString(),
                                    nonceStr: res.data.data.paydata.nonceStr,
                                    package: res.data.data.paydata.package,
                                    signType: 'MD5',
                                    paySign: res.data.data.paydata.paySign,
                                    success: function (resu) {
                                        console.log('success');
                                        console.log(res.data.data.ordersn);
                                        app.globalData.util.request({
                                            url: 'MsgSubscribe/toAllRider',
                                            data: {
                                                ordersn: res.data.data.order.ordersn
                                            }
                                        });
                                        setTimeout(function () {
                                            uni.navigateTo({
                                                url: '/gc_school/pages/order/index?type=1'
                                            });
                                        }, 2000); // wx.navigateTo({
                                        //     url: '/gc_school/pages/order/index',
                                        // })
                                    },
                                    fail: function (res) {
                                        console.log('fail');
                                    }
                                });
                            }
                        },

                        complete() {
                            self.setData({
                                is_click: true
                            });
                        } // fail(e) {
                        //     console.log('弹框1111', e)
                        // }
                    },true);
                } else {
                    uni.showToast({
                        title: '请勿重复点击',
                        icon: 'none'
                    });
                }
            }
        },

        sliderchange(e) {
            console.log('qqqqqqq', e);
            this.setData({
                out_time: e.detail.value
            });
            console.log('时间', this.out_time); // this.setData({
            //     form: {
            //         ...this.data.form,
            //         out_time_num: e.detail.value
            //     }
            // })
        },

        //文件上传
        uploadfile() {
            var that = this;
            uni.chooseMessageFile({
                count: 1,
                type: 'file',
                success(res) {
                   
                    uni.uploadFile({
                        url: siteInfo.url+'Base/upload',
                        //仅为示例，非真实的接口地址
                        filePath: res.tempFiles[0]['path'],
						header:{
							'Authorization':uni.getStorageSync('token')
						},
						name: 'file',
						formData: {
							'wxapp_id':siteInfo.uniacid
						},
                        success(rese) {
                            var result = JSON.parse(rese.data).data;
                            that.setData({
                                attach_file: result
                            });
                            console.log(result); //   const data = res.data
                            //do something
                        }
                    });
                }
            });
        },

        handleshaddress() {
            uni.navigateTo({
                url: '/gc_school/pages/address/index'
            });
        },

        handlescupon() {
            if (this.userInfo.is_vip == 1) {
                var totals = (this.form.total - this.form.MinRunPrice).toFixed(2);
                uni.navigateTo({
                    url: '/gc_school/pages/cupon/index?fee=' + totals
                });
            } else {
                uni.navigateTo({
                    url: '/gc_school/pages/cupon/index?fee=' + this.form.total
                });
            }
        },

        //快递点选择
        pointChange(e) {
            console.log(e.detail.value);
            var self = this;
            console.log('id是', self.point[e.detail.value].id);
            this.setData({
                point_index: e.detail.value,
                qu_id: self.point[e.detail.value].title
            });
            console.log('qu_id', self.point[e.detail.value].title);
        },

        textareaAInputbuyaddress(e) {
            this.setData({
                buyaddress: { ...this.buyaddress, address: e.detail.value }
            }); // this.getCountPrice()
        },

        totalchange(e) {
            let values = e.detail.value;
            var text;
            console.log('总价', this.form.total);
            var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;

            if (reg.test(e.detail.value)) {
                //正则匹配通过，提取有效文本
                text = e.detail.value.replace(reg, '$2$3$4');
            }

            console.log(text); //    this.setData({
            //        money:text
            //    })
            // if(this.data.form.total>values)
            // {
            //     app.util.message('金额不能低于'+this.data.form.total, '', 'error')
            //     return;
            // }

            let items = this.checkbox;

            for (var i = 0; i < items.length; ++i) {
                items[i].checked = false;
            }

            this.setData({
                custom: text // form: {
                //     ...this.data.form,
                //     total: values
                // }
            });
        },

        ChooseCheckbox(e) {
            console.log('hhhhhhhh', e);
            let items = this.checkbox;
            let values = e.currentTarget.dataset.value;
            var index = e.currentTarget.dataset.index;

            for (var i = 0; i < items.length; ++i) {
                items[i].checked = false;

                if (i == index) {
                    items[i].checked = true;
                }
            }

            console.log('kkkkkkkkkkkkkkk', this.form); // this.data.checkbox[index].checked = true

            if (values < this.form.MinRunPrice) {
                uni.showToast({
                    title: '最少费用是' + this.form.MinRunPrice,
                    icon: 'none'
                });
                this.setData({
                    form: { ...this.form, total: this.form.MinRunPrice }
                });
                return false;
            }

            this.setData({
                form: { ...this.form, total: values },
                checkbox: items,
                modalName: ''
            });
        },

        PickerChange(e) {
            var self = this;
            console.log(e); // var total = (Number(this.data.form.MinRunPrice)+Number(this.data.extra_jian_price)+Number(e.detail.value*this.data.form.unit_price)).toFixed(2)
			if(((Number(this.form.total) + Number(e.detail.value * this.form.unit_price) - Number(this.extra_price)).toFixed(2)) <= this.y_money)
			{
				app.globalData.util.message('不可再减少', '', 'error');
				return false;
			}
            var total = (Number(this.form.total) + Number(e.detail.value * this.form.unit_price) - Number(this.extra_price)).toFixed(2);
            console.log(total);
            console.log(this.extra_jian_price);
            this.setData({
                extra_price: Number(e.detail.value * this.form.unit_price)
            });
            console.log(this.form.total);
            this.setData({
                [e.currentTarget.dataset.index]: e.detail.value
            });

            if (e.currentTarget.dataset.index == 'weightindex') {
                this.setData({
                    form: { ...self.form, total: total }
                });
            }
        },

        MultiChange(e) {
            this.setData({
                multiIndex: e.detail.value
            });
        },

        MultiColumnChange(e) {
            if (e.detail.column == 0) {
                this.setData({
                    multiIndex: [e.detail.value, 0],
                    tlist: [this.tlist[0], this.alltime[e.detail.value].times]
                });
            }
        },

        confinModal(e) {
            this.setData({
                modalName: null
            });
        },

        showModal(e) {
            if (e.currentTarget.dataset.target == 'cupon') {
                if (this.cuponlist.length == 0) {
                    return false;
                }
            }

            this.setData({
                modalName: e.currentTarget.dataset.target
            });
        },

        //时间弹框
        timeModalFun() {
            var that = this;
            this.setData({
                timeModal: true
            });
        },

        //时间弹框
        timeHide(e) {
            var that = this;
            console.log(e.currentTarget.dataset.type);
            this.setData({
                timeModal: false
            });

            if (e.currentTarget.dataset.type == 2) {
                this.setData({
                    form: { ...this.form, out_time_num: that.out_time }
                });
            }
        },

        //关闭自定义金额
        hideModals() {
            this.setData({
                modalName: null
            });
        },

        hideModal(e) {
            if (this.modalName == 'ChooseModal') {
                console.log('执行这里');

                if (Number(this.form.total) < Number(this.form.MinRunPrice)) {
                    uni.showToast({
                        title: '最少费用是' + this.form.MinRunPrice,
                        icon: 'none'
                    });
                    return;
                    this.setData({
                        form: { ...this.form, total: this.form.MinRunPrice }
                    });
                }
            }

            console.log('custom', this.custom);
            console.log('最低金额', this.form.MinRunPrice);
            console.log('优惠金额', this.y_money);

            if (this.y_money > this.custom) {
                app.globalData.util.message('金额不可低于优惠券金额', '', 'error');
                return;
            }

            if (this.custom == undefined) {
                app.globalData.util.message('请输入正确的数字', '', 'error');
                return;
            }

            if (this.custom < 0) {
                app.globalData.util.message('输入金额有误', '', 'error');
                return;
            }

            var zong = Number(Number(this.form.MinRunPrice) + Number(this.extra_price) + Number(this.extra_jian_price)).toFixed(2);
            console.log('不低于', zong); // if(Number(this.data.custom)<Number(this.data.form.MinRunPrice))

            if (Number(this.custom) < zong) {
                app.globalData.util.message('金额不能低于' + zong, '', 'error');
                return;
            } else {
                this.setData({
                    form: { ...this.form, total: this.custom }
                });
            }

            this.setData({
                modalName: null
            });
        },

        service_numFun(e) {
            this.setData({
                service_num: e.detail.value
            });
        },

        guess_prcieAInput(e) {
            this.setData({
                form: { ...this.form, guess_prcie: e.detail.value }
            });
        },

        textareaAInput(e) {
            this.setData({
                form: { ...this.form, showText: e.detail.value }
            });
        },

        onChangeTips(e) {
            this.setData({
                form: { ...this.form, fee: e.detail.value }
            });
            console.log(e);
        },

        //选择地址
        onSelectBuyAddress: function () {
            var that = this;
            uni.chooseLocation({
                success: function (e) {
                    var t = {
                        address: e.name + '-' + e.address,
                        name: e.name,
                        location_x: e.latitude,
                        location_y: e.longitude
                    };
                    that.setData({
                        buyaddress: t
                    });
                },
                fail: function (a) {},
                complet: function (s) {
                    console.log(s);
                }
            });
        },

        //图片上传
        upload(res, type) {
            console.log('连接', app.globalData.util.url());
            uni.showLoading();
            uni.uploadFile({
                url: app.globalData.util.url() + 'c=entry&a=wxapp&do=ImgPost&m=gc_school',
                // 仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                name: 'file',
                success: (result) => {
                    console.log('打印', result);
                    var data = result.data;
                    data = JSON.parse(data).data;
                    uni.hideLoading();
                    this.type = [data];

                    if (type == 't_pic') {
                        this.setData({
                            showsfzupload: false
                        });
                    }
                }
            });
        },

        ChooseImage(e) {
            uni.chooseImage({
                count: 1,
                //默认9
                sizeType: ['original', 'compressed'],
                //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'],
                //从相册选择
                success: (res) => {
                    console.log('path', res);

                  
                    this.upload(res, e.currentTarget.dataset.type);
                }
            });
        },

        DelImg(e) {
            uni.showModal({
                title: '删除图片',
                content: '确定要删除？',
                cancelText: '取消',
                confirmText: '确定',
                success: (res) => {
                    if (res.confirm) {
                        this[e.currentTarget.dataset.type].splice(e.currentTarget.dataset.index, 1);
                        this.setData({
                            [e.currentTarget.dataset.type]: this.imgList,
                            showsfzupload: true
                        });
                    }
                }
            });
        },

        getconfig() {
            uni.login({
                success(res) {
                    console.log(res);
                    uni.requestSubscribeMessage({
                        tmplIds: ['Oj0nXf0BEyorPc4TKf3cdMsSUo-ZxncKKcPPbgMUggY'],

                        // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                        success(ress) {
                            console.log('已授权接收订阅消息');
                        },

                        fail(err) {
                            console.log('错误', err);
                        }
                    });
                }
            }); 

            var that = this;
            app.globalData.util.request({
                url: 'Setting/view',
                success(res) {
                    console.log('获取配置', res.data.data);
                    that.setData({
                        sysparment: res.data.data.sys
                    });
                }
            },false);
        },

        //获取用户信息
        getuserInfo() {
            var that = this;
            app.globalData.util.request({
                url: 'WechatUser/view',
                data: {},

                success(res) {
					// console.log("用户信息返回值",res)
                    that.setData({
                        userInfo: res.data.data
                    });
                }
            },true);
        },

        getDefaultPrice() {
            var self = this;
            app.globalData.util.request({
                url: 'RenIndex/MinRunPrice',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    module_id: uni.getStorageSync('module_id')
                },

                success(res) {
					console.log("最低费信息",res.data.data.info)
                    // console.log("重量",res.data.data.school.step)
                    // console.log("重量长度",res.data.data.school.step.length)
                    self.setData({
                        form: { ...self.form, total: res.data.data.info.start_fee, MinRunPrice: res.data.data.info.start_fee, unit_price: res.data.data.info.step_price },
                        point: res.data.data.point,
                        weight: res.data.data.school.step // schoolInfo:res.data.data.school
                    });

                    if (res.data.data.point.length > 0) {
                        self.setData({
                            qu_id: res.data.data.point[0].title
                        });
                    }

                    console.log(res.data.data.point); // self.getTimeList()
                }
            });
        },

        // getCountPrice() {
        //     var self = this
        //      console.log('jkdkjkjkjkjkj')
        //     if (self.data.form.y_money) {
        //         if (self.data.form.total < self.data.form.y_money) {
        //             self.setData({
        //                 form: {
        //                     ...self.data.form,
        //                     total: 0
        //                 }
        //             })
        //         } else {
        //             self.setData({
        //                 form: {
        //                     ...self.data.form,
        //                     total: self.data.form.total - self.data.form.y_money
        //                 }
        //             })
        //         }
        //     }
        //     if (!this.data.form.a_id) {
        //         return false;
        //     }
        //     if (!this.data.buyaddress) {
        //         return false;
        //     }
        //     app.util.request({
        //         url: "entry/wxapp/CountPrice",
        //         data: {
        //             openid: wx.getStorageSync('openid'),
        //             longitude1: this.data.buyaddress.location_y,
        //             latitude1: this.data.buyaddress.location_x,
        //             a_id: this.data.form.a_id,
        //         },
        //         success(res) {
        //             self.setData({
        //                 form: {
        //                     ...self.data.form,
        //                     total: res.data.data.total
        //                 }
        //             })
        //             if (self.data.form.y_money) {
        //                 if (self.data.form.total < self.data.form.y_money) {
        //                     self.setData({
        //                         form: {
        //                             ...self.data.form,
        //                             total: 0
        //                         }
        //                     })
        //                 } else {
        //                     self.setData({
        //                         form: {
        //                             ...self.data.form,
        //                             total: self.data.form.total - self.data.form.y_money + self.data.total_prices
        //                         }
        //                     })
        //                 }
        //             }
        //         }
        //     })
        // },
        getTimeList() {
            var self = this;
            app.globalData.util.request({
                url: 'RenIndex/TimeList',
                data: {
                    openid: uni.getStorageSync('openid'),
                },
				header:{
					'Authorization':uni.getStorageSync('token')
				},
				
                success(res) {
                    var tlist = [[], []];

                    for (var i = 0; i < res.data.data.time.length; i++) {
                        tlist[0].push(res.data.data.time[i].day);
                        var temp = [];

                        for (var index in res.data.data.time[i].times) {
                            temp.push(res.data.data.time[i].times[index]);
                        }

                        if (i == 0) {
                            tlist[1] = temp;
                        }

                        res.data.data.time[i].times = temp;
                    }

                    console.log(res.data.data.time);
                    self.alltime = res.data.data.time;
                    self.setData({
                        tlist: tlist
                    }); //获取优惠券
                }
            });
        },

        //获取商品详情信息
        jise() {
            var that = this;
            var goods_det = uni.getStorageSync('json');
            if (goods_det) {
                app.globalData.util.request({
                    url: 'zhGoods/sumMoney',
					method: 'GET',
                    data: {
                        goods_det: goods_det,
						s_id: uni.getStorageSync('schoolId')
                    },

                    success(res) {
                        that.setData({
                            goods_det: res.data.data.data,
                            total_prices: res.data.data.total_prices
                        });
                        var result = [];
                        var list = res.data.data.data;

                        for (var i = 0; i < list.length; i++) {
                            var restaurant_name =
                                // list[i]['restaurant_name'] +
                                // ' - ' +
                                list[i]['store_name'] +
                                ' - ' +
                                list[i]['goods_name'] +
                                ' - ' +
                                list[i]['nums'] +
                                '份' +
                                ' - ' +
                                list[i]['price'] +
                                '元/份';
                            result.push(restaurant_name);
                        }

                        var result = result.join(','); // var result = JSON.stringify(result)
                        that.setData({
                            good_details: result
                        });
                    }
                });
            }
        },

        //图片上传
        chooseImages() {
            console.log('执行几级');
            var that = this;
            uni.chooseImage({
                count: 3 - that.addedCount,
                sizeType: ['compressed'],
                // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'],
                // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    // that.setData({
                    //   images: that.data.images.concat(res.tempFilePaths),
                    //   addedCount: that.data.addedCount + res.tempFilePaths.length,
                    // });
                    console.log(res);
                    that.uploadimg({
                        path: res.tempFilePaths //这里是选取的图片的地址数组
                    });
                }
            });
        },

        async uploadimg (data) {
            uni.showLoading({
                title: '上传中...',
                mask: true
            });
            var that = this;
            console.log('打印图片信息', data);
            console.log('打印', data.path);
            console.log('打印', data.path.length);
            var count = that.addedCount;
			console.log(siteInfo.url+'Base/upload')

             
            for (var i = 0; i < data.path.length; i++) {
                console.log('走这里', data.path[i]);
                console.log("aaaaa");
                let url=await that.compress(data.path[i])
                console.log(url);
                uni.uploadFile({
                    url: siteInfo.url+'Base/upload',
                    // filePath: data.path[i],
                    filePath: url,
                    // sizeType:["compressed"],
					header:{
						'Authorization':uni.getStorageSync('token')
					},
                    name: 'file',
                    formData: {
						'wxapp_id':siteInfo.uniacid
					},
                    success: (resp) => {
						console.log("图片返回",resp.data)
                        var pic = JSON.parse(resp.data);
						console.log("图片返回11",pic)
                        if (pic.status == 200) {
                            count++;
                            console.log(pic);
                            var picList = that.picList;
                            picList.push(pic.data);
                            console.log(picList);
                            var images = that.images.concat(pic.data);
                            that.setData({
                                images: images,
                                picList: picList,
                                addedCount: count
                            });

                            if (count == that.picList.length) {
                                uni.hideLoading({});
                            }
                        } else {
                            uni.showToast({
                                title: pic.msg,
                                icon: 'none'
                            });
                        }
                    }
                });
            }
        },

        // 删除图片
        deleteImage(e) {
            this.images.splice(e.detail, 1);
            this.picList.splice(e.detail, 1);
            this.setData({
                images: this.images,
                picList: this.picList,
                addedCount: this.addedCount - 1
            });
            console.log(this.picList);
        },

        ViewImage() {
            console.log('占位：函数 ViewImage 未声明');
        }
    }
};
</script>
<style>
page {
    background: #f9f9f9;
}
.adds {
    font-size: 90rpx !important;
    color: #ff6444 !important;
}
.icons {
    height: 1.3em !important;
    width: 1.3em !important;
}
.border-radius{
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	/* border-radius: 20rpx; */
}
.border-bottom-radius{
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
}
.text-sm {
    font-size: 30rpx !important;
}
.money_box{
	background-color: #232122;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	/* border-radius: 40rpx; */
	width: 65%;
	height: 90rpx;
	line-height: 90rpx;
	color: white;
	padding-left: 30rpx;
}
/* .submit_btn{
	width: 20%;
	background-color: #FF4C4D;
	height: 80rpx;
	line-height: 80rpx;
	color: white;
} */
.pay {
    padding-left: 30rpx;
    font-size: 30rpx;
}
.pay .money {
    font-size: 40rpx;
}
.btn_bg {
    background-color: #FF4C4D !important;
    color: white;
	height: 90rpx;
	line-height: 90rpx;
	width: 35%;
	border-top-right-radius: 50rpx !important;
	border-bottom-right-radius: 50rpx !important;
	border-radius: 0;
	font-size: 30rpx;
    /* padding: 20rpx 120rpx !important; */
}
textarea {
    background: #f9f9f9;
    padding: 20rpx 0 !important;
    text-indent: 1em;
    height: 5.6em !important;
}
.white {
    background: white !important;
}
.up_text {
    width: 100% !important;
    height: 20rpx !important;
    padding-bottom: 50rpx !important;
    font-size: 30rpx;
    font-weight: bold;
}
.slide-line-bottom {
    display: flex;
    justify-content: space-between;
}
/* .cu-list{
	margin-bottom: 40rpx;
} */
.cu-list.menu > .cu-item .content > text[class*='cuIcon'] {
    width: auto;
}

.right-bt {
    width: 50%;
    align-content: flex-end;
    justify-content: flex-end;
}

.solids {
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 6rpx;
    position: relative;
    overflow: hidden;
    background: #f9f9f9;
}

.solids > text {
    font-size: 52rpx;
    position: absolute;
    color: var(--grey);
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.detals {
    padding: 15rpx 0;
}

.cu-items {
    padding: 0 30rpx;
    background: white;
}

#opli {
    width: 40%;
}

#addre {
    display: flex;
    align-items: center;
    width: 60%;
}

#addre > view {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: right;
}
.point {
    overflow: hidden;
    white-space: nowrap;
}
.remark {
    min-height: 70rpx;
}
.del_remark {
    margin-bottom: 30rpx;
    font-size: 24rpx;
}
.choose {
    background: #feefec;
    text-align: center;
    line-height: 100rpx;
    color: #fd6141;
    font-weight: bold;
    width: 90%;
    margin-left: 5%;
}
.num_cut {
    border: 1rpx solid #f2f2f2;
    /* padding: 0 20rpx; */
    border-radius: 10rpx;
    line-height: 60rpx;
    height: 60rpx;
    font-size: 34rpx;
    width: 60rpx;
    text-align: center;
}
.num_add {
    border: 1rpx solid #f2f2f2;
    width: 60rpx;
    text-align: center;
    /* padding: 0 20rpx; */
    border-radius: 10rpx;
    line-height: 60rpx;
    height: 60rpx;
    font-size: 34rpx;
    background: #ff6444;
    color: white;
}
.input {
    height: 80rpx;
    padding: 0 20rpx;
    /* padding: 20rpx; */
    font-size: 30rpx;
}
</style>
