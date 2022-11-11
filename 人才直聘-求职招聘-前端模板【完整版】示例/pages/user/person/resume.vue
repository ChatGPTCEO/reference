<template>
	<view class="content">
		<view class="base-info space-between-algin bottom-line padding-height-20" @click="toUserEdit()">
			<view class="column">
				<view class="align-height">
					<text class="name">{{ resume.name }}</text>
					<text class="yzb yzb-bianji2 margin-left-20"></text>
				</view>
				<text class="text-color">{{ formatAge(resume.timeToWork) }}年经验 · {{ formatAge(resume.birthday) }}岁 · {{ resume.education }}</text>
				<view class="phone" v-if="resume.phone">
					<text>{{ hidePhone(resume.phone) }}</text>
					<!-- <text class="yzb yzb-dianhua1"></text> -->
				</view>
			</view>
			<image class="header" :src="resume.avatar || '/static/img/man.png'"></image>
		</view>
		<view class="skill width-100 padding-height-30 column">
			<view class="space-between-algin">
				<text class="text-title">个人优势</text>
				<text class="yzb yzb-bianji2" @click="toSkillEdit()"></text>
			</view>
			<text class="item-content ellipsis-twoline margin-height-20">{{ resume.personalSkill }}</text>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">求职状态</text>
			<view class="align-height">
				<picker @change="bindPickerChange" :value="workStatus" :range="workStatusArray">
					<input class="padding-10" disabled="true" style="text-align: right;" placeholder="请选择求职状态" v-model="workStatus" />
				</picker>
				<text class="yzb yzb-next margin-left-10"></text>
			</view>
		</view>
		<view class="expect column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">求职期望</text>
				<text class="yzb yzb-jia1" @click="toExpectEdit(0)" v-if="resume.jobExpectList.length < 5"></text>
			</view>
			<view class="column margin-top-10">
				<view class="column margin-top-10" v-for="(item, index) in resume.jobExpectList" :key="index" @click="toExpectEdit(item.id)">
					<view class="space-between-algin">
						<text class="text-sub-title">{{ item.postName }}</text>
						<text class="yzb yzb-next"></text>
					</view>
					<text class="text-color">{{ item.expectSalary }} . {{ item.industryName }}</text>
				</view>
			</view>
		</view>

		<view class="work-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">工作经历</text>
				<text class="yzb yzb-jia1" @click="toWorkEdit(0)"></text>
			</view>
			<view class="column margin-top-10" v-for="(item, index) in resume.workExpList" :key="index" @click="toWorkEdit(item.id)">
				<view class="space-between-algin">
					<text class="text-sub-title">{{ item.companyName }}</text>
					<view class="align-height">
						<text class="text-color-grey">{{ formatDates(item.startDate) }}-{{ formatDates(item.endDate) }}</text>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
				<text class="text-color">{{ item.postName }}</text>
				<text class="item-content ellipsis-twoline margin-height-20">{{ item.jobContent }}</text>
			</view>
		</view>

		<view class="pro-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">项目经历</text>
				<text class="yzb yzb-jia1" @click="toProEdit(0)"></text>
			</view>
			<view class="column margin-top-10" v-for="(item, index) in resume.proExpList" :key="index" @click="toProEdit(item.id)">
				<view class="space-between-algin">
					<text class="text-sub-title">{{ item.name }}</text>
					<view class="align-height">
						<text class="text-color-grey">{{ formatDates(item.startDate) }}-{{ formatDates(item.endDate) }}</text>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
				<text class="text-color">{{ item.role }}</text>
				<text class="item-content ellipsis-twoline margin-top-20">内容：{{ item.descr }}</text>
				<text class="item-content ellipsis-twoline margin-top-10" v-if="item.performance">业绩：{{ item.performance }}</text>
			</view>
		</view>

		<view class="edu-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">教育经历</text>
				<text class="yzb yzb-jia1" @click="toEduEdit(0)"></text>
			</view>
			<view class="column margin-top-10 width-100" v-for="(item, index) in resume.eduExpList" :key="index" @click="toEduEdit(item.id)">
				<view class="space-between-algin">
					<text class="text-sub-title">{{ item.school }}</text>
					<view class="align-height">
						<text class="text-color-grey">{{ formatDates(item.startTime) }}-{{ formatDates(item.endTime) }}</text>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
				<text class="text-color">{{ item.major }} {{ item.education }}</text>
			</view>
		</view>

		<!-- 	<view class="skill-item2 column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">技能标签</text>
				<text class="yzb yzb-jia1" @click="confirmDialog"></text>
			</view>
			<view class="skill-item">
				<view class="center-algin skill-item-item" v-for="(item, index) in skills" :key="index">
					<text class="item text-blue" @click="select(index)">{{ item }}</text>
					<view class="img_delete center-algin" @click="deleteImg(index)"><text class="text-white text-size-base text-color-inverse">X</text></view>
				</view>
			</view>
		</view> -->

		<!-- <view class="edu-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">资格证书</text>
				<text class="yzb yzb-jia1" @click="toCertEdit()"></text>
			</view>
			<view class="skill-item2">
				<text>英语六级</text>
				<text>计算机三级</text>
				<text>初级统计师</text>
				<text>一级建造师</text>
				<text>二级建造师</text>
				<text>高级统计师</text>
			</view>
		</view> -->
		<!-- 技能编辑 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<uni-popup-dialog
				id="dialogInput2"
				ref="dialogInput2"
				mode="input"
				:title="dialogTitle"
				:value="skillValue"
				placeholder="请输入技能信息(2-8字)"
				@confirm="dialogInputConfirm"
			></uni-popup-dialog>
		</uni-popup>
		<uni-fab ref="fab" :pattern="pattern" :content="contents" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script>
