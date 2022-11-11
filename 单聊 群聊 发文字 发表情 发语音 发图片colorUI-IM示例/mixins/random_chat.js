var app = {
	data(){
		return {
		
		}
	},
	methods:{
		random_chat_get_lists(params){
			return this.$store.dispatch('random_chat/get_lists',params).then(res=>{
				return res
			})
		},
		random_chat_join(params){
			return this.$store.dispatch('random_chat/join',params).then(res=>{
				return res
			})
		},
		random_chat_update_list(data){
			// data = {
			// 	type:'random_chat_joining',
			// 	random_chat_id:'',
			// 	count:'',
			// }
			var random_chat_lists = JSON.parse(JSON.stringify(this.random_chat.lists))
			
			random_chat_lists = random_chat_lists.map((list)=>{
				if(list.id==data.content.id){
					list= data.content
				}
				return list
			})
			
			this.$store.dispatch('random_chat/lists',random_chat_lists)
		},	
		
	},
	created(){
		
	},
	computed:{
		random_chat(){
			return this.$store.state.random_chat
		}
	}
}

export default app