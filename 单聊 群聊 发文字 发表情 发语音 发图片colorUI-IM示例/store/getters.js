const getters = {
    app_name: state => state.app.name,
    forcedLogin: state => state.forcedLogin,
    fake: state => state.fake,//是否使用假数据
    hasLogin: state => state.hasLogin,
    user: state => state.user,
    users: state => state.app.users,//系统的所有用户
    option: state => state.app.option,//
   
}
export default getters
