<template>
	<view>
		<map id="map" ref="map" :style="'width: ' + width + '; height: ' + height + ';'" :scale="map.scale" @regionchange="regionchange"
		 @updated="updated" :latitude="map.latitude" :longitude="map.longitude" :markers="covers" @callouttap="de" @markertap="de">
		</map>
		<u-popup :show="show" mode="center"  @close="close" @open="open" >
			<view class="neb">
				<view class="usebod">
					<u-icon :label="userData.name" size="35" :name="userData.logo" labelSize="16" labelColor="#191919b5"></u-icon>
				</view>
				<view class="jiesuo" v-if="nid==0">
					<!-- <ad-rewarded-video adpid="1260510717" :loadnext="true" v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
					  <button :disabled="loading" :loading="loading" class="tongx">看视频解锁秘密~</button>
					  <view v-if="error">{{error}}</view>
					</ad-rewarded-video> -->
					<u-button type="primary"  text="5个花瓣可以查看哦~" @click="jiesuo()"></u-button>
				</view>
				<view class="neidfong" v-if="nid==1">
					{{nbody}}
				</view>
			</view>
			
		</u-popup>
		<!-- <view class="linghuo">
					<view class="u-demo-block__content">
						<view class="u-page__tag-item">
							<u-search
								v-model="value"
								placeholder="请输入口令"
								:show-action="false"
								margin="0"
								@search="search"
							></u-search>
						</view>
					</view>
		</view> -->
	</view>
</template>

