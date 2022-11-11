export class LsjFile {
	constructor(data) {
		this.isInit = false;
		this.dom = null;
		// files.type = waiting（等待上传）|| loading（上传中）|| success（成功） || fail（失败）
		this.files = new Map();
		this.debug = data.debug || false;
		this.id = data.id;
		this.width = data.width;
		this.height = data.height;
		this.option = data.option;
		this.instantly = data.instantly;
		this.prohibited = data.prohibited;
		this.onchange = data.onchange;
		this.onprogress = data.onprogress;
		this.uploadHandle = this._uploadHandle;
		// #ifdef MP-WEIXIN
		this.uploadHandle = this._uploadHandleWX;
		// #endif
	}
	
	
	/**
	 * 创建File节点
	 * @param {string}path webview地址
	 */
	create(path) {
		if (!this.dom) {
			// #ifdef H5
				let dom = document.createElement('input');
				dom.type = 'file'
				dom.value = ''
				dom.style.height = this.height
				dom.style.width = this.width
				dom.style.position = 'absolute'
				dom.style.top = 0
				dom.style.left = 0
				dom.style.right = 0
				dom.style.bottom = 0
				dom.style.opacity = 0
				dom.style.zIndex = 999
				dom.accept = this.prohibited.accept;
				dom.onchange = event => this.addFile(event);
				this.dom = dom;
			// #endif
		
			// #ifdef APP-PLUS
				let styles = {
					top: '-500px',
					left: 0,
					width: '1px',
					height: '1px',
					background: 'transparent'
				};
				let extras = {
					debug: this.debug,
					instantly: this.instantly,
					prohibited: this.prohibited,
				}
				this.dom = plus.webview.create(path, this.id, styles,extras);
				console.log('111');
				this._overrideUrlLoading();
			// #endif
			return this.dom;
		}
	}
	
	/**
	 * 设置上传参数
	 * @param {object}option 上传参数
	 */
	setData(option={}) {
		Object.assign(this.option,option);
		// #ifdef APP-PLUS
		if (this.dom&&this.isInit) {
			this.dom.evalJS(`vm.setData('${JSON.stringify(this.option)}')`);
		}
		else {
			setTimeout(()=>{
				this.isInit = true;
				this.setData(this.option)
			},300);
		}
		// #endif
	}
	
	/**
	 * 上传
	 * @param {string}name 文件名称
	 */
	async upload(name='') {
		if (!this.option.url) {
			throw Error('未设置上传地址');
		}
		
		// #ifndef APP-PLUS
			if (name && this.files.has(name)) {
				await this.uploadHandle(this.files.get(name));
			}
			else {
				for (let item of this.files.values()) {
					if (item.type === 'waiting' || item.type === 'fail') {
						await this.uploadHandle(item);
					}
				}
			}
		// #endif
		
		// #ifdef APP-PLUS
			this.dom&&this.dom.evalJS(`vm.upload('${name}')`);
		// #endif
	}
	
	// 选择文件change
	addFile(event) {
		// #ifndef MP-WEIXIN
			let file = event.target.files[0];
			this.dom.value = '';
		// #endif
		// #ifdef MP-WEIXIN
			let file = event;
		// #endif
		
		let name = file.name;
		this.debug&&console.log('文件名称',name,'大小',file.size);
		
		if (file) {
			// 限制文件格式
			let suffix = name.substring(name.lastIndexOf(".")+1).toLowerCase();
			let formats = this.prohibited.formats.toLowerCase();
			if (formats.includes(suffix)) {
				this.toast(`不支持上传${suffix.toUpperCase()}格式文件`);
				return false;
			}
			// 限制文件大小
			if (file.size > 1024 * 1024 * Math.abs(this.prohibited.size)) {
				this.toast(`附件大小请勿超过${this.prohibited.size}M`)
				return false;
			}
			this.files.set(file.name,{file,name: file.name,size: file.size,progress: 0,type: 'waiting'});
			
			// #ifndef MP-WEIXIN
			this.onchange(this.files);
			this.instantly&&this.upload();
			// #endif
			
			// #ifdef MP-WEIXIN
			return true;
			// #endif
		}
	}
	
	/**
	 * 移除文件
	 * @param {string}name 不传name默认移除所有文件，传入name移除指定name的文件
	 */
	clear(name='') {
		// #ifdef APP-PLUS
		this.dom&&this.dom.evalJS(`vm.clear('${name}')`);
		// #endif
		
		if (!name) {
			this.files.clear();
		}
		else {
			this.files.delete(name);
		}
		return this.onchange(this.files);
	}
	
	/**
	 * 提示框
	 * @param {string}msg 轻提示内容
	 */
	toast(msg) {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}
	
	/**
	 * 微信小程序选择文件
	 * @param {number}count 可选择文件数量
	 */
	chooseMessageFile(count) {
		// #ifdef MP-WEIXIN
		wx.chooseMessageFile({
			count: count,
			type: 'file',
			success: ({ tempFiles }) => {
				for (let file of tempFiles) {
					let next = this.addFile(file);
					if (!next) {return}
				}
				this.onchange(this.files);
				this.instantly&&this.upload();
			},
			fail: (res) => {
				console.error(res);
				this.toast(`打开失败`);
			}
		})
		// #endif
	}
	
	_overrideUrlLoading() {
		this.dom.overrideUrlLoading({ mode: 'reject' }, e => {
			let {retype,item,files} = this._getRequest(
				e.url
			);
			let _this = this;
			switch (retype) {
				case 'change':
					try {
						_this.files = new Map(JSON.parse(unescape(files)));
					} catch (e) {
						return console.error('出错了，请检查代码')
					}
					_this.onchange(this.files);
					break
				case 'progress':
					try {
						item = JSON.parse(unescape(item));
					} catch (e) {
						return console.error('出错了，请检查代码')
					}
					_this._changeFilesItem(item);
					break
				default:
					break
			}
		})
	}
	
	_getRequest(url) {
		let theRequest = new Object()
		let index = url.indexOf('?')
		if (index != -1) {
			let str = url.substring(index + 1)
			let strs = str.split('&')
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
			}
		}
		return theRequest
	}
	
	_changeFilesItem(item) {
		this.onprogress(item);
		this.files.set(item.name,item);
		this.debug&&console.log('onprogress',JSON.stringify(item));
	}
	
	_uploadHandle(item) {
		item.type = 'loading';
		delete item.responseText;
		return new Promise((resolve,reject)=>{
			this.debug&&console.log('option',JSON.stringify(this.option));
			let {url,name,method='POST',header,formData} = this.option;
			let form = new FormData();
			for (let keys in formData) {
				form.append(keys, formData[keys])
			}
			form.append(name, item.file);
			let xmlRequest = new XMLHttpRequest();
			xmlRequest.open(method, url, true);
			for (let keys in header) {
				xmlRequest.setRequestHeader(keys, header[keys])
			}
			
			xmlRequest.upload.addEventListener(
				'progress',
				event => {
					if (event.lengthComputable) {
						let progress = Math.ceil((event.loaded * 100) / event.total)
						if (progress <= 100) {
							item.progress = progress;
							this._changeFilesItem(item);
						}
					}
				},
				false
			);
			
			xmlRequest.ontimeout = () => {
				console.error('请求超时')
				item.type = 'fail';
				this._changeFilesItem(item);
				return resolve(false);
			}
			
			xmlRequest.onreadystatechange = ev => {
				if (xmlRequest.readyState == 4) {
					if (xmlRequest.status == 200) {
						this.debug&&console.log('上传完成：' + xmlRequest.responseText)
						item['responseText'] = xmlRequest.responseText;
						item.type = 'success';
						this._changeFilesItem(item);
						return resolve(true);
					} else if (xmlRequest.status == 0) {
						console.error('status = 0 :请检查请求头Content-Type与服务端是否匹配，服务端已正确开启跨域，并且nginx未拦截阻止请求')
					}
					console.error('--ERROR--：status = ' + xmlRequest.status)
					item.type = 'fail';
					this._changeFilesItem(item);
					return resolve(false);
				}
			}
			xmlRequest.send(form)
		});
	}
	
	_uploadHandleWX(item) {
		item.type = 'loading';
		delete item.responseText;
		return new Promise((resolve,reject)=>{
			this.debug&&console.log('option',JSON.stringify(this.option));
			let form = {filePath: item.file.path,...this.option };
			form['fail'] = ({ errMsg = '' }) => {
				console.error('--ERROR--：' + errMsg)
				item.type = 'fail';
				this._changeFilesItem(item);
				return resolve(false);
			}
			form['success'] = res => {
				if (res.statusCode == 200) {
					this.debug&&console.log('上传完成,微信端返回不一定是字符串，根据接口返回格式判断是否需要JSON.parse：' + res.data)
					item['responseText'] = res.data;
					item.type = 'success';
					this._changeFilesItem(item);
					return resolve(true);
				}
				item.type = 'fail';
				this._changeFilesItem(item);
				return resolve(false);
			}
			
			let xmlRequest = uni.uploadFile(form);
			xmlRequest.onProgressUpdate(({ progress = 0 }) => {
				if (progress <= 100) {
					item.progress = progress;
					this._changeFilesItem(item);
				}
			})
		});
	}
}