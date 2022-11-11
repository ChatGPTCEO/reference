<style lang="scss">
@import "uview-ui/index.scss";
</style>

<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
}
</script>

<style>
@import url("/static/iconfont/iconfont.css");

page {
	background-color: #f1f3f8;
  margin: 0 auto;
}
.container {
  width: 690rpx;
  margin: 0 auto !important;
}

.none {
  display: none;
}
.u_icon {
  display: inline-block !important;
}
.color {
  color: #00B38A;
}
.text-danger {
  color: #FF0000;
}
.price_color {
  color: #FF0000;
}

/* 按钮 satrt */
button {
  padding: 0 !important;
}
.luckbtn {
  width: 100%;
  border-radius: 3px;
  text-align: center;
  display: block;
  padding: 16rpx 0;
}
.luckbtn-default {
  background-color: #00B38A;
  color: #fff;
}
.luckbtn-payment {
  background-color: #d8b66c;
  color: #fff;
}
.luckbtn-weixin {
  background-color: #1AAD19;
  color: #fff;
}
.luckbtn-secondary {
  background-color: #6c757d;
  color: #fff;
  width: 100%;
  border-radius: 3px;
  text-align: center;
  display: block;
  padding: 16rpx 0;
}
.luckbtn-danger {
  background-color: #FF0000;
  color: #fff;
}
/* 按钮 end */

/* 公共板块 常规 start */
.luckbox {
  background-color: #fff;
  margin: 0 auto;
  padding: 30rpx 30rpx 30rpx 30rpx !important;
  border-radius: 3px;
  overflow: hidden;
}
.luckbox .top {
  padding-bottom: 30rpx;
}
.luckbox .top .title {
  font-weight: 600;
  letter-spacing: 2px;
  position: relative;
  padding-left: 26rpx;
  color: #666;
  font-size: 24rpx;
}
.luckbox .top .title::before {
  position: absolute;
  top: 8rpx;
  left: 0;
  width: 10rpx;
  height: 20rpx;
  border-radius: 32rpx;
  background: #00B38A;
  content: '';
}
.luckbox .top .more {
  float: right;
  color: #999;
  font-size: 24rpx;
  padding-top: 5px;
}
.luckbox .bd {}
/* 公共板块 常规 end */

