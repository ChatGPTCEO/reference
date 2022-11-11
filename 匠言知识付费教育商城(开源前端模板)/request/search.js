/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
import request from './request'


// 首页
export const postSearchCourse = (data) => {
	return request({
		url: 'index/courses/search_course',
		method: 'post',
		data
	})
}