<script>
	// import zjMarker()
	var map;
	export default {
		data() {
			return {
				value:"",
				show: false,
				height: '500px',
				width: '500px',
				nid:0,
				nbody:'',
				map: {
					scale: 7,
					latitude: 39.909,
					longitude: 116.39742
				},
				covers: [{
					latitude: 39.909,
					longitude: 116.39742
				}],
				list: [],
				load: true,
				userData:{},
				userInfo:null
			};
		},
		onLoad() {
			// 创建地图上下文
			map = uni.createMapContext('map', this);

			uni.getSystemInfo({
				success: res => {
					this.height = res.windowHeight + 'px';
					this.width = res.windowWidth + 'px';
				}
			});

			this.location();


		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo=userInfo;
			}
			
		},

		methods: {
			search(){
				this.nid=0;
				uni.$u.http.post('Note/kouling',{aname:this.value}).then(res => {
					console.log(res)
					if(res.data.length>0){
						this.userData=res.data[0];
						this.show = true
					}else{
						uni.$u.toast('口令有误！')
					}
					
				})
			},
			jiesuo(){
				uni.$u.http.post('Detailed/pay',{id:this.userData.id,uid:this.userInfo.id}).then(res => {
					console.log(res)
					if(res.code==200){
						this.nbody=res.data;
						this.nid=1;
					}else{
						uni.$u.toast(res.msg)
					}
					
					
				})
			},
			close() {
			        this.show = false;
					
			        // console.log('close');
			      },
			open(){
			},	  
			test() {
				map.getRegion({
					success: res => {
						uni.$u.http.post('Note/dituList',res.northeast).then(itme => {
							// console.log(res)
							this.list=itme.data
							map.getScale({
								success: ress => {
									
								// console.log(111,ress)
									this.covers = this.getFortMatMarkerList(res.northeast, res.southwest, ress.scale, this.list)
								}
							})
						})
						
						
					}
				})
			},
			//根据东北 西南经纬度 以及后台返回标记点 格式化成小程序marker点
			getFortMatMarkerList(northeast, southwest, scale, backendMarkerList) {
				// console.log(22,northeast, southwest, scale,backendMarkerList)
				//屏幕中显示的经度的长度和纬度的长度
				let mapWidth = southwest.longitude - northeast.longitude;
				let mapHeight = northeast.latitude - southwest.latitude;
				//将屏幕中地图分割的横向 格子数和 纵向格子数
				let widthSize = scale;
				let heightSize = widthSize + parseInt(scale / 2);
				//计算每个格子的经纬度的长度
				let unitWidth = mapWidth / widthSize ;
				let unitHeight = mapHeight / heightSize ;
				// console.log(widthSize,heightSize)
				// console.log(unitWidth,unitHeight)
				let pointData = {};
				backendMarkerList.forEach(latLng => {
					//如果点在显示范围内
					if (latLng.latitude < northeast.latitude && latLng.latitude > southwest.latitude &&
						latLng.longitude < northeast.longitude && latLng.longitude > southwest.longitude) {
						let relativeX = latLng.longitude - northeast.longitude;
						let relativeY = latLng.latitude - southwest.latitude;
						//计算出这个点，处于哪个格子
						let x = parseInt(Math.floor(relativeX / unitWidth));
						let y = parseInt(Math.floor(relativeY / unitHeight));
						if (x < 0 || y < 0) {
							console.log('点位不在格子内', '失败');
						}
						//生成单元格点位数据
						let pointKey = x + ',' + y;
						if (pointData[pointKey] == undefined) {
							pointData[pointKey] = [];
						}
							pointData[pointKey].push(latLng);
					}
				});
				// console.log('pointData', pointData.length);

				let resultMapArray = [];
				for (let y = 0; y < heightSize; y++) {
					for (let x = 0; x < widthSize; x++) {
						let pointKey = x + ',' + y;
						//筛选没有充电站点位的格子
						if (pointData[pointKey] != undefined) {
							let markerItem = {};
							//聚合点与单点共存 , 长度等于一 不聚合点
							if (pointData[pointKey].length == 1) {
								// console.log('不聚合点', pointData[pointKey][0]);

								markerItem = {
									id: pointData[pointKey][0].id,
									
									latitude: pointData[pointKey][0].latitude,
									longitude: pointData[pointKey][0].longitude,
									iconPath: pointData[pointKey][0].logo,
									width: 30,
									height: 30
								}

								// let iconPath = pointData[pointKey][0].ScanAndCharge == 1 ? '/img/scanMarkerIcon.png' : '/img/markerIcon.png';
								// markerItem = new zjMarker(pointData[pointKey][0].longitude, pointData[pointKey][0].latitude, pointData[pointKey][0].StationID, {
								//   iconPath: iconPath
								// })
								//长度大于一 聚合点
							} else if (pointData[pointKey].length > 1) {
								// console.log('聚合点');
								markerItem = {
									id: pointData[pointKey][0].id,
									latitude: pointData[pointKey][0].latitude,
									longitude: pointData[pointKey][0].longitude,
									iconPath: 'http://ksimges.oss-cn-hangzhou.aliyuncs.com/ling.png',
									width: 30,
									height: 30
								}
							}
							resultMapArray.push(markerItem);
						}
					}
				}
				// console.log('resultMapArray', resultMapArray.length);
				return resultMapArray;
			},
			updated() {
				// console.log('渲染完成');
			},
			// 当视野发生改变
			regionchange() {
				// console.log('当视野发生改变');
				this.test();
				
			},
			//定位当前
			location() {
				// console.log('开始获取地址');
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						// console.log('地址获取成功,切换到目标点nvue', res);
						map.moveToLocation({
							latitude: res.latitude,
							longitude: res.longitude
						})
						// this.getList(res.latitude,res.longitude);
					},
					fail: () => {
						console.log('地理位置获取失败');
					}
				});
			},
			
			de(i) {
				this.nid=0;
				// console.log('i', i,this.list);
				let id=i.detail.markerId;
				for(let m=0;m<this.list.length;m++){
					if(this.list[m].id===id){
						 this.userData=this.list[m];
							this.show = true
						break;
					}
				}
				// // let a = this.list[i.detail.markerId];
				// uni.showModal({
				// 	title: '用户：' + a.name,
				// 	content: a.text
				// });
			},
			onadload(e) {
			      console.log('广告数据加载成功');
			    },
			    onadclose(e) {
			      const detail = e.detail
			      // 用户点击了【关闭广告】按钮
			      if (detail && detail.isEnded) {
			        // 正常播放结束
			        console.log("onadclose " + detail.isEnded);
					 this.jiesuo()
			      } else {
			        // 播放中途退出
			        console.log("onadclose " + detail.isEnded);
			      }
			    },
			    onaderror(e) {
			      // 广告加载失败
			      console.log("onaderror: ", e.detail);
			    }
		}
	};
</script>

<style lang="scss">
	.linghuo{
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		top: 7vh;
		border-radius: 10rpx;
		padding: 10rpx;
		background-color: #dcdcdc70;
		display:block;
	}


	.u-popup-slot {
		width: 200px;
		height: 150px;
		@include flex;
		justify-content: center;
		align-items: center;
	}
	.u-popup__content{
		border-radius: 20rpx;
		padding: 40rpx 40rpx 0rpx 40rpx;
		background-color: #fffffff0 !important;
	}
	.jiesuo{
		padding: 80rpx 40rpx;
	}
	.neb{
		width: 70vw;
	}
	.neidfong{
		margin-top: 20rpx;
		color: #9c661d;
	}
	// button{
		
	// 	text-align: center;
	// 	background-color: #0087ca; 
	// 	 color: #fff;
	// 	 border-radius: 10rpx;
		
	// }
</style>