/* form start */
.luckform .weui-cell::before {
  right: 16px;
}
.luckform .items {
  background-color: #fff;
  overflow: hidden;
  font-size: 28rpx;
  border-radius: 3px;
}
.luckform .items .top {
  padding: 32rpx;
}
.luckform .items .top .title {
  font-weight: 400;
}
.luckform .items .icon_question {
  margin-left: 3px;
}
.luckform .items .span_required {
  color: #FF0000;
  margin-left: 3px;
}
.luckform .items .span_remark {
  color: #999;
  margin-left: 3px;
  font-size: 24rpx;
}
.luckform .custom_checkbox .box {
  width: 100%;
  margin-bottom: -10rpx;
  overflow: hidden;
}
.luckform .custom_checkbox .box span {
  background-color: #eee;
  margin-right: 2%;
  float: left;
  margin-bottom: 10px;
  font-size: 28rpx;
  text-align: center;
  padding: 8px 12px;
  border-radius: 3px;
}
.luckform .custom_checkbox .box span.on {
  background-color: #00B38A;
  color: #fff;
}
.luckform .radio-group {
  margin-left: -10px;
  margin-bottom: -10px;
}
.luckform .radio-group .radio {
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
.luckform .remind {
  display: flex;
  font-size: 24rpx;
  padding-left: 2px;
  color: #666;
}
.luckform .remind .txt {
  margin-left: 2px;
  padding-top: 2px;
}
.luckform .remind .link {
  color: #00B38A;
}
/* form end */

/* post list start */
.post_list {
  padding-top: 30rpx;
  padding-bottom: 30rpx;
}
.post_list .item {
  background-color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 30rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
  position: relative;
}
.post_list .item .tips {
  position: absolute;
	width: 50px;
	height: 22px;
	line-height: 22px;
  background: #00B38A;
  border-radius: 13px 0px 0px 13px;
  font-size: 24rpx;
  color: #fff;
  text-align: center;
  right: 0;
}
.post_list .item.item_tips .title {
	max-width: 86%;
}
.post_list .item:last-child {
  margin-bottom: 0;
}
.post_list .items .top {
	overflow: hidden;
}
.post_list .items .title {
	float: left;
  margin-bottom: 20rpx;
}
.post_list .tags {
	margin-top: 10px;
  font-size: 14px;
  display: none;
}
.post_list .tag_item {
	margin-top: 6px;
	overflow: hidden;
}
.post_list .tag_item .tag_title {
	color: #666;
	float: left;
	width: 140rpx;
  white-space: nowrap;
  overflow: hidden;
}
.post_list .tag_item .tag_values {
	float: left;
	margin-bottom: -6px;
  width: 490rpx;
}
.post_list .sp {
	display: inline-block;
	padding: 0 10px;
	height: 19px;
	text-align: center;
	line-height: 19px;
	border-radius: 10px;
	font-size: 12px;
	margin-right: 5px;
	margin-bottom: 6px;
}
.post_list .sp1 {
  background-color: #E2FCF6;
  color: #00B38A;
}
.post_list .sp2 {
  background-color: #FFEBE2;
  color: #FA5508;
}
.post_list .sp3 {
  background-color: #E3F2FD;
  color: #0F9FFF;
}
.post_list .items .types {
	font-size: 24rpx;
	color: #666;
	margin-left: -20rpx;
  overflow: hidden;
}
.post_list .items .type_item {
  float: left;
  margin-left: 20rpx;
}
.post_list .item_foot {
  font-size: 24rpx;
  margin-top: 30rpx;
  padding-top: 30rpx;
  border-top: 1px solid #f5f5f5;
  overflow: hidden;
  display: none;
}
.post_list .item_foot .user_info {
  display: flex !important;
  align-items: center;
  flex-wrap: nowrap;
  float: left;
  overflow: hidden;
}
.post_list .item_foot .user_info .txtcontent {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post_list .item_foot .user_info .avatar img {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  vertical-align: top;
  object-fit: cover;
}
.post_list .item_foot .user_info .name {
  font-size: 24rpx;
  margin-left: 5px;
}
.post_list .item_foot .user_info .company {
  font-size: 24rpx;
  margin-left: 3px;
}
/* post list end */

/* payment start */
.payment {}
.payment .item {
	width: 100%;
	height: 120rpx;
	line-height: 120rpx;
	overflow: hidden;
	border-bottom: 1px solid #f5f5f5;
  font-size: 28rpx;
}
.payment .item .left {
	float: left;
}
.payment .item .icon {
	width: 54rpx;
  height: 54rpx;
  vertical-align: middle;
}
.payment .item .txt {
	margin-left: 5px;
}
.payment .item i {
	float: right;
}
.payment .item i:before {}
.payment .item.on i:before {
	color: #f4645f;
  content: '\e731';
}
.payment_foot {
  margin-top: 30rpx;
}
.payment_foot .description {
	color: #666;
	font-size: .875rem;
	margin-bottom: 30rpx;
}
.payment_foot .description .price_color {
	font-size: 40rpx;
  margin-right: 3px;
}
.payment_foot .pay_qrcode .msg {
	width: 150px;
	text-align: center;
	font-size: .875rem;
	letter-spacing: 3px;
}
.payment_foot .pay_qrcode .image {
	border: 1px solid #eee;
	width: 150px;
	height: 150px;
	line-height: 150px;
	text-align: center;
	margin-bottom: 5px;
	overflow: hidden;
}
.payment_foot .pay_qrcode .image img {
	max-width: 100%;
	max-height: 100%;
}
/* payment end */
</style>
