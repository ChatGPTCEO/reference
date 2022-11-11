import Vue from 'vue'
import Vuex from 'vuex'
import common from '../script/common.js'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        sender: null,
        reciver: null,
        readyReciver: null,
        navId: 2,
        sessionList: [], //会话列表
        sessionSelectId: 0,
        allSessionList: [],
        allSessionSelectId: 0,
        socket: null,
        noCode: +new Date,
        conversitionList: [],
        sendInfo: "",
        expressionShow: false,
        contentScrollbar: null,
        chatEditor: null,
        editor: null,
        editorData: '',
        openMusic: false,
        tipMusic: null,
		scrollTop:0,
		communityList:[]
    },
    mutations: {
		// 通用方法：更新数据方法
        setPropName(state, res) {
            state[res.propName] = res.value;
			
        },
        // 修改信息已读状态
        changeReaded(state, res) {
            let userConversition = store.state.conversitionList.filter(
                (x) =>
                x.SendId == res &&
                x.ReciverId == store.state.sender.Id &&
                !x.ReadFlag
            );
            if (userConversition.length > 0) {
                userConversition.map((x) => {
                    x.ReadFlag = true;
                });
            }
            let query = {
                SendId: res,
                ReciverId: store.state.sender.Id,
            };
            store.state.socket.emit("changeMsgRead", query);
        },
		// 修改sessionList
		changeSessionList(state,res){
			if(res?.option == 'add'){
				store.state.sessionList.push(res.data)
			}
		}
    },
    actions: {

    }
})

export default store
