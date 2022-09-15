import { get, isEmpty } from 'lodash';

/**
 * forums站点全局配置权限
 * @param {*} key 需要在forums对象中检查的字段，例如 other.can_create_thread_goods
 * @returns {object}
 */
module.exports = key => {
  return {
    data() {
      return {
        hasPermission: null,
      };
    },

    watch: {
      hasPermission(nValue, oValue) {
        // 监听没有权限，跳转到首页
        if (nValue === false && oValue === null) {
          uni.redirectTo({
            url: `/pages/home/index`,
          });
        }
      },
    },

    created() {
      const forums = this.$store.getters['jv/get']('forums/1');
      if (isEmpty(forums)) {
        // 组件级处理
        // 因为uni中没有类似于beforeRouteEnter的提供路由守卫
        // 所以这里采用事件的方式进行处理
        uni.$on('inited', this.checkHasPermission);
      } else {
        // 页面级处理
        this.checkHasPermission(forums);
      }
    },

    beforeDestroy() {
      uni.$off('inited', this.checkHasPermission);
    },

    methods: {
      checkHasPermission(forums) {
        this.hasPermission = get(forums, key);
      },
    },
  };
};
