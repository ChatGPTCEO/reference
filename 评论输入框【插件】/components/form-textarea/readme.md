
## 使用方式

#### template
``` html
commentInputView(:isVisible.sync='isVisible'  @onConfirm='onConfirm')
```
#### script
``` js
 export default {
 components: {
      commentInputView
    },
    props: {
      //item数据
      datas: {
        type: Array,
        default: () => {
          return [];
        }
      },
    },
    data() {
      return {
         isVisible: false,
      }
    },
    methods: {
       //输入内容
      onConfirm(value) {
        console.log(value);
      }
    }
  }
```
