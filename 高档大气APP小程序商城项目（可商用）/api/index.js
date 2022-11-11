// 获取banner
const getBanner = '/get_banner'
// 首页分类
const getCategoryIndex = '/get_category?type=1'
// 分类页数据
const getCategory = '/get_category?type=2'
// 获取新品
const getNewGoods = '/get_new_goods'
// 获取热门商品
const getHotGoods = '/get_hot_goods'
//获取推荐商品
const recommendGoods = '/get_recommend_goods'
// 猜你喜欢
const getLikeGoodsUrl = '/index/get_like_goods'
// 获取分类商品列表
const getCategoryList = '/productList'
//获取商品详情页
const productDetail = '/product_detail/'
//登陆
const getLogin = '/login'
//获取验证码
const sendSms = '/send_sms'
// 获取用户信息
const userInfo = '/user/user_info'
// 添加购物车
const addToCartUrl = '/cart/addCart'
// 购物车列表
const getCartListUrl = '/cart/getCart'
// 修改购物车数量
const changeCartGoodsNumUrl = '/cart/editCart/'
// 批量删除购物车商品
const deleteCartGoodsUrl = '/cart/removeCart'
// 获取所有地址
const getAllAddressUrl = '/get_area'
// 获取用户地址
const getUserReceivingAddressUrl = '/address/get_address'
// 创建或编辑地址
const editUserReceivingAddressUrl = '/address/set_address'
// 删除地址
const deleteUserReceivingAddressUrl = '/address/del_address'
// 设置默认地址
const setDefaultUserReceivingAddressUrl = '/address/set_default'
// 小程序获取手机号
const weChatGetUserPhoneUrl = '/get_mini_phone'
// 小程序微信登录
const weChatUserLoginUrl = '/wechat_mini_login'
// 直接购买订单创建页接口
const createOrderAddViewUrl = '/order/orderAddView'
// 直接购买创建订单
const createOrderUrl = '/order/addOrder'
// 购物车下单页面
const createOrderAddViewByCartUrl = '/order/cartOrderAddView'
// 购物车下单
const createOrderByCartUrl = '/order/cartOrderAdd'
// 小程序统一下单（预下单）
const weChatPayUrl = '/pay/wechat_unify_order'
// 订单列表
const searchOrderListUrl = '/order/orderList'
// 删除订单
const deleteOrderByIdUrl = '/order/deleteOrder/'
// uni验证是否登录
const unionidLoginUrl = '/check_unionid'
// APP微信登录
const weChatAppLoginUrl = '/wechat_app_login'
// 小程序获取openid和unionid
const getWeChatOpenidUrl = '/get_wechat_openid'
// 商品搜索
const productSearchUrl = '/productSearch'
//退出登陆
const logout = '/logout'
// 订单物流查看
const getOrderLogisticsUrl = '/order/getLogistics'
// 确认收货
const receivingOrderUrl = '/order/receiving/'
// 订单详情
const getOrderDetailUrl = '/order/orderDetail/'
// 附件上传
const fileUploadUrl = '/upload'
// 修改用户信息
const modifyUserInfoUrl = '/user/currentUser'
// 获取配置
const getConfigUrl = '/getConfig'
// 首页秒杀商品
const getSeckillIndexUrl = '/getSeckillIndex'
// 获取秒杀场次
const getActivitySeckillUrl = '/activitySeckill'
// 活动场次获取秒杀商品列表接口
const getActivitySeckillGoodsListUrl = '/productSeckill/'
// 秒杀商品详情
const getSeckillGoodsDetail = '/seckillDetail'
// 秒杀下单页面
const createOrderAddViewBySeckillUrl = '/order/seckillOrderView'
// 生成秒杀订单
const createOrderBySeckillUrl = '/order/seckillOrder'
// 个人中心获取分销商信息
const getDistributeUserCenterUrl = '/getDistributeUser'
// 申请分销商（推广员）
const applyDistributionUrl = '/user/apply'
// 推广员进度
const applyDistributionProgressUrl = '/user/applyProgress'
// 我的推广下级列表
const mySubordinateListUrl = '/user/myCoupon'
// 根据分类获取分销商品
const getAllDistributeGoodsListUrl = '/user/distributeProduct'
// 把分销商品加入我的小店
const addDistributeGoodsToMyShopUrl = '/user/joinMy'
// 我的小店的分销商品
const myShopGoodsListUrl = '/user/myProduct'
// 推广中心首页
const distributionUserInfoUrl = '/userInfo'
// 生成分销订单
const createOrderByDistributionUrl = '/order/distributeOrder'
// 分销订单确认收货
const receivingOrderByDistributionUrl = '/order/distributeOrder/receiving/'
// 获取提现记录
const getDistributionWithdrawalListUrl = '/cashList'
// 申请提现
const applyDistributionWithdrawalUrl = '/cashApply'
// 获取我的佣金明细（收益列表）
const getDistributionProfitListUrl = '/myEarnings'
// 获取自推订单、团队订单
const getDistributionOrderListUrl = '/order/pushesOrder'
// 获取个人推广信息
const getMyDistributionInfoUrl = '/user/myStorage'
// 获取个人小程序推广码
const getWechatDistributionCodeImgUrl = '/user/codeBehind'
// 生成普通商品小程序码
const getNormalGoodsWechatCode = '/productCode'
// 生成秒杀商品小程序码
const getSkillGoodsWechatCode = '/getSkillProductCode'
// 获取我的优惠券列表
const getMyCouponListUrl = '/myCoupon'
// 领券中心
const receiveCouponCenterUrl = '/couponCenter'
// 领券优惠券
const userReceiveCouponUrl = '/moveCoupon/'
// 获取品牌列表
const getBrandListUrl = '/brandList'
// 根据品牌id获取对应的商品
const getBrandGoodsByBrandIdUrl = '/brandProduct?brandId='
// 根据品牌id获取对应的品牌信息
const getBrandInfoByBrandUrl = '/brandInfo/'
// 验证是否有红包
const checkRedEnvelopeStatus = '/redEnvelope/checkRedEnv'
// 领取红包
const receiveRedEnvelopeUrl = '/redEnvelope/receive'
// 我的红包列表
const getMyRedEnvelopeListUrl = '/redEnvelope'
// 砍价中心列表
const boostCenterListUrl = '/boostCenter'
// 我的砍价列表
const myBoostListUrl = '/myBoost'
// 助力商品详情
const boostProductDetailUrl = '/boostProductDetail/'
// 助力活动详情
const boostLaunchActiveDetailUrl = '/boostDetail/'
// 助力分享信息返回
const boostShareDetailUrl = '/boostShare/'
// 发起助力
const boostLaunchUrl = '/initiate/'
// 砍一刀
const helpKnifeBoostUrl = '/boostDo/'
// 助力下单
const createOrderAddViewByBoostUrl = '/orderTo/'
// 获取用户浏览记录
const getUserHistoryUrl = '/user/getUserHistory'
// 清除用户浏览记录
const clearUserHistoryUrl = '/user/clearUserHistory'
// 用户设置收藏商品
const changeCollectGoodsUrl = '/user/stateUserCollect'
// 用户收藏列表
const getCollectGoodsListUrl = '/user/getUserCollect'
// 用户设置关注品牌
const changeCollectBrandUrl = '/user/stateUserAttention'
// 品牌关注列表
const getCollectBrandListUrl = '/user/getUserAttention'
// 获取当前品牌被关注的状态
const getCollectBrandInfoUrl = '/getNumberAttention'
// 获取当前商品的评价列表
const getOrderEvaluateListUrl = '/appraises'
// 创建订单评价
const createOrderEvaluateUrl = '/order/evaluate'

