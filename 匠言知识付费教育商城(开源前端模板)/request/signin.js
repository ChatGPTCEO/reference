/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
import request from '@/request/request.js'

// 签到页
export const postDaka = (data) => {
	return request({
		url: 'index/user/daka',
		method: 'post',
		data
	})
}
export const ljqd = (data) => {
	return request({
		url: 'index/user/daka_jifen',
		method: 'post',
		data
	})
}