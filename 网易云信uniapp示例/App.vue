<script>
import config from '@/config'
export default {
  onLaunch: function (option) {},
  onPageNotFound(res) {},
  globalData: {
    emitter: null,
    nim: null,
    appKey: config.imKey
  },
  onShow: function () {},
  onHide: function () {},
  methods: {}
}
</script>

<style lang="scss">
@import './common/uni.css';
@import 'uview-ui/index.scss';
@import '@s/styles/index.scss';
</style>
