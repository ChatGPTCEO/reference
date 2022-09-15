<template>
  <qui-page :data-qui-theme="theme" class="content">
    <view v-if="loaded" @click.stop="shareFun">
      <!--<scroll-view
        scroll-y="true"
        scroll-with-animation="true"
        show-scrollbar="false"
        class="scroll-y"
        @scrolltolower="pullDown"
      >-->
      <view class="scroll-y">
        <view class="ft-gap">
          <view class="bg-white">
            <view
              class="detail-tip"
              v-if="thread.thread.type == 2 && thread.threadVideo.status == 0"
            >
              {{ t.transcodingTip }}
            </view>

            <view
              class="detail-tip"
              v-else-if="thread.thread.type == 2 && thread.threadVideo.status == 2"
            >
              {{ t.transcodingFailedTip }}
            </view>
            <view class="detail-tip" v-else-if="thread.thread.isApproved == 0">
              {{ t.examineTip }}
            </view>
            <qui-topic-content
              ref="sun"
              :is-red-packet="thread.thread.isRedPacket"
              :current-post-data="currentPostData"
              :themid="threadId"
              :topic-status="thread.thread.isApproved"
              :follow-show="thread.author.follow != null"
              :pay-status="threadIsPaidCover"
              :video-status="
                (thread.thread.price > 0 && thread.thread.paid) || thread.thread.price == 0
              "
              :user-info="thread.author"
              :avatar-url="shareAnonymous ? '' : thread.author.avatar"
              :user-name="shareAnonymous ? t.anonymousUsers : thread.author.username"
              :be-ask-name="thread.question && thread.question.beUser.username"
              :is-real="thread.author.isReal"
              :user-role="thread.author.groups ? thread.author.groups : ''"
              :theme-type="thread.thread.type"
              :theme-time="thread.thread.createdAt"
              :management-show="
                selectList[0].canOpera ||
                  selectList[1].canOpera ||
                  selectList[2].canOpera ||
                  selectList[3].canOpera
              "
              :theme-title="thread.thread.type == 1 ? thread.thread.title : ''"
              :theme-content="themeContent"
              :images-list="thread.images"
              :post-goods-status="postGoodsStatus"
              :post-goods="thread.postGoods"
              :select-list="selectList"
              :tags="[thread.category]"
              :thread-price="
                thread.thread.attachmentPrice > 0
                  ? thread.thread.attachmentPrice
                  : thread.thread.price
              "
              :thread-is-essence="thread.thread.isEssence"
              :media-url="thread.thread.type == 2 ? thread.threadVideo.mediaUrl : ''"
              :duration="thread.thread.type == 2 ? thread.threadVideo.duration : ''"
              :video-width="thread.thread.type == 2 ? thread.threadVideo.width : 0"
              :video-height="thread.thread.type == 2 ? thread.threadVideo.height : 0"
              :cover-image="thread.thread.type == 2 ? thread.threadVideo.coverUrl : ''"
              :file-list="attachmentFileList"
              :thread-position="
                thread.thread.location
                  ? [
                      thread.thread.location,
                      thread.thread.address,
                      thread.thread.longitude,
                      thread.thread.latitude,
                    ]
                  : []
              "
              :thread-audio="thread.thread.type == 4 ? thread.threadAudio : null"
              :attachment-pay-status="
                thread.thread.attachmentPrice > 0 && !thread.thread.isPaidAttachment
              "
              @attachmentPay="payClickShow"
              @personJump="personJump(thread.author.id)"
              @beAskClick="beAskClick(thread.question.beUser.id)"
              @selectChoice="selectChoice"
              @videocoverClick="payClickShow"
              @previewPicture="payClickShow"
              @previewAudio="payClickShow"
              @tagClick="tagClick"
              @buyGood="buyGood"
            >
              <!-- 更多操作 -->
              <view slot="more" @click="moreClick">
                <view class="det-ft-operaCli">
                  <view class="det-ft-more">
                    <qui-icon
                      name="icon-gengduo"
                      class="icon-gengduo"
                      style="font-size: 40rpx;"
                    ></qui-icon>
                  </view>
                </view>
              </view>
            </qui-topic-content>
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <!-- 已支付用户列表 -->
            <view v-if="paidStatus">
              <qui-person-list
                v-if="refreshStatus"
                ref="paidList"
                :type="t.pay"
                :person-num="thread.thread.paidCount"
                :limit-count="limitShowNum"
                :person-list="thread.paidUsers"
                :btn-show="paidBtnStatus"
                :btn-icon-show="true"
                btn-icon-name="rmb"
                :btn-text="payThreadTypeText"
                @personJump="personJump"
                @btnClick="payClickShow"
              ></qui-person-list>
            </view>
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <!-- 已支付用户列表 -->
            <view v-if="paidStatus">
              <qui-person-list
                v-if="refreshStatus"
                ref="paidList"
                :type="t.pay"
                :person-num="thread.thread.paidCount"
                :limit-count="limitShowNum"
                :person-list="thread.paidUsers"
                :btn-show="paidBtnStatus"
                :btn-icon-show="true"
                list-bg="#fefbf5"
                btn-icon-name="rmb"
                :btn-text="payThreadTypeText"
                @personJump="personJump"
                @btnClick="payClickShow"
              ></qui-person-list>
            </view>
            <!-- #endif -->
            <!-- 红包用户列表 -->
            <view v-if="thread.thread.isRedPacket === 1">
              <qui-person-list
                :type="t.reward"
                :btn-show="false"
                :btn-icon-show="true"
                list-bg="#fefbf5"
                :redbag="true"
                :number="redPacket.number"
                :remain-number="redPacket.remain_number"
                :likenum="redPacket.likenum"
                :condition="redPacket.condition"
                @personJump="personJump"
                @btnClick="rewardClick"
              >
                >
              </qui-person-list>
            </view>
            <!-- 红包用户列表结束 -->
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <!-- 打赏用户列表 -->
            <view v-if="rewardStatus && thread.thread.type !== 6">
              <qui-person-list
                :type="t.reward"
                :person-num="thread.thread.rewardedCount"
                :limit-count="limitShowNum"
                :person-list="rewardedUsers"
                :btn-show="canReward && rewardBtnStatus && thread.thread.type !== 6"
                :can-reward="canReward"
                :btn-icon-show="true"
                btn-icon-name="reward"
                :btn-text="t.reward"
                @personJump="personJump"
                @btnClick="rewardClick"
              ></qui-person-list>
            </view>
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <!-- 打赏用户列表 -->
            <view v-if="rewardStatus && thread.thread.type !== 6">
              <qui-person-list
                :type="t.reward"
                :person-num="thread.thread.rewardedCount"
                :limit-count="limitShowNum"
                :person-list="rewardedUsers"
                :btn-show="canReward && rewardBtnStatus && thread.thread.type !== 6"
                :can-reward="canReward"
                :btn-icon-show="true"
                btn-icon-name="reward"
                list-bg="#fefbf5"
                :btn-text="t.reward"
                @personJump="personJump"
                @btnClick="rewardClick"
              ></qui-person-list>
            </view>
            <!-- #endif -->
            <!-- 回答问题 -->
            <view v-if="beAsk">
              <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-be-ask
                :date="beAskDate"
                :be-date="beAskBeDate"
                :show-txt="thread.question.price === '0.00' ? false : true"
                @queClick="queClick"
              ></qui-be-ask>
              <!-- #endif -->
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-be-ask
                :date="beAskDate"
                :be-date="beAskBeDate"
                :show-txt="thread.question.price === '0.00' ? false : true"
                @queClick="queClick"
                :thread-type="thread.thread.type"
              ></qui-be-ask>
              <!-- #endif -->
            </view>
            <!-- 答案支付 -->
            <view v-if="answerPay" class="answerPay">
              <qui-answer
                :user-info="thread.author"
                :avatar-url="thread.question.beUser.avatar"
                :user-name="thread.question.beUser.username"
                :is-real="thread.question.beUser.isReal"
                :user-role="
                  handleGroup(thread.question.beUser.groups && thread.question.beUser.groups)
                "
                :theme-time="thread.question.answeredAt"
                :person-num="thread.thread.paidCount"
                :limit-count="limitShowNum"
                :person-list="thread.paidUsers"
                :btn-show="paidBtnStatus"
                :btn-icon-show="true"
                :thread="thread"
                :images-list="thread.question.images"
                :answer-content="thread.question.contentHtml"
                :is-onlooker="thread.thread.onlookerState"
                btn-icon-name="rmb"
                :btn-text="payThreadTypeText"
                @personJump="personJump"
                @btnClick="payAnswerClickShow()"
                @watchClick="watchClick()"
              ></qui-answer>
            </view>
            <!-- 支付可见 -->
            <view class="payment" v-if="payment">
              <qui-payment-visible
                :user-id="thread.question.beUser.id"
                :user-name="thread.question.beUser.username"
                :avatar-url="thread.question.beUser.avatar"
                :theme-time="thread.question.answeredAt"
                :answer-content="thread.question.contentHtml"
                :images-list="thread.question.images"
                :thread="thread"
                :be-user-id="thread.question.beUserId"
              ></qui-payment-visible>
            </view>
            <view v-if="likedUsers.length > 0">
              <!-- 点赞用户列表 -->
              <qui-person-list
                :type="t.giveLike"
                :person-num="thread.firstPost.likeCount"
                :limit-count="limitShowNum"
                :person-list="likedUsers"
                :btn-show="false"
                :is-dot-zan="true"
                @personJump="personJump"
              ></qui-person-list>
            </view>
            <view class="det-con-ft">
              <view class="det-con-ft-child">{{ t.read }}{{ viewCount }}</view>
              <view
                class="det-con-ft-child"
                @click="
                  threadCollectionClick(
                    thread.thread.id,
                    thread.canFavorite,
                    thread.isFavorite,
                    '1',
                  )
                "
              >
                <qui-icon
                  v-if="thread.isFavorite"
                  name="icon-collectioned"
                  class="qui-icon"
                ></qui-icon>

                <qui-icon v-else name="icon-collection" class="qui-icon"></qui-icon>
                <view v-if="thread.isFavorite">{{ t.collectionAlready }}</view>
                <view v-else>{{ t.collection }}</view>
              </view>
            </view>
          </view>
          <!-- 评论 -->
          <view class="comment">
            <view class="comment-top">
              <view
                class="comment-num"
                :style="{ paddingBottom: thread.thread.postCount > 1 ? '0' : '40rpx' }"
              >
                {{ thread.thread.postCount - 1 }}{{ t.item }}{{ t.comment }}
              </view>
              <view class="comment-sort" v-if="thread.thread.postCount > 1">
                <view class="comment-sort-operaCl" @click="sortOperaClick">
                  <qui-icon
                    name="icon-sort1"
                    class="icon-management"
                    color="#777"
                    size="30"
                  ></qui-icon>
                </view>
                <view>
                  <qui-drop-down
                    posival="absolute"
                    :show="sortSeleShow"
                    :list="sortSelectList"
                    :top="60"
                    :right="0"
                    :width="220"
                    @click="sortSelectChoice"
                  ></qui-drop-down>
                </view>
              </view>
            </view>
            <view v-if="posts.length > 0">
              <!-- // 分割评论列表，提高渲染性能 -->
              <view v-for="(list, listIndex) in splitLists" :key="listIndex">
                <view v-for="(item, index) in list" :key="item.id">
                  <qui-topic-comment
                    v-if="!item.isDeleted"
                    :rewards="parseFloat(item.rewards)"
                    :current-post-data="currentPostData"
                    :item="item"
                    :comment-type="0"
                    :post-id="item.id"
                    :comment-avatar-url="item.user.avatar"
                    :user-name="item.user.username"
                    :is-real="item.user.isReal"
                    :is-liked="item.isLiked"
                    :user-role="item.user.groups ? item.user.groups : ''"
                    :comment-time="item.createdAt"
                    :comment-status="item.isApproved"
                    :comment-content="item.summary"
                    :reply-list="item.lastThreeComments"
                    :comment-like-count="item.likeCount"
                    :images-list="item.images"
                    :reply-count="item.replyCount"
                    :can-delete="item.canHide"
                    :comment-show="true"
                    :red-packet-amount="item.redPacketAmount"
                    @personJump="personJump(item.user.id)"
                    @commentLikeClick="
                      commentLikeClick(
                        item.id,
                        '4',
                        item.canLike,
                        item.isLiked,
                        listIndex * splitSize + index,
                        item,
                      )
                    "
                    @commentJump="commentJump(threadId, item.id)"
                    @imageClick="imageClick"
                    @deleteComment="deleteComment(item.id, '3', item.canHide, item.isDeleted, item)"
                    @replyComment="replyComment(item.id, listIndex * splitSize + index)"
                    @submitadoption="submitadoption"
                  ></qui-topic-comment>
                </view>
              </view>
              <!--<view v-for="(post, index) in posts" :key="index">
              {{ post.likeCount }}
              <view v-for="(group, gindex) in post.user.groups" :key="gindex">{{ group.name }}</view>
            </view>-->
            </view>
          </view>
          <qui-load-more
            :status="loadingType"
            :content-text="{
              contentdown: c.contentdown,
              contentrefresh: c.contentrefresh,
              contentnomore: contentnomoreVal,
            }"
          ></qui-load-more>
        </view>
      </view>
      <!--</scroll-view>-->
      <!--详情页底部-->
      <view
        class="det-ft"
        :style="{
          paddingBottom: detectionModel() ? '20rpx' : 0,
        }"
        v-if="footerShow"
      >
        <view class="det-ft-con">
          <view
            class="det-ft-child flex"
            @click="
              threadLikeClick(
                thread.firstPost.id,
                thread.firstPost.canLike,
                thread.firstPost.isLiked,
              )
            "
          >
            <qui-icon
              :name="thread.firstPost.isLiked ? 'icon-liked' : 'icon-like'"
              class="qui-icon"
            ></qui-icon>
            <view class="ft-child-word">
              {{ thread.firstPost.isLiked ? t.giveLikeAlready : t.giveLike }}
            </view>
          </view>
          <view class="det-ft-child flex" @click="threadComment(thread.id)">
            <qui-icon name="icon-comments" class="qui-icon"></qui-icon>
            <view class="ft-child-word">{{ t.writeComment }}</view>
          </view>
          <view class="det-ft-child flex" @click.stop="shareClick">
            <qui-icon name="icon-share" class="qui-icon"></qui-icon>
            <view class="ft-child-word">{{ t.share }}</view>
          </view>
        </view>
      </view>
      <view class="mask" v-if="shareShow" @click="closeShare">
        <view class="wxShareTip">
          <img src="/static/sharePoint.png" alt class="sharePoint" />
          <img src="/static/shareKnow.png" alt class="shareKnow" />
        </view>
      </view>
      <!--分享弹框-->
      <uni-popup ref="sharePopup" type="bottom">
        <view class="popup-share">
          <view class="popup-share-content">
            <button class="popup-share-button" open-type="share"></button>
            <view v-for="(item, index) in bottomData" :key="index" class="popup-share-content-box">
              <view class="popup-share-content-image">
                <view class="popup-share-box" @click="shareContent(index)">
                  <qui-icon
                    class="content-image"
                    :name="item.icon"
                    size="46"
                    color="#777777"
                  ></qui-icon>
                </view>
              </view>
              <text class="popup-share-content-text">{{ item.text }}</text>
            </view>
          </view>
          <view class="popup-share-content-space"></view>
          <text class="popup-share-btn" @click="cancel('share')">{{ c.cancel }}</text>
        </view>
      </uni-popup>
      <!--打赏选择金额弹框-->
      <uni-popup ref="rewardPopup" type="bottom">
        <view class="popup-box">
          <view class="popup-reward-content">
            <text class="popup-title">
              {{ t.supportTheAuthorToCreate }}
            </text>
            <view class="popup-content-btn">
              <qui-button
                class="popup-btn"
                v-for="(item, index) in payNum"
                :key="index"
                :type="payNumCheck[0].name === item.name ? 'primary' : 'post'"
                plain
                size="post"
                @click="moneyClick(index)"
              >
                {{ item.name }}
              </qui-button>
            </view>
          </view>
          <view class="popup-content-space"></view>
          <text class="popup-cancel-btn" @click="cancelReward()">
            {{ i18n.t('discuzq.post.cancel') }}
          </text>
        </view>
      </uni-popup>
      <!--自定义打赏金额弹框-->
      <uni-popup ref="customAmountPopup" type="center">
        <view v-if="customAmountStatus">
          <view class="popup-dialog">
            <view class="popup-dialog__top">
              <text>
                {{ t.enterTheRewardPaymeAmount }}
              </text>
            </view>
            <view class="popup-dialog__cont">
              <qui-icon class="popup-dialog__cont-rmb" name="icon-rmb" size="40"></qui-icon>
              <input
                class="popup-dialog__cont-input"
                v-model="inputPrice"
                type="digit"
                placeholder="0.0"
                focus
                :maxlength="maxLength"
                @input="checkNum"
              />
            </view>
            <view class="popup-dialog__ft">
              <button class="popup-btn--close" @click="diaLogClose">
                {{ i18n.t('discuzq.close') }}
              </button>
              <button
                class="popup-btn--ok"
                :class="inputPrice > 0 ? 'popup-btn--ok--blue' : ''"
                :disabled="inputPrice === ''"
                @click="diaLogOk"
              >
                {{ i18n.t('discuzq.ok') }}
              </button>
            </view>
          </view>
        </view>
      </uni-popup>
      <!--更多操作弹框-->
      <uni-popup ref="morePopup" type="bottom">
        <view class="popup-share">
          <view
            class="popup-share-content"
            :class="moreDataLength > 4 ? 'popup-share-content-inner' : ''"
          >
            <view
              v-for="(item, index) in moreData"
              :key="index"
              class="popup-share-content-box popup-more-content-box"
              @click="moreContent(item, thread)"
              v-show="item.canOpera"
            >
              <button
                class="popup-more-button"
                open-type="share"
                v-if="item.name === 'wxFriends'"
              ></button>
              <view class="popup-share-content-image">
                <view class="popup-share-box">
                  <qui-icon
                    class="content-image"
                    :name="item.icon"
                    size="46"
                    color="#777777"
                  ></qui-icon>
                </view>
              </view>
              <text class="popup-share-content-text popup-more-content-text">{{ item.text }}</text>
            </view>
          </view>
          <view class="popup-share-content-space"></view>
          <text class="popup-share-btn" @click="moreCancel">{{ c.cancel }}</text>
        </view>
      </uni-popup>
      <!--举报弹框-->
      <uni-popup ref="reportPopup" type="bottom">
        <qui-report
          ref="report"
          :current-login-id="currentLoginId"
          :thread-id="threadId"
          :report-type="1"
          @reportClose="reportClose"
        ></qui-report>
      </uni-popup>
      <!--支付组件-->
      <view v-if="payShowStatus">
        <qui-pay
          ref="payShow"
          :pay-type-val="payTypeVal"
          :thread-id="thread.id"
          :money="price"
          :wallet-status="user.canWalletPay"
          :pay-password="pwdVal"
          :balance="Number(user.walletBalance)"
          :pay-type-data="payTypeData"
          :to-name="thread.author.username"
          :pay-type="payTypeText"
          :pay-tip-show="thread.thread.type === 5 ? false : true"
          @radioMyHead="radioMyHead"
          @radioChange="radioChange"
          @onInput="onInput"
          @paysureShow="paysureShow"
        ></qui-pay>
      </view>
      <!--遮罩层组件-->
      <qui-loading-cover v-if="coverLoading" mask-zindex="111"></qui-loading-cover>
      <!--轻提示-->
      <qui-toast ref="toast"></qui-toast>
      <!--回复弹框-->
      <uni-popup ref="commentPopup" type="bottom" class="comment-popup-box">
        <view class="comment-popup" v-if="commentPopupStatus">
          <view class="comment-popup-topbox">
            <view class="comment-popup-top">
              <view class="comment-popup-top-l">
                <qui-icon
                  name="icon-expression"
                  class="comm-icon"
                  :size="40"
                  @click="emojiShow = !emojiShow"
                ></qui-icon>
                <qui-icon
                  name="icon-call"
                  :size="40"
                  class="comm-icon"
                  @click="callClick"
                ></qui-icon>
              </view>
              <view class="text-word-tip" v-if="commentWorkTips">
                {{ t.canWrite }}{{ restWord }}{{ t.word }}
              </view>
              <view class="text-word-tip" v-if="commentText">
                {{ t.canWrite }}{{ restTextAreaValue }}{{ t.word }}
              </view>
            </view>
            <qui-emoji
              v-if="emojiShow"
              position="absolute"
              top="104rpx"
              border-radius="10rpx"
              :color="emojiShow ? '#1878F3' : '#777'"
              @click="getEmojiClick"
            ></qui-emoji>
          </view>

          <view class="comment-content-box">
            <view class="comment-content">
              <textarea
                ref="commentText"
                :focus="focusVal"
                :maxlength="maxTextLength"
                class="comment-textarea"
                :placeholder="commentText === true ? t.writeCommentsAsk : t.writeComments"
                placeholder-style="color:#b5b5b5;font-size: 28rpx;"
                placeholder-class="text-placeholder"
                :show-confirm-bar="barStatus"
                cursor-spacing="80"
                v-if="!emojiShow"
                v-model="textAreaValue"
                @blur="contBlur"
                @touchmove.stop="touchStop"
              />
              <view class="comment-textarea" v-show="emojiShow">
                {{ textAreaValue }}
              </view>
            </view>
            <qui-uploader
              :url="`${url}api/attachments`"
              :header="header"
              :form-data="formData"
              :count="3"
              name="file"
              async-clear
              ref="upload"
              @change="uploadChange"
              @clear="uploadClear"
            ></qui-uploader>
          </view>
          <button class="publish-btn" @click="publishClickStatus && publishClick()">
            {{ t.publish }}
          </button>
        </view>
      </uni-popup>
      <uni-popup ref="codePopup" type="center" class="code-popup-box" @change="codeImgChange">
        <view class="code-content" v-if="qrcodeShow">
          <view class="code-title">{{ p.payNow }}</view>
          <view class="code-pay-money">
            <view class="code-yuan">￥</view>
            {{ price }}
          </view>
          <view class="code-type-box">
            <view class="code-type-tit">{{ p.payType }}</view>
            <view class="code-type">
              <qui-icon
                class="code-type-icon"
                name="icon-wxPay"
                size="36"
                color="#09bb07"
              ></qui-icon>
              <view class="code-type-text">{{ p.wxPay }}</view>
            </view>
          </view>
          <image :src="codeUrl" class="code-img"></image>
          <view class="code-tip">{{ p.wechatIdentificationQRcode }}</view>
        </view>
      </uni-popup>
      <uni-popup ref="deletePopup" type="center">
        <uni-popup-dialog
          type="warn"
          :content="deleteTip"
          :before-close="true"
          @close="handleClickCancel"
          @confirm="handleClickOk"
        ></uni-popup-dialog>
      </uni-popup>
      <uni-popup ref="wechatPopup" type="center">
        <uni-popup-dialog
          type="warn"
          :content="wechatTip"
          :before-close="true"
          @close="handleWechatClickCancel"
          @confirm="handleWechatClickOk"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
    <view v-else-if="loadingStatus && !loaded && !thread" class="loading">
      <u-loading :size="60"></u-loading>
    </view>
    <qui-page-message v-else-if="thread || loaded === false"></qui-page-message>
  </qui-page>
