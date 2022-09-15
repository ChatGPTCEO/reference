<template>
  <view>
    <view class="emoji-bd" v-show="emojiShow">
      <qui-emoji
        position="absolute"
        left="0"
        top="40px"
        border-radius="10rpx"
        @click="getEmojiClick"
      ></qui-emoji>
    </view>
    <view id="editor"></view>
    <uni-popup ref="atUser" type="center" class="qui-popup-at">
      <qui-popup-at @atCancel="atCancel"></qui-popup-at>
    </uni-popup>
    <uni-popup ref="topic" type="center" class="qui-popup-topic">
      <qui-popup-topic @topicCancel="topicCancel"></qui-popup-topic>
    </uni-popup>
    <view ref="input" style="display: none;"></view>
    <!-- 上传图片触发锚点 -->
    <view
      class="vditor-tooltipped upload-image-anchor"
      style="opacity: 0;"
      @click="chooseImage"
      aria-label="上传图片"
    >
      <svg
        t="1599201887912"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2496"
        width="32"
        height="32"
      >
        <path
          d="M904 176v672H120V176h784m0-56H120c-30.9 0-56 25.1-56 56v672c0 30.9 25.1 56 56 56h784c30.9 0 56-25.1 56-56V176c0-30.9-25.1-56-56-56z"
          p-id="2497"
        ></path>
        <path
          d="M204 708c-5.4 0-10.8-1.5-15.5-4.7-12.9-8.6-16.4-26-7.8-38.8l180.1-270.2c15.1-22.6 40.3-36.6 67.5-37.4 27.2-2.5 53.2 11.8 69.6 33.6l93.7 125c14-21.1 36.6-34.7 62.3-37.1 29.4-2.5 57.2 9.8 74.8 33.2l113.7 151.6c9.2 12.4 6.7 29.9-5.6 39.2-12.3 9.3-29.9 6.7-39.2-5.6L683.9 545.2c-8.4-11.3-20.2-11.4-24.9-11-4.6 0.4-16.2 2.8-22.5 15.4l-15.5 31c-4.3 8.7-12.9 14.5-22.5 15.4-9.7 0.5-19.1-3.3-24.9-11.1L453 424.1c-5.5-7.4-14.4-11.4-23.2-11.2-9.2 0.3-17.4 4.8-22.5 12.5l-180 270.1C221.9 703.6 213 708 204 708zM792 288c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56z"
          p-id="2498"
        ></path>
      </svg>
    </view>
  </view>
</template>
<script>
// eslint-disable
import Vditor from 'vditor';
import {
  AtIcon,
  TopicIcon,
  EmojiIcon,
  ImageIcon,
  // AttachIcon,
} from '@/components/qui-vditor/svg/index';
import { mapState } from 'vuex';
import appCommonH from '@/utils/commonHelper';
import Upload from '@/components/qui-vditor/utils/Upload';
import forums from '@/mixin/forums';

