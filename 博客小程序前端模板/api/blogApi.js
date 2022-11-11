import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'


async function getBlogType() {
	let url = serverApi.APIURL.getBlogType
	return await request.myGetRequest(url);
}

async function getBlogDetail(id) {
	let url = serverApi.APIURL.getBlogDetail + id
	return await request.myGetRequest(url);
}

function blogPage(current, param) {
	param.current = current
	let url = serverApi.APIURL.blogPage
	return request.myPostRequestWithJSON(url, param);
}

function addComment(data) {
	let url = serverApi.APIURL.addComment
	return request.myPostRequestWithJSON(url, data);
}

function delComment(ids) {
	let url = serverApi.APIURL.delComment
	return request.myPostRequestWithJSON(url, ids);
}

function getBlogComment(blogId) {
	let url = serverApi.APIURL.getBlogComment + blogId
	return request.myGetRequest(url);
}

module.exports = {
	getBlogType: getBlogType,
	getBlogDetail: getBlogDetail,
	blogPage: blogPage,
	addComment: addComment,
	delComment: delComment,
	getBlogComment: getBlogComment
}