</template>

<script>
/* eslint-disable */
// import { status, utils } from '@/library/jsonapi-vuex/index';
import { status } from '@/library/jsonapi-vuex/index';
import { mapState, mapMutations } from 'vuex';
import { DISCUZ_REQUEST_HOST } from '@/common/const';
import user from '@/mixin/user';
import forums from '@/mixin/forums';
import detectionModel from '@/mixin/detectionModel';
import loginModule from '@/mixin/loginModule';
// #ifdef H5
import wxshare from '@/mixin/wxshare-h5';
// #endif
// #ifndef MP-WEIXIN
import appCommonH from '@/utils/commonHelper';
// #endif
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';
import { getCurUrl } from '@/utils/getCurUrl';
import uniCopy from '@/common/uni-copy';
import newApi from '@/api/new-api';
import { modifyPostContentHtml } from '@/utils/transformHtml';
import { cloneDeep } from 'lodash';
import apiRequest from '../api/new-api';

let payWechat = null;
let payPhone = null;
let isOnPaidAttachment = true;

export default {
  components: { uniPopupDialog },
  mixins: [
    user,
    forums,
    loginModule,
    // #ifdef H5
    wxshare,
    // #endif
    detectionModel,
  ],
  // #ifndef MP-WEIXIN
  utils: [appCommonH],
  // #endif
  data() {
    return {
      userInfo: {}, // 用户信息
      forumsInfo: {}, // 后台站点信息
      viewCount: 0,
      number: '',
      timer: '', //红包轮询的定时器啦
      onUpdateRed: false, //红包轮询的监视器啦
      redPacket: {}, //红包的参数
      currentPostData: {},
      imageList: [],
      // navTitle: '内容详情页', // 导航栏标题
      threadId: '', // 主题id
      // userId: 57, //当前用户Id
      // userInfo: '', //当前用户信息
      // thread: {}, //主题数据
      // loadDetailStatusId: 0, // 主题接口请求状态
      // topicStatus: 1, // 0 是不合法 1 是合法 2 是忽略
      posts: [], // 评论列表数据
      splitLists: [], // 评论列表分割二维数组
      loadingType: 'more', // 上拉加载状态
      // scrollTop: 0,
      pageNum: 1, // 这是主题回复当前页数
      pageSize: 10, // 这是主题回复每页数据条数
      splitSize: 10, // 列表分割size
      payThreadTypeText: '', // 主题支付类型不同，支付按钮文字显示不同的支付提示
      // loadDetailCommnetStatusId: 0,
      postIndex: '', // 点击主题评论时的index
      footerShow: true, // 默认显示底部
      // commentShow: false, // 显示评论
      commentPopupStatus: false, // 回复弹框内容状态是否显示
      commentWorkTips: true, // 回复弹框是否显示字数
      commentText: true, // 回复弹框默认字
      maxTextLength: 5000, // 默认最多输入5000字
      cursor: 0, // 光标位置
      textAreaValue: '', // 评论输入框
      barStatus: false, // 是否显示输入框获取焦点时完成的那一栏
      uploadFile: [], // 上传的文件
      isLiked: false, // 主题点赞状态
      role: '管理员',
      isActive: true,
      shareShow: false, // h5微信分享
      beAsk: false, // 是否显示回答问题按钮
      answerPay: false, // 支付答案
      payment: false, // 支付可见
      questionId: '', // 回答问题ID
      beAskDate: 0, // 回答即可获得
      beAskBeDate: 0, // 每次回答可获得
      platformDate: 0, // 平台获得
      onLookformDate: 0, // 围观平台获得
      bottomData: [
        {
          text: this.i18n.t('core.generatePoster'), //~生成海报
          icon: 'icon-poster',
          name: 'wx',
        },
        {
          text: this.i18n.t('core.wxShare'), //~微信分享
          icon: 'icon-wx-friends',
          name: 'wxFriends',
        },
      ], // 分享方式

      seleShow: false, // 默认收起管理菜单
      selectList: [
        { text: this.i18n.t('topic.edit'), type: '0' },
        { text: this.i18n.t('topic.essence'), type: '2' },
        { text: this.i18n.t('topic.sticky'), type: '3' },
        { text: this.i18n.t('topic.delete'), type: '4' },
      ], // 管理菜单

      limitShowNum: 12,
      paidStatus: false, // 是否有已支付数据
      paidBtnStatus: false, // 支付按钮是否显示（在ios里不显示，已支付主题后不显示）
      rewardBtnStatus: false, // 打赏按钮是否显示（在ios里不显示，付费主题不显示）
      canReward: false, // 是否开启打赏权限
      rewardStatus: false, // 是否已有打赏数据
      likedStatus: false, // 是否已有点赞数据
      commentStatus: {}, // 回复状态
      commentReply: false, // 发布的是否是回复的回复
      commentAnser: false, // 发布是否是回答问题
      emojiShow: false, // 表情组件显示状态
      // uploaderShow: false, //图片上传组件显示状态
      publishClickStatus: true, // 发布按钮点击状态
      focusVal: true, // 默认输入框获取焦点状态
      header: {},
      formData: {}, // 图片请求data
      commentId: '', // 评论id
      isAnonymous: '0', // 支付时是否显示头像，默认不显示
      payTypeText: '',
      payTypeVal: 0, // 点击的支付类型， 0主题支付  1主题打赏 2围观支付

      payNum: [
        {
          name: '￥1',
          pay: 1.0,
        },
        {
          name: '￥2',
          pay: 2.0,
        },
        {
          name: '￥5',
          pay: 5.0,
        },
        {
          name: '￥10',
          pay: 10.0,
        },
        {
          name: '￥20',
          pay: 20.0,
        },
        {
          name: '￥50',
          pay: 50.0,
        },
        {
          name: '￥88',
          pay: 88.0,
        },
        {
          name: '￥128',
          pay: 128.0,
        },
        {
          name: this.i18n.t('discuzq.post.customize'),
          pay: '0',
        },
      ], // 打赏金额数组列表
      payNumCheck: [
        {
          name: '',
          pay: '',
        },
      ],
      price: 0.0, // 需要支付的金额
      inputPrice: 0, // 自定义金额输入框的值
      maxLength: 7, //输入框最大长度
      payShowStatus: true, // 是否显示支付
      pwdVal: '', // 支付密码
      orderSn: '', // 订单编号
      payStatus: false, // 订单支付状态
      coverLoading: false, // loading显示状态
      payTypeData: [
        {
          name: '微信支付',
          icon: 'icon-wxPay',
          color: '#09bb07',
          value: '0',
        },
        {
          name: '钱包支付',
          icon: 'icon-walletPay',
          color: '#1878f3',
          value: '1',
        },
      ], // 支付方式
      currentReplyPost: {},
      contentnomoreVal: '',
      url: '',
      customAmountStatus: false, // 自定义价格弹框初始化状态
      windowHeight: '', // 设备高度
      system: '', // 设备系统
      detectionmodel: '', // 站点模式
      paymentmodel: false, // 是否付费
      loaded: false,
      loadingStatus: true,
      isWeixin: false,
      isPhone: false,
      qrcodeShow: false, // 二维码弹框
      codeUrl: '', // 二维码支付url，base64
      browser: 0, // 0为小程序，1为除小程序之外的设备
      wxRes: '',
      contentVal: '', // 这是分享需要传的标题
      shareLogo: '', // 这是分享需要传的图片
      desc: '', // 这是分享需要传的描述
      rewardedUsers: [],
      likedUsers: [],
      sortSeleShow: false, // 排序菜单状态
      sortSelectList: [
        { text: this.i18n.t('topic.sortTimeSequence'), type: '0', canOpera: true },
        { text: this.i18n.t('topic.sortTimeReverse'), type: '1', canOpera: true },
      ], // 评论排序菜单
      sortVal: 'createdAt', // 排序值
      refreshVal: true, // 是否刷新
      deleteId: '', // 删除时的Id（包括主题id，评论Id，和图片id）
      deleteType: '', // 删除时的类型，3为主题评论删除，4为主题删除
      deletePostType: '', // 删除评论时传给请求接口的类型
      deletePostCanStatus: '', // 是否可以删除该条内容
      deletePostIsStatus: '', // 删除时的状态
      deletePost: '', // 删除时的整个post数据
      deleteIndex: '', // 删除图片时的Index
      deleteTip: '确定删除吗？', // 删除提示
      wechatTip: this.i18n.t('discuzq.wechatBind'), // 微信绑定提示
      deleteImgId: '', // 删除时图片Id
      followStatus: '', // 当前关注状态
      beRewarded: false,
      curUrl: '', // 当前页面的路由
      bottom: '',
      moreData: [
        // 更多操作
        {
          text: this.i18n.t('topic.edit'), //~编辑
          icon: 'icon-bianji',
          name: 'edit',
          type: '0',
          canOpera: true,
        },
        {
          text: this.i18n.t('topic.delete'), //~删除
          icon: 'icon-shanchu',
          name: 'delete',
          type: '4',
          canOpera: true,
        },
        {
          text: this.i18n.t('topic.essence'), //~精华
          icon: 'icon-jinghua',
          name: 'essence',
          type: '2',
          canOpera: true,
        },
        {
          text: this.i18n.t('topic.sticky'), //~置顶
          icon: 'icon-zhiding',
          name: 'sticky',
          type: '3',
          canOpera: true,
        },
        {
          text: this.i18n.t('topic.collection'), //~收藏
          icon: 'icon-collection',
          name: 'collection',
          type: '5',
          canOpera: true,
        },
        {
          text: this.i18n.t('topic.share'), //~分享
          icon: 'icon-share',
          name: 'share',
          type: '6',
          canOpera: true,
        },
        {
          text: this.i18n.t('core.generatePoster'), //~生成海报
          icon: 'icon-poster',
          name: 'poster',
          type: '7',
          canOpera: true,
        },
        {
          text: this.i18n.t('core.wxShare'), //微信分享
          icon: 'icon-wx-friends',
          name: 'wxFriends',
          type: '8',
          canOpera: true,
        },
        {
          text: this.i18n.t('report.reportTitle'), //~举报
          icon: 'icon-jubao',
          name: 'report',
          type: '9',
          canOpera: true,
        },
      ],
      moreDataLength: 0,
      conversationId: '', // 话题id
      attachmentFileList: [], // 附件列表
      refreshStatus: true, // 是否刷新
      threadIsPaidCover: false, // 付费主题显示遮盖层
      token: '', // token
      postGoodsStatus: false,
      themeContent: '',
      shareAnonymous: false,
    };
  },
  onUnload() {
    //页面卸载
    this.$store.dispatch('forum/setError', { loading: false });
    this.posts = [];
    this.splitLists = [];
    uni.$off('logind');
    if (!!this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  onHide() {
    if (!!this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  beforeDestroy() {
    if (!!this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  computed: {
    ...mapState({
      getAtMemberData: state => state.atMember.atMemberData,
    }),
    thread() {
      let thread = cloneDeep(this.$store.getters['session/get']('thread'));
      console.log(thread, 'threadDa');
      // 添加
      if (!!thread && !!thread.firstPost) {
        this.themeContent = modifyPostContentHtml(thread.firstPost.contentHtml);
      }
      if (!thread) {
        return {};
      }
      // 添加
      // 只保留一个用户组显示
      let hasFirst = false;
      if (thread.author && thread.author.groups && thread.author.groups.length > 0) {
        thread.author.groups = thread.author.groups.filter(group => {
          if (group.isDisplay === true && !hasFirst) {
            hasFirst = true;
            return true;
          }
        });
      }
      if (thread.rewardedUsers) {
        this.rewardedUsers = thread.rewardedUsers;
      }
      if (thread.likedUsers) {
        this.likedUsers = thread.likedUsers
      }
      if (thread.images && thread.images.length > 0) {
        thread.images = thread.images.filter(item => {
          if (thread.firstPost.contentAttachIds.indexOf(String(item.id)) !== -1) {
            return false;
          }
          return true;
        });
      }
      if (thread.attachments && thread.attachments.length > 0) {
        thread.attachments = thread.attachments.filter(item => {
          if (thread.firstPost.contentAttachIds.indexOf(String(item.id)) !== -1) {
            return false;
          }
          return true;
        });
      }
      return thread;
    },
    // 语言包
    // topic详情页语言包
    t() {
      return this.i18n.t('topic');
    },
    // pay支付语言包
    p() {
      return this.i18n.t('pay');
    },
    // core公共变量语言包
    c() {
      return this.i18n.t('core');
    },
    status() {
      return status.status;
    },
    themeColor() {
      return this.theme === this.$u.light() ? '#333' : '#fff'; //  用于图标色
    },
    currentLoginId() {
      const userId = this.$store.getters['session/get']('userId');
      return parseInt(userId, 10);
    },
    // 还可输入的字数
    restWord() {
      const restWord = 5000 - this.textAreaValue.length
      return restWord > 0 ? restWord : 0
    },
    restTextAreaValue() {
      const restWord = 49999 - this.textAreaValue.length
      return restWord > 0 ? restWord : 0
    }
  },
  onLoad(option) {
    // index页面接收到的数据
    const res = uni.getSystemInfoSync();
    this.system = res.platform;
    if (this.forums && this.forums.set_site && this.forums.set_site.site_mode) {
      this.detectionmodel = this.forums.set_site.site_mode;
    }
    if (this.forums && this.forums.paycenter && this.forums.paycenter.wxpay_ios) {
      this.paymentmodel = this.forums.paycenter.wxpay_ios;
    }

    // #ifndef H5
    if (this.detectionmodel === 'public' && this.system === 'ios') {
      this.paidStatus = false;
      this.paidBtnStatus = false;
      this.rewardBtnStatus = false;
      this.rewardStatus = false;
    }

    if (this.detectionmodel === 'pay' && this.system === 'ios') {
      if (!this.user.paid) {
        this.$store.dispatch('forum/setError', { loading: false, code: 'dataerro' });
        return;
      }
    }
    // #endif
    this.token = uni.getStorageSync('access_token');
    uni.$on('logind', () => {
      this.loadThread();
      this.loadThreadPosts();
    });
    this.threadId = option.id;
    this.conversationId = option.topicid || '';
    this.loadThread();
    this.loadThreadPosts();
    this.curUrl = getCurUrl();
    this.rewardStatus = false;
    this.paidStatus = false;
    // #ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
    // #endif
    // #ifndef MP-WEIXIN
    this.isWeixin = appCommonH.isWeixin().isWeixin; // 这是微信网页
    this.isPhone = appCommonH.isWeixin().isPhone; // 这是h5
    this.browser = 1;
    // #endif
    // 评论详情页新增一条回复，内容详情页给当前评论新增一条回复
    this.$u.event.$on('addComment', data => {
      // 外层循环
      (this.splitLists || []).forEach(posts => {
        // 内层循环
        (posts || []).forEach(comment => {
          if (String(comment.id) === String(data.commentId)) {
            comment.replyCount++
            if (comment.lastThreeComments.length >= 3) {
              comment.lastThreeComments.pop();
            }
            if (data.data) {
              comment.lastThreeComments.unshift(data.data);
            }
          }
        });
      });
    });
    
    // 删除评论的回复后清除当前列表评论的这条回复
    this.$u.event.$on('deleteComment', data => {
      // 外层循环
      (this.splitLists || []).forEach(posts => {
        // 内层循环
        (posts || []).forEach(comment => {
          if (String(comment.id) === String(data.commentId)) {
            comment.replyCount--
            comment.lastThreeComments = [];
            const lastThreeComments = data?.data?._jv?.json?.data?.relationships?.lastThreeComments?.data || []
            if (lastThreeComments && lastThreeComments.length) {
              lastThreeComments.forEach(item => {
                comment.lastThreeComments.push(
                  this.$store.getters['jv/get'](`${item.type}/${item.id}`),
                );
              });
            }
        }
      });
    });
    });

    this.url = DISCUZ_REQUEST_HOST;
    const token = uni.getStorageSync('access_token');

    this.header = {
      authorization: `Bearer ${token}`,
    };
    this.formData = {
      type: 1, // 上传图片类型 1:图片 5: 问答图片
    };

    // 编辑发帖回来后更新信息
    this.$u.event.$on('refreshFiles', () => {
      this.loadThread();
    });
  },
  created() {
    // 数据预加载相关，不参与界面渲染，无需放入data
    this.preThreadsPostsData = null;
    this.preThreadsPostsLoading = false;
  },
  mounted() {
    this.getUserInfo();
    this.getForumsInfo();
  },
  // 下拉刷新
  onPullDownRefresh() {
    const _this = this;
    _this.posts = [];
    _this.splitLists = [];
    _this.pageNum = 1;
    this.preThreadsPostsData = null; // 重置预加载数据
    _this.attachmentFileList = [];
    setTimeout(function() {
      isOnPaidAttachment = true;
      _this.loadThread();
      _this.loadThreadPosts();
      uni.stopPullDownRefresh();
    }, 1000);
  },
  // 上拉加载
  onReachBottom() {
    if (this.loadingType !== 'more') {
      return;
    }
    this.pageNum += 1;
    this.loadThreadPosts();
  },
  // 监听页面滚动，参数为Object
  onPageScroll(event) {
    // this.scrollTop = event.scrollTop;
    this.preLoadThreadPosts()
  },
  // 唤起小程序原声分享
  onShareAppMessage(res) {
    // 来自页面内分享按钮
    if (res.from === 'button') {
      const threadShare = this.$store.getters['jv/get'](`/threads/${this.threadId}`);
      if (parseFloat(this.thread.thread.price) === 0){
        return {  
          title: threadShare.type === 1 ? this.thread.thread.title : this.thread.firstPost.content,
        }
      } else {
        if (this.thread.thread.isAnonymous) {
          return {
            title: '......',
            imageUrl: '/static/share.png',
          }
        } else {
          return {
            title: '......',
            imageUrl: '/static/priceShare.png',
          }
        }
      }
    } else {
      if (this.thread.thread.isAnonymous && parseFloat(this.thread.thread.price) === 0) {
        this.shareAnonymous = true;
      }
      if (parseFloat(this.thread.thread.price) === 0){
        const threadShare = this.$store.getters['jv/get'](`/threads/${this.threadId}`);
        return {  
          title: threadShare.type === 1 ? this.thread.thread.title : this.thread.firstPost.content,
        }
      } else {
        if (this.thread.thread.isAnonymous) {
          return {
            title: '......',
            imageUrl: '/static/share.png',
          }
        } else {
          return {
            title: '......',
            imageUrl: '/static/priceShare.png',
          }
        }
      }
    }
  },
  // 分享到朋友圈
  onShareTimeline() {
    const title = !!this.thread ? (this.thread.thread.title || this.thread.firstPost.content) : '';
    return {
      title: title,
      query: `id=${this.threadId}`,
      imageUrl: this.shareLogo,
    };
  },
  onShow() {
    this.shareAnonymous = false;
    const res = uni.getSystemInfoSync();
    this.system = res.platform;
    if (this.forums && this.forums.set_site && this.forums.set_site.site_mode) {
      this.detectionmodel = this.forums.set_site.site_mode;
    }
    if (this.forums && this.forums.paycenter && this.forums.paycenter.wxpay_ios) {
      this.paymentmodel = this.forums.paycenter.wxpay_ios;
    }
    if (this.forums && this.forums.set_site && this.forums.set_site.site_can_reward) {
      this.canReward = this.forums.set_site.site_can_reward === 1;
    }
    // #ifndef H5
    if (this.detectionmodel === 'public' && this.system === 'ios') {
      this.paidStatus = false;
      this.paidBtnStatus = false;
      this.rewardBtnStatus = false;
      this.rewardStatus = false;
    }
    if (this.detectionmodel === 'pay' && this.system === 'ios') {
      if (!this.user.paid) {
        this.$store.dispatch('forum/setError', { loading: false, code: 'dataerro' });
        return;
      }
    }
    // #endif
    let atMemberList = '';
    this.getAtMemberData.map(item => {
      atMemberList += `@${item.username} `;
      return atMemberList;
    });
    this.textAreaValue = `${this.textAreaValue.slice(0, this.cursor) +
      atMemberList +
      this.textAreaValue.slice(this.cursor)}`;
    this.setAtMember([]);
  },
  methods: {
    ...mapMutations({
      setAtMember: 'atMember/SET_ATMEMBER',
      setCategoryId: 'session/SET_CATEGORYID',
      setCategoryIndex: 'session/SET_CATEGORYINDEX',
      setFooterIndex: 'footerTab/SET_FOOTERINDEX',
    }),
    touchStop() {
      return;
    },
    shareFun() {
      this.shareAnonymous = false;
    },
    // 获取用户信息
    getUserInfo() {
      const userId = this.$store.getters['session/get']('userId');
      const params = {
        include: ''
      };
      if ( userId && userId > 0 ) {
        this.$store.dispatch('jv/get', [`users/${userId}`, { params }]).then(res => {
          if (res && res._jv && res._jv.id) {
            this.userInfo = res;
            // console.log('用户信息', this.userInfo);
          }
        });
      } 
    },
    // 获取站点信息
    getForumsInfo() {
      const params = {
        include: ''
      };
      this.$store.dispatch('jv/get', [`forum`, { params }]).then(res => {
        if (res && res._jv && res._jv.id) {
          this.forumsInfo = res;
          // console.log('站点信息', this.forumsInfo);
        }
      });
    },
    // 判断是否需实名制
    isPublishNeedRealName() {
      if (!this.forumsInfo.other.publish_need_real_name) {
        return true;
      }
      if (this.forumsInfo.other.publish_need_real_name) {
        if (!this.userInfo.isReal) {
          this.$refs.toast.show({ message: '请先实名认证' });
          return false;
        }
        if (this.userInfo.isReal) {
          return true;
        }
      }
    },
    // 判断是否需绑定手机
    isPublishNeedBindPhone() {
      if (!this.forumsInfo.other.publish_need_bind_phone) {
        return true;
      }
      if (this.forumsInfo.other.publish_need_bind_phone) {
        if (this.userInfo.mobile === "") {
          this.$refs.toast.show({ message: '请先绑定手机' });
          return false;
        }
        if (this.userInfo.mobile !== "") {
          return true;
        }
      }
    },
    //红包数据轮询方法
    initRedPacket(data) {
      this.redPacket.isRedPacket = data.isRedPacket;
      if (this.redPacket.isRedPacket === 0) return;
      // 是红包贴，调用一次轮询函数初始化红包信息
      this.autoUpdateRedpacketStatus();
      // 开启轮询
      this.timer = setInterval(() => {
        this.autoUpdateRedpacketStatus();
      }, 3000);
    },
    // 轮询红包状态
    async autoUpdateRedpacketStatus() {
      if (this.onUpdateRed) return;
      if (this.redPacket.remain_number === 0) return clearInterval(this.timer);

      this.onUpdateRed = true;
      await this.$store
        .dispatch('jv/get', [`redpacket/${this.threadId}`, { custom: { loading: false } }])
        .then(
          data => {
            this.redPacket = Object.assign({}, this.redPacket, data);
            this.onUpdateRed = false;
          },
          err => console.log(err),
        );
    },
    // 采纳事件
    submitadoption(amountMoney, postId, threadId) {
      let param = {
        _jv: {
          type: 'posts/reward',
        },
        thread_id: threadId,
        rewards: amountMoney,
        post_id: postId,
      };
      this.$store.dispatch('jv/post', param).then(res => {
        uni.redirectTo({
          url: `/topic/index?id=${this.threadId}`,
        });
      });
    },
    // 加载当前主题数据
    loadThread() {
      const params = {
        pid: Number(this.threadId)
      }
      newApi.readThreadDetail({params}).then(result =>{
        console.log(result, 'readThreadDetail');
        const data = result.Data;
        this.$store.dispatch('session/setThread', data);
        this.themeContent = modifyPostContentHtml(data.firstPost.contentHtml);
        // 获取阅读数
        const { viewCount = 0 } = data.thread;
        this.viewCount = viewCount;
        this.initRedPacket(data.thread);
        if (data.thread.isDeleted) {
          this.$store.dispatch('forum/setError', {
            code: 'thread_deleted',
            status: 500,
          });

          this.loaded = false;
        } else {
          if (data.postGoods) {
            this.postGoodsStatus = true;
          } else {
            this.postGoodsStatus = false;
          }
          if (data.thread.type === 1) {
            if (data.thread.attachmentPrice > 0) {
              this.threadIsPaidCover = false;
            } else {
              if ((data.thread.price > 0 && data.thread.isPaid) || data.thread.price <= 0) {
                this.threadIsPaidCover = false;
              } else if (data.thread.price > 0 && !data.thread.isPaid) {
                this.threadIsPaidCover = true;
              }
            }
          } else {
            this.threadIsPaidCover = false;
          }
          if (data.thread.attachmentPrice === '0.00' || data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === true && data.attachments) {
            data.attachments.forEach(attachment => {
              if (data.firstPost.contentAttachIds.indexOf(String(attachment.id)) === -1) {
                this.attachmentFileList.push(attachment);
              }
            });
          }
          // #ifndef MP-WEIXIN
          let titleText = '';
          if (data.thread.type === 1) {
            if (data.thread.title.length > 40) {
              titleText = data.thread.title.slice(0, 30) + '... - ' + this.forums.set_site.site_name;
            } else {
              titleText = data.thread.title + ' - ' + this.forums.set_site.site_name;
            }
          } else {
            if (data.firstPost.content) {
              if (data.firstPost.content.length > 20) {
                titleText =
                  data.firstPost.content.slice(0, 20) +
                  '... - ' +
                  this.forums.set_site.site_name;
              } else {
                titleText = data.firstPost.content + ' - ' + this.forums.set_site.site_name;
              }
            } else {
              titleText = this.t.topicPageTitle + ' - ' + this.forums.set_site.site_name;
            }
          }
          uni.setNavigationBarTitle({
            title: titleText,
          });
          // #endif
          console.log(data.question, 'data.question')
          if (data.question) {
            this.currentPostData = data;
            this.platformDate = (
              data.question.price *
              (this.forums.set_site.site_master_scale / 10)
            ).toFixed(2);
            this.onLookformDate = (
              data.question.onlookerUnitPrice *
              (this.forums.set_site.site_master_scale / 10)
            ).toFixed(2);
            this.beAskDate = (data.question.price - this.platformDate).toFixed(2);
            this.beAskBeDate = (
              (data.question.onlookerUnitPrice - this.onLookformDate) /
              2
            ).toFixed(2);
            // 问答免费
            if (data.question.price === '0.00') {
              // 问答免费 当前登录ID == 被提问ID && 未回答
              if (this.user.id === data.question.beUserId && data.question.isAnswer === 0) {
                this.beAsk = true;
                // 已回答
              } else if (this.user.id === data.author.id && data.question.isAnswer === 1) {
                this.beAsk = false;
                this.payment = true;
                this.answerPay = false;
                // 免费允许围观
              } else if (
                this.user.id === data.question.beUserId &&
                data.question.isAnswer === 1
              ) {
                this.beAsk = false;
                this.payment = true;
                this.answerPay = false;
              } else if (
                this.user.id !== data.question.beUserId &&
                this.user.id !== data.author.id &&
                data.question.isAnswer === 1 &&
                data.question.isOnlooker === true
                // data.onlookerState === true
              ) {
                this.beAsk = false;
                this.payment = false;
                this.answerPay = true;
                // 允许围观可查看答案
              } else if (
                this.user.id !== data.question.beUserId &&
                this.user.id !== data.author.id &&
                data.question.isAnswer === 1 &&
                data.question.isOnlooker === false
                // data.onlookerState === false
              ) {
                this.beAsk = false;
                this.payment = false;
                this.answerPay = true;
                // 免费不设置围观也可查看答案
              }
            } else if (data.question.price > '0.00') {
              if (this.user.id === data.question.beUserId && data.question.isAnswer === 0) {
                this.beAsk = true;
              } else if (
                this.user.id === data.question.beUserId &&
                data.question.isAnswer === 1
              ) {
                this.beAsk = false;
                this.answerPay = true;
                // 显示答案
              } else if (this.user.id === data.author.id && data.question.isAnswer === 1) {
                this.beAsk = false;
                this.answerPay = true;
              } else if (
                this.user.id === data.question.beUserId &&
                data.question.isAnswer === 1 &&
                data.question.onlookerNumber > 0
              ) {
                this.answerPay = true;
                this.beAsk = false;
              } else if (
                this.user.id === data.author.id &&
                data.question.isAnswer === 1 &&
                data.question.onlookerNumber > 0
              ) {
                this.answerPay = true;
                this.beAsk = false;
              } else if (
                this.user.id !== data.question.beUserId &&
                this.user.id !== data.author.id &&
                data.question.isAnswer === 1 &&
                data.question.isOnlooker === false &&
                // this.forums.other.can_be_onlooker === true &&
                data.onlookerState === true
              ) {
                this.answerPay = true;
                // 付费允许围观付费即可查看答案
              } else if (
                this.user.id !== data.author.id &&
                data.question.isAnswer === 1 &&
                data.question.isOnlooker === true &&
                // this.forums.other.can_be_onlooker === true &&
                data.onlookerState === false
              ) {
                this.answerPay = true;
                // 付费不允许围观
              } else if (
                this.user.id !== data.author.id &&
                this.user.id !== data.question.beUserId &&
                data.question.isOnlooker === true &&
                data.question.isAnswer === 1 &&
                // this.forums.other.can_be_onlooker === true &&
                data.onlookerState === true
              ) {
                this.answerPay = true;
                // 付费允许围观
              }
            }
            this.questionId = data.question.id;
          }
          /*
          * beRewarded 好像在页面中未使用
           */
          // if (data.author.groups && data.author.groups.length > 0 && data.author.groups[0].permissionWithoutCategories) {
          //   data.author.groups[0].permissionWithoutCategories.forEach((value, index) => {
          //     if (value.permission === 'createThreadPaid') {
          //       this.beRewarded = true;
          //       return;
          //     }
          //   });
          // }
          // if (
          //   data.author.groups &&
          //   data.author.groups.length > 0 &&
          //   data.author.groups[0].id === '1'
          // ) {
          //   this.beRewarded = true;
          // }
          this.loaded = true;
          this.loadingStatus = false;
          // 分享数据
          switch (data.thread.type) {
            case 0:
              // 文字帖
              this.contentVal = data.firstPost.summaryText;
              this.desc = data.firstPost.summaryText;
              this.shareLogo = '';
              break;
            case 1:
              // 长文帖
              this.contentVal = data.thread.title;
              if (data.thread.price > 0) {
                this.desc = data.thread.title;
                this.shareLogo = '';
              } else {
                this.desc = data.firstPost.summaryText;
                this.shareLogo =
                  data.images.length > 0 ? data.images[0].thumbUrl : '';
              }
              break;
            case 2:
              // 视频帖
              this.contentVal = data.firstPost.summaryText;
              this.desc = data.firstPost.summaryText;
              this.shareLogo = data.threadVideo.coverUrl;
              break;
            case 3:
              // 图片帖
              this.contentVal = data.firstPost.summaryText;
              this.desc = data.firstPost.summaryText;
              this.shareLogo =
                data.price == 0 && data.images.length > 0
                  ? data.images[0].thumbUrl
                  : '';
              break;
            case 4:
              // 语音帖
              this.contentVal = data.firstPost.summaryText;
              this.desc = data.firstPost.summaryText;
              this.shareLogo = '';
              break;
            case 5:
              // 问答帖
              this.contentVal = data.firstPost.summaryText;
              this.desc = data.firstPost.summaryText;
              this.shareLogo =
                data.images.length > 0 ? data.images[0].thumbUrl : '';
              break;
            case 6:
              // 商品帖
              this.contentVal = data.postGoods.title;
              this.desc = data.firstPost.summaryText;
              this.shareLogo = data.postGoods.imagePath;
              break;
            default:
          }
        }
        // #ifdef H5
        this.wxShare({
          title: this.contentVal,
          desc: this.desc,
          logo: this.shareLogo,
        });
        // #endif
        // 追加管理菜单权限字段
        /*
          * 解决小程序中点击对应实际存在帖子的消息，有时候也会提示“此页面已被删除”（或者是白屏）
          * 原因：页面加载时this.thread.firstPost未获取到
          * 方法：重新加载/topic/index页面
          */
        if (this.thread.firstPost) {
          this.selectList[0].canOpera = this.thread.firstPost.canEdit;
        } else {
          // uni.redirectTo({
          //   url: `/topic/index?id=${this.threadId}`,
          // });
        }
        this.selectList[1].canOpera = this.thread.thread.canEssence;
        this.selectList[2].canOpera = this.thread.thread.canSticky;
        this.selectList[3].canOpera = this.thread.thread.canHide;

        // this.selectList[0].isStatus = true;
        this.selectList[1].isStatus = this.thread.thread.isEssence;
        this.selectList[2].isStatus = this.thread.thread.isSticky;
        this.selectList[3].isStatus = false;

        if (data.isEssence) {
          // 如果初始化状态为true
          this.selectList[1].text = this.t.cancelEssence;
        }
        if (data.isSticky) {
          // 如果初始化状态为true

          this.selectList[2].text = this.t.cancelSticky;
        }
        // 修改更多弹框权限
        // #ifdef MP-WEIXIN
        this.moreData[5].canOpera = false;
        this.moreData[6].canOpera = true;
        this.moreData[7].canOpera = true;
        // #endif

        // #ifdef H5
        this.moreData[5].canOpera = true;
        this.moreData[6].canOpera = false;
        this.moreData[7].canOpera = false;
        // #endif
        // 追加更多操作权限字段
        if (data.type === 5) {
          this.moreData[0].canOpera = false;
        } else {
          this.moreData[0].canOpera = this.thread.firstPost.canEdit;
        }
        this.moreData[2].canOpera = this.thread.thread.canEssence;
        this.moreData[3].canOpera = this.thread.thread.canSticky;
        this.moreData[1].canOpera = this.thread.thread.canHide;
        this.moreData[2].isStatus = this.thread.thread.isEssence;
        this.moreData[3].isStatus = this.thread.thread.isSticky;
        this.moreData[1].isStatus = false;
        this.moreData.forEach(item => {
          if (item.canOpera) {
            this.moreDataLength += 1;
          }
        });
        if (data.isFavorite) {
          this.moreData[4].text = this.t.collectionAlready;
          this.moreData[4].icon = 'icon-collectioned';
        }
        if (data.thread.isEssence) {
          // 如果初始化状态为true
          this.moreData[2].text = this.t.cancelEssence;
          this.moreData[2].icon = 'icon-quxiaojinghua';
        }
        if (data.thread.isSticky) {
          // 如果初始化状态为true
          this.moreData[3].text = this.t.cancelSticky;
          this.moreData[3].icon = 'icon-quxiaozhiding';
        }
        this.isLiked = data.firstPost.isLiked;
        if (data.thread.type === 5) {
          this.rewardStatus = false;
          this.paidStatus = false;
          return;
        } else if (!this.forums.paycenter.wxpay_close) {
          // 如果关闭了微信支付
          this.rewardStatus = false;
          this.paidStatus = false;
        } else if (this.forums.paycenter.wxpay_close) {
          const res = uni.getSystemInfoSync();
          this.system = res.platform;
          // 如果开启了微信支付
          if (!data.thread.paid || data.paidUsers.length > 0) {
            // #ifndef H5
            if (this.system === 'ios') {
              if (this.paymentmodel === false) {
                this.paidStatus = false;
                this.paidBtnStatus = false;
              } else {
                this.paidStatus = true;
                this.paidBtnStatus = true;
              }
            } else {
              this.paidStatus = true;
              this.paidBtnStatus = true;
            }
            // #endif
            // #ifdef H5
            this.paidStatus = true;
            if (data.thread.paid === true) {
              this.paidBtnStatus = false;
            } else {
              this.paidBtnStatus = true;
            }
            // #endif
          }
          if (data.thread.type === 3) {
            this.payThreadTypeText = this.t.pay + data.thread.price + this.t.paymentViewPicture;
          } else if (data.thread.type === 2) {
            this.payThreadTypeText = this.t.pay + data.thread.price + this.t.paymentViewVideo;
          } else if (data.thread.type === 1) {
            if (data.thread.attachmentPrice > 0) {
              this.payThreadTypeText =
                this.t.pay + data.thread.attachmentPrice + this.t.checkTheAttachment;
            } else {
              this.payThreadTypeText =
                this.t.pay + data.thread.price + this.t.paymentViewRemainingContent;
            }
            // this.payThreadTypeText = this.t.pay + data.price + this.t.paymentViewRemainingContent;
          } else if (data.thread.type === 5) {
            this.payThreadTypeText = this.t.pay + data.thread.price + this.t.paymentViewRemainingContent;
          } else if (data.thread.type === 4) {
            this.payThreadTypeText = this.t.pay + data.thread.price + this.t.paymentViewAudio;
          }

          if (data.thread.price <= 0) {
            // #ifndef H5
            if (this.system === 'ios') {
              if (data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === false) {
                if (this.paymentmodel === false) {
                  this.paidStatus = false;
                  this.rewardStatus = false;
                } else if (this.paymentmodel === true) {
                  this.paidStatus = true;
                  this.rewardStatus = false;
                }
              } else if (data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === true) {
                if (this.paymentmodel === false) {
                  this.paidStatus = false;
                  this.rewardStatus = false;
                } else if (this.paymentmodel === true) {
                  this.paidStatus = true;
                  this.paidBtnStatus = false;
                  this.rewardStatus = false;
                }
              } else {
                if (this.paymentmodel === false) {
                  this.paidStatus = false;
                  this.rewardStatus = false;
                } else if (this.paymentmodel === true) {
                  if (data.thread.canBeReward) {
                    this.paidStatus = false;
                    this.rewardStatus = true;
                    this.rewardBtnStatus = true;
                  } else {
                    this.rewardStatus = false;
                    this.rewardBtnStatus = false;
                  }
                }
              }
            } else {
              if (data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === false) {
                this.paidStatus = true;
                this.paidBtnStatus = true;
                this.rewardStatus = false;
                this.rewardBtnStatus = false;
              } else if (data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === true) {
                this.paidStatus = true;
                this.paidBtnStatus = false;
                this.rewardStatus = false;
                this.rewardBtnStatus = false;
              } else {
                if (data.thread.canBeReward) {
                  this.paidStatus = false;
                  this.rewardStatus = true;
                  this.rewardBtnStatus = true;
                } else {
                  this.paidStatus = false;
                  this.rewardStatus = false;
                  this.rewardBtnStatus = false;
                }
              }
            }
            // #endif
            // #ifdef H5
            if (data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === false) {
              this.paidStatus = true;
              this.paidBtnStatus = true;
              this.rewardStatus = false;
              this.rewardBtnStatus = false;
            } else if (data.thread.attachmentPrice > 0 && data.thread.isPaidAttachment === true) {
              this.paidStatus = true;
              this.paidBtnStatus = false;
              this.rewardStatus = false;
              this.rewardBtnStatus = false;
            } else {
              if (data.thread.canBeReward) {
                this.paidStatus = false;
                this.rewardStatus = true;
                this.rewardBtnStatus = true;
              } else {
                this.paidStatus = false;
                this.rewardStatus = false;
                this.rewardBtnStatus = false;
              }
            }
            // #endif
          } else {
            // #ifndef H5
            if (this.system === 'ios') {
              if (this.paymentmodel === false) {
                this.paidStatus = false;
                this.paidBtnStatus = false;
              } else if (this.paymentmodel === true && data.thread.paid === false) {
                this.paidStatus = true;
                this.paidBtnStatus = true;
              } else if (this.paymentmodel === true && data.thread.paid === true) {
                this.paidStatus = true;
                this.paidBtnStatus = false;
              }
            } else {
              if (data.thread.paid === true) {
                this.paidBtnStatus = false;
              } else {
                this.paidStatus = true;
                this.paidBtnStatus = true;
              }
            }
            // #endif
            this.rewardStatus = false;
            this.rewardBtnStatus = false;
            // #ifdef H5
            if (data.thread.paid === true) {
              this.paidBtnStatus = false;
            } else {
              this.paidBtnStatus = true;
            }
            // #endif
          }
        } else {
          this.rewardStatus = false;
          this.paidBtnStatus = false;
        }

        if (data.likedUsers.length < 1) {
          this.likedStatus = false;
        } else {
          this.likedStatus = true;
        }
      })
      .catch(err => {
        this.loaded = false;
        this.loadingStatus = false;
        if (err.statusCode === 404) {
          this.$store.dispatch('forum/setError', {
            code: 'type_404',
            status: 500,
          });
        }
      });
    },
    // post操作调用接口（包括type 1主题点赞，3删除回复，4回复点赞）
    postOpera(id, type, canStatus, isStatus, post) {
      if (type === '1' && !canStatus) {
        // 没有主题点赞权限
        this.$refs.toast.show({ message: this.t.noThreadLikePermission });
        return;
      }
      if (type === '4' && !canStatus) {
        // 没有评论点赞权限
        this.$refs.toast.show({ message: this.t.noReplyLikePermission });
        return;
      }
      const jvObj = {
        type: 'posts',
        id,
      };
      let params = {};
      if (type === '1') {
        params = {
          _jv: jvObj,
          isLiked: !isStatus,
        };
      } else if (type === '3') {
        params = {
          _jv: jvObj,
          isDeleted: !isStatus,
        };
      } else if (type === '4') {
        params = {
          _jv: jvObj,
          isLiked: !isStatus,
        };
      }
      this.$store
        .dispatch('jv/patch', params)
        .then(data => {
          if (type === '1') {
            // 主题点赞
            this._updateLikedUsers(data.isLiked);
          } else if (type === '2') {
            if (data.isDeleted) {
              uni.navigateBack({
                delta: 1,
              });

              // uni.navigateBack({
              //   url: `/pages/home/index`,
              // });
            } else {
              // 主题删除失败
            }
          } else if (type === '3') {
            const postArr = post;
            postArr.isDeleted = data.isDeleted;
            post = postArr;
            this.thread.thread.postCount -= 1;
          } else if (type === '4') {
            const postArr = post;
            postArr.isLiked = data.isLiked;
            postArr.likeCount = data.likeCount;
            post = postArr;
            this.loadThreadPosts();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 主题其他操作调用接口（包括 type 1主题收藏，2主题加精，3主题置顶，else删除主题）
    threadOpera(id, canStatus, isStatus, type) {
      const jvObj = {
        type: 'threads',
        id,
      };
      let params = {};
      if (type === '1') {
        // 主题收藏
        params = {
          _jv: jvObj,
          isFavorite: !isStatus,
        };
      } else if (type === '2') {
        // 主题加精
        params = {
          _jv: jvObj,
          isEssence: !isStatus,
        };
      } else if (type === '3') {
        // 主题置顶
        params = {
          _jv: jvObj,
          isSticky: !isStatus,
        };
      } else {
        // 主题删除
        params = {
          _jv: jvObj,
          isDeleted: !isStatus,
        };
      }
      this.$store
        .dispatch('jv/patch', params)
        .then(data => {
          if (type === '1') {
            // 收藏
            this.thread.isFavorite = data.isFavorite;
            if (data.isFavorite) {
              this.moreData[4].text = this.t.collectionAlready;
              this.moreData[4].icon = 'icon-collectioned';
            } else {
              this.moreData[4].text = this.t.collection;
              this.moreData[4].icon = 'icon-collection';
            }
          } else if (type === '2') {
            // 这是精华操作
            this.selectList[1].isStatus = data.isEssence;
            this.moreData[2].isStatus = data.isEssence;
            console.log(data.isEssence);
            if (data.isEssence) {
              this.selectList[1].text = this.t.cancelEssence;
              this.moreData[2].text = this.t.cancelEssence;
              this.moreData[2].icon = 'icon-quxiaojinghua';
              this.thread.thread.isEssence = true;
            } else {
              this.selectList[1].text = this.t.essence;
              this.moreData[2].text = this.t.essence;
              this.moreData[2].icon = 'icon-jinghua';
              this.thread.thread.isEssence = false;
            }
          } else if (type === '3') {
            this.selectList[2].isStatus = data.isSticky;
            this.moreData[3].isStatus = data.isSticky;
            if (data.isSticky) {
              this.selectList[2].text = this.t.cancelSticky;
              this.moreData[3].icon = 'icon-quxiaozhiding';
              this.moreData[3].text = this.t.cancelSticky;
              this.$refs.toast.show({ message: this.t.stickysuccess });
              // 详情页置顶,将首页列表中该帖子移除并添加到置顶列表中
              // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
              this.$u.event.$emit('stickyThread', data);
            } else {
              this.selectList[2].text = this.t.sticky;
              this.moreData[3].icon = 'icon-zhiding';
              this.moreData[3].text = this.t.sticky;
              this.$refs.toast.show({ message: this.t.cancelStickysuccess });
              // 详情页取消置顶,将首页置顶数据移除
              // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
              this.$u.event.$emit('refreshHome', data);
            }
          } else if (type === '4') {
            const _this = this;
            if (data.isDeleted) {
              // 删除成功，跳转到首页
              this.$refs.toast.show({ message: this.t.deleteSuccessAndJumpToBack });
              const pages = getCurrentPages();
              // const delta = pages.indexOf(pages[pages.length - 1]);
              // const delta = this.pagesUrl[this.pagesUrl.length - 2].route;
              const naviBack = setTimeout(() => {
                if (_this.conversationId) {
                  uni.redirectTo({
                    url: `/pages/topic/content?id=${_this.conversationId}`,
                  });
                } else {
                  if (pages.length <= 2) {
                    uni.redirectTo({
                      url: '/pages/home/index',
                    });
                  } else {
                    uni.navigateBack({
                      delta: 1,
                    });
                  }
                }
                _this.$store.dispatch('jv/get', `topics/${_this.conversationId}`).then(res => {
                  if (res) {
                    _this.conversationId = '';
                  }
                });
              }, 1000);
              // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
              this.$u.event.$emit('refreshHome', this.threadId, 'delete');
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 主题回复，评论的回复调用接口
    postComment() {
      if (this.textAreaValue.length < 1) {
        this.$refs.toast.show({ message: this.t.replyContentCannotBeEmpty });
        this.publishClickStatus = true;
        return false;
      }
      let params = {};
      if (this.commentReply) {
        params = {
          id: parseInt(this.threadId),
          content: this.textAreaValue,
          replyId: this.commentId,
          isComment: true,
        };
      } else {
        if (!this.commentAnser) {
          params = {
            id: parseInt(this.threadId),
            content: this.textAreaValue,
          };
        }
      }
      params.attachments = [];
      if (this.uploadFile) {
        this.uploadFile.forEach(item => {
          params.attachments.push({
            type: 'attachments',
            id: item.id,
          });
        });
      }
      apiRequest.createPosts({ data: params })
        .then(res => {
          if (res.Message === '操作太频繁了，请稍后再试') {
            this.$refs.commentPopup.close();
            this.publishClickStatus = true;
            this.textAreaValue = '';
            this.uploadFile = '';
            return;
          }
          this.$refs.commentPopup.close();
          this.commentReply = false;
          this.commentPopupStatus = false;
          this.publishClickStatus = true;
          if (res.Data.isApproved === 1) {
            if (!res.Data.isComment) {
              // 只保留一个用户组显示
              let hasFirst = false;
              res.Data.user.groups = res.Data.user.groups.filter(group => {
                if (group.isDisplay === true && !hasFirst) {
                  hasFirst = true;
                  return true;
                }
                return false;
              });
              this.posts.push(res.Data);
              this.thread.thread.postCount += 1;
            } else {
              /**
               * 原有逻辑是根据this.postIndex来判断，新的评论数据应该插入到数组的哪个位置。但是出现过二级评论错位的现象，注释原有逻辑后，表现正常。怀疑this.postIndex某些条件下会不准确
               * 现有逻辑，根据数据源中的_jv.id来判断，新的评论数据应该插入到数组的哪个位置。_jv.id具有唯一性。暂时没有发现评论错位的现象
               */
              for (let index = 0; index < this.posts.length; index++) {
                const element = this.posts[index];
                console.log(element, 'element');
                if (element.id === this.commentId) {
                  if (!element.lastThreeComments) {
                    element.lastThreeComments = [];
                  }
                  element.lastThreeComments.unshift(res.Data);
                  element.replyCount += 1;
                  console.log('element11',element);
                  break;
                }
              }
            }
          } else {
            this.$refs.toast.show({ message: '您发布的内容正在审核中哦' });
          }

          this.textAreaValue = '';
          this.uploadFile = '';

          this.loadThreadPosts();
        })
        .catch(err => {
          this.publishClickStatus = true;
          console.log(err);
        });
    },
    handleGroup(data) {
      let groups = [];
      if (data && data.length > 0) {
        groups = data.filter(item => item.isDisplay);
      }
      if (groups.length > 0) {
        return [groups[0]];
      }
      return [];
    },
    // 创建问答的回答
    postAnswer() {
      this.commentAnser = true;
      if (this.textAreaValue.length < 1) {
        this.$refs.toast.show({ message: this.t.TheContentOfTheAnswerCannotBeEmpty });
        this.publishClickStatus = true;
        return false;
      }
      const params = {
        content: this.textAreaValue,
        type: 5,
        _jv: {
          type: 'answer',
          relationships: {},
          links: {
            self: `questions/${this.questionId}/answer`,
          },
        },
      };
      params._jv.relationships.attachments = {
        data: [],
      };
      if (this.uploadFile) {
        this.uploadFile.forEach(item => {
          params._jv.relationships.attachments.data.push({
            type: 'attachments',
            id: item.id,
          });
        });
      }
      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.$refs.commentPopup.close();
          this.loadThread();
        })
        .catch(err => {
          if (err && err.data && err.data.errors) {
            if (err.data.errors[0].code === 'content_banned_show_words') {
              uni.showToast({
                icon: 'none',
                title: `${this.i18n.t(
                  'core.content_banned_show_words',
                )}[${err.data.errors[0].detail.join('、')}]`,
                duration: 2000,
              });
            }
          }
        });
    },

    // 预加载当前主题评论的数据
    preLoadThreadPosts() {
      if (this.preThreadsPostsData || this.preThreadsPostsLoading) {
        return;
      }
      this.preThreadsPostsLoading = true;

      const params = {
        page: this.pageNum + 1,
        perPage: this.pageSize,
        'filter[thread]': this.threadId,
        sort: this.sortVal,
      };
      newApi.readCommentList({ params })
      .then(result => {
        this.preThreadsPostsData = {
          [params.page]: result,
        };
      })
      .catch(()=>{
        this.preThreadsPostsData = null;
      })
      .finally(()=>{
        this.preThreadsPostsLoading = false
      });
    },

    // 加载当前主题评论的数据
    async loadThreadPosts() {
      console.log(this.preThreadsPostsData);

       const params = {
        page: this.pageNum,
        perPage: this.pageSize,
        'filter[thread]': this.threadId,
        sort: this.sortVal,
      };
      let result;
      try {
        if (this.preThreadsPostsData && this.preThreadsPostsData[this.pageNum]) {
          result = this.preThreadsPostsData[this.pageNum];
          this.preThreadsPostsData = null;
        } else {
          // 这是清空，是处理快速滚动特殊情况下，
          // preThreadsData有数据，但是页数不匹配的情况
          this.preThreadsPostsData = null;
          result = await newApi.readCommentList({ params });
      }

        console.log(result, 'readCommentList');
        let data = this.modifyPostCommentHtml(result.Data.pageData);
        // 过滤和精简数据
        const newData = [];
        data.forEach(item => {
          if (!item.isDeleted) {
            const {
              isDeleted,
              id,
              user: { id: userId, avatar, username, isReal, groups },
              canLike,
              isLiked,
              createdAt,
              isApproved,
              summary,
              lastThreeComments,
              likeCount,
              images,
              replyCount,
              canHide,
              rewards,
              redPacketAmount,
            } = item;
            // 只保留一个用户组显示
            // const firstGroup = groups.filter(group => group.isDisplay).slice(0, 1);
            const newPost = {
              isDeleted,
              id,
              user: { id:userId, avatar, username, isReal, groups },
              canLike,
              isLiked,
              createdAt,
              isApproved,
              summary,
              lastThreeComments,
              likeCount,
              images,
              replyCount,
              canHide,
              rewards,
              redPacketAmount,
            };

            newData.push(newPost);
          }
        });
        console.log(newData);
        this.posts.push(...newData);
        this.splitLists[this.pageNum - 1] = newData;
        this.loadingType = newData.length === this.pageSize ? 'more' : 'nomore';

        if (newData.length === 0) {
          this.contentnomoreVal = this.t.noComment;
        } else {
          this.contentnomoreVal = this.t.noMoreData;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 非小程序内微信支付
    onBridgeReady(data) {
      // const that = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: data.wechat_js.appId, // 公众号名称，由商户传入
          timeStamp: data.wechat_js.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.wechat_js.nonceStr, // 随机串
          package: data.wechat_js.package,
          signType: 'MD5', // 微信签名方式：
          paySign: data.wechat_js.paySign, // 微信签名
        },
        function(data) {
          // alert('支付唤醒');
          if (data.err_msg == 'get_brand_wcpay_request:ok') {
            //微信支付成功，进行支付成功处理
          } else if (data.err_msg == 'get_brand_wcpay_request:cancel') {
            // 取消支付
            clearInterval(payWechat);
            resolve;
          } else if (data.err_msg == 'get_brand_wcpay_request:fail') {
            // 支付失败
            clearInterval(payWechat);
            resolve;
          }
        },
      );
      payWechat = setInterval(() => {
        if (this.payStatus === 1) {
          clearInterval(payWechat);
          return;
        }
        this.getOrderStatus(this.orderSn);
      }, 3000);
    },
    // 创建订单
    creatOrder(amount, type, value, payType) {
      const params = {
        _jv: {
          type: 'orders',
        },
        type,
        thread_id: this.threadId,
        amount,
        is_anonymous: this.isAnonymous,
      };
      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.orderSn = res.order_sn;
          if (payType === 0) {
            // 微信支付
            if (this.browser == 0) {
              // 这是微信小程序内的支付
              this.orderPay(13, value, this.orderSn, payType, '0');
            } else {
              // 这是除微信小程序之外, this.isWeixin, this.isPhone
              if (this.isWeixin && this.isPhone) {
                // 这是微信浏览器
                this.orderPay(12, value, this.orderSn, payType, '1');
              } else if (this.isPhone) {
                this.orderPay(11, value, this.orderSn, payType, '2');
              } else {
                // 这是pc，没调接口之前
                this.orderPay(10, value, this.orderSn, payType, '3');
              }
            }
          } else if (payType === 1) {
            // 钱包支付
            this.orderPay(20, value, this.orderSn, payType);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 订单支付       broswerType: 0是小程序，1是微信浏览器，2是h5，3是pc
    orderPay(type, value, orderSn, payType, broswerType) {
      let params = {};
      if (payType === 0) {
        params = {
          _jv: {
            type: `trade/pay/order/${orderSn}`,
          },
          payment_type: type,
        };
      } else if (payType === 1) {
        params = {
          _jv: {
            type: `trade/pay/order/${orderSn}`,
          },
          payment_type: type,
          pay_password: value,
        };
      }

      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.wxRes = res;
          if (payType === 0) {
            if (broswerType === '0') {
              this.wechatPay(
                res.wechat_js.timeStamp,
                res.wechat_js.nonceStr,
                res.wechat_js.package,
                res.wechat_js.signType,
                res.wechat_js.paySign,
              );
            } else if (broswerType === '1') {
              if (typeof WeixinJSBridge === 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(res), false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(res));
                  document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(res));
                }
              } else {
                this.onBridgeReady(res);
              }
            } else if (broswerType === '2') {
              payPhone = setInterval(() => {
                if (this.payStatus === 1) {
                  clearInterval(payPhone);
                  return;
                }
                this.getOrderStatus(orderSn, broswerType);
              }, 3000);
              window.location.href = res.wechat_h5_link;
            } else if (broswerType === '3') {
              if (res) {
                this.codeUrl = res.wechat_qrcode;
                this.payShowStatus = false;
                this.$refs.codePopup.open();
                this.qrcodeShow = true;
                payWechat = setInterval(() => {
                  if (this.payStatus === 1) {
                    clearInterval(payWechat);
                    return;
                  }
                  this.getOrderStatus(this.orderSn, broswerType);
                  uni.hideLoading();
                }, 3000);
              }
            }
          } else if (payType === 1) {
            if (res.wallet_pay.result === 'success') {
              this.$store.dispatch('jv/get', [`users/${this.currentLoginId}`, {}]);
              if (this.payTypeVal === 0 || this.payTypeVal === 2 || this.payTypeVal === 3) {
                // 这是主题支付和附件支付，支付完成刷新详情页，重新请求数据
                if (this.thread.thread.attachmentPrice > 0) {
                  isOnPaidAttachment = false;
                }
                this.loadThread();
                this.$store.dispatch('jv/get', [
                  'forum',
                  {
                    params: {
                      include: 'users',
                    },
                  },
                ]);
              } else if (this.payTypeVal === 1) {
                // 这是主题打赏，打赏完成，给主题打赏列表新增一条数据
                this._updateRewardUsers();
              }
              this.payShowStatus = false;
              this.coverLoading = false;
            }
            this.coverLoading = false;
          }
        })
        .catch(err => {
          // 清空支付的密码
          console.log(err);
          this.$refs.payShow.clearPassword();
        });
    },
    // 查询订单支状 broswerType: 0是小程序，1是微信浏览器，2是h5，3是pc
    getOrderStatus(orderSn, broswerType) {
      this.$store
        .dispatch('jv/get', [`orders/${orderSn}`, { custom: { loading: false } }])
        .then(res => {
          this.payStatus = res.status;
          if (this.payStatus === 1) {
            this.payShowStatus = false;
            this.coverLoading = false;
            if (broswerType === '2') {
              // return false;
            } else if (broswerType === '3') {
              // 这是pc扫码支付完成
              this.$refs.codePopup.close();
              this.qrcodeShow = false;
              isOnPaidAttachment = false;
              this.loadThread();
              this.$store.dispatch('jv/get', [
                'forum',
                {
                  params: {
                    include: 'users',
                  },
                },
              ]);
            }

            if (this.payTypeVal === 0 || this.payTypeVal === 2 || this.payTypeVal === 3) {
              // 这是主题支付，支付完成刷新详情页，重新请求数据
              if (this.thread.thread.attachmentPrice > 0) {
                isOnPaidAttachment = false;
              }

              this.loadThread();
              this.$store.dispatch('jv/get', [
                'forum',
                {
                  params: {
                    include: 'users',
                  },
                },
              ]);
            } else if (this.payTypeVal === 1) {
              // 这是主题打赏，打赏完成，给主题打赏列表新增一条数据
              this._updateRewardUsers();
            }
            this.$refs.toast.show({ message: this.p.paySuccess });
          }
        })
        .catch(err => {
          console.log(err);
          this.coverLoading = false;
          this.$refs.toast.show({ message: this.p.payFail });
        });
    },

    wechatPay(timeStamp, nonceStr, packageVal, signType, paySign) {
      // 小程序支付。
      const _this = this;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp,
        nonceStr,
        package: packageVal,
        signType,
        paySign,
        success(res) {
          _this.coverLoading = true;
          payWechat = setInterval(() => {
            if (_this.payStatus === 1) {
              clearInterval(payWechat);
              return;
            }
            _this.getOrderStatus(_this.orderSn);
          }, 3000);
        },
        fail(err) {
          _this.payShowStatus = false;
          _this.coverLoading = false;
          _this.$refs.toast.show({ message: _this.p.payFail });
        },
      });
    },
    // 输入密码完成时
    onInput(val) {
      this.value = val;
      if (this.payTypeVal === 0) {
        // 这是主题支付
        this.creatOrder(this.thread.thread.price, 3, val, 1);
      } else if (this.payTypeVal === 1) {
        // 这是主题打赏
        this.creatOrder(this.price, 2, val, 1);
      } else if (this.payTypeVal === 2) {
        // 这是围观支付
        this.creatOrder(this.price, 6, val, 1);
      } else if (this.payTypeVal === 3) {
        this.creatOrder(this.thread.thread.attachmentPrice, 7, val, 1);
      }
    },
    // 支付方式选择完成点击确定时
    paysureShow(payType) {
      uni.setStorage({
        key: 'page',
        data: `/topic/index?id=${this.threadId}`,
      });
      // 微信支付
      if (payType === 0) {
        // #ifdef H5
        if (this.isWeixin === true && this.user.wechat === undefined) {
          this.$refs.wechatPopup.open();
          return;
        }
        if (this.isWeixin === true && this.user.wechat && this.user.wechat.mp_openid === '') {
          this.$refs.wechatPopup.open();
          return;
        }
        // #endif

        // #ifdef MP-WEIXIN
        if (
          this.user.wechat === undefined ||
          (this.user.wechat && this.user.wechat.min_openid === '')
        ) {
          this.$refs.wechatPopup.open();
          return;
        }
        // #endif
        if (this.payTypeVal === 0) {
          // 这是主题支付
          this.creatOrder(this.thread.thread.price, 3, this.value, payType);
        } else if (this.payTypeVal === 1) {
          // 这是主题打赏
          this.creatOrder(this.price, 2, this.value, payType);
        } else if (this.payTypeVal === 2) {
          // 这是围观支付
          this.creatOrder(this.price, 6, this.value, payType);
        } else if (this.payTypeVal === 3) {
          this.creatOrder(this.thread.thread.attachmentPrice, 7, this.value, payType);
        }
      } else if (payType === 1) {
        ``;
        // 这是详情页获取到的支付方式---钱包
      }
    },
    // 对象转数组
    limitArray(obj) {
      const arr = [];
      Object.values(obj).forEach(item => {
        arr.push(item);
      });
      return arr;
    },
    // 管理菜单点击事件
    selectClick() {
      this.seleShow = !this.seleShow;
    },
    // 管理菜单内标签点击事件
    selectChoice(param) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      if (param.type === '0') {
        uni.redirectTo({
          url: `/topic/post?type=${this.thread.thread.type}&operating=edit&threadId=${this.thread.thread.id}`,
        });
      } else if (param.type === '2' || param.type === '3') {
        this.threadOpera(this.threadId, param.canOpera, param.status, param.type);
      } else if (param.type === '4') {
        this.$refs.deletePopup.open();
        this.deleteType = '4';
        this.deleteId = this.threadId;
        this.deletePostCanStatus = param.canOpera;
        this.deletePostIsStatus = param.status;
        this.deletePostType = param.type;
        this.deleteTip = this.i18n.t('core.deleteContentSure');
      }
    },
    // 点击用户名跳转
    beAskClick(id) {
      if (id <= 0) {
        return;
      }
      uni.navigateTo({
        url: `/pages/profile/index?userId=${id}`,
      });
    },
    // 跳转到用户主页
    personJump(id) {
      if (!id || id <= 0) {
        return;
      }
      uni.navigateTo({
        url: `/pages/profile/index?userId=${id}`,
      });
    },
    // 主题支付
    payClickShow() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
        return;
      }
      this.payStatus = false;
      if (!this.forums.paycenter.wxpay_close) {
        this.payShowStatus = false;
        return;
      } else if (this.forums.paycenter.wxpay_close) {
        // #ifndef H5
        if (this.system === 'ios') {
          if (this.paymentmodel === false) {
            this.payShowStatus = false;
            return;
          } else {
            this.payShowStatus = true;
          }
        } else {
          this.payShowStatus = true;
        }
        // #endif
        // #ifdef H5
        this.payShowStatus = true;
        // #endif
      } else {
        this.payShowStatus = false;
        return;
      }

      this.payTypeVal = 0; // payTypeVal, '这是类型，0为主题支付，1为主题打赏 2围观支付  3为附件支付
      if (this.thread.thread.attachmentPrice > 0) {
        this.payTypeVal = 3;
      } else {
        this.payTypeVal = 0;
      }

      if (this.thread.thread.type === 3) {
        this.payTypeText = this.t.pay + this.t.paymentViewPicture;
        this.price = parseFloat(this.thread.thread.price);
      } else if (this.thread.thread.type === 1) {
        if (this.thread.thread.attachmentPrice > 0) {
          this.payTypeText = this.t.pay + this.thread.thread.attachmentPrice + this.t.checkTheAttachment;
          this.price = parseFloat(this.thread.thread.attachmentPrice);
        } else {
          this.payTypeText = this.t.pay + this.thread.thread.price + this.t.paymentViewRemainingContent;
          this.price = parseFloat(this.thread.thread.price);
        }
      } else if (this.thread.thread.type === 2) {
        this.payTypeText = this.t.pay + this.t.paymentViewVideo;
        this.price = parseFloat(this.thread.thread.price);
      } else if (this.thread.thread.type === 4) {
        this.payTypeText = this.t.pay + this.t.paymentViewAudio;
        this.price = parseFloat(this.thread.thread.price);
      }

      this.$nextTick(() => {
        this.$refs.payShow.payClickShow(this.payTypeVal);
      });
    },
    // 围观支付
    payAnswerClickShow() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.payStatus = false;
      this.payTypeVal = 2;
      this.price = parseFloat(this.thread.question.onlookerUnitPrice);
      this.$nextTick(() => {
        this.$refs.payShow.payClickShow(this.payTypeVal);
      });
    },
    // 支付是否显示用户头像
    radioMyHead(val) {
      // 是否显示用户头像
      this.isAnonymous = !val;
    },

    // 选择支付方式，获取值
    radioChange(val) {
      // val, 这是父级得到的
    },
    // 打赏
    rewardClick() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      if (this.user.id === this.thread.author.id) {
        this.$refs.toast.show({ message: this.t.iCantRewardMyself });
        return false;
      }
      // 这是打赏
      this.payStatus = false;
      this.payTypeVal = 1;
      this.payTypeText = this.t.supportTheAuthorToCreate;
      // this.payShowStatus = true;
      this.payNumCheck = [
        {
          name: '',
          pay: '',
        },
      ];
      this.$refs.rewardPopup.open();
    },
    // 取消打赏
    cancelReward() {
      this.payNumCheck = [
        {
          name: '',
          pay: '',
        },
      ];
      this.$refs.rewardPopup.close();
    },
    // 打赏选择付费金额
    moneyClick(index) {
      // this.setType = 'pay';
      this.payNumCheck = [];
      this.payNumCheck.push(this.payNum[index]);

      if (this.payNumCheck[0].name === '自定义') {
        this.$refs.rewardPopup.close();

        this.$nextTick(() => {
          this.$refs.customAmountPopup.open();
          this.customAmountStatus = true;
        });
      } else {
        this.price = this.payNumCheck[0].pay;
        this.payShowStatus = true;
        this.$refs.rewardPopup.close();
        this.payTypeVal = 1;
        this.$nextTick(() => {
          // this.$refs.payShow.payClickShow();
          this.$refs.payShow.payClickShow(this.payTypeVal);
        });
      }
    },
    // 处理金额
    checkNum(e) {
      let that = this;
      let price = e.target.value;
      let maxLength = price.indexOf('.');

      if (price.indexOf('.') < 0 && price != '') {
        // 超过4位则大于1万元
        if (price.length > 6) {
          price = price.substring(0, price.length - 1);
          uni.showToast({
            title: that.c.TheAmountCannotExceedOneMillion,
            icon: 'none',
          });
        } else {
          price = parseFloat(price);
        }
      } else if (price.indexOf('.') == 0) {
        //'首位小数点情况'
        price = price.replace(/[^$#$]/g, '0.');
        price = price.replace(/\.{2,}/g, '.');
      } else if (!/^(\d?)+(\.\d{0,2})?$/.test(price)) {
        //去掉最后一位
        price = price.substring(0, price.length - 1);
      }
      that.$nextTick(function() {
        //'有小数点时，最大长度为9位，没有则是7位'
        that.maxLength = maxLength == -1 ? 7 : 10;
        that.inputPrice = price;
      });
    },
    // 自定义付费金额弹框点击关闭时
    diaLogClose() {
      this.$refs.customAmountPopup.close();
      this.customAmountStatus = false;
    },
    // 自定义付费金额弹框点击确定时
    diaLogOk() {
      // if (this.inputPrice <= 0) {
      //   this.$refs.toast.show({ message: this.p.AmountCannotBeLessThan0 });
      // } else {
      if (this.forums.set_site.site_minimum_amount === '') {
        if (this.inputPrice < '0.1') {
          uni.showToast({
            title: this.i18n.t('core.TheAmountCannotBeLessThanOneYuan'),
            icon: 'none',
          });
          return;
        }
      } else {
        if (this.inputPrice < this.forums.set_site.site_minimum_amount) {
          uni.showToast({
            title:
              this.i18n.t('core.TheAmountCannotBeLessThanMinMoney') +
              this.forums.set_site.site_minimum_amount +
              this.i18n.t('discuzq.post.yuan'),
            icon: 'none',
          });
          return;
        }
      }
      this.price = Number(this.inputPrice);
      this.$refs.customAmountPopup.close();
      this.customAmountStatus = false;
      this.payShowStatus = true;
      // this.$refs.payShow.payClickShow();
      this.$nextTick(() => {
        this.$refs.payShow.payClickShow(this.payTypeVal);
      });
      // }
    },
    // 回复文本域失去焦点时，获取光标位置
    contBlur(e) {
      this.cursor = e.detail.cursor;
    },
    // 点击表情插入到文本域
    getEmojiClick(code) {
      let text = '';
      text = `${this.textAreaValue.slice(0, this.cursor) +
        code +
        this.textAreaValue.slice(this.cursor)}`;
      this.textAreaValue = text;
      this.emojiShow = false;
    },

    // 点击@跳转到@页
    callClick() {
      uni.navigateTo({ url: '/pages/user/at-member' });
    },
    // // 上传图片
    // imageUploader() {
    //   // this.uploaderShow = true;
    //   // if (this.uploadFile.length == 3) {
    //   //   this.$refs.toast.show({ message: this.t.imageNumLimit });
    //   //   return;
    //   // }
    //   this.$nextTick(() => {
    //     this.$refs.upload.uploadClick();
    //   });
    // },
    // 上传图片
    uploadChange(e) {
      this.uploadFile = e;
    },
    // 删除图片
    uploadClear(list, del) {
      // 触发删除
      const id = list.id;
      this.deleteType = 0;
      this.deleteImgId = id;
      this.deleteIndex = del;
      this.$refs.deletePopup.open();
      this.deleteTip = this.i18n.t('core.deleteImgSure');
      // this.delAttachments(id, del).then(() => {
      //   this.$refs.upload.clear(del);
      // });
    },
    // 删除图片
    delAttachments(id) {
      const params = {
        _jv: {
          type: 'attachments',
          id,
        },
      };

      return this.$store
        .dispatch('jv/delete', params)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 主题评论点击发布事件
    publishClick() {
      this.publishClickStatus = false;
      if (this.commentAnser === true) {
        this.postAnswer();
      } else {
        this.postComment(this.commentId);
      }
    },
    // 跳转到评论详情页
    commentJump(threadId, postId) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif

        return;
      }
      uni.navigateTo({
        url: `/pages/topic/comment?threadId=${threadId}&commentId=${postId}`,
      });
    },
    // 评论点赞
    commentLikeClick(postId, type, canStatus, isStatus, index, post) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.postIndex = index;
      this.postOpera(postId, type, canStatus, isStatus, post);
    },
    // 删除评论
    deleteComment(postId, type, canStatus, isStatus, post) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.$refs.deletePopup.open();
      this.deleteId = postId;
      this.deleteType = '3';
      this.deletePostCanStatus = canStatus;
      this.deletePostIsStatus = isStatus;
      this.deletePost = post;
      this.deleteTip = this.i18n.t('core.deleteCommentSure');
      // this.postOpera(postId, '3', canStatus, isStatus, post);
    },
    // 评论的回复
    replyComment(postId, postIndex) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif

        return;
      }
      // 判断是否需要绑定手机或实名认证
      if (!this.isPublishNeedRealName() || !this.isPublishNeedBindPhone()) return;

      if (!this.thread.thread.canReply) {
        this.$refs.toast.show({ message: this.t.noReplyPermission });
      } else {
        this.commentReply = true;
        this.postIndex = postIndex;
        this.commentId = postId;
        this.$refs.commentPopup.open();
        this.commentPopupStatus = true;
        this.commentWorkTips = true;
        this.commentText = false;
        this.focusVal = true;
      }
    },
    // 点击图片
    imageClick() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      // this.previewImg();
    },
    // 点击分类标签
    tagClick(tagId, tagIdc, search_ids) {
      this.$u.event.$emit('tagClick', tagId, tagIdc, search_ids);
      const pages = getCurrentPages();
      const delta = pages.indexOf(pages[pages.length - 1]);
      if (
        pages.length > 1 &&
        pages[delta - 1].route &&
        pages[delta - 1].route === 'pages/home/index'
      ) {
        uni.navigateBack({
          delta,
        });
        this.setFooterIndex(0);
      } else {
        uni.navigateTo({
          url: `/pages/home/index?categoryId=${tagId}&searchIds=${search_ids}`,
        });
        this.setFooterIndex(0);
      }
    },
    // 主题点赞
    threadLikeClick(postId, canLike, isLiked) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.postOpera(postId, '1', canLike, isLiked);
    },
    // 主题收藏
    threadCollectionClick(id, canStatus, isStatus, type) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.threadOpera(id, canStatus, isStatus, type);
    },

    // 主题回复
    threadComment(threadId) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      // 判断是否需要绑定手机或实名认证
      if (!this.isPublishNeedRealName() || !this.isPublishNeedBindPhone()) return;

      if (this.thread.thread.canReply) {
        this.commentId = threadId;
        this.formData.type = 1;
        this.$refs.commentPopup.open();
        this.commentPopupStatus = true;
        this.commentWorkTips = true;
        this.commentText = false;
        this.focusVal = true;
      } else {
        this.$refs.toast.show({ message: this.t.noReplyPermission });
      }
    },

    // 回答问题
    queClick() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.formData.type = 5;
      this.commentAnser = true;
      this.$refs.commentPopup.open();
      // this.postAnswer();
      this.commentPopupStatus = true;
      this.commentWorkTips = false;
      this.commentText = true;
      this.maxTextLength = 49999;
    },

    handleClickOk() {
      this.$refs.deletePopup.close();
      if (this.deleteType === '4') {
        this.threadOpera(
          this.deleteId,
          this.deletePostCanStatus,
          this.deletePostIsStatus,
          this.deleteType,
        );
      } else if (this.deleteType === '3') {
        // 删除类型为主题评论
        this.postOpera(
          this.deleteId,
          '3',
          this.deletePostCanStatus,
          this.deletePostIsStatus,
          this.deletePost,
        );
      } else if (this.deleteType === 0) {
        // 确定删除
        // 删除类型为评论时上传的图片
        this.delAttachments(this.deleteImgId, this.deleteIndex).then(() => {
          this.$refs.upload.clear(this.deleteIndex);
          this.$refs.upload.getValue().forEach((value, key, item) => {
            value.id == this.deleteImgId && item.splice(key, 1);
          });
        });
      }
    },
    // 确认去绑定微信
    handleWechatClickOk() {
      this.$refs.wechatPopup.close();
      // #ifdef MP-WEIXIN
      this.mpLogin();
      // #endif
      // #ifdef H5
      if (this.isWeixin) {
        this.wxh5Login(0, 0);
      } else {
        uni.showToast({
          icon: 'none',
          title: this.i18n.t('user.unLogin'),
          duration: 2000,
        });
      }
      // #endif
    },
    // 取消去绑定微信
    handleWechatClickCancel() {
      this.$refs.wechatPopup.close();
    },
    handleClickCancel() {
      this.$refs.deletePopup.close();
    },

    // 分享
    shareClick() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      // #ifdef MP-WEIXIN
      this.$refs.sharePopup.open();
      if (this.thread.thread.isAnonymous && parseFloat(this.thread.thread.price) === 0) {
        this.shareAnonymous = true;
      }
      if (this.forums.set_site && this.forums.set_site.site_mode === 'pay') {
        this.bottomData.forEach((value, key, bottomData) => {
          // this.bottomData.map((value, key, bottomData) => {
          value.name === 'wxFriends' && bottomData.splice(key, 1);
        });
      }
      // #endif
      // #ifdef H5
      if (this.isWeixin === true) {
        // 微信内
        this.shareShow = true;
      } else {
        this.h5Share({
          title: this.contentVal,
          id: this.threadId,
          url: 'topic/index',
        });
      }
      // #endif
    },
    // #ifdef H5
    closeShare() {
      this.shareShow = false;
    },
    // #endif
    // 取消分享
    cancel() {
      this.shareAnonymous = false;
      this.$refs.sharePopup.close();
    },
    // 内容部分分享海报,跳到分享海报页面
    shareContent(index) {
      if (index === 0) {
        if (this.thread.thread.isApproved == 0) {
          uni.showToast({
            icon: 'none',
            title: this.i18n.t('topic.underReview'),
            duration: 2000,
          });
        } else {
          uni.navigateTo({
            url: `/pages/share/topic?id=${this.threadId}`,
          });
        }
      }
      this.cancel();
    },

    // // 下拉加载
    // pullDown() {
    //   if (this.loadingType !== 'more') {
    //     return;
    //   }
    //   this.pageNum += 1;
    //   this.loadThreadPosts();
    // },
    codeImgChange(params) {
      if (!params.show) {
        clearInterval(payWechat);
      }
    },
    _updateLikedUsers(liked = true) {
      console.log(this.user, 'this.user');
      this.isLiked = liked;
      // 主题点赞
      if (this.isLiked) {
        this.likedUsers.unshift(this.user);
        // this.thread.likedUsers.unshift({
        //   type: this.user._jv.type,
        //   id: this.user._jv.id,
        // });
        this.thread.firstPost.likeCount += 1;
        this.thread.firstPost.isLiked = true;
      } else {
        this.likedUsers.forEach((value, key, item) => {
          value.id == this.user._jv.id && item.splice(key, 1);
        });
        // this.thread.likedUsers.forEach((value, key, item) => {
        //   value.id == this.user._jv.id && item.splice(key, 1);
        // });
        this.thread.firstPost.likeCount -= 1;
        this.thread.firstPost.isLiked = false;
      }
      this.$forceUpdate();
    },
    _updateRewardUsers(payType = 0) {
      if (this.payTypeVal === 1) {
        this.thread.thread.rewardedCount++;
        if (!this.rewardStatus) {
          this.rewardStatus = true;
          this.rewardBtnStatus = true;
        }
      }

      this.rewardedUsers.unshift(this.user);
      // this.thread.rewardedUsers.unshift({
      //   type: this.user._jv.type,
      //   id: this.user._jv.id,
      // });
      this.$forceUpdate();
    },
    onUnload() {
      clearInterval(payWechat);
      clearInterval(payPhone);
    },
    // 点击排序
    sortOperaClick() {
      this.sortSeleShow = !this.sortSeleShow;
    },
    // 管理菜单内标签点击事件
    sortSelectChoice(param) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.sortSeleShow = false;

      if (param.type === '0') {
        if (this.sortVal === 'createdAt') {
          this.$refs.toast.show({ message: this.t.itsAlreadyWantedSort });
        } else {
          this.refreshVal = false;

          this.$nextTick(() => {
            this.refreshVal = true;
          });
          this.sortVal = 'createdAt';
          this.posts = [];
          this.splitLists = [];
          this.preThreadsPostsData = null; // 重置预加载数据
          this.pageNum = 1;
          this.loadThreadPosts();
        }
      } else if (param.type === '1') {
        if (this.sortVal === '-createdAt') {
          this.$refs.toast.show({ message: this.t.itsAlreadyWantedSort });
        } else {
          this.refreshVal = false;
          this.sortVal = '-createdAt';
          this.posts = [];
          this.splitLists = [];
          this.preThreadsPostsData = null; // 重置预加载数据
          this.pageNum = 1;
          this.loadThreadPosts();
          this.$nextTick(() => {
            this.refreshVal = true;
          });
        }
      }
    },
    // 添加关注
    addFollow(userInfo) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      const originUser = this.$store.getters['jv/get'](`users/${userInfo.id}`);
      const params = {
        _jv: {
          type: 'follow',
        },
        type: 'user_follow',
        to_user_id: userInfo.id,
      };
      this.$store.dispatch('jv/post', params).then(res => {
        if (res.is_mutual == 0) {
          this.thread.user.follow = 1;
          originUser.follow = 1;
          this.followStatus = 1;
        } else {
          this.thread.user.follow = 2;
          originUser.follow = 2;
          this.followStatus = 2;
        }
      });
    },
    // 取消关注
    deleteFollow(userInfo) {
      const originUser = this.$store.getters['jv/get'](`users/${userInfo.id}`);
      this.$store.dispatch('jv/delete', `follow/${userInfo.id}/1`).then(() => {
        this.thread.user.follow = 0;
        originUser.follow = 0;
        this.followStatus = 0;
      });
      s;
    },
    // 更多操作-唤起弹框
    moreClick() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      this.$refs.morePopup.open();
    },
    // 更多操作内标签选择
    moreContent(param, thread) {
      if (param.type === '8') {
        if (this.thread.thread.isAnonymous && parseFloat(this.thread.thread.price) === 0) {
          this.shareAnonymous = true;
        }
      } else {
        this.moreCancel();
      }
      if (param.type === '0') {
        this.$;
        uni.redirectTo({
          url: `/topic/post?type=${this.thread.thread.type}&operating=edit&threadId=${this.thread.thread.id}&isredbag=${this.thread.isRedPacket}`,
        });
      } else if (param.type === '2' || param.type === '3') {
        this.threadOpera(this.threadId, param.canOpera, param.isStatus, param.type);
      } else if (param.type === '4') {
        this.$refs.deletePopup.open();
        this.deleteType = '4';
        this.deleteId = this.threadId;
        this.deletePostCanStatus = param.canOpera;
        this.deletePostIsStatus = param.status;
        this.deletePostType = param.type;
        this.deleteTip = this.i18n.t('core.deleteContentSure');
      }
      if (param.name === 'report') {
        this.reportClick();
      }
      if (param.name === 'collection') {
        this.threadCollectionClick(thread.thread.id, thread.canFavorite, thread.isFavorite, '1');
      }
      if (param.name === 'share') {
        this.shareClick();
      }
      if (param.name === 'poster') {
        this.shareContent(0);
      }
    },
    // 关闭更多操作弹框
    moreCancel() {
      this.shareAnonymous = false;
      this.$refs.morePopup.close();
    },
    // 关闭举报弹框
    reportClose(val) {
      this.$refs.reportPopup.close();
    },
    // 举报
    reportClick() {
      this.moreCancel();
      this.$refs.reportPopup.open();
    },
    // 点击购买商品 在小程序内复制链接，提醒在浏览器里打开，在微信 浏览器和h5内，直接跳转页面
    buyGood() {
      if (this.thread.thread.type === 6) {
        // #ifndef MP-WEIXIN
        if (this.isWeixin) {
          if (
            this.thread.postGoods.type === 0 ||
            this.thread.postGoods.type === 1 ||
            this.thread.postGoods.type === 5
          ) {
            this.copy(this.thread.postGoods.detailContent);
          } else {
            window.location.href = this.thread.postGoods.detailContent;
          }
        } else {
          window.location.href = this.thread.postGoods.detailContent;
        }
        // #endif

        // #ifdef MP-WEIXIN
        this.copy(this.thread.postGoods.detailContent);
        // #endif
      }
    },
    copy(text) {
      uniCopy({
        content: text,
        success: res => {
          uni.showToast({
            title: this.thread.postGoods.typeName + res,
            icon: 'none',
          });
        },
        error: e => {
          uni.showToast({
            title: e,
            icon: 'none',
            duration: 3000,
          });
        },
      });
    },
    modifyPostCommentHtml(obj) {
      obj.forEach(item => {
        item.summary = modifyPostContentHtml(item.summary);
      });
      return obj;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

page {
  padding: 0;
  margin: 0;
  font-size: $fg-f4;
  color: --color(--qui-FC-333);
}
.flex {
  display: flex;
}
.skeletonScreen {
  width: 100%;
  height: 100%;
  background: --color(--qui-BG-2);
}
.scroll-y {
  // max-height: calc(100vh - 497rpx);
  max-height: calc(100vh - 80rpx);
}
.bg-white {
  background-color: --color(--qui-BG-2);
  border-bottom: 1px solid --color(--qui-BOR-ED);
}
.detail-tip {
  display: block;
  width: 100%;
  font-size: $fg-f4;
  line-height: 60rpx;
  color: #fff;
  text-align: center;
  background: --color(--qui-RED);
}
.detail-hd {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 30rpx 40rpx 37rpx;
  box-sizing: border-box;
  .det-hd-per-head-box {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    .det-hd-per-head {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .det-hd-per-info {
    width: 400rpx;
    padding-left: 20rpx;
    .det-hd-per-name {
      margin-bottom: 10px;
      font-size: $fg-f4;
      font-weight: bold;
      line-height: 37rpx;
    }
    .det-hd-post-time {
      font-size: $fg-f2;
      line-height: 31rpx;
      color: --color(--qui-FC-AAA);
    }
  }
}
.det-hd-opera {
  align-self: flex-end;
  text-align: right;
  flex-shrink: 0;
  .essence {
    display: inline-block;
    width: 39rpx;
    height: 44rpx;
  }
}
.det-hd-operaCli {
  position: relative;
  z-index: 10;
  .det-hd-management {
    display: flex;
    flex-direction: row;
    line-height: 1;
    .icon-management {
      margin-right: 7rpx;
      font-size: 26rpx;
    }
  }
  font-size: $fg-f4;
  line-height: 40rpx;
}
//详情页帖子内容
.detail-post-content {
  padding: 0 40rpx 30rpx;
  text-align: left;
  .det-post-con {
    line-height: 45rpx;
  }
  .det-post-img-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 30rpx 0;
    // flex-wrap: wrap;
  }
  .det-post-img-box {
    .det-post-img {
      width: 314rpx;
      vertical-align: top;
    }
  }
  .det-post-tag-list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    .det-post-tag {
      padding: 10rpx 20rpx;
    }
  }
}

.det-con-ft {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 40rpx 30rpx;
  background: --color(--qui-BG-2);
  box-sizing: border-box;
  &-child {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: $fg-f4;
    color: --color(--qui-FC-777);
    align-items: center;
    .qui-icon {
      margin-right: 17rpx;
      font-size: 30rpx;
    }
    * {
      font-size: $fg-f4;
      color: --color(--qui-FC-777);
    }
  }
}
.pad-top {
  padding-top: 0;
}
//评论
.comment {
  width: 100%;
  padding: 40rpx 0 0;
  margin-top: 30rpx;
  background: --color(--qui-BG-2);
  box-sizing: border-box;
}
.comment-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 40rpx;
}
.comment-num {
  font-size: $fg-f4;
  font-weight: bold;
  line-height: 37rpx;
}
.comment-sort {
  position: relative;
  z-index: 1;
}
.comment-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40rpx 0;
}
.comment-child-hd {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .comment-child-per-head-box {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    .comment-child-per-head {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .comment-child-status {
    align-items: flex-start;
    padding-top: 8rpx;
    font-size: $fg-f3;
    line-height: 35rpx;
    color: --color(--qui-RED);
  }
}
.comment-child-per-info {
  width: 480rpx;
  padding-left: 20rpx;
  .comment-child-per-det {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .comment-child-per-name {
      margin-bottom: 10rpx;
      font-weight: bold;
      line-height: 37rpx;
    }
    .comment-chile-per-role {
      line-height: 37rpx;
      color: --color(--qui-FC-AAA);
    }
  }
  .comment-child-time {
    font-size: $fg-f2;
    line-height: 31rpx;
    color: --color(--qui-FC-AAA);
  }
}
.comment-child-con {
  padding: 20rpx 0 40rpx;
  font-size: $fg-f4;
  line-height: 45rpx;
  text-align: left;
  .comment-child-con-all {
    color: --color(--qui-LINK);
    * {
      color: --color(--qui-LINK);
    }
  }
}
.ft-gap {
  width: 100%;
  padding-bottom: 100rpx;
  background: --color(--qui-BG-1);
}
.det-ft {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 7;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: --color(--qui-BG-2);
  box-shadow: 0 -3rpx 6rpx rgba(0, 0, 0, 0.05);
}
.det-ft-con {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.det-ft-child {
  flex: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 80rpx;
  color: --color(--qui-FC-777);
  .qui-icon {
    margin-right: 18rpx;
    font-size: 30rpx;
    line-height: 80rpx;
  }
  .ft-child-word {
    font-size: $fg-f4;
    color: --color(--qui-FC-777);
  }
}
.comment-popup-box {
  width: 100%;
  padding-top: 40rpx;
}
.comment-popup {
  width: 100%;
  background: --color(--qui-BG-2);
  border-top-right-radius: 10rpx;
  border-top-left-radius: 10rpx;
  box-sizing: border-box;
}
.comment-popup-topbox {
  position: relative;
  padding: 40rpx 0 20rpx;
  margin: 0 40rpx;
}
.comment-popup-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .comment-popup-top-l {
    // flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 195rpx;
  }
  .text-word-tip {
    font-size: $fg-f2;
    line-height: 1;
    color: --color(--qui-FC-777);
  }
  .comm-icon {
    flex: 1;
    color: --color(--qui-FC-777);
  }
}
.comment-content-box {
  padding: 0 40rpx 30rpx 30rpx;
  .comment-content {
    width: 100%;
    height: 260rpx;
    padding: 20rpx 20rpx 0;
    overflow: hidden;
    background: --color(--qui-FC-GRAY);
    border: 1px solid --color(--qui-FC-DDD);
    border-radius: 7rpx;
    box-sizing: border-box;
  }
  .comment-textarea {
    width: 100%;
    height: 220rpx;
    min-height: 70rpx;
    font-size: $fg-f4;
    line-height: 37rpx;
  }
  .text-placeholder {
    font-size: 28rpx;
  }
}
.publish-btn {
  width: 100%;
  height: 100rpx;
  font-size: $fg-f4;
  font-weight: normal;
  line-height: 100rpx;
  color: --color(--qui-FC-FFF);
  text-align: center;
  background: --color(--qui-MAIN);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  background: #ea3d5a;
  /* #endif */
  border-radius: 0;
}

.popup-box {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  /* #endif */
  background: --color(--qui-BG-2);
}
.popup-cancel-btn {
  height: 100rpx;
  font-size: $fg-f4;
  line-height: 100rpx;
  color: #666;
  text-align: center;
  border-top-color: #f5f5f5;
  border-top-style: solid;
  border-top-width: 1px;
}
.popup-content-space {
  width: 100%;
  height: 10rpx;
  background: --color(--qui-BG-ED);
}
.popup-content-btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .popup-btn {
    margin-top: 20rpx;
  }
}
.popup-reward-content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  height: 477rpx;
  padding: 40rpx 45rpx;
  background: --color(--qui-BG-BTN-GRAY-1);
  box-sizing: border-box;
  .popup-title {
    height: 37rpx;
    font-size: $fg-f4;
    text-align: center;
  }
}
.popup-dialog {
  width: 670rpx;
  height: 342rpx;
  background-color: --color(--qui-BG-2);
  border-radius: 14rpx;
  &__top {
    padding-top: 40rpx;
    text-align: center;
    text {
      font-size: $fg-f4;
      color: --color(--qui-FC-333);
    }
  }

  &__cont {
    position: relative;
    display: flex;
    align-items: center;
    padding: 24rpx 52rpx 40rpx;
    &-rmb {
      position: absolute;
      margin-left: 25rpx;
    }
    &-input {
      width: 100%;
      height: 100rpx;
      padding: 0 25rpx 0 80rpx;
      text-align: right;
      border: 1px solid --color(--qui-BOR-DDD);
      box-sizing: border-box;
    }
  }

  &__ft {
    display: flex;
    height: 100rpx;
    border-top: 2rpx solid --color(--qui-BOR-DDD);

    button {
      width: 50%;
      color: --color(--qui-FC-777);
      background-color: --color(--qui-BG-2);
      border-radius: 0;
      &:after {
        border: none;
      }
      &:last-of-type {
        border-left: 2rpx solid --color(--qui-BOR-DDD);
        border-bottom-right-radius: 10rpx;
      }
      &:first-of-type {
        border-bottom-left-radius: 10rpx;
      }
    }
    .popup-btn--ok--blue {
      color: --color(--qui-BG-HIGH-LIGHT);
    }
  }
}
.popup-share-content {
  padding-right: 97rpx;
  padding-left: 98rpx;
}
.popup-share-content-inner {
  height: auto;
  padding-right: 20rpx;
  padding-left: 20rpx;
  overflow: hidden;
  justify-content: flex-start;
}
.popup-more-content-text {
  font-size: $fg-f3;
}
.popup-more-content-box {
  flex: 0 0 20%;
  margin-bottom: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
.popup-more-button {
  position: absolute;
  z-index: 10;
  width: 120rpx;
  height: 120rpx;
  background: --color(--qui-BG-2);
  opacity: 0;
}
// 微信二维码弹框

.code-content {
  position: fixed;
  top: 10%;
  left: 11%;
  z-index: 22;
  display: flex;
  flex-direction: column;
  width: 78%;
  padding: 40rpx;
  background: --color(--qui-BG-FFF);
  border-radius: 16rpx;
  box-sizing: border-box;
  .code-title {
    text-align: center;
  }
  .code-pay-money {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 36rpx;
    padding-bottom: 36rpx;
    font-size: 70rpx;
    .code-yuan {
      font-size: 48rpx;
      line-height: 66rpx;
    }
  }
}

.code-type-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24rpx 0 34rpx;
  line-height: 36rpx;
  border-top: 1px solid --color(--qui-BG-ED);
  .code-type-tit {
    color: --color(--qui-FC-AAA);
  }
  .code-type {
    display: flex;
    flex-direction: row;
    .code-type-icon {
      font-size: 36rpx;
    }
    .code-type-text {
      padding-left: 12rpx;
    }
  }
}
.code-img {
  align-self: center;
  width: 380rpx;
  height: 380rpx;
}
.code-tip {
  padding: 14rpx 0 20rpx;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 170;
  width: 100%;
  height: 100%;
  background: rgba(#000, 0.6);
}
.wxShareTip {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2222222222222;
  width: 100%;
  height: 100%;
  text-align: right;
  .sharePoint {
    display: inline-block;
    width: 70%;
    margin-top: 10rpx;
    margin-right: 30rpx;
  }
  .shareKnow {
    display: block;
    width: 35%;
    margin: 20vh auto 30rpx;
  }
}
.themeItem__header__follow {
  align-self: flex-start;
  width: 168rpx;
  line-height: 1;
  text-align: right;
  flex-shrink: 0;
  .icon-follow {
    margin-right: 7rpx;
    font-size: $fg-f3;
  }
}
.det-ft-operaCli {
  position: relative;
  line-height: 30rpx;
  .det-ft-more {
    display: flex;
    justify-content: flex-end;
    .icon-gengduo {
      color: --color(--qui-FC-AAA);
    }
  }
}
// .scroll-y {
//   max-height: 100vh;
// }
.payment {
  padding: 0 40rpx;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  padding: 0;
  background: rgba($color: #f3bc4d, $alpha: 0.06);
  /* #endif */
}
.answerPay {
  padding: 0 20rpx 40rpx;
}
</style>
