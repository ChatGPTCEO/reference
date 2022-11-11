import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'

function getConfigByName(configName) {
	let param = {}
	param.configName = configName
	let url = serverApi.APIURL.sysConfig
	return request.myGetRequestAsync(url, param);
}

module.exports = {
	getConfigByName: getConfigByName
}
