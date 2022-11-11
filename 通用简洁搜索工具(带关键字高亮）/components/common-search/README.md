
## 参数说明

``` js
 //搜索历史内容
   historyDatas: {
      type: Array,
      default: () => {
      return [];
    }
 },
 //搜索关键内容
    keyworkDatas: {
       type: Array,
       default: () => {
       return [];
    }
}
   
```
## 使用方式

#### template
```pug
  view.out-view
    view.inner-view
      searchView(
          :keyworkDatas='keyworkDatas' 
          :historyDatas='historyDatas'
          @onInputListen='onInputListen' 
          @onItemClick='onItemClick'
          @onDelete='onDelete')
```
#### script
``` js
    import searchView from '@/components/common-search/index';
    export default {
        components: {
            searchView
        },
        data() {
            return {
                historyDatas: [],
                keyworkDatas: [],
                SEARCH_DATA: 'SEARCH_DATA',
                ALL: 'ALL',
                //数据源
                itemData: [{
                        key: '西瓜',
                        desc: '这是西瓜'
                    },
                    {
                        key: '西红柿',
                        desc: '这是西红柿'
                    },
                    {
                        key: '香蕉',
                        desc: '这是香蕉'
                    },
                    {
                        key: '车厘子',
                        desc: '这是车厘子'
                    }
                ],
            }
        },
        methods: {
            //内容搜索
            onInputListen(value) {
                let newDatas = this.fuzzyQuery(this.itemData, value);
                newDatas.forEach((item, index) => {
                    newDatas[index].keyword = this..getInf(item.key, value);
                });
                this.keyworkDatas = newDatas;
            },
            //删除历史记录
            onDelete(event) {
                if (event === this.ALL) {
                    //清除全部历史数据
                    this.historyDatas = [];
                } else {
                    //删除一条
                    this.historyDatas.splice(event, 1);
                    //删除后重新保存
                }
		        //换成自己的缓存方法
                this.$options.setStorageSync(this.SEARCH_DATA, this.historyDatas);
            },
            //列表点击事件
            onItemClick(event) {
                let isExist = false;
                let item = event.item;
                let index = event.index;
                //保存搜索历史数据
                //先取出原数据
                this.historyDatas.forEach((hItem, hIndex) => {
                    if (hItem.key === item.key) {
                        //如果已存在数据就直接返回
                        isExist = true;
                    }
                });
                if (!isExist) {
                    this.historyDatas.push({
                        key: item.key,
                        desc: item.desc
                    })
		             //换成自己的缓存方法
                    this.$options.setStorageSync(this.SEARCH_DATA, this.historyDatas);
                }
		        //这里是返回上一层，换成自己的实现方法
                this.$options.navigateBack();
            },
	        /**
             * 指定关键字高亮
             * @param {*} str 字符串
             * @param {*} key  关键字
             */
            getInf(str, key) {
                if (str && str.length > 0) {
                    return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
                }
                return '';
            },
	 
	        /**
             * 使用test方法实现模糊查询
             * @param  {Array}  list     原数组
             * @param  {String} keyWord  查询的关键词
             * @return {Array}           查询的结果
             */
            fuzzyQuery(list, keyWord) {
                var reg = new RegExp(keyWord);
                if (keyWord && keyWord.length > 0) {
                    var arr = [];
                    if (list && list.length > 0) {
                        list.forEach((item) => {
                            if (reg.test(item.key)) {
                                arr.push(item);
                            }
                        });
                    }
                } else {
                    //如果没有匹配就清除
                    arr = [];
                }
                return arr;
            }
        },
        onLoad() {
	        //换成自己的缓存方法
            this.historyDatas = this.$options.getStorageSync(this.SEARCH_DATA);
          
        }
    }
```
