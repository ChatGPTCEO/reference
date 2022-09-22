const API = require('@/api/base')

const getSiteInfo = function(data) {
	return API.get('/wp-json/mp/v2/setting', data);
}


/**
 * 获取用户信息
 * @param  {object} args 参数
 * @return {promise}
 */
const getProfile = function(e) {
	return API.getUserInfo(e);
}

const getBanner = function() {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/banner/wechat');
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/banner/qq');
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/banner/baidu');
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/banner/toutiao');
	// #endif
	// #ifndef MP
	return API.get('/wp-json/mp/v2/banner/wechat');
	// #endif


}


const getStickyPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?sticky=true', data);
}

const getPostsList = function(data) {
	return API.get('/wp-json/mp/v2/posts', data, {
		token: true
	});
}

const getRelatePosts = function(id) {
	return API.get('/wp-json/mp/v2/posts?custom=relate&per_page=3&id=' + id);
}

const getPostsbyID = function(id) {
	return API.get('/wp-json/mp/v2/posts/' + id, {}, {
		token: true
	});
}

const getPagesList = function(data) {
	return API.get('/wp-json/mp/v2/pages', data);
}

const getPageByID = function(id) {
	return API.get('/wp-json/mp/v2/pages/' + id);
}

const getCategories = function(data) {
	return API.get('/wp-json/wp/v2/categories?orderby=id&order=asc', data);
}

const getCategoryByID = function(id) {
	return API.get('/wp-json/wp/v2/categories/' + id);
}

const getTags = function(data) {
	return API.get('/wp-json/wp/v2/tags?orderby=rand&order=asc', data);
}

const getTagsList = function(data) {
	return API.get('/wp-json/wp/v2/tags', data);
}

const getTagByID = function(id) {
	return API.get('/wp-json/wp/v2/tags/' + id);
}

const getRandPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?orderby=rand', data);
}


const getMostViewsPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most', data);
}

const getMostFavPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most&meta=favs', data);
}

const getMostLikePosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most&meta=likes', data);
}

const getMostCommentPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most&meta=comments', data);
}

const getRecentCommentPosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/recent', data);
}

const getComments = function(data) {
	return API.get('/wp-json/mp/v2/comments', data);
}

const Loginout = function() {
	return API.logout();
}

const fav = function(data) {
	return API.post('/wp-json/mp/v2/comments?type=fav', data, {
		token: true
	});
}

const like = function(data) {
	return API.post('/wp-json/mp/v2/comments?type=like', data, {
		token: true
	});
}

const getFavPosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/posts?type=fav', data, {
		token: true
	});
}

const getLikePosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/posts?type=like', data, {
		token: true
	});
}

const getCommentsPosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/posts?type=comment', data, {
		token: true
	});
}

const addComment = function(data) {
	return API.post('/wp-json/mp/v2/comments?type=comment', data, {
		token: true
	});
}

const addBooks = function(data) {
	return API.post('/wp-json/mp/v2/posts?type=books', data, {
		token: true
	});
}

const getCodeImg = function(data) {
	return API.post('/wp-json/mp/v2/qrcode', data, {
		token: false
	});
}

const getMenuSetting = function(data) {
	return API.get('/wp-json/mp/v2/menu', data);
}

const indexAdsense = function(data) {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/advert/wechat?type=index', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=index', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=index', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=index', data);
	// #endif
}

const listAdsense = function(data) {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/advert/wechat?type=list', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=list', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=list', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=list', data);
	// #endif
}

const detailAdsense = function(data) {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/advert/wechat?type=detail', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=detail', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=detail', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=detail', data);
	// #endif
}

const pageAdsense = function(data) {
	return API.get('/wp-json/mp/v2/advert/wechat?type=page', data);
}

const insertAdsense = function(data) {
	return API.get('/wp-json/mp/v2/advert/wechat?type=insert', data);
}

const videoAdsense = function(data) {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/advert/wechat?type=video', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=video', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=video', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=video', data);
	// #endif
}

const checkUser = function(data) {
	return API.get('/wp-json/mp/v2/user/check', data, {
		token: true
	})
}

const getUserById = function(data) {
	return API.get('/wp-json/mp/v2/user/view', data);
}

const getMineInfo = function(data) {
	return API.get('/wp-json/mp/v2/user/mine', data, {
		token: true
	});
}

const getCredit = function(data) {
	return API.get('/wp-json/mp/v2/credit', data, {
		token: true
	})
}

const updateCredit = function(data) {
	return API.post('/wp-json/mp/v2/credit', data, {
		token: true
	})
}

const creditRank = function(data) {
	return API.get('/wp-json/mp/v2/credit/rank?orderby=credits', data)
}

