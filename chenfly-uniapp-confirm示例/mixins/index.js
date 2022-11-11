import { mapMutations } from 'vuex'
import Vue from 'vue'
import _ from 'lodash'
export default {
    install(Vue) {
        Vue.mixin({
            methods:{
                ...mapMutations({
					confirm$: 'confirm/SET_COMPONENT_NAMES',
					$confirmDel: 'confirm/DELETE_COMPONENT_NAMES'
                }),
				confirm_: _.debounce(function(obj){
					this.confirm$(obj)
				},500)
            }
        })
    }
}
