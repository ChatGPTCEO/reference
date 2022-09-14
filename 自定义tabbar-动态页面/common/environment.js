/*开发环境*/
const  dev = {
// #ifdef H5
BASE_API: '/bbc-interface-boot',
MULTIPART_API: '/bbc-interface-boot',
// #endif
// #ifndef H5
BASE_API: 'http://127.0.0.1:8080/bbc-interface-boot',
MULTIPART_API: 'http://127.0.0.1:8080/bbc-interface-boot',
// #endif
}

const  test = {
// #ifdef H5
BASE_API: '/bbc-interface-boot',
MULTIPART_API: '/bbc-interface-boot',
// #endif
// #ifndef H5
BASE_API: 'http://127.0.0.1/bbc-interface-boot',
MULTIPART_API: 'http:/127.0.0.1/bbc-interface-boot',
// #endif
}
/*
=================注意根据需要改变环境================
H5 环境有配置代理,请在manifest.json源码视图里面最后面的代码块查看
 */
const  environment = test
export default {
BASE_API: environment.BASE_API,
MULTIPART_API: environment.MULTIPART_API,
}
