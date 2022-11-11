
//#ifndef H5
const recorderManager = uni.getRecorderManager();
module.exports={
    data(){
        return {
            
			rec_open:false,
			voicePath:'',
			rec_cancel:false,
			rec_state:0
        }
    },
	computed:{
		audio_plachodler(){
			if(this.rec_open){
				if(!this.rec_state){
					return '点我说话'
				}else{
					return '说话中...'
				}
			}else{
				return ''
			}
			
		}
	}
    ,methods:{
        recOpen:function(){
			this.rec_open = true
			this.rec_cancel = false
			let self = this;
			recorderManager.onStop( (res) =>{
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
				console.log(res,'xcx')
				if(!this.rec_cancel){
					
					if(this.fake){//不经过服务器
						this.content = res.tempFilePath
						// this.msg = this.user.name+':语音消息'
						this.message_type = 'audio'
						this.extra = {
							time: parseInt(res.duration/1000)
						}
						this.im_send()
						return 
					}
					
					this.$store.dispatch('im/uploadFileAudio',res.tempFilePath).then(res_audio=>{
						if(res_audio.data.code==0){
							this.content = res_audio.data.data.src
							// this.msg = this.user.name+':语音消息'
							this.message_type = 'audio'
							this.extra = {
								time: parseInt(res.duration/1000)
							}
							this.im_send()
						}
					})
				}else{
					console.log('取消了')
				}
				
				
			});
        },
		recCancel(){
			this.rec_cancel = true
			this.recStop()
		}
        ,recStart:function(){
			if(this.rec_state){//正在录音,开始停止
				this.recStop()
			}else{
				this.rec_state =1
				recorderManager.start({format:'mp3'});
			}
        }
        ,recStop:function(){
			
			this.rec_open = false
			this.rec_state = 0
            recorderManager.stop();
           
        }

        ,reclog:function(msg,color,res){
            
        }
        ,recplay:function(){
            innerAudioContext.src = this.audio_src;
            innerAudioContext.onPlay(() => {
              console.log('开始播放');
            });
            innerAudioContext.onError((res) => {
              console.log(res.errMsg);
              console.log(res.errCode);
            });
        }
        
    }
}
//#endif


//#ifdef H5

//加载必须要的core，demo简化起见采用的直接加载类库，实际使用时应当采用异步按需加载
import Recorder from 'recorder-core'
//需要使用到的音频格式编码引擎的js文件统统加载进来，这些引擎文件会比较大
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'
//可选的扩展
// import 'recorder-core/src/extensions/waveview'



module.exports={
    data(){
        return {
            Rec:Recorder
            
            ,type:"mp3"
            ,bitRate:16
            ,sampleRate:16000

            ,rec:0
            ,duration:0
            ,powerLevel:0

            ,recOpenDialogShow:0
            ,logs:[],
			audio_src:'',
			rec_open:false,
			rec_cancel:false,
			rec_state:0
        }
    },
	computed:{
		audio_plachodler(){
			if(this.rec_open){
				if(!this.rec_state){
					return '点我说话'
				}else{
					return '请说话，说完后点我发送'
				}
			}else{
				return ''
			}
			
		}
	}
    ,methods:{
        recOpen:function(){
			this.rec_open = true
			this.rec_cancel = false
            var This=this;
            var rec=this.rec=Recorder({
                type:This.type
                ,bitRate:This.bitRate
                ,sampleRate:This.sampleRate
                ,onProcess:function(buffers,powerLevel,duration,sampleRate){
                    This.duration=duration;
                    This.powerLevel=powerLevel;
                    // This.wave.input(buffers[buffers.length-1],powerLevel,sampleRate);
                }
            });

            This.dialogInt=setTimeout(function(){//定时8秒后打开弹窗，用于监测浏览器没有发起权限请求的情况
                This.showDialog();
            },8000);

            rec.open(function(){
                This.dialogCancel();
                // This.wave=Recorder.WaveView({elem:".ctrlProcessWave"});
            },function(msg,isUserNotAllow){
                This.dialogCancel();
            });

            This.waitDialogClickFn=function(){
                This.dialogCancel();
            };
        },
		recCancel(){
			console.log('cccccc',this.rec_cancel)
			this.rec_cancel = true
			this.recStop()
		}
        ,recStart:function(){
			
			
			
            if(!this.rec){
				alert('未打开录音11')
                this.reclog("未打开录音",1);
                return;
            }else{
				// alert('开始录音')
			}
			if(this.rec_state){//正在录音,第二次点击，发送语音
			console.log('cccccc1111',this.rec_cancel)
				this.recStop()
			}else{
				this.rec_state =1
				this.rec.start();
				
				var set=this.rec.set;
			}
            
        }
        ,recStop:function(){
			
			this.rec_open = false
			this.rec_state = 0
			
            var This=this;
            var rec=This.rec;
            This.rec=null;
            if(!rec){
				// alert('未打开录音22')
                This.reclog("未打开录音",1);
                return;
            }else{
				// alert('结束录音21232')
			}
			
			
			

            rec.stop((blob,duration)=>{
				// alert('结束录音')
				console.log('cccccc31232132',this.rec_cancel)
				if(!this.rec_cancel){
					this.blobToBase64(blob).then(res=>{
						 // alert(res)
						
						this.audio_src = res
						if(this.fake){////不经过服务器
							this.content = res
							this.msg = '您收到语音消息'
							this.message_type = 'audio'
							this.extra = {
								time: parseInt(duration/1000)
							}
							this.im_send()
							return 
						}
						this.$store.dispatch('im/uploadAudio',{audio:res}).then(res_audio=>{
							if(res_audio.data.code==0){
								this.content = res_audio.data.data.src
								this.msg = '您收到语音消息'
								this.message_type = 'audio'
								this.extra = {
									time: parseInt(duration/1000)
								}
								this.im_send()
							}
						})
						// this.recplay()
					})
				}else{
					console.log('用户取消了')
				}
				 
				
                // This.reclog("已录制:","",{
                //     blob:blob
                //     ,duration:duration
                //     ,rec:rec
                // });
            },function(s){
				// alert('结束出错'+s)
                This.reclog("结束出错："+s,1);
            },true);//自动close
        }

        ,reclog:function(msg,color,res){
            
        }
        ,recplay:function(){
            innerAudioContext.src = this.audio_src;
            innerAudioContext.onPlay(() => {
              console.log('开始播放');
            });
            innerAudioContext.onError((res) => {
              console.log(res.errMsg);
              console.log(res.errCode);
            });
        },
		blobToBase64(blob) {
		  return new Promise((resolve, reject) => {
		    const fileReader = new FileReader();
		    fileReader.onload = (e) => {
		      resolve(e.target.result);
		    };
		    // readAsDataURL
		    fileReader.readAsDataURL(blob);
		    fileReader.onerror = () => {
		      reject(new Error('blobToBase64 error'));
		    };
		  });
		}

       


        ,showDialog:function(){
            //我们可以选择性的弹一个对话框：为了防止移动端浏览器存在第三种情况：用户忽略，并且（或者国产系统UC系）浏览器没有任何回调
            if(!/mobile/i.test(navigator.userAgent)){
				alert(35555555)
                return;//只在移动端开启没有权限请求的检测
            };
            this.recOpenDialogShow=1;
        }
        ,dialogCancel:function(){
            clearTimeout(this.dialogInt);
            this.recOpenDialogShow=0;
        }
        ,waitDialogClick:function(){
            this.dialogCancel();
            this.waitDialogClickFn();
        }
    }
}
//#endif