import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'


async function getProjectType() {
	let url = serverApi.APIURL.getProjectType
	return await request.myGetRequest(url);
}

async function getProjectTags() {
	let url = serverApi.APIURL.getProjectTags
	return await request.myGetRequest(url);
}

async function getProjectDetail(id) {
	let url = serverApi.APIURL.getProjectDetail + id
	return await request.myGetRequest(url);
}

async function projectPage(current, pageSize, typeId) {
	let param = {}
	param.current = current
	param.pageSize = pageSize
	if (typeId) param.typeId = typeId
	let url = serverApi.APIURL.projectPage
	return await request.myPostRequestWithJSON(url, param);
}


module.exports = {
	getProjectType: getProjectType,
	getProjectTags: getProjectTags,
	getProjectDetail: getProjectDetail,
	projectPage: projectPage
}
