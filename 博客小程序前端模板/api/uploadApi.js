import request from '@/utils/request-util.js'
import serverApi from '@/utils/server-api.js'

async function getPolicy() {
	let url = serverApi.APIURL.getPolicy
	return await request.myGetRequest(url);
}


function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
	});
}

module.exports = {
	getPolicy: getPolicy,
	getUUID: getUUID
}