import mCell from '@/components/m-cell/m-cell.vue';
import { formatDate, calCurrentYear } from '@/common/date';
export default {
	components: {
		mCell
	},
	data() {
		return {
			skillContent: '',
			statusIndex: 0,
			workStatusArray: ['在职-暂不考虑', '在职-考虑机会', '在职-月内到岗', '离职-随时到岗'],
			resume: {},
			workStatus: null,
			skills: [],
			dialogTitle: '添加关键词',
			skillValue: '',

			horizontal: 'right',
			vertical: 'bottom',
			direction: 'vertical',
			pattern: {
				color: '#333',
				backgroundColor: '#fff',
				selectedColor: '#333',
				buttonColor: '#12ae85',
				iconColor: '#fff'
			},
			contents: [
				{
					iconPath: '/static/img/preview.png',
					selectedIconPath: '/static/img/preview.png',
					text: '预览',
					active: false
				},
				{
					iconPath: '/static/img/export.png',
					selectedIconPath: '/static/img/export.png',
					text: '导出',
					active: false
				}
			]
		};
	},
	onShow() {
		this.getResume();
	},
	methods: {
		trigger(e) {
			console.log(e);
			this.contents[e.index].active = !e.item.active;
			if (e.index == 0) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.resumePreview,
					query: {
						id: this.resume.id
					}
				});
			} else if (e.index == 1) {
				this.exportWord();
			}
		},
		
		async exportWord(){
			uni.showModal({
				title: '提示',
				content: '确定要导出模板简历吗？',
				success: res => {
					if (res.confirm) {
						this.doExport();
					}
				}
			});
		},
		
		async doExport(){
			uni.showLoading();
			let url = await this.$apis.exportResumeWord({id:this.resume.id});
			uni.hideLoading();
			if(url){
				this.$mRouter.push({
					route: this.$mRoutesConfig.resumeFile,
					query: {
						url: url,
					}
				});
			}
		},

		fabClick() {
			// uni.showToast({
			// 	title: '点击了悬浮按钮',
			// 	icon: 'none'
			// });
		},
		formatDates(time) {
			if (time == null || time === '') {
				return 'N/A';
			}
			let str = time.replace(/-/g, '/');
			let date = new Date(str);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'yyyy.MM');
		},

		formatAge(birthday) {
			return calCurrentYear(birthday);
		},

		async getResume() {
			this.resume = await this.$apis.getResume();
			this.workStatus = this.resume.jobStatus;
			if (this.resume.skills) {
				this.skills = this.resume.skills.split(',');
			}
		},

		async bindPickerChange(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.workStatus = this.workStatusArray[e.target.value];
			let param = {
				id: this.resume.id,
				jobStatus: this.workStatus
			};
			let res = await this.$apis.updateResumeBasic(param);
		},
		toUserEdit() {
			this.toEdit(this.$mRoutesConfig.userInfo);
		},
		toSkillEdit() {
			// this.toEdit(this.$mRoutesConfig.editSkill)
			this.$mRouter.push({
				route: this.$mRoutesConfig.editSkill,
				query: {
					id: this.resume.id,
					content: this.resume.personalSkill
				}
			});
		},
		toExpectEdit(id) {
			this.toEdit(this.$mRoutesConfig.editExpect, id);
		},
		toWorkEdit(id) {
			this.toEdit(this.$mRoutesConfig.editWork, id);
		},
		toProEdit(id) {
			this.toEdit(this.$mRoutesConfig.editPro, id);
		},
		toEduEdit(id) {
			this.toEdit(this.$mRoutesConfig.editEdu, id);
		},
		toCertEdit() {
			this.toEdit(this.$mRoutesConfig.editCert, 1);
		},

		toEdit(url, id) {
			this.$mRouter.push({
				route: url,
				query: {
					id: id
				}
			});
		},

		/**
		 * 打开提交信息
		 */
		confirmDialog() {
			if (this.skills.length == 8) {
				uni.showToast({
					icon: 'none',
					title: '最多添加8个技能标签'
				});
				return;
			}
			this.dialogTitle = '添加技能标签';
			this.$refs.dialogInput2.init();
			this.$refs.dialogInput.open();
		},

		/**
		 * 输入对话框的确定事件
		 */
		dialogInputConfirm(val) {
			console.log(val);
			if (!val) {
				uni.showToast({
					icon: 'none',
					title: '请输入内容'
				});
				return;
			}
			if (val.length < 2 || val.length > 8) {
				uni.showToast({
					icon: 'none',
					title: '请输入2-8个字'
				});
				return;
			}
			this.skills.push(val);
			this.$refs.dialogInput.close();
			this.updateSkills();
		},

		select(index) {
			this.dialogTitle = '修改技能标签';
			this.skillValue = this.skills[index];
			this.$refs.dialogInput.open();
		},

		deleteImg(index) {
			this.skills.splice(index, 1);
			this.updateSkills();
		},

		async updateSkills() {
			let skill = '';
			for (let i in this.skills) {
				skill = skill + ',' + this.skills[i];
			}
			skill = skill.substr(1, skill.length);
			let param = {
				id: this.resume.id,
				skills: skill
			};
			let res = await this.$apis.updateResumeBasic(param);
			if (res) {
				uni.showToast({
					icon: 'none',
					title: '添加成功'
				});
			}
		},

		hidePhone(phone) {
			return this.$mUtils.phoneHiden(phone);
		}
	}
};
</script>

