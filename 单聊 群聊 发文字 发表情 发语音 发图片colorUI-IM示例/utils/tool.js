

export function chat_img_url(path){
	if(!path){
		return ''
	}
	if(path.search('http')!=-1){
		return path
	}
	return config.chat_img_domain+path
}
export  function dateFormat(fmt, date){
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(),        // 年
		"m+": (date.getMonth() + 1).toString(),     // 月
		"d+": date.getDate().toString(),            // 日
		"H+": date.getHours().toString(),           // 时
		"M+": date.getMinutes().toString(),         // 分
		"S+": date.getSeconds().toString()          // 秒
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
export function in_array(search,array){
    for(var i in array){
        if(array[i]==search){
            return true;
        }
    }
    return false;
}

export function randomString(e) {  
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (let i = 0; i < e; i++){
	  n += t.charAt(Math.floor(Math.random() * a));
  } 
  return n
}