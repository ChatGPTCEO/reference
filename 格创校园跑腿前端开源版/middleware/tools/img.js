/*
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-04-13 12:42:00
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-04-13 15:51:46
 */

module.exports = {
    //压缩
    compressEvent(src) {
        return new Promise((resolve, reject) => {
            uni.compressImage({
                src,
                quality:70,
                success: (res)=>{
                    console.log(res);
                    resolve(res)
                },
                fail: (err)=>{
                    console.log(err);
                    reject(err)
                }
            })

        })
        
},

}

