//这是首页装修模板
const renovation = {
	//这里是APP模板
	AppTemplate: {
		//这里是首页模板
		indexTemplate: {
			indexBackgroundColor: "#fff",
			AppStyle: 0, //站点风格     0为默认风格   1-9代表不同的风格颜色
			headerModular: {
				name: "头部",
				switch: 0, //0显示  1隐藏
				component: "bcHeader", // 组件名称
				content: {
					type: 1, //展示效果  0展示效果1 1展示效果为渐变 2展示效果3 3展示效果4 4展示效果5
					navBarBgColor: "255,255,255", //当开启展示效果1为渐变时。顶部导航背景颜色只填写rgb颜色值
					navBarTextColor: "#333",
					appHeader: { //头部
						switch: 1, //0显示 1隐藏
						exhibitionType: "appIcon", //appTitle显示APP标题  appIcon显示图标
						appTitle: "贝创科技", //APP标题
						appIcon: "https://mashu.csygl.com/uploads/20220327/15cc0a8db4431a2d0529cc860e0971ac.png" //APP图标
					},
					searchColumn: { //搜索框栏目
						switch: 0, //0显示 1隐藏
						searchInfo: {
							searchBoxRadius: 0,
							searchBoxBgcolor: "rgba(215,215,215, .3)",
							searchTextColor: "#999",
							searchContent: "搜索商品",
							displayPosition: "left" //left显示在左边  middle显示在中间
						},
						leftIcon: [{ //左图标
							icon: "icon-saomiao", //图标
							type: "scanning" //图标功能
						}],
						rightIcon: [{ //右图标
								icon: "icon-xiaoxi1", //图标
								type: "scanning" //图标功能
							},
							{
								icon: "icon-share-01", //图标
								type: "scanning" //图标功能
							}
						]
					},
				}
			},
			advertisementPopup: { //首页弹窗广告
				switch: 0, //0开启  1关闭
				displayType: 0, //显示方式 0-9代表不同的显示风格
				linkTo: "/pages/promotion/hotproducts-list", //广告跳转链接
				component: "bcAdvertisementPopup",
			},
			modularList: [{
					name: "轮播图",
					switch: 0, //0显示  1隐藏
					component: "bcSwiper", // 组件名称
					content: {
						type: "swiper", //显示样式 swiper为轮播图
						displayTitle: "display", //显示标题 display显示  hide隐藏
						swiperInfo: {
							displayType: 0, //显示方式 0 普通  1 两边距
							swiperHeight: 510, //图片高度
							swiperRadius: 0, //图片圆角
							sideMargin: 0, //图片左右边距
							marginTop: 0, //图片底部距离
							marginBottom: 0, //图片头部距离
							swiperBgInfo: { //轮播图背景
								swiperBgType: 0, //是否开启轮播图背景   0 为不开启   1为开启
								swiperBgColorType: 0, //  轮播图背景颜色风格   0整体风格颜色  1与轮播图背景颜色一致  
								swiperBgHeight: 150, //轮播图背景高度
								swiperBgLRadius: 50, //轮播图背景左下角圆角
								swiperBgRRadius: 50, //轮播图背景右下角圆角
							},
							list: [{ //这里是轮播图片数组
								title: "我是图片1", //标题
								cover: "https://teaching.chunfengbuy.com/uploads/20220428/e9425888d59564b4137652ae974c9ad6.jpg", //图片
								linkTo: "/pages/index/index",
								swiperBgColor: "#F5DAC8"

							}]
						}
					}
				},
				{ //这是一个公告栏
					name: "公告",
					switch: 0, //0开启  1关闭
					component: "bcNotice",
					content: {
						type: "0", //展示效果  0展示效果1 1展示效果2 2展示效果3 
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						modulBgColor: "#F1F1F1", //模块背景颜色
						modulHeight: 70, //模块高度
						modulRadius: 10, //模块圆角
						modulCover: "", //模块图片https://demo.chunfengbuy.com/uploads/20220519/99bb3d8608ae26ef61080c24c3f0a496.png
						modulIcon: "icon-voice-01", //模块图标
						iconSize: 40, //图标字体大小
						iconColor: "#333", //图标颜色
						titleColor: "#3A3A3A", //标题颜色
						titleSize: 26, //标题字体大小
						titleThickness: "400", //标题字体粗细
						moreText: "了解更多",
						moreColor: "#2B2B2B",
						noticeId: 1, //先择公告ID，文章ID
					}
				},
				{
					name: "导航",
					switch: 0, //0显示  1隐藏
					component: "bcNavigation", // 组件名称
					content: {
						type: "fourRows", // 显示 fourRows每排4个  fiveRows每排5个
						modulMT: 30, //模块头部距离
						coverRadius: 10, //图标圆角
						coverWidth: 80, //图标宽度
						coverHeight: 80, //图标高度
						list: [{
								cname: "营养健康",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/73007a08f3d89118b937ea3481dcb589.png",
								url: "/pages/promotion/selected-list"
							},
							{
								cname: "美妆护肤",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/943d73ecdb9af8a69c6139f2223c5318.png",
								url: "/pages/promotion/newproducts"
							},
							{
								cname: "品质生活",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/0ecbce8e29afbdc6cf3f087a1f4bbce2.png",
								url: "/pages/brand/brand-list"
							},
							{
								cname: "微熏酒馆",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/5c3f7cd45d81d7773fc03aee565bfaaa.png",
								url: "/pages/promotion/selected-list"
							},
							{
								cname: "品牌馆",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/d3fc5cd49824ee95721a49ffd6dbb619.png",
								url: "/pages/brand/brand-list"
							},
							{
								cname: "TOP必抢",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/d7546db81bb0186fd15e5c5476249cda.png",
								url: "/pages/promotion/hotproducts-list-two"
							},
							{
								cname: "视频商品",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/2ef22d006409346c6ef233a6387df53c.png",
								url: "/pages/article/article-list-video"
							},
							{
								cname: "分类",
								cover: "https://demo.chunfengbuy.com/uploads/20220519/51546bb315f2f98be641ff2fbecc5caf.png",
								url: "/pages/product/category-product"
							}
						]
					}
				},
				{
					name: "图片",
					switch: 0, //0显示  1隐藏
					component: "bcPicture",
					content: {
						type: 1, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						displayTitle: "display", //显示标题 display显示  hide隐藏
						pictureInfo: {
							displayType: "ordinary", //显示方式 ordinary 普通  leaveEdge 两边距
							modulMT: 20, //图片模块头部距离
							pictureHeight: 132, //图片高度
							pictureRadius: 0, //图片圆角
							modulMargin: 30, //模块左右边距
							LRspacing: 18, //两图片之间间隔
							marginBottom: 0, //图片底部距离
							list: [{
									title: "我是图片1", //标题
									cover: "https://demo.chunfengbuy.com/uploads/20220519/dcbca683c0a4c459b96a4a2955a5d410.png", //图片
									linkTo: "/pages/index/index"
								},
								{
									title: "我是图片1", //标题
									cover: "https://demo.chunfengbuy.com/uploads/20220519/6d3299477234ada516a80c3a3cbf7364.png", //图片
									linkTo: "/pages/index/index"
								}
							]
						}
					}
				},
				{
					name: "图片",
					switch: 0, //0显示  1隐藏
					component: "bcPicture",
					content: {
						type: 2, //展示方式 pictureSingle 单图 pictureDouble 双图   pictureThree 三图
						displayTitle: "display", //显示标题 display显示  hide隐藏
						pictureInfo: {
							displayType: "ordinary", //显示方式 ordinary 普通  leaveEdge 两边距
							modulMT: 18, //图片模块头部距离
							modulMargin: 30, //模块左右边距
							sideMargin: 18, //左右图片间距
							leftPicture: { //左边图片
								pictureHeight: 412, //图片高度
								pictureRadius: 0, //图片圆角
								cover: "https://demo.chunfengbuy.com/uploads/20220519/e0798ce86952e038125c50d5056b6acf.png", //图片
							},
							rightPicture: { //左边图片列表
								pictureHeight: 198, //图片高度
								pictureRadius: 0, //图片圆角
								list: [{
										title: "我是图片1", //标题
										cover: "https://demo.chunfengbuy.com/uploads/20220519/39b257365d65910f56d1d292d14bb98a.png", //图片
										linkTo: "/pages/index/index"
									},
									{
										title: "我是图片1", //标题
										cover: "https://demo.chunfengbuy.com/uploads/20220519/27641532ab5a1d691eb6eff02129910b.png", //图片
										linkTo: "/pages/index/index"
									},
								]
							}
						}
					}
				},
				{
					name: "图片",
					switch: 0, //0显示  1隐藏
					component: "bcPicture",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						displayTitle: "display", //显示标题 display显示  hide隐藏
						pictureInfo: {
							displayType: "ordinary", //显示方式 ordinary 普通  leaveEdge 两边距
							pictureMT: 18, //图片模块头部距离
							pictureHeight: 180, //图片高度
							pictureRadius: 0, //图片圆角
							sideMargin: 30, //图片左右边距
							marginBottom: 20, //图片底部距离
							list: [{
								title: "我是图片1", //标题
								cover: "https://demo.chunfengbuy.com/uploads/20220519/ae432daa9e1d711e562af2f93a9013e5.png", //图片
								linkTo: "/pages/index/index"
							}, ]
						}
					}
				},
				{
					name: "栏目条",
					switch: 0, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "美丽方案", //秒杀标题
						titleColor: "#333", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "", //图标
						iconColor: "#333", //图标颜色
						iconSize: 42, //图标字体大小
						promotion: "", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 30, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "300", //宣传语字体粗细
						moreText: "更多方案",
						moreColor: "#333",
						moreUrl: "/pages/article/article-mall",
					}
				},
				{
					name: "文章分类",
					switch: 0, //0显示  1隐藏
					component: "bcArticleList",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5	
						articleClassList: {
							quantity: 6, //显示数量
							modulMT: 30,
						}
					},

				},
				{
					name: "栏目条",
					switch: 0, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "好物推荐", //秒杀标题
						titleColor: "#333", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "", //图标
						iconColor: "#333", //图标颜色
						iconSize: 42, //图标字体大小
						promotion: "", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 30, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "300", //宣传语字体粗细
						moreText: "查看更多",
						moreColor: "#333",
						moreUrl: "",
					}
				},
				{
					name: "图文模块",
					switch: 0, //0显示  1隐藏
					component: "bcArticle",
					content: {
						type: 3, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						articleTypeId: 11, // 选择分类ID如不选则为0或者展示全部分类
						waterfallFlow: 0, //是否瀑布流 0 为是   1为否    只对常规展示有效，其它展示效果无效
						showProduct: 1, //是否商品信息 0 为是   1为否 
						articleList: {
							quantity: 10, //显示数量
							commentCountType: 0, //评论显示  0显示  1隐藏
							fabulousCountType: 0, //点赞显示  0显示  0隐藏
							marketpriceType: 0, //原价显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.99)",
							titleSize: 28, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "600", //标题字体粗细
							priceSize: 36, //价格颜色
							priceThickness: "900", //标题字体粗细
							priceColor: "#F20", //价格颜色
							pictureRadius: 15, //模块图片圆角
							borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
						}
					}
				},
				{
					name: "栏目条",
					switch: 0, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "精选品牌", //秒杀标题
						titleColor: "#333", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "", //图标
						iconColor: "#333", //图标颜色
						iconSize: 42, //图标字体大小
						promotion: "", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 30, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "300", //宣传语字体粗细
						moreText: "查看更多",
						moreColor: "#333",
						moreUrl: "/pages/promotion/seckill",
					}
				},
				{
					name: "秒杀",
					switch: 1, //0显示  1隐藏
					component: "bcSeckill",
					content: {
						type: 1, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5	
						seckillList: {
							quantity: 4, //显示数量
							detailedType: 2, //内面展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
							seckillPriceType: 0, //秒杀显示  0显示  1隐藏
							soldCountType: 0, //销量显示  0显示  0隐藏
							mpriceType: 0, //原价显示  0显示  1隐藏
							stockType: 0, //剩余库存显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.9)",
							titleSize: 32, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "bold", //标题字体粗细
							priceSize: 32, //价格颜色
							priceThickness: "bold", //标题字体粗细
							priceColor: "#F40", //价格颜色
							pictureRadius: 5, //模块图片圆角
							borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
							list: [ //正在进行中
								{
									seckillId: 3,
									cover: "https://www.chunfengbuy.com/uploads/20220426/d0df043145a5c6975ccf168b28c2a590.jpg",
									title: "黑珍珠车厘子",
									seckillPrice: "29.8",
									price: "32.8",
									soldCount: 262,
									stock: 80
								}
							]
						}
					}
				},
				{
					name: "品牌",
					switch: 0, //0显示  1隐藏
					component: "bcBrand",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						brandInfo: {
							quantity: 6, //显示数量
							detailedType: 0, //内面展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
							brandGoodsType: 0, //开启品牌对应的商品  0显示  1隐藏
							originaPriceType: 0, //拼团价格显示   0显示  1隐藏
							peopleCountType: 0, //几人团显示  0显示  0隐藏
							priceType: 0, //原价显示  0显示  1隐藏
							joinCountType: 0, //已拼团人数显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.99)",
							titleSize: 30, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "300", //标题字体粗细
							priceSize: 30, //价格颜色
							priceThickness: "bold", //标题字体粗细
							priceColor: "#333", //价格颜色
							pictureRadius: 0, //模块图片圆角
							borderShadow: "rgba(201,201,201,.0)", //边框颜色  空为不填
							list: [{
								img: "https://www.chunfengbuy.com/uploads/20220426/eb7c1b9e0c2596451a4d9cb309283df3.png",
								title: "洛川红富士苹果",
								originalPrice: 26,
								price: 9.9,
								peopleCount: 10, //几人团
								joinCount: 264
							}]
						}
					}
				},
				{
					name: "栏目条",
					switch: 1, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "拼团", //秒杀标题
						titleColor: "#3A3A3A", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "icon-pintuanzhuanqu", //图标
						iconColor: "#DF0000", //图标颜色
						iconSize: 48, //图标字体大小
						promotion: "一起来拼团更便宜哟", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 26, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "normal", //宣传语字体粗细
						moreText: "更多",
						moreColor: "#DF7500",
						moreUrl: "/pages/group-buying/group-list",
					}
				},
				{
					name: "拼团",
					switch: 1, //0显示  1隐藏
					component: "bcCollage",
					content: {
						type: 1, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						collageList: {
							quantity: 50, //显示数量
							detailedType: 2, //内面展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
							originaPriceType: 0, //拼团价格显示  0显示  1隐藏
							peopleCountType: 0, //几人团显示  0显示  0隐藏
							priceType: 0, //原价显示  0显示  1隐藏
							joinCountType: 0, //已拼团人数显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.99)",
							titleSize: 30, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "bold", //标题字体粗细
							priceSize: 30, //价格颜色
							priceThickness: "bold", //标题字体粗细
							priceColor: "#FF0000", //价格颜色
							pictureRadius: 5, //模块图片圆角
							borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
							list: [{
								img: "https://www.chunfengbuy.com/uploads/20220426/eb7c1b9e0c2596451a4d9cb309283df3.png",
								title: "洛川红富士苹果",
								originalPrice: 26,
								price: 9.9,
								peopleCount: 10, //几人团
								joinCount: 264
							}]
						}
					}
				},
				{
					name: "栏目条",
					switch: 1, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "砍价", //秒杀标题
						titleColor: "#3A3A3A", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "icon-kanjia1", //图标
						iconColor: "#DF0000", //图标颜色
						iconSize: 46, //图标字体大小
						promotion: "把价格砍到最低", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 26, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "normal", //宣传语字体粗细
						moreText: "更多",
						moreColor: "#DF7500",
						moreUrl: "/pages/boost/boost-center",
					}
				},
				{
					name: "砍价",
					switch: 0, //0显示  1隐藏
					component: "bcBargain",
					content: {
						type: 2, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						bargainList: {
							quantity: 6, //显示数量
							detailedType: 2, //内面展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
							originaPriceType: 0, //拼团价格显示  0显示  1隐藏
							timeType: 0, //几人团显示  0显示  0隐藏
							priceType: 0, //原价显示  0显示  1隐藏
							joinCountType: 0, //已拼团人数显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.99)",
							titleSize: 32, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "600", //标题字体粗细
							priceSize: 36, //价格颜色
							priceThickness: "900", //标题字体粗细
							priceColor: "#F40", //价格颜色
							pictureRadius: 15, //模块图片圆角
							borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
							list: [{
								id: 5,
								img: "https://www.chunfengbuy.com/uploads/20220426/eb7c1b9e0c2596451a4d9cb309283df3.png",
								productName: "洛川红富士苹果",
								boostPrice: 26,
								price: 59.9,
								activityAfter: "2021-07-31 22:37:17",
								isUsed: false,
							}]
						}
					}
				},
				{
					name: "栏目条",
					switch: 1, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "新品上市", //秒杀标题
						titleColor: "#3A3A3A", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "icon-xinpin", //图标
						iconColor: "#DF0000", //图标颜色
						iconSize: 46, //图标字体大小
						promotion: "每日准点上新", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 26, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "normal", //宣传语字体粗细
						moreText: "更多",
						moreColor: "#DF7500",
						moreUrl: "/pages/promotion/newproducts",
					}
				},
				
				{
					name: "商品列表",
					switch: 1, //0显示  1隐藏
					component: "bcProduct",
					content: {
						type: 2, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						productList: {
							quantity: 4, //显示数量
							detailedType: 2, //内面展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
							promotionType: 0, //宣传显示  0显示  1隐藏
							reviewCountType: 0, //评论显示  0显示  0隐藏
							marketpriceType: 0, //原价显示  0显示  1隐藏
							soldcountType: 0, //销量显示  0显示  1隐藏
							totalStockType: 0, //库存显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.99)",
							titleSize: 32, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "600", //标题字体粗细
							priceSize: 36, //价格颜色
							priceThickness: "900", //标题字体粗细
							priceColor: "#F40", //价格颜色
							pictureRadius: 15, //模块图片圆角
							borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
							list: [{
								id: 3,
								title: "美早大樱桃山东国产车厘子",
								slide_list: {
									img: "https://www.chunfengbuy.com/uploads/20220501/339b4faba8b7be5a5728c9a0fcb6e811.jpg",
									sort: 1
								},
								market_price: "88.90",
								price: "58.80",
								specs: 1,
								sold_count: 4,
								review_count: 0,
								total_stock: 10000,
								promotion: "",
								add_subtitle: "",
								no_color_img: "",
								good_number: "",
								good_producer: "",
								grade_staue: 0,
								grade_price: ""
							}]
						}
					}
				},
				{
					name: "栏目条",
					switch: 1, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "短视频商品", //秒杀标题
						titleColor: "#3A3A3A", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "icon-shipin", //图标
						iconColor: "#DF0000", //图标颜色
						iconSize: 46, //图标字体大小
						promotion: "带您更好地展现好物", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 26, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "normal", //宣传语字体粗细
						moreText: "更多",
						moreColor: "#DF7500",
						moreUrl: "/pages/promotion/hotproducts-list",
					}
				},
				{
					name: "图文模块",
					switch: 1, //0显示  1隐藏
					component: "bcArticle",
					content: {
						type: 1, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						articleTypeId: 2, // 选择分类ID如不选则为0或者展示全部分类
						waterfallFlow: 0, //是否瀑布流 0 为是   1为否    只对常规展示有效，其它展示效果无效
						showProduct: 0, //是否商品信息 0 为是   1为否 
						articleList: {
							quantity: 10, //显示数量
							commentCountType: 0, //评论显示  0显示  1隐藏
							fabulousCountType: 0, //点赞显示  0显示  0隐藏
							marketpriceType: 0, //原价显示  0显示  1隐藏
							modulMT: 30, //模块头部距离
							itemBgColor: "rgba(255,255,255,.99)",
							titleSize: 28, //标题字体大小
							titleColor: "#353535", //标题字体颜色
							titleThickness: "600", //标题字体粗细
							priceSize: 36, //价格颜色
							priceThickness: "900", //标题字体粗细
							priceColor: "#F20", //价格颜色
							pictureRadius: 15, //模块图片圆角
							borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
						}
					}
				},
				{
					name: "图片",
					switch: 1, //0显示  1隐藏
					component: "bcPicture",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						displayTitle: "display", //显示标题 display显示  hide隐藏
						pictureInfo: {
							displayType: "ordinary", //显示方式 ordinary 普通  leaveEdge 两边距
							pictureMT: 30, //图片模块头部距离
							pictureHeight: 220, //图片高度
							pictureRadius: 20, //图片圆角
							sideMargin: 30, //图片左右边距
							marginBottom: 20, //图片底部距离
							list: [{
								title: "我是图片1", //标题
								cover: "https://www.chunfengbuy.com/uploads/20211201/693b9486d770537b68269507e83c72d6.png", //图片
								linkTo: "/pages/index/index"
							}, ]
						}
					}
				},
				{
					name: "栏目条",
					switch: 0, //0显示  1隐藏
					component: "bcColumn",
					content: {
						type: 0, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
						modulMT: 30, //模块头部距离
						modulMargin: 30, //模块左右边距
						title: "猜您喜欢", //秒杀标题
						titleColor: "#333", //标题颜色
						titleSize: 42, //标题字体大小
						titleThickness: "bold", //标题字体粗细
						titleML: 10, //标题距离左边距
						icon: "", //图标
						iconColor: "#333", //图标颜色
						iconSize: 42, //图标字体大小
						promotion: "", //宣传语
						promotionColor: "#7F7F7F", //宣传语颜色
						promotionSize: 30, //宣传语字体大小
						promotionML: 20, //宣传语距离左边距
						promotionThickness: "300", //宣传语字体粗细
						moreText: "",
						moreColor: "#333",
						moreUrl: "",
					}
				},
			],
			footerModular: {
				name: "尾部模块",
				switch: 0, //0显示  1隐藏
				component: "bcFooter", // 组件名称
				content: {
					type: 1, //展示效果  0展示效果1 1展示效果2 2展示效果3 3展示效果4 4展示效果5
					footerInfo: {
						promotionType: 0, //宣传显示  0显示  1隐藏
						reviewCountType: 0, //评论显示  0显示  0隐藏
						marketpriceType: 0, //原价显示  0显示  1隐藏
						soldcountType: 0, //销量显示  0显示  1隐藏
						totalStockType: 0, //库存显示  0显示  1隐藏
						mailType: 0, //邮寄显示  0显示  1隐藏
						modulMT: 30, //模块头部距离
						itemBgColor: "rgba(246,246,246,.99)",
						titleSize: 32, //标题字体大小
						titleColor: "#353535", //标题字体颜色
						titleThickness: "300", //标题字体粗细
						priceSize: 36, //价格颜色
						priceThickness: "900", //标题字体粗细
						priceColor: "#333", //价格颜色
						pictureRadius: 0, //模块图片圆角
						borderShadow: "rgba(201,201,201,.5)", //边框颜色  空为不填
						list: [{
								titie: "猜您喜欢",
								promotion: "YOULIKE",
								output: "likeGoods",
								id: 0
							}
						]
					}
				}
			},
		},
		//这里是分类页模板
		categoryTemplate: {
			name: "分类模块",
			type: 1, //0-3种显示方式
			component: "bcHeader", // 组件名称
		}
	}
}
const categoryStyle = {
	categoryType: 'styleOne'
}
export default {
	renovation,
	categoryStyle
}
