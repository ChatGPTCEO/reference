import {statics} from '../statics.js';
import {mapState} from 'vuex';
import config from '../config.js';
export const common = {
	data(){
		return {
			statics:statics
		}
	},
	computed:{
		...mapState({
			globalDatas:state		=> state.datas.global,
			siteDatas:state			=> state.datas.site,
			skinColor:state			=> state.template.skinColor,
			memberToken:state   	=> state.member.mToken,
			latLng:state 			=> state.location.location,
			memberInfo:state   		=> state.member.member,
			parentId:state 			=> state.member.parentId
		}),
		
		getSkin(){
			let color = this.skinColor.toLowerCase();
			let color16 = color.charAt(0) == "#" ? color.substring(1, 7) :color;
			let r = parseInt(color16.substring(0, 2), 16);
			let g = parseInt(color16.substring(2, 4), 16);
			let b = parseInt(color16.substring(4, 6), 16);
			return {
				color:color,
				rgb:{r:r,g:g,b:b}
			}
		},
		tempColor(){
			return  this.getSkin.color;
		},
		tempColorRgb(){
			return this.getSkin.rgb;
		},
		checkLogin(){ //验证是否登录
			return true;
			if(this.memberToken === null) return false;
			return true;
		},
		checkStore(){ //检查是不是商户
			// return true;
			return false; 
		},
		
		getBtnStyle(){
			let style = 'background:'+this.tempColor+';color:#ffffff;';
			style+="box-shadow: 0px "+uni.upx2px(8)+"px "+uni.upx2px(32)+"px -"+uni.upx2px(8)+"px rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.3);";
			return style;
		},
		getBtnDisStyle(){
			let style = 'background:#F0F1F5;color:#AEB2C1;';
			return style;
		},
		getTagStyle(){
			let style = "background:rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.08);";
			style+='color:'+this.tempColor + ';';
			return style;
		},
		getBtnPlanStyle(){
			let style = 'border: 1px solid '+this.tempColor+';';
			style+='color:'+this.tempColor+';';
			return style;
		}
	},
	methods:{
		memberInfoCallback(){
			
		},
		getMemberInfo(){ 

		},
		
		locationAct(e){
			let lng = parseFloat(e.currentTarget.dataset.lng);
			let lat = parseFloat(e.currentTarget.dataset.lat);
			let name = e.currentTarget.dataset.name;
			let address = e.currentTarget.dataset.address;
			uni.openLocation({
				latitude:lat,
				longitude:lng,
				name:name,
				address:address
			});
		},
		copyAct(e){
			let txt  = e.currentTarget.dataset.txt;
			uni.setClipboardData({
				data:txt,
				success:()=>{
					uni.showToast({
						icon:'success',
						title:'复制成功'
					});
				},
			})
		},
		telAct(e){
			let phone = e.currentTarget.dataset.phone;
			uni.makePhoneCall({
				phoneNumber:phone
			});
		},
		openMiniapp(e){
			let appId = e.currentTarget.dataset.appid;
			if(appId == '') return; //不做任何处理
			uni.navigateToMiniProgram({
			  appId: appId,
			  extraData:{
				  'b2bId':config.b2bId
			  },
			  success(res) {
			    // 打开成功
			  }
			});
		},
		toLogin(){
			uni.navigateTo({
				url:'/pages/login'
			})
		},
		memberAct(){
			
		},
		memberLinkTo(e){ //如果需要用户登录的操作 不传data-link 就会调用用户登录的 memberAct
			if(this.checkLogin == true){
				let link = e.currentTarget.dataset.link;
				if(link){
					uni.navigateTo({
						url:link
					});
				}else{
					this.memberAct();
				}
			} else {
				this.toLogin();
			}
		},
		storeAct(){
			
		},
		storeLinkTo(e){
			if(this.checkLogin == false){
				this.toLogin();
			}else if(this.checkStore == false){
				uni.navigateTo({
					url:'/pages/store/apply'
				});
			}else{
				let link = e.currentTarget.dataset.link;
				if(link){
					uni.navigateTo({
						url:link
					});
				}else{
					this.storeAct();
				}
			}
		}
	},
}