<style lang="scss" scoped>
view {
	display: flex;
}

.text-title {
	font-size: $font-size-36;
	font-weight: bold;
	color: $font-color-000;
}

.text-sub-title {
	font-size: $font-base-more;
	font-weight: bold;
	color: $font-color-000;
}

.item-content {
	color: $uni-text-color;
}

.content {
	padding: 20upx;
	box-sizing: border-box;
}

.base-info {
	.name {
		font-size: 44upx;
		font-weight: bold;
	}

	.yzb-bianji2 {
		color: $font-color-000;
	}

	.header {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}
	.phone {
		color: $font-color-333;
		.yzb-dianhua1 {
			margin-left: 10upx;
			color: $main-color;
		}
	}
}

.yzb-jia1 {
	color: $font-color-333;
	font-weight: bold;
	font-size: 44upx;
}

.skill-item {
	padding: 20upx;
	flex-wrap: wrap;
	display: flex;
	.skill-item-item {
		position: relative;
		margin-right: 20upx;
	}
	.item {
		font-size: $uni-font-size-sm;
		padding: 12upx 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		// background-color: $border-color-base;
		border-radius: 8upx;
		// color: $font-color-666;
	}
	.del {
		color: $uni-color-error;
		position: relative;
		top: 0;
	}
	.img_delete {
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		background: rgba(234, 178, 178, 0.5);
		position: absolute;
		right: -8upx;
		top: -18upx;
		z-index: 10;
		align-items: center;
	}
	.text-blue {
		color: $main-color;
		border: 1upx solid $border-color-base;
		background-color: $border-color-base;
		// color: #ffffff;
		color: $font-color-666;
	}
	.text-normal {
		color: $font-color-666;
		border: 1upx solid $border-color-base;
	}
}
.edu-exp {
	margin-bottom: 100upx;
}
</style>
