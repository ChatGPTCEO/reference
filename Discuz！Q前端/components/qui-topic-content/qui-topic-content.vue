<template>
  <view v-if="topicStatus != 1">
    <view class="themeItem__header">
      <view class="themeItem__header__img" @click="personJump">
        <qui-avatar :user="{ username: userName, avatarUrl: avatarUrl }" :is-real="isReal" />
      </view>
      <view class="themeItem__header__title">
        <view class="themeItem__header__title__top" @click="personJump">
          <text class="themeItem__header__title__username">{{ userName }}</text>
          <text
            class="themeItem__header__title__isAdmin"
            v-for="(group, index) in userRole"
            :key="index"
            :class="group.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
          >
            {{ group.isDisplay ? `${group.name}` : '' }}
          </text>
        </view>
        <view class="themeItem__header__title__time">{{ localTime }}</view>
      </view>
      <view class="themeItem__header__opera">
        <image
          v-if="threadPrice > 0"
          src="@/static/payment.png"
          class="essence"
          :class="threadIsEssence ? 'marginLf' : ''"
        ></image>
        <image v-if="threadIsEssence" src="@/static/essence.png" class="essence"></image>
        <slot name="more"></slot>
      </view>
    </view>
  </view>
  <view class="themeItem" v-else>
    <view class="themeItem__header">
      <view class="themeItem__header__img" @click="personJump">
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <qui-avatar :user="{ username: userName, avatarUrl: avatarUrl }" :is-real="isReal" />
        <!-- #endif -->
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <!-- 新的悬赏贴、问答贴头像 -->
        <qui-avatar
          :user="{ username: userName, avatarUrl: avatarUrl }"
          :is-real="isReal"
          size="60"
        />
        <!-- #endif -->
      </view>
      <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
      <view class="themeItem__header__title">
        <view class="themeItem__header__title__top" @click="personJump">
          <text class="themeItem__header__title__username">{{ userName }}</text>
          <text
            class="themeItem__header__title__isAdmin"
            v-for="(group, index) in userRole"
            :key="index"
            :class="group.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
          >
            {{ group.isDisplay ? `${group.name}` : '' }}
          </text>
        </view>
        <view class="themeItem__header__title__time">
          <text>{{ localTime }}</text>
          <text
            class="themeItem__header__title__usermoney"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 0"
          >
            悬赏{{ currentPostData.thread.questionTypeAndMoney.money }}元
          </text>
          <!-- <text
            class="themeItem__header__title__userAskAll"
            v-if="themeType === 5 && currentPostData.questionTypeAndMoney.type === 0"
          >
            向所有人提问:
          </text> -->
          <view
            class="themeItem_put"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1"
          >
            {{ i18n.t('home.to') }}
          </view>
          <view
            class="themeItem_to themeItem_to_QandA"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1"
            @click.stop=""
            @click="beAskClick"
          >
            @{{ beAskName }}
          </view>
          <view
            class="themeItem_ask"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1"
          >
            {{ i18n.t('home.putQuestions') }} :
          </view>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <!-- 新的悬赏贴、问答贴头部 -->
      <view class="themeItem__header__title">
        <view class="themeItem__header__title__top" @click="personJump">
          <text class="themeItem__header__title__username">{{ userName }}</text>
          <text
            class="themeItem__header__title__isAdmin"
            v-for="(group, index) in userRole"
            :key="index"
            :class="group.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
          >
            {{ group.isDisplay ? `${group.name}` : '' }}
          </text>
        </view>
        <view class="themeItem__header__title__time">
          <text space="ensp" v-if="themeType === 5">{{ localTime }}</text>
          <text space="ensp" v-else>发布于&nbsp;{{ localTime }}</text>
          <text
            class="themeItem__header__title__usermoney"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 0"
          >
            悬赏{{ currentPostData.thread.questionTypeAndMoney.money }}元
          </text>
          <!-- <text
            class="themeItem__header__title__userAskAll"
            v-if="themeType === 5 && currentPostData.questionTypeAndMoney.type === 0"
          >
            向所有人提问:
          </text> -->
          <view
            class="themeItem_put"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1"
          >
            {{ i18n.t('home.to') }}
          </view>
          <view
            class="themeItem_to themeItem_to_QandA"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1"
            @click.stop=""
            @click="beAskClick"
          >
            @{{ beAskName }}
          </view>
          <view
            class="themeItem_ask"
            v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1"
          >
            {{ i18n.t('home.putQuestions') }} :
          </view>
        </view>
      </view>
      <!-- #endif -->
      <slot name="follow"></slot>
      <view class="themeItem__header__opera">
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <image
          v-if="threadPrice > 0"
          src="@/static/payment.png"
          class="essence"
          :class="threadIsEssence ? 'marginLf' : ''"
        ></image>
        <image v-if="threadIsEssence" src="@/static/essence.png" class="essence"></image>
        <!-- #endif -->

        <slot name="more"></slot>
      </view>
    </view>

    <view class="themeItem__content">
      <view
        class="themeItem__content__con"
        :style="{ position: !payStatus && themeParts !== 1 ? 'static' : 'relative' }"
      >
        <view class="themeItem__content__con__title" v-if="themeType == 1 && themeTitle">
          <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
          <image
            src="../../static/h5-play/redenvelope@2x.png"
            mode=""
            style="width: 88rpx;height: 38rpx; margin-right: 12rpx; vertical-align: middle;"
            v-if="isRedPacket === 1"
          ></image>
          <!-- #endif -->
          {{ themeTitle }}
        </view>
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <view class="themeItem__content__text" v-if="themeContent">
          <qui-uparse :content="themeContent"></qui-uparse>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <!--  <view class="themeItem__content__text" v-if="themeContent && themeType === 1">
          <qui-uparse :content="themeContent"></qui-uparse>
        </view> -->
        <view
          class="themeItem__content__text"
          v-if="
            (themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 0) ||
              (isRedPacket === 1 && themeType !== 1)
          "
        >
          <image
            src="../../static/h5-play/redenvelope@2x.png"
            class="themeItem__content__text__images"
            mode=""
            v-if="isRedPacket === 1"
          ></image>
          <image
            src="../../static/h5-play/reward@2x.png"
            class="themeItem__content__text__images"
            mode=""
            v-else
          ></image>
          <!-- {{currentPostData.postContent}} -->
          <qui-uparse :content="themeContent" :is-reward="true"></qui-uparse>
        </view>
        <view
          class="themeItem__content__text"
          v-if="
            (themeType !== 5 && isRedPacket !== 1) ||
              (themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 1) ||
              (isRedPacket === 1 && themeType === 1)
          "
        >
          <!-- {{currentPostData.postContent}} -->
          <qui-uparse :content="themeContent"></qui-uparse>
        </view>
        <!-- #endif -->
        <view
          class="theme__content__videocover"
          v-if="themeType == 2 && !videoStatus && coverImage != null"
          @click="videocoverClick"
        >
          <view class="theme__mark"></view>
          <image
            class="theme__mark__open"
            :style="{ marginLeft: videoWidth > videoHeight ? '-40rpx' : '-200rpx' }"
            src="/static/video.svg"
          ></image>
          <image
            class="themeItem__content__coverimg"
            :src="coverImage"
            :style="{ width: videoWidth > videoHeight ? '100%' : '50%' }"
          ></image>
        </view>
        <view
          class="theme__content__videocover"
          @click="btnFun"
          v-if="themeType == 2 && videoStatus"
          :style="{ display: sun }"
        >
          <image
            class="theme__mark__open"
            :style="{ marginLeft: videoWidth > videoHeight ? '-40rpx' : '-200rpx' }"
            src="/static/video.svg"
          ></image>
          <image
            class="themeItem__content__coverimg"
            :src="coverImage"
            :style="{ width: videoWidth > videoHeight ? '100%' : '50%' }"
            :mode="videoWidth > videoHeight ? 'widthFix' : 'aspectFill'"
          ></image>
        </view>
        <view>
          <video
            v-show="videoShow"
            ref="myVideo"
            id="myVideo"
            :src="mediaUrl"
            :poster="coverImage"
            :autoplay="autoplay"
            controls
            :duration="duration"
            preload="none"
            playsinline
            webkit-playsinline
            :page-gesture="false"
            :show-fullscreen-btn="true"
            :show-play-btn="true"
            auto-pause-if-open-native
            auto-pause-if-navigate
            :enable-play-gesture="false"
            :vslide-gesture="false"
            :vslide-gesture-in-fullscreen="false"
            object-fit="contain"
            x5-video-player-type="h5-page"
            bindfullscreenchange="fullScreen"
          ></video>
        </view>
        <view v-if="themeType == 4 && threadAudio">
          <qui-audio-cell
            :src="threadAudio.mediaUrl"
            :name="threadAudio.fileName"
            :audio-id="threadAudio.fileId"
            :ref="'audio' + threadAudio.fileId"
            :is-delete="false"
            :preview-status="videoStatus"
            @audioPlayer="audioPlayer"
            @previewAudio="previewAudio"
          ></qui-audio-cell>
        </view>
        <qui-image
          :images-list="imagesList"
          :preview-status="videoStatus"
          @previewPicture="previewPicture"
        ></qui-image>
        <view
          v-if="payStatus && themeParts !== 1"
          class="themeItem__content__con__cover"
          :style="{
            background:
              theme === $u.light()
                ? 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'
                : 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          }"
        ></view>
        <view v-if="payStatus && themeParts !== 1" class="themeItem__content__con__surtip">
          {{ p.surplus }}{{ p.contentHide }}
        </view>
      </view>
      <!-- 附件 -->
      <view class="themeItem__content__attachment" v-if="attachmentList.length > 0">
        <view class="themeItem__content__attachment-title">{{ i18n.t('profile.attachment') }}</view>
        <view
          class="themeItem__content__attachment-item"
          v-for="(item, index) in attachmentList"
          :key="index"
          @click="attachmentPayStatus ? attachmentPay() : ''"
        >
          <view
            v-if="['MP3', 'M4A', 'WAV', 'AAC'].indexOf(item.format) !== -1"
            class="themeItem__content__attachment-item-wrap"
          >
            <qui-audio
              :src="item.url"
              :name="item.fileName"
              :can-play="attachmentPayStatus ? false : true"
              :audio-id="'' + item.id"
              :ref="'audio' + item.id"
              @audioPlay="audioPlay"
              @fileClick="!attachmentPayStatus ? download(index) : ''"
            ></qui-audio>
          </view>
          <view v-else :class="attachmentIsPreview ? 'attachment-name-inner' : 'attachment-name'">
            <qui-icon
              class="icon-attachment"
              :name="item.fileName ? `icon-${item.format}` : `icon-resources`"
              color="#aaa"
              size="22"
            ></qui-icon>
            <text @tap="!attachmentPayStatus ? download(index) : ''">{{ item.fileName }}</text>
            <text
              v-if="
                attachmentIsPreview &&
                  item.isRemote &&
                  [
                    'PPTX',
                    'PPT',
                    'POT',
                    'POTX',
                    'PPS',
                    'PPSX',
                    'DPS',
                    'DPT',
                    'PPTM',
                    'POTM',
                    'PPSM',
                    'DOC',
                    'DOT',
                    'WPS',
                    'WPT',
                    'DOCX',
                    'DOTX',
                    'DOCM',
                    'DOTM',
                    'PDF',
                    'LRC',
                    'C',
                    'CPP',
                    'H',
                    'ASM',
                    'S',
                    'JAVA',
                    'ASP',
                    'BAT',
                    'BAS',
                    'PRG',
                    'CMD',
                    'RTF',
                    'TXT',
                    'LOG',
                    'XML',
                    'HTM',
                    'HTML',
                  ].indexOf(item.format) !== -1
              "
              @click="preview(item)"
              style="position: absolute; right: 20rpx; color: #1878f3;"
            >
              {{ i18n.t('topic.preview') }}
            </text>
          </view>
          <view v-if="['MP4'].indexOf(item.format) !== -1" class="attachment-video">
            <text
              class="themeItem__content__attachment-item-mp4-play"
              @tap="fullscreenPlay(item.id)"
            >
              {{ i18n.t('profile.play') }}
            </text>
            <qui-video
              :src="attachmentPayStatus ? '' : `${item.url}`"
              :ref="'video' + item.id"
              :video-id="'' + item.id"
            ></qui-video>
          </view>
        </view>
      </view>
      <view v-if="postGoodsStatus">
        <view class="themeItem__content__good" v-if="themeType === 6">
          <view>
            <image class="themeItem__content__good__image" lazy-load :src="postGoods.imagePath" />
          </view>
          <view class="themeItem__content__good__info">
            <view class="themeItem__content__good__title">{{ postGoods.title }}</view>
            <view
              class="themeItem__content__good__ft"
              :style="{
                justifyContent: dataGoodInfoPrice !== '' ? 'space-between' : 'flex-end',
              }"
            >
              <view class="themeItem__content__good__price" v-if="dataGoodInfoPrice !== ''">
                ￥{{ dataGoodInfoPrice }}元
              </view>
              <view class="themeItem__content__good__buy" @click="buyGood">
                <qui-icon
                  class="themeItem__content__good__icon"
                  name="icon-bag"
                  size="28"
                ></qui-icon>
                {{ i18n.t('home.buygood') }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="themeItem__content__tags" v-if="tags.length > 0">
        <view
          class="themeItem__content__tags__item"
          v-for="(tag, index) in tags"
          :key="index"
          @click="tagClick(tag.id, tag.searchIds)"
        >
          {{ tag.name }}
        </view>
      </view>
      <view
        class="themeItem__content__tags  themeItem__content__tags--position"
        v-if="threadPosition.length > 0"
      >
        <view class="themeItem__content__tags__item" @tap="topicPosition">
          <qui-icon name="icon-weizhi" size="30" color="#777"></qui-icon>
          <text class="themeItem__content__tags__item-text">
            {{ threadPosition.length > 0 && threadPosition[0] }}
          </text>
        </view>
      </view>
    </view>
    <view
      class="themeItem__content__notes"
      v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 0"
    >
      <view class="themeItem__content__notes__text">
        该悬赏于 {{ currentPostData.thread.questionTypeAndMoney.expiredAt.substring(0, 10) }}日
        截止悬赏 悬赏金额总计
        <text class="themeItem__content__notes__text__redText">
          {{ currentPostData.thread.questionTypeAndMoney.money }}
        </text>
        元，已分配
        <text class="themeItem__content__notes__text__redText">
          {{
            (
              currentPostData.thread.questionTypeAndMoney.money -
              currentPostData.thread.questionTypeAndMoney.remainMoney
            ).toFixed(2)
          }}
        </text>
        元
        <br />
        剩下
        <text class="themeItem__content__notes__text__redText">
          {{ currentPostData.thread.questionTypeAndMoney.remainMoney }}
        </text>
        元
      </view>
      <image
        src="../../static/h5-play/gold_coin_1@2x.png"
        class="themeItem__content__notes__img_1"
      ></image>
      <image
        src="../../static/h5-play/gold_coin_2@2x.png"
        class="themeItem__content__notes__img_2"
      ></image>
    </view>
    <view
      class="themeItem__content__thumbsup"
      v-if="themeType === 5 && currentPostData.thread.questionTypeAndMoney.type === 0"
    ></view>
    <qui-toast ref="toast"></qui-toast>
  </view>
</template>

<script>
import forums from '@/mixin/forums';
import { time2DateAndHM } from '@/utils/time';
import { status } from '@/library/jsonapi-vuex/index';
// #ifdef H5
import appCommonH from '@/utils/commonHelper';
// #endif

export default {
  mixins: [
    forums,
    // #ifdef H5
    appCommonH,
    // #endif
  ],
  props: {
    // #ifdef H5-PLAY || MP-WEIXIN-PLAY
    isRedPacket: {
      type: [Number, String],
      default: 0,
    },
    // #endif
    currentPostData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    topicStatus: {
      type: Number,
      default: 0,
    },
    // 类型
    // themeParts: {
    //   validator: value => {
    //     // 0 主题  1 回复
    //     return ['0', '1'].indexOf(value) !== -1;
    //   },
    //   default: '0',
    // },
    // 0 主题  1 回复
    themeParts: {
      type: Number,
      default: 0,
    },
    followShow: {
      type: Boolean,
      default: false,
    },
    // 主题类型
    // themeType: {
    //   validator: value => {
    //     // 0 文字  1 帖子  2 视频 3 图片
    //     return ['0', '1', '2', '3'].indexOf(value) !== -1;
    //   },
    //   default: '1',
    // },'
    // 主题类型 0 文字  1 帖子  2 视频 3 图片
    themeType: {
      type: Number,
      default: 0,
    },
    // 是否支付
    payStatus: {
      type: Boolean,
      default: true,
    },
    // 视频显示状态
    videoStatus: {
      type: Boolean,
      default: true,
    },
    // 当前主题价格
    threadPrice: {
      type: [Number, String],
      default: 0,
    },
    userInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 需要支付查看的内容所占的比例
    // partVal: {
    //   type: [Number, String],
    //   default: 0,
    // },
    // 主题的用户的角色
    userRole: {
      type: Array,
      default: () => {
        return [];
      },
    },
    userId: {
      type: [Number, String],
      default: '',
    },
    // 发布主题的用户头像
    avatarUrl: {
      type: String,
      default: '',
    },
    // 发布主题的用户名
    userName: {
      type: String,
      default: '',
    },
    // 实名认证
    isReal: {
      type: Boolean,
      default: false,
    },
    // 管理菜单
    selectList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 主题标题（当类型是帖子（1）时）
    themeTitle: {
      type: String,
      default: '',
    },
    // 是否加精
    threadIsEssence: {
      type: Boolean,
      default: false,
    },
    // 发布内容
    themeContent: {
      type: String,
      default: '',
    },
    // 发布时间
    themeTime: {
      type: String,
      default: '',
    },
    managementShow: {
      type: Boolean,
      default: false,
    },
    // 主题图片
    imagesList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    postGoodsStatus: {
      type: Boolean,
      default: false,
    },
    // 商品
    postGoods: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // // 图片裁剪'缩放的模式
    // modeVal: {
    //   type: String,
    //   default: 'aspectFill',
    // },
    // 视频宽度
    videoWidth: {
      type: Number,
      default: 0,
    },
    // 视频高度
    videoHeight: {
      type: Number,
      default: 0,
    },
    // 主题id
    themid: {
      type: [Number, String],
      default: 0,
    },
    // 主题相关标签
    tags: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 被提问用户名称
    beAskName: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    threadPosition: {
      type: Array,
      default: () => {
        return [];
      },
    },
    threadAudio: {
      type: Object,
      default: () => {
        return {};
      },
    },
    attachmentPayStatus: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      seleShow: false, // 默认收起管理菜单
      selectActive: false,
      imageStatus: true, // 头像地址错误时显示默认头像
      // topicStatus: '',
      videoShow: false,
      attachMentList: [],
      autoplay: false,
      look: true,
      sun: 1,
      blocKwidth: 224,
      videoContext: '',
      wechatbrowser: false,
      dataGoodInfoPrice: 0, // 商品价格
      tagId: '', // 一级分类帖子Id
    };
  },
  computed: {
    t() {
      return this.i18n.t('topic');
    },
    p() {
      return this.i18n.t('pay');
    },
    // 时间转化
    localTime() {
      return time2DateAndHM(this.themeTime ? this.themeTime : '');
    },
    threadInfo() {
      const thread = this.$store.getters['session/get']('thread');
      return thread;
    },
    attachmentList() {
      const { fileList, threadInfo } = this;
      fileList.forEach((e, index) => {
        fileList[index].format = e.fileName
          .substring(e.fileName.lastIndexOf('.') + 1)
          .toUpperCase();
        // 如果是付费主题或者付费附件加参数
        if (threadInfo.thread.attachmentPrice > 0 && threadInfo.thread.price > 0) {
          fileList[index].url = `${fileList[index].url}&isAttachment=1`;
        }
      });
      return fileList;
    },
    // 附件是否显示预览
    attachmentIsPreview() {
      let isPreview = false;
      if (
        this.threadInfo.thread.price <= 0 &&
        this.threadInfo.thread.attachmentPrice <= 0 &&
        this.forums.qcloud.qcloud_cos &&
        this.forums.qcloud.qcloud_cos_doc_preview
      ) {
        isPreview = true;
      } else if (
        this.threadInfo.thread.price <= 0 &&
        this.threadInfo.thread.attachmentPrice > 0 &&
        this.forums.qcloud.qcloud_cos &&
        this.forums.qcloud.qcloud_cos_doc_preview &&
        this.threadInfo.thread.isPaidAttachment
      ) {
        isPreview = true;
      } else if (
        this.threadInfo.thread.price > 0 &&
        this.threadInfo.thread.isPaid &&
        this.forums.qcloud.qcloud_cos &&
        this.forums.qcloud.qcloud_cos_doc_preview
      ) {
        isPreview = true;
      } else {
        isPreview = false;
      }
      return isPreview;
    },
  },
  created() {
    if (this.themeType === 6 && Object.keys(this.postGoods).length > 0) {
      if (this.postGoods.price.indexOf('-') !== -1 || Number(this.postGoods.price) > 0) {
        this.dataGoodInfoPrice = this.postGoods.price;
      } else if (Number(this.postGoods.price) <= 0) {
        this.dataGoodInfoPrice = '';
      }
    }
    this.$forceUpdate();
    // #ifdef  H5
    const { isWeixin } = appCommonH.isWeixin();
    this.wechatbrowser = isWeixin;
    // #endif
    this.videoContext = uni.createVideoContext('myVideo', this);
  },
  mounted() {
    this.blocKwidth = (660 / this.videoWidth) * this.videoHeight;
  },
  methods: {
    // 管理菜单点击事件
    selectClick() {
      this.seleShow = !this.seleShow;
      // this.selectActive = this.seleShow ? '#1878F3' : '#333333';
    },
    // 管理菜单选中事件
    selectChoice(param) {
      this.$emit('selectChoice', param);
      this.seleShow = false;
      // this.selectActive = this.seleShow ? '#1878F3' : '#333333';
    },
    // 点击用户头像以及用户名事件
    personJump() {
      this.$emit('personJump', this.userId);
    },
    // 点击用户名
    beAskClick(evt) {
      this.$emit('beAskClick', evt);
    },
    // 点击视频封面图事件
    videocoverClick() {
      this.$emit('videocoverClick');
    },
    // 点击分类标签判断子类的父级分类Id
    childrenTabClick(tagId, searchIds) {
      let newTagId = '';
      this.$store.dispatch('jv/get', ['categories', {}]).then(data => {
        const resData = [...data] || [];
        resData.forEach(item => {
          if (`${item._jv.id}` === `${tagId}`) {
            newTagId = item._jv.id;
          } else if (item.children) {
            item.children.forEach(c => {
              if (`${c.id}` === `${tagId}`) {
                newTagId = item._jv.id;
              }
            });
          }
        });
        this.$emit('tagClick', newTagId, tagId, searchIds);
      });
    },
    // 点击分类标签
    tagClick(tagId, searchIds) {
      let newSearcchIds = searchIds;
      // 此处回传的searchIds值，有可能是能由数组转成字符串后的值，需要重新分割成数组
      if (typeof searchIds === 'string' && searchIds.indexOf(',')) {
        newSearcchIds = searchIds.split(',');
      }
      this.childrenTabClick(tagId, newSearcchIds);
      // this.$emit('tagClick', tagId);
    },
    // 头像失效
    imageError() {
      this.imageStatus = false;
    },
    // 如果附件是未支付状态，点击触发支付
    attachmentPay() {
      this.$emit('attachmentPay');
    },
    // 附件下载
    download(index) {
      const item = this.attachmentList[index];
      // #ifdef H5
      const { platform } = uni.getSystemInfoSync();
      if (platform === 'ios') {
        this.$refs.toast.show({
          message: this.i18n.t('profile.filedownloadtips'),
        });
      } else {
        window.location.href = item.url;
      }
      // #endif
      // #ifdef MP-WEIXIN
      const that = this;
      wx.downloadFile({
        url: item.url,
        success(res) {
          if (res.statusCode === 200) {
            that.$refs.toast.show({
              message: that.i18n.t('profile.downloadSuccess'),
            });
            wx.openDocument({
              filePath: res.tempFilePath,
              success(data) {
                console.log(data);
              },
            });
          }
        },
        error() {
          that.$refs.toast.show({
            message: that.i18n.t('profile.downloadError'),
          });
        },
      });
      // #endif
    },
    // 附件预览
    preview(item) {
      this.$store.dispatch('session/setAttachment', item);
      const attachment = this.$store.getters['session/get']('attachment');
      console.log(attachment);
      uni.navigateTo({
        url: '/pages/topic/attachment',
      });
    },
    // 只能播放一个音频
    audioPlay(id) {
      if (this.attachmentPayStatus) {
        this.$refs[`audio${id}`][0].audioPause();
        return;
      }
      const { attachmentList } = this;
      const that = this;
      attachmentList.forEach(item => {
        if (
          parseInt(id, 10) !== item.id &&
          ['MP3', 'M4A', 'WAV', 'AAC'].indexOf(item.format) !== -1
        ) {
          that.$refs[`audio${item.id}`][0].audioPause();
        }
      });
    },
    fullscreenPlay(id) {
      if (this.attachmentPayStatus) {
        return;
      }
      this.$refs[`video${id}`][0].fullscreenPlay();
    },
    // 地理位置
    topicPosition() {
      const { threadPosition } = this;
      uni.navigateTo({
        url: `/pages/topic/position?longitude=${threadPosition[2]}&latitude=${threadPosition[3]}`,
      });
    },
    previewPicture() {
      this.$emit('previewPicture');
    },
    previewAudio() {
      this.$emit('previewAudio');
    },
    serBtn() {
      const params = {
        include: [
          'posts.replyUser',
          'user.groups',
          'user',
          'posts',
          'posts.user',
          'posts.likedUsers',
          'posts.images',
          'firstPost',
          'firstPost.likedUsers',
          'firstPost.images',
          'firstPost.postGoods',
          'firstPost.attachments',
          'rewardedUsers',
          'category',
          'threadVideo',
          'threadAudio',
          'paidUsers',
          'user.groups.permissionWithoutCategories',
        ],
      };
      const threadAction = status.run(() =>
        this.$store.dispatch('jv/get', [`threads/${this.themid}`, { params }]),
      );
      threadAction.then(() => {
        this.sun = 'none';
        this.videoShow = true;
        this.autoplay = true;
        setTimeout(() => {
          this.videoContext.play();
          this.videoContext.requestFullScreen({ direction: 0 });
        }, 200);
      });
    },

    btnFun() {
      this.serBtn();
    },

    // 点击围观支付
    watchClick() {
      this.$emit('watchClick');
    },
    // 点击回答问题跳转到发布回答页
    queClick() {
      this.$emit('queClick');
    },
    audioPlayer(id) {
      this.$refs[`audio${id}`].audioPause();
    },
    // 点击购买商品
    buyGood() {
      this.$emit('buyGood');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.themeItem__content__notes {
  position: relative;
  display: flex;
  width: 100%;
  height: 206rpx;
  margin: 0 auto;
  background: #fefbf5;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
}
.themeItem__content__notes__img_1 {
  position: absolute;
  top: 20rpx;
  left: 24rpx;
  width: 40rpx;
  height: 62rpx;
}
.themeItem__content__notes__img_2 {
  position: absolute;
  right: 30rpx;
  bottom: 24rpx;
  width: 54rpx;
  height: 58rpx;
}
.themeItem__content__notes__text {
  width: calc(100% - 140rpx);
  font-size: 28rpx;
  font-weight: 600;
  line-height: 48rpx;
  color: #000;
  text-align: center;
}
.themeItem__content__notes__text__redText {
  color: #d23a2a;
}
.themeItem__content__thumbsup {
  width: 100%;
  height: 40rpx;
}
.themeItem {
  width: 100%;
  background: --color(--qui-BG-2);

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    padding: 30rpx 40rpx 37rpx;
    box-sizing: border-box;
    &__img {
      width: 80rpx;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      width: 60rpx;
      /* #endif */
      height: 80rpx;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      height: 60rpx;
      /* #endif */
      // margin-right: 18rpx;
      background: #ccc;
      border-radius: 100%;
      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    &__title {
      flex: 1;
      margin-left: 18rpx;
      &__top {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 37rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        height: 28rpx;
        /* #endif */
        margin-bottom: 10rpx;
        margin-left: 2rpx;
        font-size: $fg-f4;
        line-height: 37rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        line-height: 28rpx;
        /* #endif */
      }

      &__username {
        // display: flex;
        height: 37rpx;
        max-width: 246rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        max-width: 264rpx;
        /* #endif */
        overflow: hidden;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        font-family: 'PingFang SC';
        font-size: 26rpx;
        /* #endif */
        font-weight: bold;
        line-height: 37rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        line-height: 26rpx;
        /* #endif */
        color: --color(--qui-FC-000);
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
      }
      &__usermoney {
        padding-left: 10rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: #d23a2a;
      }
      &__userAskAll {
        font-size: 24rpx;
        font-weight: bold;
        color: #333;
      }

      &__isAdmin {
        font-weight: 400;
        color: --color(--qui-FC-AAA);
        white-space: nowrap;
      }

      &__isAdminColor {
        padding: 2rpx 10rpx;
        margin-left: 15rpx;
        font-size: $fg-f1;
        background: --color(--qui-BG-IT);
        border-radius: 18rpx;
        box-sizing: border-box;
      }

      &__time {
        max-width: 460rpx;
        padding-top: 10rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        padding-top: 0;
        /* #endif */
        overflow: hidden;
        font-size: $fg-f2;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        font-size: 24rpx;
        /* #endif */
        font-weight: 400;
        line-height: 31rpx;
        color: --color(--qui-FC-AAA);
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        transition: $switch-theme-time;
      }
    }
    &__opera {
      align-self: flex-start;
      width: 100rpx;
      margin-left: 29rpx;
      text-align: right;
      flex-shrink: 0;

      .marginLf {
        margin-right: 6rpx;
      }

      .essence {
        display: inline-block;
        width: 35rpx;
        height: 45rpx;
        margin-bottom: 10rpx;
        vertical-align: top;
      }
      .addAsk {
        position: absolute;
        top: 40rpx;
        left: 590rpx;
        width: 60rpx;
        height: 60rpx;
      }
    }
  }

  &__content {
    &__title {
      word-break: break-all;
    }
    &__coverimg {
      width: 100%;
    }
    &__con {
      padding-bottom: 20rpx;
      &__title {
        padding-bottom: 40rpx;
        font-size: 30rpx;
        font-weight: 600;
        line-height: 160%;
        text-align: left;
        word-break: break-all;
      }
      &__cover {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 240rpx;
        // background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      }
      &__surtip {
        position: relative;
        z-index: 6;
        padding-top: 37rpx;
        padding-bottom: 20rpx;
        font-size: $fg-f4;
        line-height: 37rpx;
        text-align: center;
      }
    }

    padding: 0 40rpx;
    &__text {
      margin-bottom: 12rpx;
      overflow: hidden;
      font-size: $fg-f4;
      font-weight: 400;
      line-height: 160%;
      word-break: break-all;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      &__images {
        position: absolute;
        top: 224rpx;
        /* #ifdef MP-WEIXIN-PLAY */
        top: 128rpx;
        /* #endif */
        width: 90rpx;
        height: 40rpx;
        padding-right: 8rpx;
      }
      /* #endif */
      img {
        display: inline-block;
        width: 28rpx;
        height: 28rpx;
      }
      &__ask {
        position: relative;
        width: 670rpx;
        height: 381rpx;
        padding: 10px;
        font-size: 12px;
        color: var(--qui-FC-333);
        background: --color(--qui-BG-F7);
        // border-radius: 5px;
      }
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 76rpx;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      margin-bottom: 38rpx;
      /* #endif */

      &__item {
        height: 50rpx;
        padding: 0 20rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        margin-top: 20rpx;
        /* #endif */
        margin-right: 10rpx;
        margin-bottom: 8rpx;
        font-family: $font-family;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 50rpx;
        color: --color(--qui-FC-TAG);
        text-align: center;
        background: --color(--qui-BG-F7);
        border-radius: 6rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        border-radius: 50rpx;
        /* #endif */
        transition: $switch-theme-time;
      }
    }
    &__good {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin: 0 0 30rpx;
      font-size: $fg-f3;

      &__image {
        width: 160rpx;
        height: 160rpx;
        margin: 0 24rpx 0 0;
        border-radius: 5rpx;
      }

      &__info {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      &__title {
        max-height: 80rpx;
        overflow: hidden;
        font-weight: bold;
        line-height: 40rpx;
        color: --color(--qui-FC-333);
      }

      &__ft {
        position: absolute;
        bottom: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        line-height: 45rpx;
        color: --color(--qui-FC-777);
      }

      &__price {
        display: inline-block;
        font-size: $fg-f5;
        color: --color(--qui-RED);
      }

      &__buy {
        width: 235rpx;
        height: 60rpx;
        line-height: 60rpx;
        color: #fff;
        text-align: center;
        background-color: --color(--qui-RED);
        border-radius: 5rpx;
      }

      &__icon {
        margin-right: 10rpx;
      }
    }
    &__tags--position {
      margin-top: -60rpx;
    }
    &__tags__item-text {
      margin-left: 10rpx;
    }
    &__attachment {
      margin-top: 40rpx;
      margin-bottom: 20rpx;
      &-title {
        margin-bottom: 20rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: --color(--qui-FC-777);
      }
      &-item {
        position: relative;
        height: 60rpx;
        padding: 0 20rpx;
        margin-bottom: 10rpx;
        overflow: hidden;
        font-size: 24rpx;
        line-height: 60rpx;
        border: 2rpx solid --color(--qui-BOR-ED);
        border-radius: 5rpx;
        box-sizing: border-box;
      }
      &-item-wrap {
        width: 100%;
      }
      &-item-mp4-play {
        position: absolute;
        top: 0;
        right: 20rpx;
        color: --color(--qui-BG-HIGH-LIGHT);
      }
      .icon-attachment {
        margin-right: 10rpx;
      }
    }
  }

  &__footer {
    &__themeType1 {
      display: flex;
      justify-content: space-between;
      margin-top: 60rpx;

      &__item {
        font-family: $font-family;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 37rpx;
        color: rgba(170, 170, 170, 1);
      }

      text {
        margin-right: 15rpx;
      }

      &__greated {
        color: rgba(221, 221, 221, 1);
      }
    }

    &__themeType2 {
      &__item {
        font-family: $font-family;
        font-size: $fg-f4;
        font-weight: 400;
        line-height: 37rpx;
        color: rgba(170, 170, 170, 1);
        text-align: right;
      }
      text {
        margin-right: 15rpx;
      }
    }
  }
}
.attachment-name {
  max-width: 100%;
  // padding-right: 40rpx;
  overflow: hidden;
  font-size: $fg-f2;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.attachment-name-inner {
  height: 28px;
  max-width: 100%;
  padding-right: 60rpx;
  overflow: hidden;
  font-size: $fg-f2;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}
.det-hd-operaCli {
  position: relative;
  z-index: 10;
  font-size: $fg-f4;
  line-height: 40rpx;
  .det-hd-management {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: $fg-f4;
    line-height: 1;
    .icon-management {
      margin-right: 7rpx;
      font-size: $fg-f3;
    }
  }
}
.theme__mark {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
}
.theme__mark__open {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 80rpx;
  height: 80rpx;
  margin-top: -40rpx;
  margin-left: -40rpx;
}
.theme__content__videocover {
  position: relative;
}
.cont-box {
  width: 600rpx;
  height: 400rpx;
  background: brown;
}
.themeItem__ask {
  display: inline-block;
  width: 112.5rpx;
  padding-top: 6rpx;
  border-top: solid 4rpx --color(--qui-BG-777);
}
.themeItem__value {
  display: inline-block;
  width: 364rpx;
  padding: 0 19rpx 60rpx;
  font-size: $fg-f2;
  color: --color(--qui-FC-777);
  &__text {
    color: --color(--qui-RED);
  }
}
.themeItem__btn {
  padding-left: 60rpx;
}
.themeItem__answer {
  width: 616rpx;
  height: 82rpx;
  font-size: $fg-f3;
  color: --color(--qui-FC-333);
}
.theme__put {
  width: 670rpx;
  height: 271rpx;
  text-align: center;
  background: --color(--qui-BG-F7);
  &__ask {
    padding: 30rpx 0;
    font-size: $fg-f3;
    color: --color(--qui-FC-AAA);
    &__user {
      display: inline;
    }
  }
}

.themeItem_put,
.themeItem_to,
.themeItem_ask {
  display: inline-block;
}
.themeItem_to {
  color: --color(--qui-LINK);
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.themeItem_to_QandA {
  font-weight: bolder;
  color: #ea3d5a;
}
/* #endif */
.themeItem_put,
.themeItem_ask {
  margin: 0 8rpx;
}
</style>
