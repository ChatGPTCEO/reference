
const  dev = 'weixin';
const  b2bId = 0;
const  apiUrl 	 = process.env.NODE_ENV  === 'development' ? 'http://127.0.0.1:85/' : 'https://api.dinghuoguanjia.com/';
const  staticUrl = 'https://cdn.dinghuoguanjia.com/';
export default {
	b2bId,
	dev,
	apiUrl,
	staticUrl
}