

var text = {"from_id":2,"from":{"id":2,"name":"Vita Leffler","email":"ehammes@example.org","avatar":"https://via.placeholder.com/640x480.png/007722?text=nihil"},"to_id":"15","type":"friend","to":{"id":15,"name":"Fernando Cronin","avatar":"https://via.placeholder.com/640x480.png/006699?text=quibusdam"},"message_type":"text","data":{"content":"这是一个机器人，不要回复！不要回复！不要回复","msg":"","extra":{}},"sended_at":"2021-4-1 14:54:3"}
var image = {"from_id":2,"from":{"id":2,"name":"Vita Leffler","email":"ehammes@example.org","avatar":"https://via.placeholder.com/640x480.png/007722?text=nihil"},"to_id":"15","type":"friend","to":{"id":15,"name":"Fernando Cronin","avatar":"https://via.placeholder.com/640x480.png/006699?text=quibusdam"},"message_type":"image","data":{"content":"http://colorui-im-admin.jc91715.top/storage/chat/images/mo1RyVB6brEqALJLKT7HPU4p4M28kDNeNUSwwlrw.jpg","msg":"您收到图片消息","extra":{}},"sended_at":"2021-4-1 14:54:35"}

var audio = {"from_id":2,"from":{"id":2,"name":"Vita Leffler","email":"ehammes@example.org","avatar":"https://via.placeholder.com/640x480.png/007722?text=nihil"},"to_id":"15","type":"friend","to":{"id":15,"name":"Fernando Cronin","avatar":"https://via.placeholder.com/640x480.png/006699?text=quibusdam"},"message_type":"audio","data":{"content":"http://colorui-im-admin.jc91715.top/storage/chat/audios/1284d2f5-9f34-44f3-a7d0-dbf9be046203.mp3","msg":"您收到语音消息","extra":{"time":1}},"sended_at":"2021-4-1 14:54:43"}

var send_messages = [text,image,audio]

export default function getMessage(){
	
	var index = Math.floor((Math.random()*send_messages.length)); 
	
	var message = send_messages[index];
	if(message.message_type=='audio'){
		message.data.content = 'https://jc91715.top/music/1367452194?file_name%E6%88%91%E7%9A%84%E4%B8%80%E4%B8%AA%E9%81%93%E5%A7%91%E6%9C%8B%E5%8F%8B&pingtai=netease'
	}else if(message.message_type=='text'){
		// message.data.content 自定义文本消息
	}else if (message.message_type=='image'){
		// message.data.content 自定义图片链接
	}
	return message
}