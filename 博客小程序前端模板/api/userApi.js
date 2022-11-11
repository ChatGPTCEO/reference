import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'

function smartSendCode(phone) {
	let url = serverApi.APIURL.smartSendCode
	let param = {}
	param.phone = phone
	return request.myGetRequestAsync(url, param);
}

function userLogin(phone, code) {
	let url = serverApi.APIURL.userLogin
	let param = {}
	param.username = phone
	param.code = code
	return request.myPostRequestWithJSON(url, param);
}

async function getUserInfoByToken() {
	let url = serverApi.APIURL.userInfoByToken
	return await request.myGetRequest(url);
}

function saveCustom(data) {
	let url = serverApi.APIURL.saveCustom
	return request.myPostRequestWithJSON(url, data);
}

/**
 * 收藏
 * @param {Object} blogId
 * @param {Object} handleType
 */
function attentionBlog(blogId, handleType) {
	let url = serverApi.APIURL.attentionBlog + blogId + "/" + handleType
	return request.myGetRequest(url);
}


function existAttentionBlog(blogId) {
	let url = serverApi.APIURL.existAttentionBlog + blogId
	return request.myGetRequest(url);
}

function likeBlog(blogId, handleType) {
	let url = serverApi.APIURL.likeBlog + blogId + "/" + handleType
	return request.myGetRequest(url);
}

function existLikeBlog(blogId) {
	let url = serverApi.APIURL.existLikeBlog + blogId
	return request.myGetRequest(url);
}

function getUserLikePage(current) {
	let url = serverApi.APIURL.getUserLikePage + current
	return request.myGetRequest(url);
}

function getUserCollectPage(current) {
	let url = serverApi.APIURL.getUserCollectPage + current
	return request.myGetRequest(url);
}

function updateSmartUserInfo(param) {
	let url = serverApi.APIURL.updateSmartUserInfo
	return request.myPostRequestWithJSON(url, param);
}

function saveMessage(param) {
	let url = serverApi.APIURL.saveMessage
	return request.myPostRequestWithJSON(url, param);
}

function getUserCustomer() {
	let url = serverApi.APIURL.getUserCustomer
	return request.myGetRequest(url);
}

function delUserCustomer(id) {
	let url = serverApi.APIURL.delUserCustomer + id
	return request.myGetRequest(url);
}

module.exports = {
	smartSendCode: smartSendCode,
	userLogin: userLogin,
	getUserInfoByToken: getUserInfoByToken,
	saveCustom: saveCustom,
	attentionBlog: attentionBlog,
	existAttentionBlog: existAttentionBlog,
	likeBlog: likeBlog,
	existLikeBlog: existLikeBlog,
	getUserLikePage: getUserLikePage,
	getUserCollectPage: getUserCollectPage,
	updateSmartUserInfo: updateSmartUserInfo,
	saveMessage: saveMessage,
	getUserCustomer: getUserCustomer,
	delUserCustomer: delUserCustomer

}
