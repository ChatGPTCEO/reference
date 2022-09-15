import { get } from 'lodash';

module.exports = {
  methods: {
    // 获取用户template ID
    getTemplates(
      params,
      callback = () => {},
      errorCallback = e => {
        console.log(e);
      },
    ) {
      // 此 API 为 微信小程序 API，暂时 H5 直接 resolve
      /* #ifdef MP-WEIXIN */
      this.$store.dispatch('jv/get', ['notification/tpl/detail', { params }]).then(res => {
        const templateId = res.map(item => get(item, 'template_id')).filter(id => id);
        if (templateId.length === 0) return;
        wx.requestSubscribeMessage({
          tmplIds: templateId,
          success() {
            callback();
          },
          fail(e) {
            errorCallback(e);
            callback();
          },
        });
      });
      /* #endif */

      /* #ifdef H5 */
      callback();
      /* #endif */
    },
  },
};