export default {
  mixins: [forums],
  data() {
    return {
      searchUserTimeout: null,
      vditor: null,
      emojiShow: false,
      postComponent: null,
      upload: null,
      range: {},
    };
  },
  computed: {
    ...mapState({
      getAtMemberData: state => state.atMember.atMemberData,
    }),
  },
  created() {
    this.upload = new Upload(this);
    uni.$on('atUser', () => {
      this.setCursorPosition();
      let atMemberList = '';
      this.getAtMemberData.map(item => {
        atMemberList += `@${item.username} `;
        return atMemberList;
      });
      this.vditor.insertValue(atMemberList);
      this.$refs.atUser.close();
    });
    uni.$on('clickTopic', data => {
      this.setCursorPosition();
      if (data.keywords) this.vditor.insertValue(`#${data.keywords.replace(/\s+/g, '')}# `);
      this.$refs.topic.close();
    });

    uni.$on('loadedThread', res => {
      this.vditor.insertValue(res.firstPost.content);
    });

    uni.$on('clickImage', item => {
      const html = `<img alt="${item.name}" src="${item.path}" title="${item.id}"></img>`;
      const markdown = this.vditor.html2md(html);
      this.vditor.insertValue(markdown.substr(0, markdown.length - 1));
    });

    uni.$on('clickAttach', item => {
      const html = `<a href="${item.attributes.url}" title="${item.id}">${item.attributes.fileName}</a>`;
      const markdown = this.vditor.html2md(html);
      this.vditor.insertValue(markdown.substr(0, markdown.length - 1));
    });

    const videoRender = (element, url) => {
      element.insertAdjacentHTML('afterend', `<video controls="controls" src="${url}"></video>`);
      element.remove();
    };

    uni.$on('playVideo', item => {
      const a = document.createElement('a');
      appCommonH.insertElementAtCaret(a);
      videoRender(a, item.path);
    });
  },
  mounted() {
    const _that = this;
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'vditor-file';
    input.onchange = event => _that.upload.uploadAttach(event);

    this.$refs.input.$el.appendChild(input);
    const toolbar = [
      {
        name: 'at',
        tipPosition: 's',
        tip: '@提醒的人',
        className: 'right',
        icon: AtIcon,
        click() {
          _that.range = getSelection().getRangeAt(0);
          _that.$refs.atUser.open();
        },
      },
      {
        name: 'topic',
        tipPosition: 's',
        tip: '#话题',
        className: 'right',
        icon: TopicIcon,
        click() {
          _that.range = getSelection().getRangeAt(0);
          _that.$refs.topic.open();
        },
      },
      // 'emoji',
      {
        name: 'emojiq',
        tip: 'emojiq',
        icon: EmojiIcon,
        click() {
          _that.range = getSelection().getRangeAt(0);
          _that.emojiShow = !_that.emojiShow;
        },
      },
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      'quote',
      {
        name: 'image',
        tip: '上传图片',
        className: 'upload-image',
        icon: ImageIcon,
        click() {},
      },
      'line',
      'code',
      'inline-code',
      'table',
      'undo',
      'redo',
    ];
    this.vditor = new Vditor('editor', {
      mode: 'wysiwyg',
      after: () => {
        uni.$emit('vditor', this.vditor, this);
        // dom操作：替换toolbar上传图片
        const anchor = document.querySelector('.upload-image-anchor');
        const uploadImage = document.querySelector('.upload-image');
        if (anchor && uploadImage && uploadImage.firstChild) {
          anchor.style.opacity = 1;
          uploadImage.replaceChild(anchor, uploadImage.firstChild);
        }
      },
      cache: {
        enable: false,
      },
      toolbarConfig: {
        pin: true,
      },
      height: window.innerHeight / 2,
      placeholder: this.$i18n.t('discuzq.post.placeholder'),
      toolbar,
    });
  },
  destroyed() {
    uni.$off('atUser');
    uni.$off('clickTopic');
    uni.$off('loadedThread');
    uni.$off('clickImage');
    uni.$off('clickAttach');
    uni.$off('playVideo');
    this.vditor.destroy();
  },
  methods: {
    chooseImage() {
      if (!this.forums.other.can_upload_images) {
        uni.showToast({
          title: this.i18n.t('home.NoPermissionToUploadPictures'),
          icon: 'none',
        });
        return;
      }
      this.upload.uploadImage();
    },
    setCursorPosition() {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(this.range);
    },
    // 点击取消按钮，关闭at
    atCancel() {
      this.$refs.atUser.close();
    },
    // 点击取消按钮，关闭话题
    topicCancel() {
      this.$refs.topic.close();
    },
    // 表情点击事件
    getEmojiClick(code) {
      this.setCursorPosition();
      this.vditor.insertValue(code);
      this.emojiShow = false;
    },
    setPostComponent(component) {
      this.postComponent = component;
      this.upload.postComponent = component;
    },
  },
};
</script>
<style lang="scss" scoped>
.emoji-bd {
  position: relative;
  width: 100%;
}
#editor {
  user-select: auto;
}
</style>
