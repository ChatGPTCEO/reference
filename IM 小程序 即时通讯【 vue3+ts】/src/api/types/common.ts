/**
 * 公共请求模块
 */
export interface IParams {
  pageSize: number;
  pageNum: number;
  sortField?: any;
  sortOrder?: any;

  [key: string]: string | any
}

/**
 * 返回数据
 */
export interface IResponse<T> {
  code: string
  data: T
  rows: Array<T>
  total: number
  message: string
}

/**
 * 静态文件上传返回
 */
export interface IRespStatic {
  path: string
  image: string
  ext: string
  m3u8?: string
  total?:number
}


/**
 * 系统配置
 */
export interface IConfig {
  id: number
  Key: string
  Value: string
}
