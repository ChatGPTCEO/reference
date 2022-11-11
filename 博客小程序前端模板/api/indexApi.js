import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'


async function getBanner() {
	let url = serverApi.APIURL.getBanner
	return await request.myGetRequest(url);
}

async function getSubject() {
	let url = serverApi.APIURL.getSubject
	return await request.myGetRequest(url);
}

async function getBlogs() {
	let url = serverApi.APIURL.getBlogs
	return await request.myGetRequest(url);
}

async function getProject() {
	let url = serverApi.APIURL.getProject
	return await request.myGetRequest(url);
}

async function getRank() {
	let url = serverApi.APIURL.getRank
	return await request.myGetRequest(url);
}

async function getBlogBySubjectId(subjectId, current) {
	let url = serverApi.APIURL.getBlogBySubjectId + subjectId + "/" + current
	return await request.myGetRequest(url);
}

module.exports = {
	getBanner: getBanner,
	getSubject: getSubject,
	getBlogs: getBlogs,
	getProject: getProject,
	getRank: getRank,
	getBlogBySubjectId: getBlogBySubjectId
}
