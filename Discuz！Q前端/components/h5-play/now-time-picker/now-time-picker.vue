<template>
  <view class="time">
    <picker :range="years" @change="yearChange" mode="multiSelector" @columnchange="wctchPicker">
      {{ timeValue }}
    </picker>
  </view>
</template>

<script>
export default {
  props: {
    timeValue: {
      type: String,
      default: '悬赏结束时间',
    },
  },
  data() {
    return {
      // timeShow: '悬赏结束时间',
      time: '',
      resultTime: [],
      years: [[], [], [], [], []],
      sList: [],
      recordYear: '', // 记录当前选中年份
      recordMonth: '', // 记录当前选中月份
      recordMonthIndex: 0, // 记录当前选中月份的index
    };
  },
  mounted() {
    for (let i = 0; i < 60; i += 1) {
      this.sList.push(`${i}`);
    }
    this.loadTime();
  },
  methods: {
    // 日期校验
    checkTime(y, m, d) {
      switch (m) {
        case 4:
        case 6:
        case 9:
        case 11:
          if (d > 30) {
            return false;
          }
          break;
        case 2:
          if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
            if (d > 29) {
              return false;
            }
          } else if (d > 28) {
            return false;
          }
          break;
        default:
          return true;
      }
      return true;
    },
    loadTime() {
      this.years[0] = [];
      this.years[1] = [];
      this.years[2] = [];
      this.years[3] = [];
      this.years[4] = [];
      const now = new Date();
      now.setDate(now.getDate() + 1);
      const _year = now.getFullYear();
      const _month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
      let _day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
      const _hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
      const _minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
      // const _second = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
      // const nowTime = `${_year}-${_month}-${_day} ${_hour}:${_minute}`;

      // 计算每月会有多少天
      const temp = new Date(_year, _month);
      const days = new Date(temp.getTime() - 864e5).getDate();
      // 首次加载显示年
      for (let y = _year; y < _year + 3; y += 1) {
        this.years[0].push(y);
      }
      // eslint-disable-next-line prefer-destructuring
      this.recordYear = this.years[0][0];
      // 首次加载显示月
      for (let m = 1; m <= 12; m += 1) {
        if (m >= _month) {
          this.years[1].push(m);
        }
      }
      if (this.recordMonthIndex > this.years[1].length) {
        this.recordMonthIndex = this.years[1].length;
      }
      this.recordMonth = this.years[1][this.recordMonthIndex];
      // 首次加载显示日
      if (this.recordYear === this.years[0][0] && this.recordMonth !== this.years[1][0]) {
        _day = 1;
      }
      for (let d = 1; d <= days; d += 1) {
        if (d >= _day) {
          this.years[2].push(d);
        }
      }
      // 首次加载显示小时
      for (let h = 1; h <= 23; h += 1) {
        if (h >= _hour) {
          this.years[3].push(h);
        }
      }
      // 首次加载显示分钟
      this.sList.forEach(s => {
        if (s >= _minute) {
          this.years[4].push(s);
        }
      });
    },
    yearChange(e) {
      this.time = `${this.years[0][e.detail.value[0]]}-${this.years[1][e.detail.value[1]]}-${
        this.years[2][e.detail.value[2]]
      } ${this.years[3][e.detail.value[3]]}:${this.years[4][e.detail.value[4]]}`;
      this.resultTime = [
        this.years[0][e.detail.value[0]],
        this.years[1][e.detail.value[1]],
        this.years[2][e.detail.value[2]],
        this.years[3][e.detail.value[3]],
        parseInt(this.years[4][e.detail.value[4]], 10),
      ];

      const _year = this.resultTime[0];
      const _month = this.resultTime[1] - 1;
      const _day = this.resultTime[2];
      const _hour = this.resultTime[3];
      const _minute = this.resultTime[4];
      const _second = 0;
      const isReasonable = this.checkTime(_year, _month + 1, _day);

      if (!isReasonable) {
        uni.showToast({
          title: '设置时间不合理',
          icon: 'none',
        });
      } else {
        const setDay = new Date(_year, _month, _day, _hour, _minute, _second);
        const timeDifference = setDay.getTime() - Date.now();
        this.$emit('getTimes', timeDifference / 1000, this.time);
        const minSetTime = 60 * 60 * 23;
        if (minSetTime < timeDifference / 1000) {
          for (let i = 0; i <= 4; i += 1) {
            const str = `${this.resultTime[i]}`;
            if (str.length === 1) {
              this.resultTime[i] = `0${str}`;
            }
          }
          const timeStr = `设置时间：${this.resultTime[0]}-${this.resultTime[1]}-${this.resultTime[2]} ${this.resultTime[3]}:${this.resultTime[4]}`;
          this.$emit('setTimes', timeStr);
        }
      }
    },
    wctchPicker(e) {
      const info = e.detail;
      const now = new Date();
      // const _year = now.getFullYear();
      // const _month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
      // const _day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
      const _hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
      const _minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
      // const _second = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();

      if (info.column === 0 && info.value > 0) {
        this.years[1] = [];
        this.years[2] = [];
        this.years[3] = [];
        this.years[4] = [];
        this.recordYear = this.years[0][info.value];
        // 改变年的值后加载显示月
        for (let m = 1; m <= 12; m += 1) {
          this.years[1].push(m);
        }
        this.recordMonth = this.years[1][this.recordMonthIndex];
        const temp = new Date(this.years[info.column][info.value], this.recordMonth);
        const days = new Date(temp.getTime() - 864e5).getDate();
        // 改变年的值后加载显示日
        for (let d = 1; d <= days; d += 1) {
          this.years[2].push(d);
        }
        // 改变年的值后加载显示小时
        for (let h = 1; h <= 23; h += 1) {
          this.years[3].push(h);
        }
        // 改变年的值后加载显示分钟
        this.sList.forEach(s => {
          this.years[4].push(s);
        });
      } else if (info.column === 0 && info.value === 0) {
        this.loadTime();
      } else if (info.column === 1 && info.value > 0) {
        this.years[2] = [];
        this.years[3] = [];
        this.years[4] = [];
        this.recordMonth = this.years[1][info.value];
        this.recordMonthIndex = info.value;
        const temp = new Date(this.recordYear, this.recordMonth);
        const days = new Date(temp.getTime() - 864e5).getDate();
        // 改变月份加载显示日
        for (let d = 1; d <= days; d += 1) {
          this.years[2].push(d);
        }
        // 改变月份加载显示小时
        for (let h = 1; h <= 23; h += 1) {
          this.years[3].push(h);
        }
        // 改变月份加载显示分钟
        this.sList.forEach(s => {
          this.years[4].push(s);
        });
      } else if (info.column === 1 && info.value === 0) {
        this.years[2] = [];
        this.years[3] = [];
        this.years[4] = [];
        this.recordMonth = this.years[1][info.value];
        this.recordMonthIndex = info.value;
        const nows = new Date();
        nows.setDate(nows.getDate() + 1);
        let _day = nows.getDate();
        const temp = new Date(this.recordYear, this.recordMonth);
        const days = new Date(temp.getTime() - 864e5).getDate();
        if (this.recordYear !== this.years[0][0]) {
          _day = 1;
        }
        for (let d = 1; d <= days; d += 1) {
          if (d >= _day) {
            this.years[2].push(d);
          }
        }
        for (let h = 1; h <= 23; h += 1) {
          if (h >= _hour) {
            this.years[3].push(h);
          }
        }
        this.sList.forEach(s => {
          if (s >= _minute) {
            this.years[4].push(s);
          }
        });
      } else if (info.column === 2 && info.value > 0) {
        this.years[3] = [];
        this.years[4] = [];
        // 改变日的值加载显示小时
        for (let h = 1; h <= 23; h += 1) {
          this.years[3].push(h);
        }
        // 改变日的值加载显示分钟
        this.sList.forEach(s => {
          this.years[4].push(s);
        });
      } else if (info.column === 2 && info.value === 0) {
        this.years[3] = [];
        this.years[4] = [];
        for (let h = 1; h <= 23; h += 1) {
          if (h >= _hour) {
            this.years[3].push(h);
          }
        }
        this.sList.forEach(s => {
          if (s >= _minute) {
            this.years[4].push(s);
          }
        });
      } else if (info.column === 3 && info.value > 0) {
        this.years[4] = [];
        // 改变小时的值加载显示分钟
        this.sList.forEach(s => {
          this.years[4].push(s);
        });
      } else if (info.column === 3 && info.value === 0) {
        this.years[4] = [];
        this.sList.forEach(s => {
          if (s >= _minute) {
            this.years[4].push(s);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/base/theme/fn.scss';
@import '@/styles/base/variable/global.scss';
.time {
  width: 100%;
  /* #ifdef MP-WEIXIN */
  width: 640rpx;
  /* #endif */
  height: 100rpx;
  line-height: 100rpx;
  color: var(--qui-FC-777);
  background: --color(--qui-BG-2);
}
</style>
