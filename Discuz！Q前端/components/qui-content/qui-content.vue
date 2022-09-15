<template>
  <view ref="themeCount" class="themeCount" v-if="!isDeleted">
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <image
      class="addFine"
      src="@/static/essence.png"
      alt
      v-if="themeEssence && themeType == '1'"
    ></image>
    <!-- #endif -->
    <image class="addAsk" src="@/static/yihuida.svg" alt v-if="addAsk === 1"></image>
    <view class="themeItem" @click="backgroundClick">
      <view class="themeItem__header">
        <!-- 头像 -->
        <view class="themeItem__header__img">
          <view @click="headClick" @click.stop="">
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <qui-avatar
              v-if="addAsk !== 1"
              :user="{ avatarUrl: themeImage, username: userName }"
              :is-real="isReal"
            />
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <qui-avatar
              v-if="addAsk !== 1"
              :user="{ avatarUrl: themeImage, username: userName }"
              :is-real="isReal"
              size="60"
            />
            <!-- #endif -->
          </view>
          <view @click="headAnswerClick" @click.stop="">
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <qui-avatar
              v-if="addAsk === 1"
              :user="{ avatarUrl: answerImage, username: beAskName }"
              :is-real="isReal"
            />
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <qui-avatar
              v-if="addAsk === 1"
              :user="{ avatarUrl: answerImage, username: beAskName }"
              :is-real="isReal"
              size="60"
            />
            <!-- #endif -->
          </view>
        </view>
        <view class="themeItem__header__title">
          <!-- 用户名 -->
          <view class="themeItem__header__title__top">
            <text class="themeItem__header__title__username" v-if="addAsk !== 1">
              {{ userName }}
            </text>
            <text class="themeItem__header__title__username" v-if="addAsk === 1">
              {{ beAskName }}
            </text>
            <view v-if="isAdmin && themeType == '1'" class="themeItem__header__title__isAdmin">
              <view v-if="addAsk !== 1">
                <text
                  v-for="(i, index) in userGroups"
                  :key="index"
                  :class="i.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
                >
                  {{
                    item.user && (item.user.pid || item.user.id) > 0 && i.isDisplay
                      ? `${i.groupName || i.name}`
                      : ''
                  }}
                </text>
              </view>
              <view v-if="addAsk === 1">
                <text
                  v-for="(it, index) in userAnswerGroups"
                  :key="index"
                  :class="it.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
                >
                  {{ it.isDisplay ? `${it.groupName || it.name}` : '' }}
                </text>
              </view>
            </view>
            <text v-if="themeType !== '1'" class="themeItem__header__title__isAdmin">
              <!-- {{ themeType === '2' ? '回复了我' : '@了我' }} -->
              {{ themeStatus }}
            </text>
            <view v-if="themeType !== '1'" class="themeItem__header__title__jumpBtn"></view>
            <view class="themeItem__header__title__reward">{{ themeReward }}</view>
          </view>
          <!-- 时间 -->
          <!-- <view class="themeItem__header__title__time" v-if="addAsk !== 1">
            {{ localTime }}
          </view> -->
          <!-- 提问 -->
          <view class="themeItem__header__title__time" v-if="addAsk !== 1">
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            {{ localTime }}
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            发布于 {{ localTime }}
            <!-- #endif -->
            <!--
            <view class="themeItem_put" v-if="threadType === 5 && !beAskName">
              {{ i18n.t('profile.offerewardpay') }}
              <view class="themeItem_put themeItem_to">
                ￥{{
                  item && item.rewards
                    ? item.rewards.money
                    : item.questionTypeAndMoney
                    ? item.questionTypeAndMoney.money
                    : 0
                }}
              </view>
            </view>
            <view class="themeItem_put themeItem_to" v-if="threadType === 5 && !!beAskName">
              ￥{{ askPrice }}
            </view>
            -->
            <view class="themeItem_put" v-if="threadType === 5 && !!beAskName">
              {{ i18n.t('home.to') }}
            </view>
            <view
              class="themeItem_to"
              v-if="threadType === 5 && !!beAskName"
              @click.stop=""
              @click="beAskClick"
            >
              @{{ beAskName }}
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <!--  <text
                v-if="
                  threadType === 5 &&
                    item.rewards !== null &&
                    item.rewards.type === 0
                "
              >
                所有人
              </text> -->
              <!-- #endif -->
            </view>
            <view class="themeItem_ask" v-if="threadType === 5 && !!beAskName">
              {{ i18n.t('home.putQuestions') }} :
            </view>
          </view>
          <!-- 回答 -->
          <view class="themeItem__header__title__time" v-if="addAsk === 1">
            {{ localTimeAnswer }}
            <view class="themeItem_put">{{ i18n.t('home.beAnswer') }}</view>
            <view class="themeItem_to" @click.stop="" @click="answeClick">
              @{{ questionsName }}
            </view>
            <view class="themeItem_ask">{{ i18n.t('home.problem') }} :</view>
          </view>
        </view>
      </view>
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <!-- 精华logo -->
      <view v-if="themeEssence" class="themeItem__header__title__essence">
        <image src="./../../static/h5-play/essence@2x.png"></image>
      </view>
      <!-- #endif -->
      <view class="themeItem__content" @click.stop="" @click="contentClick">
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <view
          class="themeItem__content__text"
          :style="{ paddingBottom: threadType === 1 ? '24rpx' : '10rpx' }"
        >
          <!-- #endif -->
          <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
          <view
            :class="
              isRedPacket == 1 && threadType === 1
                ? 'themeItem__content__text indentText'
                : 'themeItem__content__text'
            "
            :style="{ paddingBottom: threadType === 1 ? '24rpx' : '10rpx' }"
          >
            <!-- #endif -->
            <view
              class="themeItem__content__text__longessay"
              v-if="threadType === 1 && themeType !== '5'"
            >
              <view class="themeItem__content__text__longessay__publish">
                <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
                <!-- 红包logo -->
                <image
                  v-if="isRedPacket == 1 && (threadType === 1 || threadType === 0)"
                  class="themeItem__content__text__longessay__publish__icon themeItem__content__text__longessay__publish__icon_1"
                  src="./../../static/h5-play/redenvelope@2x.png"
                ></image>
                <!-- 发布了 -->
                <text class="themeItem__content__text__longessay__publish__text">
                  【{{ released }}】 :
                </text>
                <!-- #endif -->
                <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
                {{ i18n.t('home.released') }} :
                <!-- #endif -->
              </view>
              <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-icon
                name="icon-fufei"
                color="#aaaaaa"
                size="30"
                style="padding-left: 10rpx;"
                v-if="themPayBtn"
              ></qui-icon>
              <!-- #endif -->
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <!-- 付费标志 -->
              <image
                v-if="themPayBtn"
                src="./../../static/h5-play/goldcoin@2x.png"
                class="themeItem__content__fufei__goldcoin_1"
              ></image>
              <!-- #endif -->
              <navigator class="navPost">
                {{ themeContent }}
              </navigator>
            </view>

            <view class="themeItem__QA" v-if="threadType === 5 && themeType === '5'">
              <view class="themeItem_questions">
                <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
                <!-- 问答logo -->
                <image
                  v-if="threadType === 5"
                  class="themeItem__content__text__longessay__publish__icon"
                  src="./../../static/h5-play/reward@2x.png"
                ></image>
                <!-- #endif -->
                {{ questionsName }}
              </view>
              <view class="themeItem_put">{{ i18n.t('home.beAnswer') }}</view>
              <view class="themeItem_to">{{ beAskName }}</view>
              <view class="themeItem_ask">{{ i18n.t('home.problem') }} ,</view>
            </view>
            <!-- <view class="themeItem__QA" v-if="threadType === 5 && themeType !== '5' && addAsk === 0"> -->
            <!-- <view class="themeItem_questions">@{{ questionsName }}</view> -->
            <!-- <view class="themeItem_put">{{ i18n.t('home.to') }}</view>
            <view class="themeItem_to">@{{ beAskName }}</view>
            <view class="themeItem_ask">{{ i18n.t('home.putQuestions') }} :</view> -->
            <!-- <qui-uparse :content="questionContent"></qui-uparse> -->
            <!-- <navigator class="navPost">
              {{ questionContent }}
            </navigator> -->
            <!-- </view> -->
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <view :class="themPayBtn || threadType === 6 ? 'themeItem__content__uparse' : ''">
              <qui-icon
                name="icon-fufei"
                color="#aaaaaa"
                size="30"
                v-if="themPayBtn && threadType !== 1"
                class="themeItem__content__fufei"
              ></qui-icon>
              <qui-icon
                name="icon-shangpin-1"
                color="#aaaaaa"
                size="30"
                class="themeItem__content__fufei"
                v-if="threadType === 6"
              ></qui-icon>
              <qui-uparse
                :content="themeContent"
                :content-parse="themeContentParse"
                class="themeItem__content__wxParse"
                v-if="threadType !== 1"
              ></qui-uparse>
            </view>
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <view
              :class="
                threadType !== 0 || isRedPacket == 1
                  ? isRedPacket != 1 &&
                    (threadType === 0 ||
                      threadType === 1 ||
                      threadType === 2 ||
                      threadType === 3 ||
                      threadType === 4)
                    ? 'themeItem__content__uparse__box'
                    : threadType === 5
                    ? 'themeItem__content__uparse__box_2'
                    : 'themeItem__content__uparse__box_1'
                  : 'themeItem__content__uparse__box'
              "
            >
              <image
                v-if="threadType === 7"
                class="themeItem__content__text__longessay__publish__icon"
                src="./../../static/h5-play/album@2x.png"
              ></image>
              <image
                v-if="threadType === 6"
                class="themeItem__content__text__longessay__publish__icon"
                src="./../../static/h5-play/commodity@2x.png"
              ></image>
              <image
                v-if="
                  threadType === 5 &&
                    ((!!item.rewards && item.rewards.type === 0) ||
                      (!!item.questionTypeAndMoney && item.questionTypeAndMoney.type === 0))
                "
                class="themeItem__content__text__longessay__publish__icon"
                src="./../../static/h5-play/reward@2x.png"
              ></image>
              <text
                class="rewardMoney"
                v-if="
                  threadType === 5 &&
                    ((!!item.rewards && item.rewards.type === 0) ||
                      (!!item.questionTypeAndMoney && item.questionTypeAndMoney.type === 0))
                "
              >
                【￥ {{ rewardAmount }}】
              </text>
              <image
                v-if="
                  threadType === 5 &&
                    ((!!item.rewards && item.rewards.type === 1) ||
                      (!!item.questionTypeAndMoney && item.questionTypeAndMoney.type === 1))
                "
                class="themeItem__content__text__longessay__publish__icon"
                src="./../../static/h5-play/QandA@2x.png"
              ></image>
              <!-- <image
                v-if="threadType === 5 && item.rewards === null"
                class="themeItem__content__text__longessay__publish__icon"
                src="./../../static/h5-play/QandA@2x.png"
              ></image> -->
              <image
                v-if="isRedPacket == 1 && threadType !== 1"
                class="themeItem__content__text__longessay__publish__icon"
                src="./../../static/h5-play/redenvelope@2x.png"
              ></image>
              <view
                :class="
                  (themPayBtn || threadType === 6) &&
                  !(
                    threadType === 5 &&
                    ((!!item.rewards && item.rewards.type === 0) ||
                      (!!item.questionTypeAndMoney && item.questionTypeAndMoney.type === 0))
                  )
                    ? 'themeItem__content__uparse'
                    : ''
                "
              >
                <view class="themeItem__content__uparse__icon">
                  <!-- 付费标志 -->
                  <image
                    v-if="
                      themPayBtn &&
                        threadType !== 1 &&
                        !(
                          threadType === 5 &&
                          ((!!item.rewards && item.rewards.type === 0) ||
                            (!!item.questionTypeAndMoney && item.questionTypeAndMoney.type === 0))
                        )
                    "
                    src="./../../static/h5-play/goldcoin@2x.png"
                    :class="
                      threadType === 2 || threadType === 3 || threadType === 4
                        ? 'themeItem__content__fufei__goldcoin_0'
                        : 'themeItem__content__fufei__goldcoin_2'
                    "
                  ></image>
                  <qui-icon
                    name="icon-shangpin-1"
                    color="#aaaaaa"
                    size="30"
                    class="themeItem__content__fufei"
                    v-if="threadType === 6"
                  ></qui-icon>
                </view>
                <qui-uparse
                  :content="themeContent"
                  :content-parse="themeContentParse"
                  :class="
                    threadType === 2 || threadType === 3 || threadType === 4
                      ? 'themeItem__content__wxParse_0'
                      : threadType === 5 &&
                        ((!!item.rewards && item.rewards.type === 0) ||
                          (!!item.questionTypeAndMoney && item.questionTypeAndMoney.type === 0))
                      ? 'themeItem__content__wxParse_1'
                      : 'themeItem__content__wxParse'
                  "
                  v-if="threadType !== 1"
                  :type="threadType"
                ></qui-uparse>
              </view>
            </view>
            <!-- #endif -->
          </view>
          <view
            class="themeItem__content__good"
            v-if="Object.keys(postGoods).length !== 0 && threadType === 6"
          >
            <view>
              <image class="themeItem__content__good__image" :src="postGoods.imagePath" />
            </view>
            <view class="themeItem__content__good__info">
              <view class="themeItem__content__good__title">
                {{ postGoods.title }}
              </view>
              <view class="themeItem__content__good__ft">
                <view class="themeItem__content__good__price" v-if="dataGoodInfoPrice !== ''">
                  ￥{{ dataGoodInfoPrice }}元
                </view>
              </view>
            </view>
          </view>
          <!-- 文案 -->
          <view
            class="theme__content__videocover"
            v-if="threadType == 2 && !payStatus && coverImage != null"
          >
            <view class="theme__mark"></view>
            <image
              class="theme__mark__open"
              :style="{ marginLeft: videoWidth > videoHeight ? '-40rpx' : '-200rpx' }"
              src="/static/video.svg"
            ></image>
            <image
              :class="
                videoWidth > videoHeight
                  ? 'themeItem__content__coverimg'
                  : 'themeItem__content__coverimg vertical'
              "
              :src="coverImage"
              :style="{ width: videoWidth > videoHeight ? '100%' : '50%' }"
              :mode="videoWidth > videoHeight ? 'aspectFill' : 'aspectFill'"
            ></image>
          </view>
          <!-- 视频 -->
          <view
            class="theme__content__videocover"
            v-if="threadType === 2 && payStatus && themeType !== '5'"
          >
            <!-- 封面图 -->
            <view
              class="theme__content__videocover-img"
              v-if="threadType === 2 && payStatus && sun && coverImage"
            >
              <image
                class="theme__mark__open"
                :style="{ marginLeft: videoWidth > videoHeight ? '-40rpx' : '-200rpx' }"
                src="/static/video.svg"
                @click.stop="btn"
              ></image>
              <image
                class="themeItem__content__coverimg"
                :src="coverImage"
                :style="{ width: videoWidth > videoHeight ? '100%' : '50%' }"
                :mode="videoWidth > videoHeight ? 'widthFix' : 'aspectFill'"
              ></image>
            </view>
            <!-- 封面图 -->
            <view v-if="!coverImage" class="theme__content__videocover-img">
              <view class="noCover">
                <text>暂无封面</text>
                <image
                  class="theme__mark__open"
                  :style="{ marginLeft: videoWidth > videoHeight ? '-40rpx' : '-200rpx' }"
                  src="/static/video.svg"
                ></image>
              </view>
            </view>
            <!-- 视频 -->
            <view class="themeItem__content__covervideo">
              <view v-if="isWeixin">
                <video
                  v-show="videoShow"
                  x5-video-player-type="h5-page"
                  :poster="coverImage"
                  controls
                  :duration="duration"
                  :src="mediaUrl"
                  :id="'myVideo' + currentindex"
                  :ref="'myVideo' + currentindex"
                  :show-fullscreen-btn="true"
                  :show-play-btn="true"
                  :autoplay="autoplay"
                  :vslide-gesture-in-fullscreen="false"
                  object-fit="contain"
                  :direction="videoWidth > videoHeight ? 90 : 0"
                  :style="{
                    width: videoWidth > videoHeight ? '100%' : '50%',
                  }"
                  @play="playVideo"
                  @fullscreenchange="fullscreenchanges"
                  @click.stop=""
                ></video>
              </view>
              <view v-if="!isWeixin">
                <video
                  v-show="videoShow"
                  :poster="coverImage"
                  controls
                  ref="myVideo"
                  :id="'myVideo' + currentindex"
                  class="isVideo"
                  :duration="duration"
                  preload="none"
                  bindpause="handlepause"
                  playsinline
                  webkit-playsinline
                  x5-playsinline
                  mtt-playsinline
                  :page-gesture="false"
                  :show-fullscreen-btn="true"
                  :show-play-btn="true"
                  :autoplay="autoplay"
                  auto-pause-if-open-native
                  auto-pause-if-navigate
                  :enable-play-gesture="false"
                  :vslide-gesture="false"
                  :vslide-gesture-in-fullscreen="false"
                  object-fit="contain"
                  :direction="videoWidth > videoHeight ? 90 : 0"
                  x5-video-player-type="h5-page"
                  :src="mediaUrl"
                  :style="{
                    width: videoWidth > videoHeight ? '100%' : '50%',
                  }"
                  bindfullscreenchange="fullScreen"
                  bindended="closeVideo"
                  @play="playVideo"
                  @fullscreenchange="fullscreenchanges"
                  @click.stop=""
                ></video>
              </view>
            </view>
          </view>
          <!-- 音频 -->
          <view v-if="threadType === 4 && payStatus" @click.stop="">
            <!-- 新接口 -->
            <qui-audio-cell
              v-if="isNewInterface"
              :src="threadAudio.mediaUrl"
              :name="threadAudio.fileName"
              :audio-id="threadAudio.fileId"
              :ref="'audio' + threadAudio.fileId"
              v-show="threadAudio.mediaUrl"
              @audioPlayer="audioPlayer"
              :is-delete="false"
            ></qui-audio-cell>
            <!-- 老接口 -->
            <qui-audio-cell
              v-else
              :src="threadAudio.media_url"
              :name="threadAudio.file_name"
              :audio-id="threadAudio.file_id"
              :ref="'audio' + threadAudio.file_id"
              v-show="threadAudio.media_url"
              @audioPlayer="audioPlayer"
              :is-delete="false"
            ></qui-audio-cell>
          </view>
          <!-- 图片 -->
          <view v-if="filterImagesList.length == 1">
            <view class="themeItem__content__imgone">
              <image
                class="themeItem__content__imgone__item"
                v-for="(image, index) in filterImagesList"
                :key="index"
                :mode="modeVal"
                :src="image.thumbUrl"
                @click="previewPicture(index)"
                @click.stop=""
                alt
              ></image>
            </view>
          </view>
          <view v-if="filterImagesList.length == 2">
            <view class="themeItem__content__imgtwo">
              <image
                class="themeItem__content__imgtwo__item"
                v-for="(image, index) in filterImagesList"
                :key="index"
                :mode="modeVal"
                :src="image.thumbUrl"
                @click="previewPicture(index)"
                @click.stop=""
                alt
              ></image>
            </view>
          </view>
          <view v-if="filterImagesList.length >= 3">
            <view class="themeItem__content__imgmore">
              <view
                class="themeItem__content__imgmore__item"
                v-for="(image, index) in filterImagesList.slice(0, 9)"
                :key="index"
                :style="{ position: index === 8 ? 'relative' : '' }"
              >
                <image
                  class="imgmore-image"
                  :mode="modeVal"
                  :src="image.thumbUrl"
                  @click="previewPicture(index)"
                  @click.stop=""
                  alt
                ></image>
                <view class="imgmore_num" v-if="index === 8 && filterImagesList.length > 9">
                  +{{ filterImagesList.length }}
                </view>
              </view>
              <view
                class="themeItem__content__imgmore__item"
                v-if="filterImagesList.length <= 9 && filterImagesList.length % 3 != 0"
                @click.stop=""
              ></view>
            </view>
          </view>

          <!-- <view class="themeItem__content__tags" v-if="themeType === '1' && getCategoryId === 0">
          <view class="themeItem__content__tags__item" v-for="(item, index) in tags" :key="index">
            {{ item.name }}
          </view>
        </view> -->
          <view
            class="themeItem__content__tags themeItem__content__tags--position"
            v-if="threadPosition.length > 0"
          >
            <view class="themeItem__content__tags__item" @click="topicPosition" @click.stop="">
              <qui-icon name="icon-weizhi" size="30" color="#777"></qui-icon>
              <text class="themeItem__content__tags__item-text">
                {{ threadPosition.length > 0 && threadPosition[0] }}
              </text>
            </view>
          </view>
        </view>
        <view class="themeItem__comment" @click.stop=""></view>

        <view class="themeItem__footer" @click.stop="" v-if="bottomicon">
          <view v-if="themeType === '1' || themeType === '5'" class="themeItem__footer__themeType1">
            <view
              :class="[
                'themeItem__footer__themeType1__item',
                'themeItem__footer__themeType1__great',
                isGreat && 'themeItem__footer__themeType1__greated',
              ]"
              @click="handleIsGreat"
            >
              <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-icon class="qui-icon" name="icon-liked" size="28" v-if="isGreat"></qui-icon>
              <qui-icon class="qui-icon" name="icon-like" size="28" v-else></qui-icon>
              {{ isGreat ? t.giveLikeAlready : t.like }}
              {{ themeLike === 0 ? '' : themeLike }}
              <!-- #endif -->
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <!-- 点赞图标 -->
              <image
                class="praise-icon"
                src="./../../static/h5-play/praise_2@2x.png"
                v-if="isGreat"
              ></image>
              <image
                class="praise-icon"
                src="./../../static/h5-play/praise_1@2x.png"
                v-else
              ></image>
              <text :class="isGreat ? 'praise-text_1' : 'praise-text_2'">{{ t.like }}</text>
              <!-- #endif -->
            </view>

            <view
              class="themeItem__footer__themeType1__item themeItem__footer__themeType1__comment"
              @click="commentClick"
            >
              <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
              {{ t.comment }}
              {{ themeComment === 0 ? '' : themeComment }}
              <!-- #endif -->
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <!-- 评论 -->
              <image class="comments-icon" src="./../../static/h5-play/comments@2x.png"></image>
              <text class="praise-text_2">
                {{ t.comment }} {{ themeComment === 0 ? '' : themeComment }}
              </text>
              <!-- #endif -->
            </view>

            <view
              class="themeItem__footer__themeType1__item themeItem__footer__themeType1__share"
              @click="handleClickShare"
            >
              <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-icon class="qui-icon" name="icon-share" size="28" color="#AAA"></qui-icon>
              <!-- #endif -->
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <!-- 分享 -->
              <image class="comments-icon" src="./../../static/h5-play/share2@2x.png"></image>
              <!-- #endif -->
              {{ t.share }}
            </view>
          </view>

          <view v-if="themeType === '2'" class="themeItem__footer__themeType2">
            <view class="themeItem__footer__themeType2__item">
              <qui-icon
                class="qui-icon"
                :name="themeReplyBtn"
                size="28"
                color="#AAA"
                @click="handleClick"
              ></qui-icon>
              {{ themeDeleteBtn }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { time2DateAndHM } from '@/utils/time';
import { mapState } from 'vuex';
// #ifdef H5
import appCommonH from '@/utils/commonHelper';
// #endif

export default {
  // #ifdef H5
  mixins: [appCommonH],
  // #endif
  props: {
    themeType: {
      validator: value => {
        // 1 首页  2 回复  3 @  4 我的收藏 5 我的回答
        return ['1', '2', '3', '4', '5'].indexOf(value) !== -1;
      },
      default: '1',
    },
    // 用户名
    userName: {
      type: String,
      default: '',
    },
    // 用户头像
    themeImage: {
      type: [String, Boolean],
      default: '',
    },
    // 头像实名认证加v
    isReal: {
      type: Boolean,
      default: false,
    },
    // 是否加精
    themeEssence: {
      type: Boolean,
      default: true,
    },
    // 帖子状态（回复了我，@了我）
    themeStatus: {
      type: String,
      default: '',
    },
    // icon图标
    themeBtn: {
      type: [String, Boolean],
      default: '',
    },
    // 回复的图标
    themeReplyBtn: {
      type: [String, Boolean],
      default: '',
    },
    // 删除的图标
    themeDeleteBtn: {
      type: String,
      default: '',
    },
    // 大赏的图标
    themeReward: {
      type: String,
      default: '',
    },
    // 用户组
    userGroups: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 已回答用户组
    userAnswerGroups: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 内容
    themeContent: {
      type: String,
      default: '',
    },
    // 已经解析的内容
    themeContentParse: {
      type: Object,
      default: null,
    },
    // 内容类型：0 文字 1 帖子 2 视频 3 图片
    threadType: {
      type: Number,
      default: 0,
    },
    // 提问用户名称
    questionsName: {
      type: String,
      default: '',
    },
    // 被提问用户名称
    beAskName: {
      type: String,
      default: '',
    },
    // 提问内容
    questionContent: {
      type: String,
      default: '',
    },
    // 显示付费提问
    paidQuestions: {
      type: Boolean,
      default: false,
    },
    // 已回答提问
    answered: {
      type: Boolean,
      default: false,
    },
    // 已回答图标显示
    addAsk: {
      type: Number,
      default: 0,
    },
    // 围观总人数
    onlookerNumber: {
      type: Number,
      default: 0,
    },
    // 免费的提问
    freeAsk: {
      type: Boolean,
      default: false,
    },
    // 问题价值
    askPrice: {
      type: String,
      default: '',
    },
    // 回答问题的内容
    askContent: {
      type: String,
      default: '',
    },
    // 围观单价
    onlookerUnitPrice: {
      type: String,
      default: '',
    },
    // 是否显示围观单价
    onLooker: {
      type: Boolean,
      default: false,
    },
    // 内容区域图片
    imagesList: {
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    // 商品
    postGoods: {
      type: [Object, String],
      default: () => {
        return {};
      },
    },
    // 时间
    themeTime: {
      type: String,
      default: '',
    },
    // 已回答的时间
    themeTimeAnswer: {
      type: String,
      default: '',
    },
    // 点赞数量
    themeLike: {
      type: Number,
      default: 0,
    },
    // 评论数量
    themeComment: {
      type: Number,
      default: 0,
    },
    // 标签
    tagName: {
      type: String,
      default: '',
    },
    // 标签组
    tags: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否点赞 (赞，已赞)
    isGreat: {
      type: Boolean,
      default: false,
    },
    // 图片裁剪、缩放的模式
    modeVal: {
      type: String,
      default: 'aspectFill',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    threadVideo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    videoWidth: {
      type: Number,
      default: 0,
    },
    videoHeight: {
      type: Number,
      default: 0,
    },
    videoId: {
      type: [Number, String],
      default: 0,
    },
    currentindex: {
      type: Number,
      default: 0,
    },
    // 视频显示缩略图
    coverImage: {
      type: String,
      default: '',
    },
    // 是否支付
    payStatus: {
      type: Boolean,
      default: true,
    },
    // 是否删除
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // 滚动高度
    // scrollTop: {
    //   type: Number,
    //   default: 0,
    // },
    // 视频时间
    duration: {
      type: String,
      default: '',
    },
    // 内容是否付费
    themPayBtn: {
      type: Boolean,
      default: false,
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
    // 已回答人的头像
    answerImage: {
      type: [String, Boolean],
      default: '',
    },
    // item全部数据
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    // 底下点赞、评论、分享是否显示、草稿箱部分不需要显示
    bottomicon: {
      type: Boolean,
      default: true,
    },
    isNewInterface: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      rewardAmount: 0, // 悬赏金额
      released: '', // 发布了
      // #endif
      isAdmin: true,
      // threadVideo: '',
      threadWidth: '',
      threadHeight: '',
      videoContext: null, // 用于记录当前播放的视频的索引值
      // isGreat: false,
      preid: 0,
      currentid: 0,
      categoryShow: true,
      imageStatus: true,
      currentTop: 0,
      currentBottom: 0,
      videoShow: false,
      autoplay: false,
      sun: true,
      appear: false,
      date: 1,
      blocKwidth: 224,
      isWeixin: false,
      dataGoodInfoPrice: 0, // 商品价格
      filterImagesList: [],
      isRedPacket: '', // 是否是红包
    };
  },
  computed: {
    // 语言包
    t() {
      return this.i18n.t('topic');
    },
    // 时间转化
    localTime() {
      let themeTime = '';
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      themeTime = this.isTimeReasonable(time2DateAndHM(this.themeTime));
      // #endif
      // #ifndef H5-PLAY || MP-WEIXIN-PLAY
      themeTime = time2DateAndHM(this.themeTime ? this.themeTime : '');
      // #endif
      return themeTime;
    },
    localTimeAnswer() {
      return time2DateAndHM(this.themeTimeAnswer ? this.themeTimeAnswer : '');
    },
    ...mapState({
      getCategoryId: state => state.session.categoryId,
      getCategoryIndex: state => state.session.categoryIndex,
    }),
  },
  created() {
    if (
      this.postGoods.price &&
      (this.postGoods.price.indexOf('-') !== -1 || Number(this.postGoods.price) > 0)
    ) {
      this.dataGoodInfoPrice = this.postGoods.price;
    } else if (this.postGoods.price && Number(this.postGoods.price) <= 0) {
      this.dataGoodInfoPrice = '';
    } else {
      this.dataGoodInfoPrice = '';
    }
    // #ifdef  H5
    const { isWeixin } = appCommonH.isWeixin();
    this.isWeixin = isWeixin;
    // #endif
    this.videoContext = uni.createVideoContext(`myVideo${this.$props.currentindex}`, this);
  },
  mounted() {
    if (this.item.isRedPacket === 0 || this.item.isRedPacket === 1) {
      this.isRedPacket = this.item.isRedPacket;
    } else {
      this.isRedPacket =
        (this.item.thread && this.item.thread.isRedPacket) || this.item.isRedPacket;
    }
    if (this.imagesList.length > 0) {
      this.imagesList.forEach(item => {
        if (item.type === 1) {
          this.filterImagesList.push(item);
        }
      });
    }
    this.blocKwidth = (660 / this.videoWidth) * this.videoHeight;
    // #ifdef H5-PLAY || MP-WEIXIN-PLAY
    if (this.item.rewards || this.item.questionTypeAndMoney) {
      this.rewardAmount = this.item.rewards.money || this.item.questionTypeAndMoney.money; // 悬赏金额
    }
    this.released = this.i18n.t('home.released');
    // #endif
  },
  methods: {
    // 发布于后的显示时间
    isTimeReasonable(timeRea) {
      const newtime = timeRea.split(' ');
      const newtime0 = newtime[0].split('-');
      const newtime1 = newtime[1].split(':');
      const newTime = [...newtime0, ...newtime1];
      const _year = parseInt(newTime[0], 10);
      const _month = parseInt(newTime[1], 10) - 1;
      const _day = parseInt(newTime[2], 10);
      const _hour = parseInt(newTime[3], 10);
      const _minute = parseInt(newTime[4], 10);
      const _second = 0;
      const setDay = new Date(_year, _month, _day, _hour, _minute, _second);
      const timeDifference = Date.now() - setDay.getTime();
      const isShowMinute = 1000 * 60 * 60;
      const isShowHour = 1000 * 60 * 60 * 24;
      if (isShowMinute > timeDifference) {
        this.expired_time = false;
        return `${parseInt(timeDifference / 1000 / 60, 10)}分钟前`;
      }
      if (isShowHour > timeDifference) {
        return `${parseInt(timeDifference / 1000 / 60 / 60, 10)}小时前`;
      }
      return timeRea;
    },
    // 点击删除按钮
    deleteClick(evt) {
      this.$emit('deleteClick', evt);
    },
    // 分享按钮点击事件
    handleClickShare(evt) {
      this.$emit('click', evt);
    },
    // 点赞按钮点击事件
    handleIsGreat(evt) {
      this.$emit('handleIsGreat', evt);
    },
    // 点击评论跳转到详情页
    commentClick(evt) {
      this.$emit('commentClick', evt);
    },
    // 点击内容区域跳转到详情页
    contentClick(evt) {
      this.$emit('contentClick', evt);
    },
    // 点击用户名跳转个人主页
    answeClick(evt) {
      this.$emit('answeClick', evt);
    },
    // 点击
    beAskClick(evt) {
      this.$emit('beAskClick', evt);
    },
    // 点击头像跳转到个人主页
    headClick(evt) {
      this.$emit('headClick', evt);
    },
    // 已回答的用户点击头像跳转到个人主页
    headAnswerClick(evt) {
      this.$emit('headAnswerClick', evt);
    },
    // 点击整个区域, 优先级最低，如果覆盖有别的可点击区域，则此事件不会触发
    backgroundClick(evt) {
      this.$emit('backgroundClick', evt);
    },
    // 当开始/继续播放时触发play事件
    playVideo() {
      this.$emit('videoPlay', this.$props.currentindex, true);
    },
    // 视频不能同时播放
    pauseVideo() {
      this.videoContext.pause();
    },
    // 预览图片
    previewPicture(index) {
      if (this.threadType === 3 && !this.payStatus) {
        this.contentClick();
      } else {
        const _this = this;
        const preview = [];
        for (let i = 0, len = _this.imagesList.length; i < len; i += 1) {
          if (_this.imagesList[i].type === 1) {
            preview.push(_this.imagesList[i].url);
          }
        }
        uni.previewImage({
          current: index,
          urls: preview,
          indicator: 'number',
        });
      }
    },
    // 头像加载失败,显示默认头像
    imageError() {
      this.imageStatus = false;
    },
    // 地理位置
    topicPosition() {
      const { threadPosition } = this;
      uni.navigateTo({
        url: `/pages/topic/position?longitude=${threadPosition[2]}&latitude=${threadPosition[3]}`,
      });
    },
    btn() {
      this.$emit('scrollsetup');
      this.sun = false;
      this.videoShow = true;
      this.autoplay = true;
      setTimeout(() => {
        this.videoContext.play();
        this.videoContext.requestFullScreen();
      }, 200);
      setTimeout(() => {
        const sun = uni.createSelectorQuery().in(this);
        sun
          .select('.isVideo')
          .boundingClientRect(data => {
            this.$emit('scrollheight', data.top, this.$props.currentindex);
          })
          .exec();
      }, 100);
    },
    audioPlayer(id) {
      this.$refs[`audio${id}`].audioPause();
    },
    fullscreenchanges(e) {
      this.$emit('fullscreenchange', e.detail.fullScreen);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.noCover {
  display: inline-block;
  width: 50%;
  height: 280rpx;
  line-height: 260rpx;
  text-align: center;
  background: #f5f7fa;
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.rewardMoney {
  position: absolute;
  top: 0rpx;
  left: 68rpx;
  width: 232rpx;
  color: #c0aa7e;
  text-align: center;
  text-indent: 0;
}
.praise-icon {
  position: relative;
  top: 4rpx;
  width: 30rpx;
  height: 32rpx;
  margin-right: 8rpx;
}
.comments-icon {
  position: relative;
  top: 8rpx;
  width: 34rpx;
  height: 32rpx;
  margin-right: 8rpx;
}
.praise-text_1 {
  font-size: 24rpx;
  color: #ea3d5a;
}
.praise-text_2 {
  font-size: 24rpx;
}
.themeItem__content__uparse__icon {
  position: absolute;
  left: -100rpx;
}
.themeItem__content__uparse__box {
  position: relative;
}
.themeItem__content__uparse__box_1 {
  position: relative;
  text-indent: 100rpx;
}
.themeItem__content__uparse__box_2 {
  position: relative;
  text-indent: 284rpx;
}
.themeItem__content__text__longessay__publish__icon {
  position: absolute;
  top: 0rpx;
  left: 0;
  display: inline-block;
  width: 89rpx;
  height: 39rpx;
  margin-right: 6rpx;
}
.themeItem__content__text__longessay__publish__icon_1 {
  // top: 134rpx;
  // left: 64rpx;
  top: 4rpx;
  left: -42rpx;
}
.indentText {
  text-indent: 44rpx;
}
.themeItem__content__text__longessay__publish__text {
  color: #600111;
}
.themeItem__header__title__essence {
  position: absolute;
  top: 34rpx;
  right: 34rpx;
  width: 92rpx;
  height: 92rpx;
}
.themeItem__header__title__essence > image {
  width: 100%;
  height: 100%;
}
/* #endif */
.themeCount {
  position: relative;
  padding-top: 20rpx;
  .addFine {
    position: absolute;
    top: 16rpx;
    right: 20rpx;
    z-index: 1;
    width: 33rpx;
    height: 43rpx;
  }
  .addAsk {
    position: absolute;
    top: 22rpx;
    right: 20rpx;
    width: 130rpx;
    height: 119rpx;
  }
}
.themeItem {
  padding: 30rpx;
  margin: 0;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  margin: 15rpx 30rpx;
  /* #endif */
  background: --color(--qui-BG-2);
  border-top: solid 2rpx --color(--qui-BOR-ED);
  border-bottom: solid 2rpx --color(--qui-BOR-ED);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  border-radius: 20rpx;
  /* #endif */
  box-sizing: border-box;
  &__header {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    width: auto;
    padding-bottom: 12rpx;
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
      margin-right: 18rpx;
      // background: #ccc;
      border-radius: 100%;
      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    &__title {
      flex: 1;
      &__top {
        display: flex;
        height: 37rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        height: 26rpx;
        /* #endif */
        margin-left: 2rpx;
        font-family: $font-family;
        font-size: $fg-f4;
        line-height: 37rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        line-height: 26rpx;
        /* #endif */
      }
      &__username {
        max-width: 394rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        max-width: 340rpx;
        /* #endif */
        overflow: hidden;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        font-size: 26rpx;
        /* #endif */
        font-weight: bold;
        line-height: 37rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        line-height: 30rpx;
        /* #endif */
        color: --color(--qui-FC-333);
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        color: var(--qui-FC-333);
        /* #endif */
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
      }
      &__isAdmin {
        margin-left: 13rpx;
        font-weight: 400;
        color: --color(--qui-FC-AAA);
        transition: $switch-theme-time;
      }
      &__isAdminColor {
        padding: 2rpx 10rpx;
        font-size: $fg-f1;
        vertical-align: top;
        background: --color(--qui-BG-IT);
        border-radius: 18rpx;
        box-sizing: border-box;
      }
      &__time {
        max-width: 600rpx;
        padding-top: 10rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        padding-top: 6rpx;
        /* #endif */
        overflow: hidden;
        font-size: $fg-f2;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        font-size: 14rpx;
        /* #endif */
        /* #ifdef MP-WEIXIN-PLAY */
        font-size: 22rpx;
        /* #endif */
        font-weight: 400;
        line-height: 31rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        line-height: 30rpx;
        /* #endif */
        color: --color(--qui-FC-AAA);
        text-overflow: ellipsis;
        // word-break: break-all;
        white-space: nowrap;
        transition: $switch-theme-time;
      }
      &__jumpBtn {
        float: right;
        width: 10rpx;
        height: 37rpx;
        font-size: 10rpx;
        line-height: 37rpx;
        color: #ddd;
      }
      &__deleteBtn {
        float: right;
      }
      &__reward {
        float: right;
        font-size: $fg-f4;
        font-weight: bold;
        color: --color(--qui-RED);
      }
    }
  }
  &__content {
    &__good {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 20rpx;
      margin-bottom: 30rpx;
      font-size: $fg-f3;
      background: --color(--qui-BG-F6);
      border-radius: 2px;

      &__image {
        width: 160rpx;
        height: 160rpx;
        margin: 0 30rpx 0 0;
        border-radius: 5rpx;
      }

      &__info {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      &__title {
        max-height: 120rpx;
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
    }

    &__text {
      min-height: 45rpx;
      padding-bottom: 20rpx;
      overflow: hidden;
      font-family: $font-family;
      font-size: $fg-f4;
      font-weight: 400;
      line-height: 45rpx;
      color: --color(--qui-FC-333);
      word-wrap: break-word;
      &__longessay {
        // display: flex;
        // flex-direction: column;
        // word-break: break-all;
      }
    }
    &__reply {
      width: 670rpx;
      height: 145rpx;
      background: --color(--qui-BOR-ED);
      border-radius: 7rpx;
    }
    &__imgone {
      display: flex;
      justify-content: flex-start;
      margin-top: 10rpx;
      margin-bottom: 30rpx;
      line-height: 0;
      &__item {
        max-width: 80%;
        max-height: 80%;
        border-radius: 5rpx;
      }
    }
    &__imgtwo {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      line-height: 0;
      &__item {
        display: block;
        width: 49.3%;
        height: 211rpx;
        margin-bottom: 10rpx;
        background: #fff;
        border-radius: 5rpx;
      }
    }
    &__imgmore {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
      margin-top: 30rpx;
      margin-bottom: 20rpx;
      line-height: 0;
      &__item {
        display: block;
        width: 32%;
        height: 211rpx;
        margin-right: 1.33%;
        margin-bottom: 10rpx;
        border-radius: 5rpx;
      }
    }
    &__tags {
      display: flex;
      flex-wrap: wrap;
      &__item {
        height: 50rpx;
        padding: 0 20rpx;
        margin: 0rpx 10rpx 8rpx 0;
        margin-bottom: 8rpx;
        /* #ifdef MP-WEIXIN */
        margin-bottom: 30rpx;
        /* #endif */
        font-family: $font-family;
        font-size: $fg-f2;
        font-weight: 400;
        line-height: 50rpx;
        color: rgba(119, 119, 119, 1);
        text-align: center;
        background: rgba(247, 247, 247, 1);
        border-radius: 6rpx;
      }
    }
    &__tags__item-text {
      margin-left: 10rpx;
    }
  }
  &__footer {
    &__themeType1 {
      display: flex;
      justify-content: space-between;
      margin-top: 60rpx;
      &__item {
        font-family: $font-family;
        font-size: $fg-f4;
        font-weight: 400;
        line-height: 37rpx;
        color: rgba(170, 170, 170, 1);
      }
      .qui-icon {
        margin-right: 15rpx;
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
      .qui-icon {
        margin-right: 15rpx;
      }
    }
  }
}
.imgmore-image {
  width: 100%;
  height: 211rpx;
}
.imgmore_num {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  width: 100rpx;
  height: 50rpx;
  margin: -25rpx 0 0 -50rpx;
  font-size: $fg-f3;
  line-height: 50rpx;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 25rpx;
}
.themeItem__content__text__longessay__publish {
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  position: relative;
  /* #endif */
  display: inline-block;
}
.navPost {
  display: inline;
  padding-left: 8rpx;
  // font-weight: 900;
  color: var(--qui-LINK);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  color: #ea3d5a;
  /* #endif */
}
.themeItem__content__coverimg {
  position: relative;
  // 必须要固定高度，因为uni的image组件，会自己修改图片容器的高度
  height: 400rpx !important;
  &.vertical {
    height: 480rpx !important;
  }
}
.theme__content__videocover {
  position: relative;
  margin-bottom: 20rpx;
  &-img {
    z-index: 1;
    width: 100%;
  }
}
/deep/ .uni-video-cover {
  z-index: 0;
}
.theme__mark__open {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 80rpx;
  height: 80rpx;
  margin-top: -40rpx;
  margin-left: -40rpx;
}
.theme__mark {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
}
.themeItem__QA,
.themeItem_put,
.themeItem_to,
.themeItem_ask,
.themeItem_questions,
.themeItem__header__title__questions,
.themeItem_watch,
.themItem_watch_num,
.themItem_watch_gather,
.themeItem_quemoney,
.themeItem_money,
.themeItem_all,
.themItem_watch_money {
  display: inline-block;
}
.themeItem_questions,
.themeItem_to {
  color: --color(--qui-LINK);
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.themeItem_to {
  color: #ea3d5a;
}
/* #endif */
// .themeItem_to {
//   max-width: 250rpx;
//   overflow: hidden;
//   line-height: 31rpx;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
.themeItem_put,
.themeItem_ask {
  margin: 0 8rpx;
}
.themeItem-put,
.themeItem__header__title__questions {
  margin: 0 4rpx;
}
.themeItem_askback {
  width: 690rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  font-size: $fg-f4;
  color: var(--qui-FC-333);
  background-color: --color(--qui-BG-F7);
  border-radius: 5rpx;
}
.themItem_watch_num,
.themItem_watch_money {
  color: --color(--qui-RED);
}
.themeItem__content__uparse {
  position: relative;
}
/* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
/deep/ .themeItem__content__uparse .themeItem__content__wxParse {
  text-indent: 40rpx;
}
/* #endif */
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
/deep/ .themeItem__content__uparse .themeItem__content__wxParse {
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  font-size: 30rpx;
  line-height: 30rpx;
  text-indent: 140rpx;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/deep/ .themeItem__content__uparse .themeItem__content__wxParse_0 {
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  font-size: 30rpx;
  line-height: 30rpx;
  text-indent: 56rpx;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/deep/ .themeItem__content__uparse .themeItem__content__wxParse_1 {
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  font-size: 30rpx;
  line-height: 30rpx;
  text-indent: 86rpx;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.themeItem__content__fufei__goldcoin_0 {
  position: absolute;
  top: 6rpx;
  left: 108rpx;
  width: 32rpx;
  height: 32rpx;
}
.themeItem__content__fufei__goldcoin {
  position: absolute;
  top: 6rpx;
  left: 196rpx;
  width: 32rpx;
  height: 32rpx;
}
.themeItem__content__fufei__goldcoin_1 {
  position: relative;
  top: 6rpx;
  width: 32rpx;
  height: 32rpx;
  margin: 0 6rpx;
}
.themeItem__content__fufei__goldcoin_2 {
  position: absolute;
  top: 6rpx;
  left: 196rpx;
  width: 32rpx;
  height: 32rpx;
}
/* #endif */
.themeItem__content__uparse .themeItem__content__fufei {
  position: absolute;
  top: -2rpx;
  color: var(--qui-FC-333);
}
</style>
