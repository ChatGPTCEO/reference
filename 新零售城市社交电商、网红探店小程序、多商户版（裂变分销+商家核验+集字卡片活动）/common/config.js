let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://www.378361.cn'
}else{
    // 生产环境
    url_config = 'https://www.378361.cn' // https://www.uu6s.com
}

export default url_config