const creditSubscribe = function(data) {
	return API.post('/wp-json/mp/v2/credit/subscribe', data, {
		token: true
	})
}

const qrcodeLogin = function(data) {
	return API.post('/wp-json/mp/v2/user/auth', data, {
		token: true
	});
}

const qrcodeScanLogin = function(data) {
	return API.post('/wp-json/mp/v2/user/scene', data, {
		token: false
	});
}

const getTwitterPosts = function(data) {
	return API.get('/wp-json/wp/v2/tweets', data);
}

const getTwitterDetail = function(id) {
	return API.get('/wp-json/wp/v2/tweets/' + id, {}, {
		token: true
	});
}

const markComment = function(args) {
	return API.post('/wp-json/mp/v2/comments/mark', args, {
		token: true,
	})
}

const getVideoList = function(args) {
	return API.get('/wp-json/mp/v2/posts?format=video', args)
}

const acountlogin = function(data) {
	return API.post('/wp-json/mp/v2/site/login', data);
}

const getPassWord = function(data) {
	return API.post('/wp-json/mp/v2/site/lostpass',data);
}

const getEmailCode = function(data) {
	return API.post('/wp-json/mp/v2/site/code', data);
}

const getRegistra = function(data) {
	return API.post('/wp-json/mp/v2/site/signup', data);
}

const upLoadImage=function(filePath){
	return 	API.upload('/wp-json/mp/v2/media', filePath, { token: true })
}

export  function updataUsers(args){
  return API.post('/wp-json/mp/v2/user/update', args, {
    token: true
  });
}

const getMessage =function(args) {
  return API.get('/wp-json/mp/v2/message', args, {
    token: true
  });
}

const getMessagedetail= function  (args) {
  return API.get('/wp-json/mp/v2/message/view', args, {
    token: true
  });
}

const getPhoneCode=function(args){
	return API.post('/wp-json/mp/v2/mobile/code', args, {
	  token: true
	});
}

const phoneLogin=function(args){
	return API.post('/wp-json/mp/v2/mobile/login', args, {
	  token: true
	});
}


API.getSiteInfo = getSiteInfo
API.getStickyPosts = getStickyPosts
API.getPostsList = getPostsList
API.getPostsbyID = getPostsbyID
API.getPagesList = getPagesList
API.getPageByID = getPageByID
API.getCategories = getCategories
API.getCategoryByID = getCategoryByID
API.getTags = getTags
API.getTagByID = getTagByID
API.getRandPosts = getRandPosts
API.getRelatePosts = getRelatePosts
API.getMostViewsPosts = getMostViewsPosts
API.getMostFavPosts = getMostFavPosts
API.getMostLikePosts = getMostLikePosts
API.getMostCommentPosts = getMostCommentPosts
API.getRecentCommentPosts = getRecentCommentPosts
API.getComments = getComments
API.getProfile = API.guard(getProfile)
API.fav = API.guard(fav)
API.getFavPosts = API.guard(getFavPosts)
API.like = API.guard(like)
API.getLikePosts = API.guard(getLikePosts)
API.getCommentsPosts = API.guard(getCommentsPosts)
API.addComment = API.guard(addComment)
API.addBooks = API.guard(addBooks)
API.getCodeImg = getCodeImg
API.Loginout = Loginout
API.getMenuSetting = getMenuSetting
API.indexAdsense = indexAdsense
API.listAdsense = listAdsense
API.detailAdsense = detailAdsense
API.pageAdsense = pageAdsense
API.insertAdsense = insertAdsense
API.videoAdsense = videoAdsense
API.checkUser = checkUser
API.getUserById = getUserById
API.getMineInfo = getMineInfo
API.updateCredit = API.guard(updateCredit)
API.getCredit = getCredit
API.creditRank = creditRank
API.creditSubscribe = API.guard(creditSubscribe)
API.qrcodeLogin = API.guard(qrcodeLogin)
API.qrcodeScanLogin = qrcodeScanLogin
API.getBanner = getBanner
API.getTwitterPosts = getTwitterPosts
API.getTwitterDetail = getTwitterDetail
API.markComment = API.guard(markComment)
API.getVideoList = getVideoList
API.acountlogin=acountlogin
API.getPassWord=getPassWord
API.getEmailCode=getEmailCode
API.getRegistra=getRegistra
API.upLoadImage=upLoadImage
API.updataUsers=updataUsers
API.getMessage=getMessage
API.getMessagedetail=getMessagedetail
API.getTagsList=getTagsList
API.getPhoneCode=getPhoneCode
API.phoneLogin=phoneLogin


module.exports = API
