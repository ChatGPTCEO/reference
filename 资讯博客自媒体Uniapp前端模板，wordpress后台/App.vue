<script>
	const API = require('@/api/base')
	
	export default {
		globalData: {
			user:''
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.globalData.user = API.getUser();
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	.item-container {
	    border-bottom: 2rpx solid #eaeaea;
	    padding: 30rpx 0
	}
	
	.item-container .read-more {
	    color: #2b85ff;
	    font-size: 30rpx;
	    margin-top: 14rpx;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-align-items: center;
	    align-items: center
	}
	
	.item-container .read-more .more {
	    height: 12rpx;
	    width: 20rpx;
	    margin-left: 10rpx
	}
	
	.item-container .source-top {
	    display: -webkit-flex;
	    display: flex;
	    height: 40rpx;
	    margin-bottom: 18rpx
	}
	
	.item-container .source-top .logo {
	    width: 28rpx;
	    height: 28rpx;
	    margin-right: 20rpx;
	    margin-top: 6rpx;
	    border-radius: 50%
	}
	
	.item-container .source-top .sourceName {
	    height: 40rpx;
	    font-size: 24rpx;
	    font-family: Helvetica;
	    color: #242a32;
	    line-height: 40rpx
	}
	
	.item-container .source-top .circle {
	    margin-top: 18rpx;
	    background: #242a32
	}
	
	.item-container .source-top .categoryName {
	    height: 40rpx;
	    font-size: 24rpx;
	    font-family: PingFangSC-Regular, PingFang SC;
	    font-weight: 400;
	    color: #242a32;
	    line-height: 40rpx
	}
	
	.item-container .centent-box {
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: space-between;
	    justify-content: space-between
	}
	
	.item-container .centent-box .text-box {
	    width: 506rpx;
	    -webkit-flex: 1;
	    flex: 1
	}
	
	.item-container .centent-box .text-box .title-box .title {
	    font-size: 32rpx;
	    font-family: PingFangSC-Semibold, PingFang SC;
	    font-weight: 600;
	    color: #242a32;
	    line-height: 48rpx;
	    display: inline
	}
	
	.item-container .centent-box .text-box .title-box .title-icon {
	    width: 30rpx;
	    height: 32rpx;
	    margin-left: 8rpx;
	    position: relative;
	    top: 4rpx
	}
	
	.item-container .centent-box .text-box .content {
	    font-size: 28rpx;
	    font-family: PingFangSC-Regular, PingFang SC;
	    font-weight: 400;
	    color: #5e656c;
	    margin-top: 10rpx
	}
	
	.item-container .centent-box .pic-box {
	    margin-left: 32rpx;
	    width: 188rpx;
	    height: 188rpx;
	    border-radius: 20rpx;
	    overflow: hidden
	}
	
	.item-container .centent-box .pic-box ._image {
	    width: 100%;
	    height: 100%
	}
	
	.item-container .has-read .text-box .content,
	.item-container .has-read .text-box .title-box .title {
	    color: #909ba8
	}
	
	.item-container .footer {
	    margin-top: 14rpx;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-align-items: center;
	    align-items: center;
	    color: #777;
	    font-size: 26rpx
	}
	
	.item-container .footer .flex {
	    -webkit-flex: 1;
	    flex: 1
	}
	
	.item-container .footer .comment,
	.item-container .footer .time {
	    font-size: 24rpx;
	    font-family: PingFangSC-Regular, PingFang SC;
	    font-weight: 400;
	    color: #909ba8
	}
	
	.item-container .footer .share {
	    height: 30rpx;
	    width: 30rpx
	}
	
	.share-btn {
	    padding: 0;
	    display: block;
	    height: 30rpx;
	    width: 30rpx;
	    border-radius: 0;
	    outline: none;
	    margin: 0;
	    background: transparent
	}
	
	.share-btn:after {
	    border: none;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABgklEQVRIS+3XvU6EQBAH8P9whVKYaOFbWF6phZZGX8MHsGCCJoaYeGQtfABfQ+uz0E5LW19AC41XXCxgzFzAEHJ37sKulTSQZZffDuzHQKiONE0PiqI4JqIhgLW6vHV+MMbszLvHzPcAthe0axe/kJYw8wWAE4tGvmCQRlqW5Q2ALwBncRxfZ1n2YdEJ6yppmm6KyFhEtupGlCTJmIh2NXBjzKX10ywrNlEieq5xYuZP/aZxHG+EjFRRItory/JV+6yw6IUxZva9fR3tSBXN8/yt9oLAi9BqIM8C9Q4vQ4PBv6FBYBvUO2yLeoVd0ArWpbXf4HJFm1O186jug3aOuC/aCfaBOsO+UCfYJ+oEM/MjgGG9y+iC32VDqTIV++lUNViNomi/K+p1AXGNOui2uKwz/7D31GfR626+6mDJXhvPsmx9Op2+A5gET2+bODMnmleKyN2fJPRVpEcAzgGsRFF06PoL4zpt59UfGWNOf3Jpy5+2rvBERJ4Gg8FVnue3+pBvbFiZLVp7X1wAAAAASUVORK5CYII\x3d);
	    background-size: cover;
	    border-radius: 0;
	    margin: 0
	}
	
	.circle {
	    width: 4rpx;
	    height: 4rpx;
	    background: #909ba8;
	    border-radius: 50%;
	    margin-right: 10rpx;
	    margin-left: 10rpx
	}
	
	.item-container {
	    border-bottom: 2rpxsolid #eaeaea;
	    padding: 30rpx0
	}
	
	.item-container .read-more {
	    color: #2b85ff;
	    font-size: 30rpx;
	    margin-top: 14rpx;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-align-items: center;
	    align-items: center
	}
	
	.item-container .read-more .more {
	    height: 12rpx;
	    width: 20rpx;
	    margin-left: 10rpx
	}
	
	.item-container .source-top {
	    display: -webkit-flex;
	    display: flex;
	    height: 40rpx;
	    margin-bottom: 18rpx
	}
	
	.item-container .source-top .logo {
	    width: 28rpx;
	    height: 28rpx;
	    margin-right: 20rpx;
	    margin-top: 4rpx;
	    border-radius: 50%
	}
	
	.item-container .source-top .sourceName {
	    height: 40rpx;
	    font-size: 24rpx;
	    font-family: Helvetica;
	    color: #242a32;
	    line-height: 40rpx
	}
	
	.item-container .source-top .circle {
	    margin-top: 18rpx;
	    background: #242a32
	}
	
	.item-container .source-top .categoryName {
	    height: 40rpx;
	    font-size: 24rpx;
	    font-family: PingFangSC-Regular, PingFang SC;
	    font-weight: 400;
	    color: #242a32;
	    line-height: 40rpx
	}
	
	.item-container .centent-box {
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: space-between;
	    justify-content: space-between
	}
	
	.item-container .centent-box .text-box {
	    width: 506rpx;
	    -webkit-flex: 1;
	    flex: 1
	}
	
	.item-container .centent-box .text-box .title-box .title {
	    font-size: 30rpx;
	    font-family: PingFangSC-Semibold, PingFang SC;
	    font-weight: 600;
	    color: #242a32;
	    line-height: 48rpx
	}
	
	.item-container .centent-box .text-box .title-box .title-icon {
	    width: 30rpx;
	    height: 32rpx;
	    margin-left: 8rpx;
	    position: relative;
	    top: 4rpx
	}
	
	.item-container .centent-box .text-box .fix-height {
	    height: 92rpx
	}
	
	.item-container .centent-box .text-box .content {
	    font-size: 28rpx;
	    font-family: PingFangSC-Regular, PingFang SC;
	    font-weight: 400;
	    color: #5e656c;
	    margin-top: 10rpx
	}
	
	.item-container .centent-box .pic-box {
	    margin-left: 32rpx;
	    width: 162rpx;
	    height: 162rpx;
	    border-radius: 20rpx;
	    overflow: hidden
	}
	
	.item-container .centent-box .pic-box wx-image {
	    width: 100%;
	    height: 100%
	}
	
	.item-container .has-read .text-box .content,
	.item-container .has-read .text-box .title-box .title {
	    color: #909ba8
	}
	
	.footer {
	    display: -webkit-flex;
	    display: flex;
	    -webkit-align-items: center;
	    align-items: center;
	    color: #777;
	    font-size: 26rpx;
	    margin-top: 28rpx;
	    height: 40rpx;
	    line-height: 40rpx
	}
	
	.footer .flex {
	    -webkit-flex: 1;
	    flex: 1
	}
	
	.footer .logo {
	    width: 28rpx;
	    height: 28rpx;
	    margin-right: 20rpx
	}
	
	.footer .categoryName,
	.footer .comment,
	.footer .sourceName,
	.footer .time {
	    font-size: 24rpx;
	    font-family: PingFangSC-Regular, PingFang SC;
	    font-weight: 400;
	    color: #909ba8;
	    height: 40rpx;
	    line-height: 40rpx
	}
	
	.footer .share {
	    height: 30rpx;
	    width: 30rpx
	}
	
	
	.text-overflow--1 {
	    -webkit-line-clamp: 1;
	}
	
	.text-overflow--1,
	.text-overflow--2 {
	    text-overflow: ellipsis;
	    overflow: hidden;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	}
	
	.text-overflow--2 {
	    -webkit-line-clamp: 2;
	}
	
	.text-overflow--3 {
	    -webkit-line-clamp: 3;
	}
	
	.text-overflow--3,
	.text-overflow--4 {
	    text-overflow: ellipsis;
	    overflow: hidden;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	}
	
	.text-overflow--4 {
	    -webkit-line-clamp: 4;
	}
</style>
