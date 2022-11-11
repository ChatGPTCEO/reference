<template>
    <view>
        <view class="filter-list search-filter-box" v-if="page === 'search' && searchShow">
            <view class="filter-title"></view>
            <view class="filter-box">
                <view
                    @tap="filterShow"
                    :class="'filter-text ' + (sortRulesObj.value && sortRulesObj.key !== '1' ? 'select' : '')"
                    :data-ptpid="'b58f-1445-a226-9e43-' + ptpId"
                    :data-type="1"
                >
                    {{ sortRulesObj.value || '默认排序' }}
                </view>
                <view @tap="filterShow" :class="'filter-text ' + (filterSelect ? 'select' : '')" :data-ptpid="'0d8f-112b-91b4-6093-' + ptpId" :data-type="2">筛选</view>
            </view>
        </view>
        <view :class="'filter-list search-filter-box label-filter ' + (page === 'new-label' ? 'new-label' : '')" v-if="page === 'label' || page === 'new-label'">
            <view class="filter-box label-box">
                <view
                    @tap="filterShow"
                    :class="'filter-text label ' + (sortRulesObj.value && sortRulesObj.key !== '1' ? 'select' : '')"
                    :data-ptpid="'b58f-1445-a226-9e43-' + ptpId"
                    :data-type="1"
                >
                    {{ sortRulesObj.value || '默认排序' }}
                </view>
                <view
                    @tap="filterShow"
                    :class="'filter-text label ' + (filterSelect ? 'select' : '')"
                    :data-ptpid="'0d8f-112b-91b4-6093-' + ptpId"
                    :data-type="2"
                    v-if="page !== 'new-label'"
                >
                    筛选
                </view>
            </view>
        </view>
        <view :class="'filter-list ' + className" v-if="page === 'school' || page === 'index'">
            <view class="school-rule-box">
                <view
                    @tap="sortTap"
                    :class="'school-rule ' + (sortSelectIndex === index ? 'active' : '')"
                    :data-active="sortSelectIndex === index ? 'active' : ''"
                    :data-index="index"
                    :data-obj="item"
                    :data-ptpid="'011f-112b-01b4-ff93-' + index"
                    v-for="(item, index) in sortRules"
                    :key="item.key"
                >
                    {{ item.value }}
                </view>
            </view>
            <view class="filter-box">
                <view
                    @tap="filterShow"
                    :class="'filter-text school-text ' + (jobtypeText ? 'select' : '')"
                    :data-ptpid="'92e7-14f1-8b16-7573-' + ptpId"
                    :data-type="0"
                    v-if="hasJobType"
                >
                    {{ jobtypeText || '岗位类型' }}
                </view>
                <view
                    @tap="filterShow"
                    :class="'filter-text mr0 school-text ' + (filterSelect ? 'select' : '')"
                    :data-ptpid="'f17e-17cc-9060-4dc4-' + ptpId"
                    :data-type="2"
                    v-if="hasSelect"
                >
                    筛选
                </view>
            </view>
        </view>
        <ani-box @masktap="close" type="popup" :visible="visible">
            <view :class="'jobfilter-box ' + (filterType === 0 ? 'jobtype-list' : filterType === 1 ? 'jobsort-list' : filterType === 2 ? 'jobfilter-list' : '')">
                <view class="jobfilter-title">
                    <view class="name">{{ filterType === 0 ? '选择兼职类型' : filterType === 1 ? '排序筛选' : filterType === 2 ? '筛选' : '' }}</view>
                    <view @tap="close" class="close" :data-ptpid="'e0da-1877-9719-d587-' + ptpId">取消</view>
                </view>
                <view class="jobfilter-context" v-if="filterType === 0">
                    <view class="jobfilter-left">
                        <view
                            @tap="getChild"
                            :class="'text ' + (jobTypeSelectIndex === index ? 'select' : '') + ' ani-bg'"
                            :data-id="item.classificationId"
                            :data-index="index"
                            :data-item="item"
                            :data-level="item.classLevel"
                            :data-name="item.name"
                            :data-ptpid="'01db-1c0c-8656-ab25-' + ptpId"
                            v-for="(item, index) in jobtypeList"
                            :key="item.classificationId"
                        >
                            {{ item.name }}
                        </view>
                    </view>
                    <view class="jobfilter-right">
                        <view
                            @tap="getType"
                            :class="'text ' + (jobTypeChildrenSelectIndex === index ? 'select' : '') + ' ani-bg'"
                            :data-id="item.classificationId"
                            :data-index="index"
                            :data-level="item.classLevel"
                            :data-name="item.name"
                            :data-parentid="item.parentId"
                            :data-ptpid="'5f55-18f9-9e5c-7f57-' + ptpId"
                            v-for="(item, index) in jobtypeList[jobTypeSelectIndex].secondClassifications"
                            :key="item.classificationId"
                        >
                            {{ item.name }}
                        </view>
                    </view>
                </view>
                <view class="jobfilter-context" v-if="filterType === 1">
                    <view
                        @tap="sortTap"
                        :class="'jobfilter-item ' + (sortSelectIndex === index ? 'select' : '') + ' ani-bg'"
                        :data-index="index"
                        :data-obj="item"
                        :data-ptpid="'3d36-14ca-ad6f-ab8a-' + ptpId"
                        v-for="(item, index) in sortRules"
                        :key="item.key"
                    >
                        {{ item.value }}
                    </view>
                </view>
                <block v-if="filterType === 2">
                    <view class="jobfilter-context">
                        <block v-if="hasCity">
                            <view class="jobfilter-subtitle">城市</view>
                            <view class="city-name">
                                <view class="city">{{ townName }}</view>
                                <view @tap="selectCity" class="change_city" data-ptpid="ae6b-12s9-8c0af-7fb0">切换</view>
                            </view>
                        </block>
                        <view class="jobfilter-subtitle">工作区域</view>
                        <view class="jobfilter-dot-box">
                            <view
                                @tap="dotTap"
                                :class="'jobfilter-dot ' + (areasSelectArr[index] ? 'select' : '') + ' ani-bg'"
                                :data-index="index"
                                :data-ptpid="'c4bb-1e23-b48c-de92-' + ptpId"
                                data-type="areasSelectArr"
                                v-for="(item, index) in areas"
                                :key="item.areaId"
                            >
                                {{ item.areaName }}
                            </view>
                        </view>
                        <view class="jobfilter-subtitle">结算方式</view>
                        <view class="jobfilter-dot-box">
                            <view
                                @tap="dotTap"
                                :class="'jobfilter-dot ' + (clearSelectArr[index] ? 'select' : '') + '  ani-bg'"
                                :data-index="index"
                                :data-ptpid="'ae6b-1af9-82af-7fb0-' + ptpId"
                                data-type="clearSelectArr"
                                v-for="(item, index) in clearingList"
                                :key="item.key"
                            >
                                {{ item.value }}
                            </view>
                        </view>
                        <view class="jobfilter-subtitle">性别要求</view>
                        <view class="jobfilter-dot-box sex-select">
                            <view
                                @tap="sexTap"
                                :class="'jobfilter-dot ' + (sexSelectIndex === index ? 'select' : '') + '  ani-bg'"
                                :data-index="index"
                                :data-ptpid="'0c90-107c-bff4-28a3-' + ptpId"
                                v-for="(item, index) in sexList"
                                :key="index"
                            >
                                {{ item }}
                            </view>
                        </view>
                    </view>
                    <view class="jobfilter-btn-box">
                        <view @tap="reset" class="reset-btn jobfilter-btn" :data-ptpid="'4bbc-1072-a53e-0179-' + ptpId">
                            <view class="iconfont iconreplace"></view>
                            重置
                        </view>
                        <view @tap="sure" class="sure-btn jobfilter-btn" :data-ptpid="'ea4c-1c14-8104-1258-' + ptpId">确定</view>
                    </view>
                </block>
            </view>
        </ani-box>
    </view>
