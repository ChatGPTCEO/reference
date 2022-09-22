<template>
	<view>
		<u-navbar :is-back="true" title="动态列表"></u-navbar>
		<view class="content">
			<block v-for="(item,index) in dyList">
				<kgDynamics :dyInfo="item" :key="index"></kgDynamics>
				<view class="line">
					<u-line color="#f3e5e0" margin="5px 0px;" class="deviation"></u-line>
				</view>

			</block>
		</view>
	</view>

</template>
<script>
	import kgDynamics from "../../components/kg-dy/kg-dynamic.vue"
	export default {
		components: {
			kgDynamics
		},
		data() {
			return {
				
				dyList: [{
					id:1,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '我是你爸爸',
					pushTime: '2021-12-17 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://img0.baidu.com/it/u=414949344,2456456577&fm=26&fmt=auto',
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

					]
				}, {
					id:2,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '我是你爸爸',
					pushTime: '2021-12-01 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://img1.baidu.com/it/u=2966929674,3482533941&fm=26&fmt=auto',
						'https://img2.baidu.com/it/u=3020781581,1521691904&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=800',
					],
					tags: [{
							name: '入冬了',
							type: 'success'
						},
						{
							name: '男友之力',
							type: 'info'
						},

					]
				}, {
					id:3,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '我是你爸爸',
					pushTime: '2021-11-17 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://img1.baidu.com/it/u=2496446343,232656286&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=727',
						'https://img2.baidu.com/it/u=3020781581,1521691904&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=800',
						'https://img2.baidu.com/it/u=1124464975,937530718&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=725',
					],
					tags: [{
							name: '入冬了',
							type: 'success'
						},
						{
							name: '男友之力',
							type: 'info'
						},

					]
				}, {
					id:4,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '我是你爸爸',
					pushTime: '2021-10-27 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://img2.baidu.com/it/u=3611989852,2198941769&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500',
						'https://img1.baidu.com/it/u=2496446343,232656286&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=727',
						'https://img1.baidu.com/it/u=2966929674,3482533941&fm=26&fmt=auto',
						'https://img2.baidu.com/it/u=3020781581,1521691904&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=800',
						'https://img2.baidu.com/it/u=1124464975,937530718&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=725',
					],
					tags: [{
							name: '入冬了',
							type: 'success'
						},
						{
							name: '男友之力',
							type: 'info'
						},

					]
				}],
			};
		},
		
	};
</script>


<style lang="scss">

</style>
