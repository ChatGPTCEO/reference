<template>
	<view class="actionxqboss">
		<view class="addview">
			<button open-type="share" class="bf_but">
				<view style="height: 32px;line-height: 32px;">
				    <u-icon name="share" color="#fff" size="45"></u-icon>
				</view>
			</button>
		</view>
		<view class="myVideoview" v-if="listdata.video">
			<video id="myVideo" height="200" :src="listdata.video"></video>		
		</view>
		<view class="textview">
			<p>{{listdata.title}}</p>
			<p>{{listdata.name}}</p>		
		</view>
		<view class="content">
			<view class="con1" v-if="listdata.xqioc">
				<u-section title="动作展示"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="imgview" >
					<u-row gutter="16">
						<u-col span="6" v-for="(item,index) in listdata.xqioc" :key="index">
							<image :src="item" mode="aspectFit"></image>
						</u-col>
					</u-row>
				</view>			
			</view>
			<view class="con1" v-if="listdata.jioc">
				<u-section title="训练肌群"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="imgview" >
					<u-row gutter="16">
						<u-col span="12" v-for="(item,index) in listdata.jioc" :key="index">
							<image :src="item" mode="aspectFit"></image>
						</u-col>
					</u-row>
				</view>			
			</view>
			<view class="con2">
				<u-section title="动作步骤"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="" style="margin-left: 20rpx;margin-top: 8px;" v-html="listdata.aname">
					<!-- <p style="margin-top: 10px;" >{{listdata.aname}}</p> -->
				<!-- 	<p style="margin-top: 5px;">跳上台阶，控制着陆的力度。</p>
					<p style="margin-top: 5px;">从台阶上跳下来。</p>
					<p style="margin-top: 5px;">想要增大难度的话，可以增加台阶的高度。</p> -->
				</view>		
			</view>
			<view class="con2">
				<u-section title="动作要领"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="" style="margin-left: 20rpx;margin-top: 8px;" v-html="listdata.banme">
					<!-- <p style="margin-top: 10px;">{{listdata.banme}}</p>
					<p style="margin-top: 5px;">2、患侧腿发力，跳上台阶，然后从台阶上跳下来。</p>
					<p style="margin-top: 5px;">3、跳跃动作过程中控制着地的力度。</p> -->
				</view>		
			</view>
			<view class="con2">
				<u-section title="呼吸"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="" style="margin-left: 20rpx;margin-top: 8px;" v-html="listdata.cname">
					<!-- <p style="margin-top: 10px;">{{listdata.cname}}</p> -->
				</view>		
			</view>
			<view class="con2">
				<u-section title="预期感受"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="" style="margin-left: 20rpx;margin-top: 8px;" v-html="listdata.dname">
					<!-- <p style="margin-top: 10px;">{{listdata.dname}}</p> -->
				</view>		
			</view>
			<view class="con2" style="margin-bottom: 100px;">
				<u-section title="常见错误"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
				<view class="" style="margin-left: 20rpx;margin-top: 8px;" v-html="listdata.fname">
					<!-- <p style="margin-top: 10px;">{{listdata.fname}}</p> -->
				<!-- 	<p style="margin-top: 5px;">解决：可通过落地时打开双臂的方式控制平衡。</p>
					<p style="margin-top: 5px;">错误：感觉难度过大或过小。</p>
					<p style="margin-top: 5px;">解决：可通过调整台阶高度来调整难易度。</p> -->
				</view>		
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				listdata:{}
				
			}
		},
		onLoad(e) {
			this.id = e.id
			this.xqlist()
		},
		created() {},
		methods:{
			//详情
			xqlist(){
				this.$u.post('/Recovery/ByDate', {
					id:this.id	
				})
				.then( res =>{
					if(res.code ==200){
						this.listdata = res.data
						if(this.listdata.xqioc){
							this.listdata.xqioc = this.listdata.xqioc.split(',')
						}
						if(this.listdata.jioc){
							this.listdata.jioc = this.listdata.jioc.split(',')
						}
						
						// console.log(this.listdata.jioc)
					}
				})	
			}			
		}
	}
	
</script>

<style lang="scss" scoped>
	.addview{
		position: fixed;
		bottom: 10%;
		right: 3%;
		.bf_but{
			background-color: #2979FF;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			z-index: 999;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.actionxqboss{
		width: 100%;
		.myVideoview{
			video{
				width: 100%;
			}	
		}
		.textview{
			width: 90%;
			margin-left: 5%;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			p:first-child{
				font-size: 32rpx;
				margin-bottom: 20rpx;
				font-weight: bold;
				color: #333;
			}
			p:last-child{
				font-size: 24rpx;
				
				color: #666;
			}
			
		}
		.content{
			width: 90%;
			margin-left: 5%;
			margin-top: 30rpx;
			.con1{
				image{
					margin-top: 50rpx;
					width: 100%;
					height: 400rpx;
				}
			}
			.con2{
				margin-top: 50rpx;
				p{
					margin-top: 20rpx;
					font-size: 24rpx;
					color: #666;
				}
			}
		}
		
	}
	
</style>
