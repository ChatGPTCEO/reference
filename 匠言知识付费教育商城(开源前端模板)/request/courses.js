/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
import request from './request.js'

// 课程详情 details详情
export const getCourseDetails = (data) => {
	return request({
		url: 'index/courses/index',
		method: 'POST',
		data
	})
}


// 我的课程
export const postMyCourse = (data) => {
	return request({
		url: 'index/user/my_course',
		method: 'post',
		data
	})
}


// 我的收藏
export const postMyDingyue = (data) => {
	return request({
		url: 'index/user/my_dingyue',
		method: 'post',
		data
	})
}


// 课程评价
export const postCourseComment = (data) => {
	return request({
		url: 'index/courses/comment',
		method: 'post',
		data
	})
}