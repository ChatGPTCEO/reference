/*
本地模拟接口请求, 仅demo演示用.
实际项目以您服务器接口返回的数据为准,无需本地处理分页.
请参考官方写法: https://www.mescroll.com/uni.html?v=20200210#tagUpCallback
* */

// 模拟数据
import jobs from './jobs.js';
import tebBeans from './tenBeansList.js';
import goods from './goods.js';

// 获取岗位列表
export function apiJobsList(pageNum,pageSize) {
	return new Promise((resolute, reject)=>{
		//延时一秒,模拟联网
		setTimeout(()=> {
			try{
				let data = jobs;
				//模拟分页数据
				let list=[];
				for (let i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
					if(i==data.length) break;
					list.push(data[i]);
				}
				resolute(list);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		},1000)
	})
}

// 获取5豆专区列表
export function apitebBeansList(pageNum,pageSize) {
	return new Promise((resolute, reject)=>{
		//延时一秒,模拟联网
		setTimeout(()=> {
			try{
				let data = tebBeans;
				//模拟分页数据
				let list=[];
				for (let i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
					if(i==data.length) break;
					list.push(data[i]);
				}
				resolute(list);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		},1000)
	})
}

// 商品列表
export function apigoodsList(pageNum,pageSize) {
	return new Promise((resolute, reject)=>{
		//延时一秒,模拟联网
		setTimeout(()=> {
			try{
				let data = goods;
				//模拟分页数据
				let list=[];
				for (let i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
					if(i==data.length) break;
					list.push(data[i]);
				}
				resolute(list);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		},1000)
	})
}