// 发布文章
const releaseArticleUrl = '/store'
// 获取文章列表
const getArticleListUrl = '/article/index'
// 获取文章详情
const getArticleDetailUrl = '/index/'
// 文章点赞/取消点赞
const articleStartOptionUrl = '/fabulous/'
// 文章收藏/取消收藏
const articleCollectionOptionUrl = '/collection/'
// 评论文章/评论评论
const commentArticleUrl = '/comment/'
// 评论点赞、取消点赞
const commentStartOptionUrl = '/commentFabulous/'
// 获取文章分类
const getArticleClassificationUrl = '/articleCategory'
// 上传腾讯云点播
const uploadCloudVideosUrl = '/uploadCloud'

// 获取拼团活动列表
const getGroupBuyingListUrl = '/getCollageList'
// 获取拼团活动详情
const getGroupBuyingProductDetailUrl = '/collageDetail/'
// 拼团预下单
const createOrderViewByGroupBuyingUrl = '/collageOrderView'
// 拼团下单
const createOrderByGroupBuyingUrl = '/collageOrder'
// 所有进行中拼团的活动
const getAllGroupBuyingListByActiveIdUrl = '/collageList/'
// 我的拼团列表
const getMyGroupBuyingListUrl = '/myCollage'
// 我的拼团详情
const getMyGroupBuyingDetailUrl = '/myCollageDetail/'

