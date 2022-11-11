import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'

function search(current, keyword, type) {
	let param = {}
	param.current = current
	param.keyword = keyword
	param.type = type
	let url = serverApi.APIURL.search
	return request.myPostRequestWithJSON(url, param);
}

module.exports = {
	search: search
}