</template>

<script>
import aniBox from '@/components/aniBox/index';

export default {
    components: {
        aniBox
    },
    data() {
        return {
            visible: false,// 弹框状态
            filterType: '',

            sortRulesObj: {
                key: '',
                value: ''
            },

            jobtypeText: '',
            sortSelectIndex: 0,
            jobTypeName: '',
            jobTypeSelectIndex: 0,
            jobTypeSelectRealIndex: 0,
            jobTypeChildrenSelectIndex: 0,
            jobTypeChildrenSelectRealIndex: 0,
            sexList: ['不限', '男生可做', '女生可做'],
            areasSelectArr: [true],
            clearSelectArr: [true],
            sexSelectIndex: 0,
            areasRealSelectArr: [true],
            clearRealSelectArr: [true],
            sexRealSelectIndex: 0,

            filterObj: {
                classIds: '',
                parentClassIds: '',
                clearingForms: '',
                areaIds: '',
                sexRequire: 0
            },

            filterSelect: false,
            preSex: '',
            townName: '',
            searchShow: '',
        };
    },
    props: {
        page: {
            type: String,
            default: 'index'
        },
        sortRules: {
            type: Array,
            default: () => []
        },
        jobtypeList: {
            type: Array,
            default: () => [
				{
				    secondClassifications: []
				}
			]
        },
        clearingList: {
            type: Array,
            default: () => []
        },
        areas: {
            type: Array,
            default: () => []
        },
        className: {
            type: String,
            default: 'index'
        },
        hasSelect: {
            type: Boolean,
            default: true
        },
        hasJobType: {
            type: Boolean,
            default: true
        },
        typeIndex: {
            type: Number,
            default: 0
        },
        ptpId: {
            type: String,
            default: ''
        },
        nowFilterData: {
            type: Object,
            default: () => ({})
        },
        controlPop: {
            type: String,
            default: ''
        },
        hasCity: {
            type: Boolean,
            default: false
        },
        userSex: {
            type: null,
            default: ''
        }
    },
    watch: {
        visible: {
            handler: function (e) {
                this.$emit('visitorChange', {
                    detail: e
                });
            },

            immediate: true,
            deep: true
        },

        userSex: {
            handler: function (e) {
                if (this.preSex !== e) {
                    this.preSex = e;
                    this.setData({
                        sexSelectIndex: e || 0,
                        sexRealSelectIndex: e || 0,
                        filterSelect: e > 0
                    });
                }
            },

            immediate: true,
            deep: true
        },

        nowFilterData: {
            handler: function () {
                this.searchInit();
            },

            immediate: true,
            deep: true
        },

        controlPop: {
            handler: function () {
				this.visible = false;
            },

            immediate: true
        }
    },
    mounted: function () {
        this.filterObj = {
            classIds: '',
            parentClassIds: '',
            clearingForms: '',
            areaIds: '',
            sexRequire: 0
        };

        if (this.userSex) {
            this.filterObj.sexRequire = this.userSex;
            this.setData({
                sexSelectIndex: this.userSex || 0,
                sexRealSelectIndex: this.userSex || 0,
                filterSelect: this.userSex > 0
            });
        }

        if (this.hasCity) {
			this.townName = app.globalData.userData.townName || '杭州';
        }

        if ('school' === this.page) {
			this.sortSelectIndex = -1;
        }
    },
    methods: {
        searchInit: function () {},
		// 打开筛选弹窗
        filterShow: function (e) {
			let t = e.currentTarget.dataset.type;
			this.visible = true;
			this.filterType = t;
		},
		// 默认、离我近、最新点击
        sortTap: function (e) {
			let a = e.currentTarget.dataset;
			let r = a.obj;
			let s = a.index;
			this.sortRulesObj = r;
			this.sortSelectIndex = s;
			this.visible = false;
			this.filterType = '';
			// 传递数据到父组件方法
			this.$emit('change', {detail: this.filterObj, sortRules: r.key});
		},
		// 点击一级类目
        getChild: function (e) {
			let t = e.currentTarget.dataset;
			let a = t.index;
			let r = t.name;
			this.jobTypeName = r;
			this.jobTypeSelectIndex = a;
			this.jobTypeChildrenSelectIndex = 0;
		},
		// 点击二级类目
        getType: function (e) {
			let a = e.currentTarget.dataset;
			let r = a.index;
			let s = a.id;
			let i = a.name;
			let l = a.level;
			let n = a.parentid;
			if (1 === l) {
			    if (0 === s) {
			        this.filterObj.parentClassIds = '';
			    } else {
			        this.filterObj.parentClassIds = s;
			    }
			    delete this.filterObj.classIds;
			} else {
			    this.filterObj.parentClassIds = n;
			    this.filterObj.classIds = s;
			}
			this.jobTypeSelectRealIndex = this.jobTypeSelectIndex;
			this.jobTypeChildrenSelectRealIndex = r;
			this.jobTypeChildrenSelectIndex = r;
			this.visible = false;
			this.filterType = '';
			this.jobtypeText = 1 === l ? (0 === s ? '' : this.jobTypeName ? this.jobTypeName : this.jobtypeList[0].name) : i;
			// 传递数据到父组件方法
			this.$emit("change",{detail:this.filterObj,sortRules:this.sortRulesObj.key});
		},
		// 工作区域、结算方式选择
        dotTap: function (t) {
			let that = this;
			let r = t.currentTarget.dataset;
			let s = r.index;
			let i = r.type;
			if (0 === s) {
				for(let j = 0; j < this[i].length; j++) {
					this.$set(this[i],j,false);
				}
				this.$set(this[i],s,true);
			} else {
			    let l;
				this.$set(this[i],0,false);
				this.$set(this[i],s,!this[i][s]);
				if (
					this[i].every((e,index)=>{
						return !e;
					})
				) {
					// arrayData[0] = true;
					this.$set(this[i],0,true);
				}
			}
		},
		// 性别选择
        sexTap: function (e) {
			let t = e.currentTarget.dataset.index;
			
			if (this.sexSelectIndex !== t) {
			    if (0 === t && '' === this.userSex) {
			        this.filterObj.sexRequire = '';
			    } else {
			        this.filterObj.sexRequire = t;
			    }
				this.sexSelectIndex = t;
			}
		},
		// 重置
        reset: function () {
			this.areasSelectArr = [true];
			this.clearSelectArr = [true];
			this.sexSelectIndex = +this.userSex || 0;
		},
		// 重置所有数据
        resetAllData: function () {},
		// 确定选择
        sure: function () {
			let that = this;
			
			if (this.areas.length) {
			    this.filterObj.areaIds = this.areasSelectArr
			        .map(function (t, a) {
			            let r = (that.areas[a] && that.areas[a].areaId) || '';
			
			            if (t && a > 0 && (0 === r || r)) {
			                return r;
			            }
			        })
			        .filter(function (e) {
			            return 0 === e || e;
			        })
			        .join(',');
			}
			if (this.clearingList.length) {
			    this.filterObj.clearingForms = this.clearSelectArr
			        .map(function (t, a) {
			            let r = (that.clearingList[a] && that.clearingList[a].key) || '';
			
			            if (t && a > 0 && ('0' === r || r)) {
			                return r;
			            }
			        })
			        .filter(function (e) {
			            return '0' === e || e;
			        })
			        .join(',');
			}
			
			this.areasRealSelectArr = this.areasSelectArr;
			this.clearRealSelectArr = this.clearSelectArr;
			this.sexRealSelectIndex = this.sexSelectIndex;
			this.visible = false;
			this.filterType = "";
			this.filterObj.sexRequire = this.sexSelectIndex;
			this.checkFilterSelect();
			// 返回数据到父组件
			this.$emit("change",{detail:this.filterObj,sortRules: this.sortRulesObj.key});
		},

		// 关闭弹框，赋值
		close: function () {
		    if (0 === this.filterType) {
		        this.jobTypeSelectIndex = this.jobTypeSelectRealIndex;
		        this.jobTypeChildrenSelectIndex = this.jobTypeChildrenSelectRealIndex;
		    }
		    if (2 === this.filterType) {
		        this.areasSelectArr = this.areasRealSelectArr;
		        this.clearSelectArr = this.clearRealSelectArr;
		        this.sexSelectIndex = this.sexRealSelectIndex;
		    }
			this.visible = false;
			this.filterType = '';
		},
		// 修改筛选
        checkFilterSelect: function () {
			let e = this.filterObj;
			this.filterSelect = e.areaIds || e.clearingForms || e.sexRequire;
		},

        selectCity() {}
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
