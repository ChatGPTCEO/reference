<template>
	<view>
		<u-navbar :is-back="true" title="动态详情">
		</u-navbar>
		
		<view class="warp" >
			<kgDynamics :dyInfo="dyInfo" :isInfo="true"  @comContent="comContent" @comLikes="comLikes" ></kgDynamics>
			<view class="fenge">
				<u-section title="评论内容" :arrow="false" :color="bgColor" :sub-title="dyInfo.comList.length + '条评论'"></u-section>
			</view>
			<kgComment :commentList="dyInfo.comList" @delCom="delCom()" @replyContent="replyContent" @replyLike="replyLike" ></kgComment>
				
			<u-popup v-model="comShow" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="comModal" :rules="rules" ref="comForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="comInfo">
							<u-input v-model="comModal.comInfo" type="textarea" placeholder="请输入评论内容~" :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<view class="cardZw">
						上传照片
					</view>
					<u-upload :custom-btn="true" max-count="4" ref="uUpload"  :action="action" :file-list="comModal.comImgs" :auto-upload="true">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<image src="../../static/icon/upload.png"></image>
						</view>
					</u-upload>
					
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" @click="saveComInfo()"
							ripple-bg-color="#ff9b01">评论</u-button>
					</view>
				</view>
			</u-popup>
			
			<u-popup v-model="repShow" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="repModal" :rules="rules" ref="repForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="replyInfo">
							<u-input v-model="repModal.replyInfo" type="textarea" placeholder="请输入回复内容~" :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" @click="saveReplyInfo()"
							ripple-bg-color="#ff9b01">回复</u-button>
					</view>
				</view>
			</u-popup>
		</view>

		
	</view>
</template>

<script>
	import kgComment from "../../components/kg-com/kg-comment"
	import kgDynamics from "../../components/kg-dy/kg-dynamic"
	export default {
		components: {
			kgComment,
			kgDynamics
		},
		data() {
			return {
				customStyles: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					backgroundColor: '#ffcc01',
					boxShadow: '0 0 0px #ffcc01',
				},
				dyId:null,
				loading: true,
				background: '',
				dyInfo: {
					id:1,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '我是你爸爸',
					pushTime: '2021-12-17 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1115%2F101021113337%2F211010113337-6-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650274737&t=bd09323f193d7838a9edaad08d719b9f',
						'https://img0.baidu.com/it/u=155276595,173864794&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
					],
					tags: [{
							name: '入冬了',
							type: 'success'
						},
						{
							name: '男友之力',
							type: 'info'
						}, {
							name: '男友之力',
							type: 'info'
						}, {
							name: '男友之力',
							type: 'info'
						},

					],
					fabulous:false,
					dyLike: 10,
					comList: [{
						id:1,
						avatarUrl: "https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
						nickName: "阿康",
						comInfo: "送你几个头像",
						comImgs: ["https://img2.baidu.com/it/u=3334215526,528809285&fm=26&fmt=auto","https://img2.baidu.com/it/u=1052408238,1424474823&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"],
						comTime: "2022-03-12 17:20:55",
						fabulous:false,
						comLike: 99,
						replyList: [{
							id:1,
							avatarUrlr: "https://img2.baidu.com/it/u=535790725,1148347184&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
							nickNamer: "阿康",
							replyInfo: "好嘞哥~"
						}]
					}]
				},
				bgColor: '#ffcc01',
				baseUrl:'',
				comModal: {
					userId:null,
					dyId:null,
					comInfo:'',
					comImgs:[],
				},
				repModal: {
					userId:null,
					dyId:null,
					comId:null,
					replyInfo:'',
				},
				comShow: false,
				repShow: false,
				action:'',
				rules: {
					comInfo: [{
							required: true,
							message: '请填写评论信息'
						},
						{
							min: 1,
							message: '评论信息不能少于1个字',
							trigger: 'change',
						},
					],
					replyInfo: [{
							required: true,
							message: '请填写评论信息'
						},
						{
							min: 1,
							message: '评论信息不能少于1个字',
							trigger: 'change',
						},
					],
				},
				errorType: ['toast'],
				border: true,
				height: 300,
				autoHeight: true,
				borderColor: '#000000',
			}
		},
		onLoad(options) {
			
		},
		methods: {
			// 评论消息
			comContent(id){
				this.comShow = true
			},
			// 评论消息
			replyContent(id){
				this.repShow = true
			},
			
			//喜欢数
			comLikes(id){
				if(this.dyInfo.fabulous){
					this.$u.toast(`不能重复点赞哦~`);
					return
				}
				this.dyInfo.fabulous = true
				this.dyInfo.dyLike = this.dyInfo.dyLike + 1
				this.$u.toast(`点赞成功~`);
			},
			replyLike(index){
				if(this.dyInfo.comList[index].fabulous){
					this.$u.toast(`不能重复点赞哦~`);
					return
				}
				this.dyInfo.comList[index].fabulous = true
				this.dyInfo.comList[index].comLike = this.dyInfo.comList[index].comLike + 1
				this.$u.toast(`点赞成功~`);
			},
			// 删除评论
			delCom(comId){
				this.$u.toast(`删除成功~`);
			},
			previewImage(url, urls) {
				uni.previewImage({
					current: url, // 当前显示图片的http链接
					urls: urls // 需要预览的图片http链接列表
				});
			},
			
			
		}

	}
</script>

<style lang="scss" scoped>
	.warp {
		background-color: #FFFFFF;
		margin-bottom: 100px;
	}

	.fenge {
		padding: 10px;
	}

	.load_more {
		margin-top: 100px;
	}

	.bodys{
		padding: 20px;
		
	}
	
	.cardZw {
		margin: 10px 0px;
	}
	.slot-btn {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	
		image {
			width: 60px;
			height: 60px;
		}
	}
	
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	.info_iput {
		padding: 20px;
		font-weight: 600;
	
	}
	
	.u-input--border {
		border-radius: 30rpx !important;
		border: 2px solid #000000 !important;
	}
	
	.u-form-item {
		padding: 10rpx 0 !important;
	}
</style>
