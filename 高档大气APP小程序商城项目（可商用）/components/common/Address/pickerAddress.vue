<template>
  <picker @change="bindPickerChange"
					@columnchange="columnchange"
					:range="array" range-key="name"
					:value="value"
          mode="multiSelector">
    <slot></slot>
  </picker>
</template>

<script>
import { getAllAddressUrl } from '@/api/index'

let selectVal = ['', '', '']

export default {
  data () {
    return {
      value: [0, 0, 0],
      array: [],
      index: 0,
      allAddressArray: [],
      selectAddressId: {
        province_id: '',
        city_id: '',
        district_id: '',
      }
    }
  },
  created () {
    this.initSelect()
  },
  methods: {
    // 初始化地址选项
    initSelect () {
      this.getAllAddress()
    },
    // 地址控件改变控件
    columnchange (d) {
			this.updateSelectIndex(d.detail.column, d.detail.value) // 更新选择索引
        .updateSourceDate() // 更新源数据
        .updateAddressDate() // 更新结果数据
        .$forceUpdate()  // 触发双向绑定
    },
    getAllAddress () {
      this.$R.get(getAllAddressUrl).then(res => {
        this.allAddressArray = res.data.province
        this.updateSourceDate()
      })
    },
    /**
     * 更新源数据
     * */
    updateSourceDate () {
      this.array = []
      this.array[0] = this.allAddressArray.map(obj => {
        return {
          name: obj.name,
          id: obj.id
        }
      })
      this.array[1] = this.allAddressArray[this.value[0]].city.map(obj => {
        return {
          name: obj.name,
          id: obj.id
        }
      })
      this.array[2] = this.allAddressArray[this.value[0]].city[this.value[1]].district.map(obj => {
        return {
          name: obj.name,
          id: obj.id
        }
      })
      return this
    },

    /**
     * 更新索引
     * */
    updateSelectIndex (column, value) {
      let arr = JSON.parse(JSON.stringify(this.value))
      arr[column] = value
      if (column === 0) {
        arr[1] = 0
        arr[2] = 0
      }
      if (column === 1) {
        arr[2] = 0
      }
			this.value = arr
      return this
    },

    /**
     * 更新结果数据
     * */
    updateAddressDate () {
      selectVal[0] = this.array[0][this.value[0]].name
      selectVal[1] = this.array[1][this.value[1]].name
      selectVal[2] = this.array[2][this.value[2]].name
      this.selectAddressId.province_id = this.array[0][this.value[0]].id
      this.selectAddressId.city_id = this.array[1][this.value[1]].id
      this.selectAddressId.district_id = this.array[2][this.value[2]].id
      return this
    },

    /**
     * 点击确定
     * */
    bindPickerChange (e) {
      this.$emit('change', {
        selcecId: this.selectAddressId,
        index: this.value,
        data: selectVal
      })
      return this
    }

  }
}
</script>

<style>
</style>
