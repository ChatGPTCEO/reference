// 详情用法请参考：https://www.uviewui.com/js/http.html
const http = uni.$u.http

// post请求，获取菜单
export const postShopInfo = (params, config = {}) => http.post('/edcapi/Shop_shopDeatil', params, config)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getShopInfo = (data) => http.get('/edcapi/Shop_shopDeatil', data)