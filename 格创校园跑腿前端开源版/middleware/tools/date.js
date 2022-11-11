/*
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-02-15 17:57:31
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-02-19 17:19:17
 */
module.exports = {
    timeObj: {},
    time(timeDate = null, type = "s") {
        var date = timeDate ? new Date(timeDate) : new Date()
        var time = type == "ms" ? date.getTime() : parseInt(date.getTime() / 1000)
        return time
       
    },
    date(str = "Y-m-d h:i:s 星期w", time) {
        time = time || this.time()
        if (!time) {
            console.log("请传入第二个参数时间戳");
            return false
        }
        var date = new Date(time * 1000)
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var w = date.getDay()
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        date = str.replace(/Y/, y)
            .replace(/y/, y)
            .replace(/m/, m)
            .replace(/d/, d < 10 ? "0" + d : d)
            .replace(/h/, h < 10 ? "0" + h : h)
            .replace(/i/, i < 10 ? "0" + i : i)
            .replace(/s/, s < 10 ? "0" + s : s)
            .replace(/w/, w==0?7:w)
        return date
    },
    /**
     * 获取倒计时时间格式
     * @param {string} type t 返回时间戳 其他返回时间数组
     */
    getDayS(old_time ,type = "t") {
        //  old_time = this.date("y-m-d 00:00:00")
        let new_time = this.date("y-m-d h:i:s")
        let cha = this.time(new_time) - this.time(old_time)
        let i = 60, h = i * 60, d = h * 24, w = d * 7
        let date = {
            w: 0,
            d: 0,
            h: 0,
            i: 0,
            s: 0
        }
        date.w = parseInt(cha / w)
        date.d = parseInt(cha % w / d)
        date.h = parseInt(cha % w % d / h)
        date.i = parseInt(cha % w % d % h / i)
        date.s = parseInt(cha % w % d % h % i)
        return type == "t" ? cha : date
    },
    async downTime(time=1000) {
        const next = await new Promise((success, fail) => {
            this.timeObj = setTimeout(() => {
                success()
            },time);
        })
        return next
    },

    getY(){
       let years= this.date("Y")
        if (years % 4 == 0 && years % 100 != 0 || years % 400 == 0) {
           return 366
       } else{
           return 365
       }
    },
    getM(month = this.date("m")) {
        if (month==4||month==6||month==9||month==11) {
            return 30
            
        }else if (month==2) {
            return this.getY()==365?28:29
        }else{
            return 31
        }
    },
    getNoDay(){
        let month = this.date("m")
        let day = this.date("d")*1
        for (let i = 1; i < month; i++) {
            day += this.getM(i)
        }
        return day

    }

}