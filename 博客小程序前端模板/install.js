const install=(Vue)=>{
	const requireComponents=require.context('./components/',true,/\.vue$/);
	requireComponents.keys().forEach(fileName=>{
		const config=requireComponents(fileName);
		if(config.default.name!='trees'){
			Vue.component(config.default.name,config.default);
		}
	});
}

export default{
	install
}