export {
  getCategoryIndex,
  getCategory,
  recommendGoods,
  getBanner,
  getNewGoods,
  getLogin,
  sendSms,
  getHotGoods,
  productDetail,
  userInfo,
  getCategoryList,
  addToCartUrl,
  getCartListUrl,
  changeCartGoodsNumUrl,
  deleteCartGoodsUrl,
  getLikeGoodsUrl,
  getAllAddressUrl,
  getUserReceivingAddressUrl,
  editUserReceivingAddressUrl,
  deleteUserReceivingAddressUrl,
  setDefaultUserReceivingAddressUrl,
  weChatGetUserPhoneUrl,
  createOrderAddViewUrl,
  createOrderUrl,
  searchOrderListUrl,
  createOrderAddViewByCartUrl,
  createOrderByCartUrl,
  weChatPayUrl,
  weChatUserLoginUrl,
  deleteOrderByIdUrl,
  unionidLoginUrl,
  weChatAppLoginUrl,
  getWeChatOpenidUrl,
  productSearchUrl,
  getOrderLogisticsUrl,
  receivingOrderUrl,
  getOrderDetailUrl,
  fileUploadUrl,
  modifyUserInfoUrl,
  getConfigUrl,
  getSeckillIndexUrl,
  getActivitySeckillUrl,
  getActivitySeckillGoodsListUrl,
  getSeckillGoodsDetail,
  createOrderAddViewBySeckillUrl,
  createOrderBySeckillUrl,
  applyDistributionUrl,
  applyDistributionProgressUrl,
  mySubordinateListUrl,
  getAllDistributeGoodsListUrl,
  addDistributeGoodsToMyShopUrl,
  myShopGoodsListUrl,
  distributionUserInfoUrl,
  createOrderByDistributionUrl,
  receivingOrderByDistributionUrl,
  getDistributionWithdrawalListUrl,
  applyDistributionWithdrawalUrl,
  getDistributeUserCenterUrl,
  getDistributionProfitListUrl,
  getDistributionOrderListUrl,
  getMyDistributionInfoUrl,
  getWechatDistributionCodeImgUrl,
  getNormalGoodsWechatCode,
  getSkillGoodsWechatCode,
  getMyCouponListUrl,
  receiveCouponCenterUrl,
  userReceiveCouponUrl,
  getBrandListUrl,
  getBrandGoodsByBrandIdUrl,
  checkRedEnvelopeStatus,
  receiveRedEnvelopeUrl,
  getMyRedEnvelopeListUrl,
  boostCenterListUrl,
  myBoostListUrl,
  boostProductDetailUrl,
  boostLaunchActiveDetailUrl,
  boostShareDetailUrl,
  boostLaunchUrl,
  helpKnifeBoostUrl,
  createOrderAddViewByBoostUrl,
  getUserHistoryUrl,
  clearUserHistoryUrl,
  changeCollectGoodsUrl,
  getCollectGoodsListUrl,
  changeCollectBrandUrl,
  getCollectBrandListUrl,
  getBrandInfoByBrandUrl,
  getCollectBrandInfoUrl,
  createOrderEvaluateUrl,
  getOrderEvaluateListUrl,
  releaseArticleUrl,
  getArticleListUrl,
  getArticleDetailUrl,
  articleStartOptionUrl,
  articleCollectionOptionUrl,
  commentArticleUrl,
  commentStartOptionUrl,
  getArticleClassificationUrl,
  uploadCloudVideosUrl,
  getGroupBuyingListUrl,
  getGroupBuyingProductDetailUrl,
  createOrderViewByGroupBuyingUrl,
  createOrderByGroupBuyingUrl,
  getAllGroupBuyingListByActiveIdUrl,
  getMyGroupBuyingListUrl,
  getMyGroupBuyingDetailUrl,
}
