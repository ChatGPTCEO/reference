/*
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-04-04 13:36:18
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-04-15 19:28:38
 */
const config = {
    name: '格创跑腿',
    uniacid: '3',
    url: 'https://test.fkynet.net/api/'
};
module.exports = config

// 1、注释掉 config 里的东西
// 2、打包编译
// 3、import config from "../static/config"; 放到 mp-weixin/common/vendor  最头部
// 4、新建 config 放在  mp-weixin/static
// 5、将以下文件放入config.js 保存 如果没问题，将代码打包
    // module.exports={
    //     name: '格创跑腿',
    //     uniacid: '3',
    //     url: 'https://test.fkynet.net/api/'
    // }


// start_api_replace
// module.exports = {name: '格创跑腿',uniacid: '3',url:'https://test.fkynet.net/api/'};
// end_api_replace
