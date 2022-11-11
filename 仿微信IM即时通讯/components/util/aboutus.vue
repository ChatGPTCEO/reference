<template>
	<view class="fullscreen" :class="tabbar?'isfooter':''">
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" :interval="interval" duration="500">
			<swiper-item v-for="(item,index) in runshow" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="padding-lr-xl">
			<view class="about-bottom flex flex-direction padding-lr-xl">
				<button @click="naviTo(haslogin?'index/index':auditmode.url)" :class="'bg-'+btnstyle" class="cu-btn lg round padding-sm margin-tb margin-lr-xl">{{auditmode.text}}</button>
				<view class="text-center margin-top-sm" v-if="auditmode.status && !haslogin && auditmode.login!=''" @click="naviTo('auth/index')">
					<text class="text-lg" :class="'text-'+btnstyle">{{auditmode.login}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		name: 'aboutus',
		props: {
			haslogin : {
				type:Boolean,
				default:false
			},
			auditmode:{
				type:Object,
				default:function(){
					return {
						status:false,
						text:'立即体验',
						url:'auth/index',
						login:''
					};
				}
			},
			runshow:{
				type:Array,
				default:function(){
					return [];
				}
			},
			interval:{
				type:Number,
				default:3000
			},
			btnstyle:{
				type:String,
				default:"bg-gradual-pink"
			},
			tabbar:{
				type:Boolean,
				default:false
			}
		},methods:{
			naviTo(page,data){
				return core.navito(page,data);
			}
		}
	}
</script>

<style>
	.about-bottom{position: fixed; bottom: 12vh; width: 100%; left: 0;}
	.fullscreen>.screen-swiper{height: 100%;}
	.fullscreen{width: 100%; top: 0px; left: 0; bottom: 0; position: absolute;}
	.fullscreen.isfooter{bottom: 50px;}
</style>