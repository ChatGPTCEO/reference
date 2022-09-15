/* eslint-disable-next-line no-param-reassign */
import { setCategories } from '@/store/types/categories';

const state = {
  categories: [],
};

const actions = {
  setCategories(context, payload) {
    context.commit(setCategories, payload);
  },
};

const mutations = {
  [setCategories](state, payload) {
    if (payload) state.categories = payload;
  },
};

const getters = {
  get: state => {
    return data => {
      return state[data];
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
