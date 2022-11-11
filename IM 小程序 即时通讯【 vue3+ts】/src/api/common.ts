import {get, post, upload} from "../common/request";
import {IConfig, IResponse, IRespStatic} from "./types/common";
import {IUserInfo} from "../types/store/user";
import {store} from "../store";


// 獲取用户信息
export const getConfig = (key: string) => {
    return get<IConfig>('wx/config/' + key, {hide: true})
}

// 更新用户信息
export const updateUser = (userInfo: any) => {
    return post<IResponse<any>>('wx/userUpdate', userInfo)
}

// 獲取用户信息
export const getUserInfo = () => {
    return get<{ user: IUserInfo }>('wx/getUserInfo', {hide: true})
}

//圖片上传
export const uploadImage = (filePath: string) => {
    return upload<IRespStatic>('static/upload/image', filePath)
}

//多媒体上传
export const uploadMedia = (filePath: string) => {
    return upload<IRespStatic>('static/upload/media', filePath)
}

