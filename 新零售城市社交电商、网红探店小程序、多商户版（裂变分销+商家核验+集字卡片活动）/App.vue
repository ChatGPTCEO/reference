<script>
	export default {
		onLaunch: function({
			query
		}) {
			console.log('App Launch')
			if (query.spread) {
				uni.setStorage({
					key: 'spread',
					data: query.spread
				})
			}
			// 获取定位
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					try {
						uni.setStorageSync('user_latitude', res.latitude);
						uni.setStorageSync('user_longitude', res.longitude);
					} catch {}
				}
			});
			// 获取基本配置
			this.$u.get('/api/config')
				.then(({
					data
				}) => {
					this.$store.commit('writeBaseInfo', data)
				})
			// 获取当前登录状态
			uni.getStorage({
				key: 'token',
				success: ({
					data
				}) => {
					this.$store.commit('login', data)
					this.$u.get('/api/user')
						.then(({
							data
						}) => {
							this.$store.commit('writeInfo', data)
						}).catch(() => {
							this.$store.commit('logOut')
						})
				}
			})

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	.image {
		width: 100%;
		height: 100%;
	}

	.bold {
		font-weight: bold;
	}

	.ml-auto {
		margin-left: auto;
	}

	.mr-auto {
		margin-right: auto;
	}



	// flex
	.acea-row {
		display: flex;
		flex-wrap: wrap
	}

	.acea-row.row-middle {
		align-items: center
	}

	.acea-row.row-top {
		align-items: flex-start
	}

	.acea-row.row-bottom {
		align-items: flex-end
	}

	.acea-row.row-center {
		justify-content: center
	}

	.acea-row.row-right {
		justify-content: flex-end
	}

	.acea-row.row-left {
		justify-content: flex-start
	}

	.acea-row.row-between {
		justify-content: space-between
	}

	.acea-row.row-around {
		justify-content: space-around;
	}

	.acea-row.row-column-around {
		flex-direction: column;
		justify-content: space-around;
	}

	.acea-row.row-column {
		flex-direction: column
	}

	.acea-row.row-column-between {
		flex-direction: column;
		justify-content: space-between
	}

	.acea-row.row-center-wrapper {
		align-items: center;
		justify-content: center
	}

	.acea-row.row-between-wrapper {
		align-items: center;
		justify-content: space-between
	}

	.bg-color {
		background-color: $uni-color-warning;
	}
</style>
