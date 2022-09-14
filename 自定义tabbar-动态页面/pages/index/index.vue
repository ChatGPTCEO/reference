<template>
	<view   class="custom-template-page">
		 <view  class="scroll-view-bar">
			 <scroll-view :scroll-x="false" :scroll-y="true" :style="'width:100%;height:'+bodyHeight+'px;'">
				<template v-if="currentTemplate=='0'">
					 <default-home style="background-color: #F7F7F7;" v-if="currentTab==0"></default-home>
					 <default-category v-if="currentTab==1"></default-category>
					 <default-shop-car v-if="currentTab==2" :bodyHeight="bodyHeight"></default-shop-car>
					 <default-my style="background-color: #F7F7F7;" v-if="currentTab==3" 
								@loginOut="loginOut" @toNext="toNext"></default-my>
				</template>
				<!-- 模板1的内容区 -->
				<template v-if="currentTemplate=='1'">
					<t1Home v-if="currentTab==0"
							style="background-color: #FFFFFF;height: 100%;"
							@toMall="toMall"
							:navbarTitle="tabbarList[currentTab].title"></t1Home>
					<t1My 	v-if="currentTab==1"
							style="background-color: #F1F1F1;height: 100%;"
							@guide="guide" @loginOut="loginOut"
							:navbarTitle="tabbarList[currentTab].title"></t1My>
				</template>
				<!-- 模板2的内容区 -->
				<template v-if="currentTemplate=='2'">
					<t2Home v-if="currentTab==0"
							@toMall="toMall"
							:bodyHeight="bodyHeight"
							style="background-color: #F7F7F7;height:100%"></t2Home>
					<t2My 	v-if="currentTab==1"
							@guide="guide"
							@loginOut="loginOut"
							style="background-color: #F1F1F1;height: 100%;"
							:navbarTitle="tabbarList[currentTab].title"></t2My>
				</template>
				<!-- 模板3的内容区 -->
				<template v-if="currentTemplate=='3'">
					<t3Home v-if="currentTab==0"
							style="background-color: #FFFFFF;height: 100%;"
							@toMall="toMall" ></t3Home>
					<t3My v-if="currentTab==1"
							style="background-color: #F1F1F1;height: 100%;"
							@loginOut="loginOut"
							@guide="guide" ></t3My>
				</template>
				<!-- 模板5的内容区 -->
				<template v-if="currentTemplate=='4'">
					<t4Home v-if="currentTab==0"
							@toMall="toMall"
							:bodyHeight="bodyHeight"
							style="background-color: #F1F1F1;height:100%"></t4Home>
					<t4My 	v-if="currentTab==1"
							@guide="guide" 
							@loginOut="loginOut" 
							style="background-color: #F1F1F1;height: 100%;" 
							:navbarTitle="tabbarList[currentTab].title">
					</t4My>
				</template>
			</scroll-view>
		 </view>
		 <view   class="footer u-border-top " :style="'height:'+footerHeight+'px;'">
			 <customTabbar :colSpan="colSpan" :footerHeight="footerHeight" :currentTab="currentTab"
			 					:tabbarList="tabbarList" @changeTab="changeTab"></customTabbar>
		 </view>
	</view>
</template>

<script>
	import pageData from '@/util/pagedata.js';
	import customTabbar from '@/components/common/tabbar.vue'
	import t1Home from '@/components/template/template1/t1-home.vue';
	import t1My from '@/components/template/template1/t1-my.vue';
	import t2Home from '@/components/template/template2/t2-home.vue';
	import t2My from '@/components/template/template2/t2-my.vue';
	import t3Home from '@/components/template/template3/t3-home.vue';
	import t3My from '@/components/template/template3/t3-my.vue';
	import t4Home from '@/components/template/template4/t4-home.vue';
	import t4My from '@/components/template/template4/t4-my.vue';
	import defaultHome from '@/components/template/default/default-home.vue';
	import defaultCategory from '@/components/template/default/default-category.vue';
	import defaultShopCar from '@/components/template/default/default-shopCar.vue';
	import defaultMy from '@/components/template/default/default-my.vue';
	export default {
		components:{
		customTabbar,
		t1Home,t1My,
		t2Home,t2My,
		t3Home,t3My,
		t4Home,t4My,
		defaultHome,defaultCategory,defaultShopCar,defaultMy
		},
		data() {
			return {
				tabbarList:[],
				colSpan:2,		//tab数(col布局)
				currentTab:0,	//当前激活的tab项
				bodyHeight:0, //内容区高度
				footerHeight:0, //底部高度
			};
		},
		//监听模板变化
		watch: {
			currentTemplate:function(newValue){
				console.log("模板变了",newValue);
				this.currentTab=0;
				this.getTabbarList();
			}	
		},
		//初始化页面布局
		created:function(){
			this.initHeight();	
			this.$u.vuex("vuex_userInfo",{
				'name':"邦邦",
				'mobile':'18100001111',
				'company':'丹邦科技',
				'avatar':'/static/avatar.jpg'
			});
		},
		//初始化数据,底部的tabbar,激活的tab项
		onLoad:function(option){
			this.getTabbarList();
			if(option.activeTabItem!=null&&option.activeTabItem!=undefined){
				console.log("参数有带tab项过来",option.activeTabItem);
				this.currentTab=option.activeTabItem;
			}
		},
		methods:{
			initHeight:function(){
				let that = this;
				// #ifdef MP-WEIXIN
				let windowHeight = this.$u.sys().windowHeight;
				// #endif
				// #ifndef MP-WEIXIN
				let windowHeight = this.$u.sys().windowHeight;
				// #endif
				that.bodyHeight = windowHeight / 10 * 9;
				that.footerHeight=windowHeight/10;
			},
			//根据模板获取不同模板的底部tab菜单数据
			getTabbarList:function(){
				let templateId=this.currentTemplate;
				this.tabbarList= pageData.getBottomTabbarList(templateId);
				if(this.tabbarList.length>0){
					this.colSpan=Math.ceil(12/this.tabbarList.length);
				}
			},
		
			//tab切换,显示不同的子页面
			changeTab:function(tabbar,index){
				this.currentTab=index;
			},
			//进入商城
			toMall:function(data){
				console.log("跳转商城",data);
			},
			
			//导航菜单点击触发
			guide:function(data){
				console.log("guide",data);
				if(data.tabIndex==0){
					this.currentTab=0;
				}else if(data.tabIndex==2){
					this.currentTab=1;
				}else{
					this.globalUtil.utilAlert("error,未知页面");
				}
			},
			//退出登录
			loginOut:function(){
				console.log("退出登录");
				//this.$u.vuex("vuex_userInfo", {});
				this.$u.vuex('vuex_token', "");
				this.$u.vuex('currentTemplate', '0');
				this.$u.vuex('vuex_wxCode', "");
				this.$u.vuex('vuex_loginParam', {
					loginCode: '',
					loginPasswd: '',
				});
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/login/login',
				})
			},
			
			//跳转页面
			toNext:function(nextPage){
				let that=this;
				let url= nextPage.route;
				let params=nextPage.routeParam;
				if(url!=null&&url.length>0){
					console.log("跳转界面名称",nextPage.title);
					console.log("跳转界面",url);
					console.log("跳转界面所带参数",params);
					that.globalUtil.utilAlert("跳转界面!",url);
					/* this.$u.route({
						url: url,
						params: params
					}); */
				}
				else{
					that.globalUtil.utilAlert("跳转界面不存在!");
					return;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.custom-template-page{
	.footer{
		width: 100%;
		position: absolute;
		bottom: 2rpx;
		background-color: #FFFFFF;
	}
}
</style>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>
