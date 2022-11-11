/* eslint-disable no-unused-vars */
import {IUser} from "./store/user";
import {ComponentCustomProperties} from 'vue';
import {Store} from 'vuex';
import {IChat} from "./store/chat";

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    // eslint-disable-next-line no-use-before-define
    $store: Store<IState>;
  }
}

export interface IState {
  user: IUser,
  chat: IChat
}
