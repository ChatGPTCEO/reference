<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">订单信息</view>
        </cu-custom>
        <!-- <cu-custom bgColor="bgmain" isBack="{{true}}">
	<view slot="backText">返回</view>
	<view slot="content">订单详情</view>
</cu-custom> -->
        <view class="container">
			<view class="white_box margin padding">
				<view class="cu-item flex justify-between align-center">
					<text class="text-lg text-grey">订单编号:</text>
					<text class="text-df text-grey">{{ detail.ordersn }}</text>
				</view>
				<view class="cu-item flex justify-between align-center">
					<text class="text-lg text-grey">下单时间:</text>
					<text class="text-df text-grey">{{ detail.create_time }}</text>
				</view>
			</view>
			
            <view class="white_box detail margin">
                <view class="text-lg margin-bottom" v-if="detail.type == '4' && detail.title">标题：{{ detail.title }}</view>
                <view class="action">
                    <!-- <text class="cuIcon-titles text-green"></text> -->
                    <text class="text-sm text-grey text-bold" id="">订单详情</text>
                </view>
                <view class="cu-item desc">
                    <view class="content" @tap="copy" :data-content="detail.remarks">
                        <text>{{ detail.remarks }}</text>
                    </view>
                </view>
                <!-- <view id="ilo" > -->
                <!-- <view id="ilo" wx:if="{{detail.type == '取件' && detail.status != '待接单'}}"> -->
                <view id="ilo" v-if="detail.is_watch == true">
                    <block v-if="detail.img.length>0">
                        <view class="content padding-top">
                            <text class="text-grey text-lg">取单信息:</text>
                        </view>
                        <view class="action image_flex" id="actiom">
                            <block v-for="(item, index) in detail.img" :key="index">
                                <image class="imgs" @tap="preview" :data-index="index" mode="aspectFill" :src="item"></image>
                            </block>
                        </view>
                    </block>
                    <block v-else></block>
                </view>
                <block v-if="detail.type == '3'">
                    <view id="ilo">
                        <view class="content padding-top">
                            <text class="text-grey text-lg">取单信息:</text>
                        </view>
                        <view class="action" v-for="(item, index) in good_details" :key="index">
                            <view class="xiang text-lg">{{ item }}</view>
                        </view>
                    </view>
                </block>
                <block v-else></block>
            </view>

            <view class="cu-list menu sm-border white_box margin">
                <block v-if="detail.attach_file && detail.type == '4' && detail.is_watch == true">
                    <view class="cu-item">
                        <view class="content">
                            <text class="text-grey">附件下载:</text>
                        </view>
                        <view class="action" @tap="down">
                            <text class="text-grey text-sm">点击打开文件</text>
                        </view>
                    </view>
                </block>
                <!-- </view> -->
                <block v-if="detail.type == '2'">
                    <view class="cu-item">
                        <view class="content">
                            <text class="text-grey">联系人姓名:</text>
                        </view>
                        <view class="action">
                            <text class="text-grey text-sm">{{ detail.qu_name }}</text>
                        </view>
                    </view>
                    <view class="cu-item">
                        <view class="content">
                            <text class="text-grey">联系人电话:</text>
                        </view>
                        <view class="action">
							<text class="cuIcon-dianhua text-green" style="font-size: 30rpx" @tap="makecall" :data-phone="detail.qu_phone"></text>
							<text class="text-grey text-sm" @tap="makecall" :data-phone="detail.qu_phone">{{ detail.qu_phone }}</text>
                            <!-- <text class="text-grey text-sm">{{ detail.qu_phone }}</text> -->
                        </view>
                    </view>
                    <view class="cu-item">
                        <view class="content">
                            <text class="text-grey">取件地址:</text>
                        </view>
                        <view class="action">
                            <text class="text-grey text-sm" style="flex-basis: auto; white-space: normal">{{ detail.qu_addres }}</text>
                        </view>
                    </view>
                    <view class="cu-item">
                        <view class="content">
                            <text class="text-grey">寄件地址:</text>
                        </view>
                        <view class="action" style="width: 50%; text-align: right">
                            <text class="text-grey text-sm" style="flex-basis: auto; white-space: normal">{{ detail.sh_addres }}</text>
                        </view>
                    </view>
                </block>
                <block v-else>
                    <view class="cu-item" v-if="detail.sh_name">
                        <view class="content">
                            <text class="text-grey">收件人:</text>
                        </view>
                        <view class="action">
                            <text class="text-grey text-sm">{{ detail.sh_name }}</text>
                        </view>
                    </view>
                    <view class="cu-item" v-if="detail.sh_phone">
                        <view class="content">
                            <text class="text-grey">收件电话:</text>
                        </view>
                        <view class="action">
                            <text class="cuIcon-dianhua text-green" style="font-size: 30rpx" @tap="makecall" :data-phone="detail.sh_phone"></text>
                            <text class="text-grey text-sm" @tap="makecall" :data-phone="detail.sh_phone">{{ detail.sh_phone }}</text>
                        </view>
                    </view>
                    <view class="cu-item" v-if="detail.sh_name && detail.sh_phone">
                        <view class="content"> 
                            <text class="text-grey">收件地址:</text>
                        </view>
                        <view class="action">
                            <text class="text-grey text-sm" style="flex-basis: auto; white-space: normal">{{ detail.sh_addres }}</text>
                        </view>
                    </view>
                    <view class="cu-item" v-if="detail.type == '1' || detail.type == '2'">
                        <view class="content">
                            <text class="text-grey">取货地址:</text>
                        </view>
                        <view class="action" style="width: 65%; text-align: right">
                            <text class="text-grey text-sm" style="flex-basis: auto; white-space: normal">{{ detail.qu_addres }}</text>
                        </view>
                    </view>
                </block>
                <view class="cu-item">
                    <view class="content">
                        <text class="text-grey">性别限制:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail._sex_limit_txt }}</text>
                    </view>
                </view>
                
                <view class="cu-item" v-if="detail.service_num > 0 && detail.type == '4'">
                    <view class="content">
                        <text class="text-grey">服务人数:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.service_num }}</text>
                    </view>
                </view>
				<view class="cu-item" v-if="detail.is_start_show==1 || detail.type!=4">
				    <view class="content">
				        <text class="text-grey">{{detail.type==4?'服务时间':'送达时间'}}:</text>
				    </view>
				    <view class="action">
				        <text class="text-grey text-sm">{{ detail._start_time }}</text>
				    </view>
				</view>
				
                <!-- <view class="cu-item">
                    <view class="content">
                        <text class="text-grey">订单时间:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.createtime | formatDateDay }}</text>
                    </view>
                </view> -->
                <view class="cu-item" v-if="detail.type != '4'">
                    <view class="content">
                        <text class="text-grey">物品重量/大小:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.weight }}</text>
                    </view>
                </view>
                <view class="cu-item" v-if="detail.type == '1' || detail.type == '2'">
                    <view class="content">
                        <text class="text-grey">快递数量:</text>
                    </view>
                    <view class="action" style="width: 65%; text-align: right">
                        <text class="text-grey text-sm" style="flex-basis: auto; white-space: normal">{{ detail.express_num }}</text>
                    </view>
                </view>
                <view class="cu-item">
                    <view class="content">
                        <text class="text-grey">费用:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.total }}</text>
                    </view>
                </view>
                <view class="cu-item" v-if="detail.type == '3'">
                    <view class="content">
                        <text class="text-grey">商品费用:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.food_money }}</text>
                    </view>
                </view>
                <view class="cu-item" v-if="detail._status_txt == '取消中'">
                    <view class="content">
                        <text class="text-grey">取消原因:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.cancel_reason }}</text>
                    </view>
                </view>
                <view class="cu-item" v-if="detail._status_txt == '待取货' && detail.is_refuse == 1">
                    <view class="content">
                        <text class="text-grey">拒绝原因:</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{ detail.refuse_reason }}</text>
                    </view>
                </view>
            </view>
            <view v-if="detail.end_openid">
				<view class="margin bg-white padding-sm" style="border-radius: 20rpx;">
					<view class="flex align-center ">
						<image :src="detail.end_user.avatar" mode="" style="width: 110rpx;height: 110rpx;border-radius: 50%;"></image>
						<view class="margin-left">
							<view class="text-lg text-bold">{{detail.end_user.nickname}}</view>
							<view class="margin-top-xs">{{detail.end_user.phone}}</view>
						</view>
						<view @tap="makecall" :data-phone="detail.end_user.phone" class="text-lg text-red flex align-center" style="margin-left: auto;">
							<image src="/static/images/tele.png" style="width: 40rpx;height: 50rpx;"></image> 联系
						</view>
					</view>
					<view class="flex justify-between margin-top" v-if="detail.proof">
						<view class="content">
							<text class="text-grey">凭证:</text>
						</view>
						<image
							@tap="previews"
							:data-src="detail.proof"
							:src="detail.proof"
							style="width: 200rpx; height: 150rpx; margin: 20rpx 0"
							mode="aspectFill"
						></image>
					</view>
				</view>
				<!-- <view class="margin">
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							<text class="text-sm text-bold" style="color: #989898">骑手信息</text>
						</view>
					</view>
					<view class="cu-list menu sm-border padding-bottom-xl">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">骑手姓名:</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{ detail.end_user.t_name }}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">骑手电话:</text>
							</view>
							<view class="action" @tap="makecall" :data-phone="detail.end_user.phone">
								<text class="cuIcon-dianhua text-green" style="font-size: 30rpx"></text>
								<text class="text-grey text-sm">{{ detail.end_user.phone }}</text>
							</view>
						</view>

						<view class="cu-item" v-if="detail.proof">
							<view class="content">
								<text class="text-grey">凭证:</text>
							</view>
							<image
								@tap="previews"
								:data-src="detail.proof"
								:src="detail.proof"
								style="width: 200rpx; height: 150rpx; margin: 20rpx 0"
								mode="aspectFill"
							></image>
						</view>
					</view>
				</view> -->
            </view>
        </view>

        <view class="cu-tabbar-height"></view>
        <view class="cu-bar bg-white foot tabbar border shop" style="height: 120rpx;">
            <button class="action" open-type="contact" style="color: black">
                <view class="cuIcon-service text-red"></view>
                联系客服
            </button>

            <view class="bgmain submit" @tap="handleZF" v-if="detail._status_txt == '未支付'">
                <!-- 取消订单 -->
                立即支付 ¥{{ detail.t_money }}
            </view>
            <block v-if="detail.user_type == true">
                <!-- 是我自己的单子 -->
                <view class="bgmain submit" v-if="detail._status_txt == '待接单'">待接单</view>
                <view class="bgmain submit" v-if="detail._status_txt == '待取货'">待取货</view>
                <view class="bgmain submit cancel" @tap="cancel" v-if="detail._status_txt == '待取货'" data-type="1">取消抢单</view>
                <view class="bgmain submit" v-if="detail._status_txt == '取消中' && detail.cancel_from == 'user'">取消中</view>
                <view class="bgmain submit" @tap="agree" v-if="detail._status_txt == '取消中' && detail.cancel_from == 'rider'">同意</view>
                <view class="bgmain submit cancel" @tap="cancel" v-if="detail._status_txt == '取消中' && detail.cancel_from == 'rider'" data-type="2">拒绝</view>
                <view class="bgmain submit" @tap="handleWc" v-if="detail._status_txt == '待送达'">确认完成</view>
                <view class="bgmain submit" v-if="detail._status_txt == '已完成'">已完成</view>
                <view class="bgmain submit" v-if="detail._status_txt == '已过期'">已过期</view>
                <view class="bgmain submit" v-if="detail._status_txt == '已取消'">已取消</view>
            </block>
            <block v-if="detail.user_type != true">
                <view class="bgmain submit" @tap="handleQd" v-if="detail._status_txt == '待接单'">抢单</view>
                <view class="bgmain submit" @tap="handleQh" v-if="detail._status_txt == '待取货'">确认取货</view>
                <view class="bgmain submit cancel" @tap="cancel" v-if="detail._status_txt == '待取货'" data-type="1">取消抢单</view>
                <view class="bgmain submit" @tap="agree" v-if="detail._status_txt == '取消中' && detail.cancel_from == 'user'">同意</view>
                <view class="bgmain submit cancel" @tap="cancel" v-if="detail._status_txt == '取消中' && detail.cancel_from == 'user'" data-type="2">拒绝</view>
                <view class="bg-grey submit cancel" @tap="proof" v-if="detail._status_txt == '待送达' && !detail.proof">上传凭证</view>
                <view class="bg-grey submit" style="margin-left: 10rpx" v-if="detail._status_txt == '待送达'">待完成</view>
                <view class="bgmain submit" v-if="detail._status_txt == '取消中' && detail.cancel_from == 'rider'">取消中</view>
                <view class="bg-grey submit" v-if="detail._status_txt == '已完成'">已完成</view>
                <view class="bgmain submit" v-if="detail._status_txt == '已过期'">已过期</view>
                <view class="bgmain submit" v-if="detail._status_txt == '已取消'">已取消</view>
            </block>
        </view>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            markers: [
                {
                    iconPath: '/static/gc_school/resource/images/location.png',
                    id: 0,
                    latitude: 23.099994,
                    longitude: 113.32452,
                    width: 50,
                    height: 50
                }
            ],

            polyline: [
                {
                    points: [
                        {
                            longitude: 113.3245211,
                            latitude: 23.10229
                        },
                        {
                            longitude: 113.32452,
                            latitude: 23.21229
                        }
                    ],
                    color: '#FF0000DD',
                    width: 6,
                    dottedLine: true
                }
            ],

            detail: {
                order: {
                    type: '',
                    title: '',
                    desc: '',
                    is_watch: false,
                    image: '',
                    attach_file: '',
                    sh_name: '',
                    sh_phone: '',
                    sh_addres: '',
                    qu_addres: '',
                    sex_limit: '',
                    ordersn: '',
                    service_num: 0,
                    createtime: '',
                    weight: '',
                    express_num: '',
                    total: '',
                    guess_prcie: '',
                    status: '',
                    cancel_reason: '',
                    is_refuse: 0,
                    refuse_reason: '',
                    end_openid: '',
                    end_user_name: '',
                    end_user_phone: '',
                    proof: '',
                    user_type: false,
                    cancel_from: ''
                }
            },

            good_details: [],
            id: '',
            options: '',
            sysparment: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);
        this.setData({
            options: options,
            id: options.id
        });
        this.getData(options);
        this.getconfig();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {},
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
    onShareAppMessage: function () {
        return {
            title: '快来接单，轻松赚零花钱！',
            path: '/gc_school/pages/order/detail?id=' + this.id,
            imageUrl: 'https://gcwe7.link1024.com/web/img/share.png'
        };
    },
    methods: {
        getconfig() {
            var that = this;
            app.globalData.util.request({
                url: 'Setting/view',

                success(res) {
                    console.log(res.data.data.sys.logo);
                    that.setData({
                        sysparment: res.data.data.sys
                    });
                }
            });
        },

        formSubmit(e) {
            console.log(e);
            app.globalData.util.request({
                url: 'entry/wxapp/OrderInfo',
                data: {
                    o_id: this.options.id,
                    openid: uni.getStorageSync('openid') // lon: wx.getStorageSync('city').location.lng,
                    // lat: wx.getStorageSync('city').location.lat,
                },

                success(res) {
                    uni.showToast({
                        title: res.data.message
                    });
                    uni.navigateTo({
                        url: '/wx_tx/pages/myorder/index'
                    });
                }
            },true);
        },

        //上传凭证
        proof() {
            uni.navigateTo({
                url: '/gc_school/pages/order/proof?id=' + this.detail.id
            });
            console.log(this.detail.o_id);
        },

        down() {
            console.log('下载文件');
            uni.showLoading({
                title: '文件下载中'
            });
            uni.downloadFile({
                url: this.detail.attach_file,

                //仅为示例，并非真实的资源
                success(res) {
                    console.log(res);
                    uni.hideLoading({});
                    var filePath = res.tempFilePath;
                    uni.openDocument({
                        //打开
                        showMenu: true,
                        filePath: filePath,
                        success: function (resu) {
                            console.log(resu);
                        }
                    }); // wx.saveFile({
                    // 	tempFilePath: res.tempFilePath,
                    // 	success(e)
                    // 	{
                    // 		console.log(e)
                    // 	}
                    // })
                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

                    if (res.statusCode === 200) {
                        // wx.playVoice({
                        // 	filePath: res.tempFilePath
                        // })
                    }
                }
            });
        },

        copy(e) {
            console.log(e);
            uni.setClipboardData({
                data: e.currentTarget.dataset.content
            });
        },

        //图片预览
        preview(e) {
            console.log(e);
            var index = e.currentTarget.dataset.index;
            console.log(this.detail.img);
            uni.previewImage({
                current: this.detail.img[index],
                // 当前显示图片的http链接
                urls: this.detail.img // 需要预览的图片http链接列表
            });
        },

        //图片预览
        previews(e) {
            console.log(e);
            uni.previewImage({
                current: e.currentTarget.dataset.src,
                // 当前显示图片的http链接
                urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
            });
        },

        changes(strs, length) {
            var tmp = strs.substr(0, length);

            for (var i = 0; i < strs.length - length; i++) {
                tmp = tmp + '*';
            }

            return tmp;
        },

        getData(options) {
            const self = this;
            this.setData({
                options: options
            });
            app.globalData.util.request({
                url: 'order/orderInfo',
                data: {
                    o_id: options.id,
                },
				'method':'GET',
                success(res) {
                    console.log('12323321', res.data.data);

                    if (res.data.data.is_watch == false) {
                        // if (res.data.data.status == '待接单') {
                        var temp = res.data.data.remarks;
                        res.data.data.remarks.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                            var te = e;

                            if (Number(e)) {
                                if (e.toString().length > 3) {
                                    var d = e.substr(0, 2) + '****' + e.substr(6);
                                } else {
                                    var d = e.substr(0, 1) + '**';
                                }

                                temp = temp.replace(te, d);
                                console.log(temp);
                            }
                        });
						if(res.data.data.sh_phone)
						{
							res.data.data.sh_phone = res.data.data.sh_phone.substr(0, 3) + '****' + res.data.data.sh_phone.substr(7);
						}
                        res.data.data.ordersn = res.data.data.ordersn.substr(0, 4) + '**************' + res.data.data.ordersn.substr(18);
						if(res.data.data.sh_name)
						{
							res.data.data.sh_name =
							    res.data.data.sh_name.substr(0, 1) + res.data.data.sh_name.substr(1, res.data.data.sh_name.length).replace(/./g, '*'); // res.data.data.sh_name = self.changes(res.data.data.sh_name,1);
						}
                        
                        // if(res.data.data.sh_addres){
                        //     res.data.data.sh_addres = res.data.data.sh_addres.substr(0,4) + '*****';
                        // }
                        // if(res.data.data.qu_addres){
                        //     res.data.data.qu_addres = res.data.data.qu_addres.substr(0,4) + '*****';
                        // }

                        res.data.data.desc = temp;
                        
                    }

                    var good_details = res.data.data.good_details;
					if(res.data.data.good_details)
					{
						var good_details = good_details.split(',');
					}
					if(res.data.data.img)
					{
						var img = res.data.data.img.split(',');
						res.data.data.img = img
					}
                    console.log('11111', good_details);
                    self.setData({
                        detail: res.data.data,
                        good_details: good_details,
                        markers: [
                            {
                                iconPath: '/static/gc_school/resource/images/location.png',
                                id: 0,
                                latitude: res.data.data.sh_latitude,
                                longitude: res.data.data.sh_longitude,
                                width: 50,
                                height: 50
                            }
                        ],
                        polyline: [
                            {
                                points: [
                                    {
                                        latitude: res.data.data.sh_latitude,
                                        longitude: res.data.data.sh_longitude
                                    },
                                    {
                                        latitude: res.data.data.qu_latitude,
                                        longitude: res.data.data.qu_longitude
                                    }
                                ],
                                color: '#FF0000DD',
                                width: 6,
                                dottedLine: true
                            }
                        ]
                    });
                }
            },true);
        },

        //抢单
        handleQd() {
            var that = this;
            uni.requestSubscribeMessage({
                tmplIds: [that.sysparment.template_id, that.sysparment.cancel_template_id],

                // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                success(res) {
                    console.log('已授权接收订阅消息');
                },

                complete() {
                    app.globalData.util.request({
                        url: 'Order/grab',
                        data: {
                            o_id: that.detail.id,
                        },

                        success(res) {
                            uni.showToast({
                                title: '抢单成功',
                                // icon: 'none',
                                duration: 2000,
								success() {
									uni.navigateTo({
										url: '/gc_school/pages/mygrab/index'
									});
								}
                            });
                        }
                    },true);
                }
            });
        },

        makecall(e) {
            console.log(e.currentTarget.dataset.phone);
            uni.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.phone
            });
        },

        //支付
        handleZF() {
            app.globalData.util.request({
                url: 'Order/pay',
                data: {
                    o_id: this.detail.id
                },

                success(res) {
					console.log(res)
                    uni.requestPayment({
                        timeStamp: res.data.data.paydata.timestamp.toString(),
                        nonceStr: res.data.data.paydata.nonceStr,
                        package: res.data.data.paydata.package,
                        signType: 'MD5',
                        paySign: res.data.data.paydata.paySign,
                        success: function (resu) {
                            console.log('success');
                            app.globalData.issub = true;
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
            },true);
        },

        //取货
        handleQh() {
            app.globalData.util.request({
                url: 'Order/ConfirmPickup',
                data: {
                    o_id: this.detail.id,
                },

                success(res) {
                    uni.showToast({
                        title: '取货成功',
                        // icon: 'none',
                        duration: 2000,
						success() {
							uni.navigateTo({
							    url: '/gc_school/pages/mygrab/index'
							});
						}
                    });
                }
            },true);
        },

        //同意取消
        agree(e) {
            var self = this;
            app.globalData.util.request({
                url: 'Order/agreeCancel',
                data: {
                    o_id: self.detail.id,
                },

                success(result) {
                    if (result.data.status == 200) {
                        uni.showToast({
                            title: result.data.msg,
							duration:1000
                        });
                        console.log('订单id', self.detail.o_id);
                        self.getData(self.options);
                    }
                }
            },true);
        },

        cancel(e) {
            uni.navigateTo({
                url: '/gc_school/pages/order/reason?id=' + this.detail.id + '&type=' + e.currentTarget.dataset.type
            }); // var self = this;
            // wx.showModal({
            //     title:"温馨提示",
            //     content:"如若取消抢单，订单将恢复到待接单状态，如需取消订单请在订单列表操作",
            //     success(res)
            //     {
            //         if(res.confirm)
            //         {
            //             console.log("确认")
            //             wx.navigateTo({
            //               url: '/gc_school/pages/order/reason',
            //             })
            //             // app.util.request({
            //             //     url: 'entry/wxapp/cancelGet',
            //             //     data: {
            //             //         o_id: self.data.detail.o_id,
            //             //         openid:wx.getStorageSync('openid')
            //             //     },
            //             //     success(result)
            //             //     {
            //             //         if(result.data.ennor==0)
            //             //         {
            //             //             wx.showToast({
            //             //               title: result.data.message,
            //             //             })
            //             //         }
            //             //     }
            //             // })
            //         }
            //         else{
            //             console.log("取消")
            //         }
            //     }
            // })
        },

        //取消订单
        handleQX() {
            app.globalData.util.request({
                url: 'entry/wxapp/cancelorder',
                data: {
                    o_id: this.detail.o_id,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    uni.showToast({
                        title: '取消成功',
                        // icon: 'none',
                        duration: 2000
                    });
                    uni.navigateTo({
                        url: '/gc_school/pages/order/index'
                    });
                }
            });
        },

        //确认完成
        handleWc() {
            app.globalData.util.request({
                url: 'Order/confirmFinish',
                data: {
                    o_id: this.detail.id
                },
				
                success(res) {
                    uni.showToast({
                        title: '确认完成',
                        // icon: 'none',
                        duration: 2000
                    });
                    uni.navigateTo({
                        url: '/gc_school/pages/order/index'
                    });
                }
            },true);
        }
    }
};
</script>
<style>
page {
    background: #f3f3f3;
}
.white_box{
	background-color: white;
	border-radius: 20rpx;
}
.text-grey{
	color: black;
}
.val{
	color: #333333;
}
.container .block {
    padding: 20rpx;
    margin-top: 10rpx;
    position: relative;
    z-index: 200;
    background-color: #fff;
}

.container .block.top {
    margin-top: -30rpx;
    border-radius: 10rpx 10rpx 0 0;
}

.title {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
}

.title .status {
    color: #64edac;
}

.price {
    color: #64edac;
    font-size: 32rpx;
    margin: 20rpx 0;
}

.footer {
    display: flex;
    justify-content: space-between;
}

.footer .sm {
    flex: 1;
}

.footer .sm .ct {
    font-size: 24rpx;
    color: #ccc;
    margin-bottom: 5rpx;
}

.footer .sm .cw {
    font-size: 32rpx;
    color: #000;
}

.submit[size='mini'] {
    color: #fff;
    background: #64edac;
    margin: 50rpx 0;
    width: 95%;
    padding: 10rpx 50rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
    left: 50%;
    transform: translateX(-50%);
}

.useinfo {
    display: flex;
}

.useinfo .head {
    width: 80rpx;
    height: 80rpx;
    background-size: cover;
    background-position: center;
    margin-right: 20rpx;
    border-radius: 50%;
}

.useinfo .user .t1 {
    font-size: 28rpx;
}

.useinfo .user .t2 {
    color: #ccc;
}

.detail .sm {
    margin: 10rpx 0;
    font-size: 28rpx;
}

.detail .item {
    margin-bottom: 15rpx;
}

.sure_btn {
    position: fixed;
    bottom: 50rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    background: #64edac;
    color: #fff;
    font-size: 28rpx;
    border-radius: 20rpx;
    text-align: center;
    padding: 20rpx 0;
}
#actiom {
    margin-top: 40rpx;
}

#ilo {
    position: relative;
    /* padding: 0 30rpx; */
    /* min-height: 100rpx; */
    background-color: var(--white);
}

.imgs {
    /* width: 460rpx; */
    height: 300rpx;
}

.lpot {
    width: 100%;
}
#texts {
    color: #989898 !important;
}
.xiang {
    color: #989898;
    padding-top: 20rpx;
}
.text-sm {
    font-size: 30rpx !important;
}
.detail {
    padding: 30rpx;
    margin-bottom: 40rpx;
}
.desc {
    margin-top: 20rpx;
    font-size: 30rpx;
}
.submit {
    background-color: #FF4C49;
    border-radius: 40rpx;
	color: white;
}
.shop .action {
    width: 50% !important;
    background-color: white;
}
.cuIcon-service {
    font-size: 50rpx !important;
}
.tabbar {
    padding: 20rpx !important;
}

button::after {
    outline: none;
	border: none;
}
.bgmains {
    background-color: #ff6444;
    color: white;
}
.cancel {
    background-color: #111111;
    margin-left: 10rpx;
}
.image_flex {
    display: flex;
}
.image_flex image {
    margin-right: 10rpx;
}
</style>
