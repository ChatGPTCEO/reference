import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'

function softwarePage(current, param) {
	param.current = current
	let url = serverApi.APIURL.softwarePage
	return request.myPostRequestWithJSON(url, param);
}

module.exports = {
	softwarePage: softwarePage
}
