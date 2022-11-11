export const faceUtils = {
  alt: [
    '[微笑]',
    '[嘻嘻]',
    '[哈哈]',
    '[可爱]',
    '[可怜]',
    '[挖鼻]',
    '[吃惊]',
    '[害羞]',
    '[挤眼]',
    '[闭嘴]',
    '[鄙视]',
    '[爱你]',
    '[泪]',
    '[偷笑]',
    '[亲亲]',
    '[生病]',
    '[太开心]',
    '[白眼]',
    '[右哼哼]',
    '[左哼哼]',
    '[嘘]',
    '[衰]',
    '[委屈]',
    '[吐]',
    '[哈欠]',
    '[抱抱]',
    '[怒]',
    '[疑问]',
    '[馋嘴]',
    '[拜拜]',
    '[思考]',
    '[汗]',
    '[困]',
    '[睡]',
    '[钱]',
    '[失望]',
    '[酷]',
    '[色]',
    '[哼]',
    '[鼓掌]',
    '[晕]',
    '[悲伤]',
    '[抓狂]',
    '[黑线]',
    '[阴险]',
    '[怒骂]',
    '[互粉]',
    '[心]',
    '[伤心]',
    '[猪头]',
    '[熊猫]',
    '[兔子]',
    '[ok]',
    '[耶]',
    '[good]',
    '[NO]',
    '[赞]',
    '[来]',
    '[弱]',
    '[草泥马]',
    '[神马]',
    '[囧]',
    '[浮云]',
    '[给力]',
    '[围观]',
    '[威武]',
    '[奥特曼]',
    '[礼物]',
    '[钟]',
    '[话筒]',
    '[蜡烛]',
    '[蛋糕]'
  ],
  faces: function () {
    let self = this;
    let arr = {};
    for (let i = 0; i < self.alt.length; i++) {
      //arr[self.alt[i]] = "./static/emoji/" + i + ".gif";   //表情加载不出来,请试试这行代码
      // @ts-ignore
      arr[self.alt[i]] = "https://im.idb.com.cn/fs/static/emoji/" + i + ".gif";
    }
    return arr;
  },
  emojiList: function () {
    let self = this;
    let length = Math.ceil(self.alt.length / 24);
    let arr = new Array(length);
    for (let j = 0; j < length; j++) {
      let subArr = [];
      for (var i = j * 24; i < 24 * (j + 1); i++) {
        if (i > self.alt.length - 1) {
          break;
        }
        let obj = {
          "url": i + '.gif',
          "alt": self.alt[i]
        }
        subArr.push(obj)
      }
      arr[j] = subArr;
    }
    return arr;
  }
}
