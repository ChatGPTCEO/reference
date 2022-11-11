import Vue from 'vue'
import App from './App'
import store from './store'


import friendPage from './colorui/components/friend/page.vue'
import myPage from './colorui/components/my/page.vue'
import messages from './colorui/components/home/messages.vue'
import friends from './colorui/components/friend/friends.vue'
import groups from './colorui/components/friend/groups.vue'
import randomChatIndex from './colorui/components/random-chat/index.vue'
import cuCustom from './colorui/components/cu-custom.vue'
import cuCustomWidth from './colorui/components/cu-custom-width.vue'
import chatAvatar from './colorui/components/chat/avatar.vue'
import chatText from './colorui/components/chat/text.vue'
import chatImage from './colorui/components/chat/image.vue'
import chatFile from './colorui/components/chat/file.vue'
import chatVideo from './colorui/components/chat/video.vue'
import chatAudio from './colorui/components/chat/audio.vue'
import chatTwoClickAvatar from './colorui/components/chat/two-click-avatar.vue'
import chatTwoClickText from './colorui/components/chat/two-click-text.vue'
import chatList from './colorui/components/chat/list.vue'
import chatLeft from './colorui/components/chat/left.vue'
import chatEmoji from './colorui/components/chat/emoji.vue'
import addUserToGroup from './colorui/components/chat/add-user-to-group.vue'
Vue.component('friend-page',friendPage)
Vue.component('my-page',myPage)
Vue.component('messages',messages)
Vue.component('friends',friends)
Vue.component('groups',groups)
Vue.component('random-chat-index',randomChatIndex)
Vue.component('cu-custom',cuCustom)
Vue.component('cu-custom-width',cuCustomWidth)
Vue.component('chat-avatar',chatAvatar)
Vue.component('chat-text',chatText)
Vue.component('chat-image',chatImage)
Vue.component('chat-file',chatFile)
Vue.component('chat-audio',chatAudio)
Vue.component('chat-video',chatVideo)
Vue.component('chat-two-click-avatar',chatTwoClickAvatar)
Vue.component('chat-two-click-text',chatTwoClickText)
Vue.component('chat-list',chatList)
Vue.component('chat-left',chatLeft)
Vue.component('chat-emoji',chatEmoji)
Vue.component('chat-add-user-to-group',addUserToGroup)


import * as tool from './utils/tool.js'
Vue.prototype.$tool =tool 

import request from './common/request.js'

Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$api = require('./common/router-generator.js')(require('./common/route.map.js'))



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
