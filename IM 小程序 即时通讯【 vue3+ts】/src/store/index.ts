import {createStore, Store, useStore as baseUseStore} from 'vuex';
import {InjectionKey} from 'vue';

// @ts-ignore
import user from './module/user'
import chat from './chat/index'

import {IState} from "../types/vuex";

export const store = createStore<IState>({
    modules: {
        user,
        chat
    }
});

export const key: InjectionKey<Store<IState>> = Symbol("media");

// 定义自己的 `useStore` 组合式函数
export function useStore(): Store<IState> {
    return baseUseStore(key);
}
