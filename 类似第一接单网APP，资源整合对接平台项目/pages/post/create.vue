<template>
  <view>

    <customtop :top_title="top_title"></customtop>

    <view class="container">

      <form class="luckform" @submit="formSubmit" v-if="!result">
        <input hidden="true" name="category_id" :value="category ? category.id : ''" />

        <view class="items">
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">合作标题<span class="span_required">*</span></view>
            </view>
            <view class="weui-cell__bd">
              <input name="title" class="weui-input" type="text" placeholder="项目名+单价+结算周期" value="" />
            </view>
          </view>
        </view>

        <!-- 数据属性 start -->
        <view v-for="(item, index) in category.attributes">
          <view class="items custom_checkbox" v-if="item.type == 'checkbox'">
            <view class="top">
              <span class="title">{{item.name}}</span><span class="span_required" v-if="item.required == 1">*</span>
            </view>
            <view class="item weui-cell">
              <view class="box">
                <span
                  v-for="(item_option, index_option) in item.options"
                  @click="set_form_checkbox(item.id, item_option.id)"
                  :class="(attributes[item.id] != undefined && attributes[item.id].indexOf(item_option.id) > -1) ? 'on' : ''"
                >
                  {{item_option.value}}
                </span>
              </view>
            </view>
          </view>
          <view class="items" v-if="item.type == 'radio'">
          	<view class="top">
          		<span class="title">{{item.name}}</span><span class="span_required" v:if="item.required == 1">*</span>
          	</view>
          	<view class="item weui-cell">
          		<view class="box">
          			<radio-group class="radio-group">
          				<label
                    class="radio"
                    v-for="(item_option, index_option) in item.options"
                    @click="set_form_radio(item.id + '[luck]' + item_option.id);"
                  >
          					<view><radio color="#00B38A" />{{item_option.value}}</view>
          				</label>
          			</radio-group>
          		</view>
          	</view>
          </view>
        </view>
        <!-- 数据属性 end -->

        <view class="items">
          <view class="top">
            <span class="title">详细介绍</span><span class="span_required">*</span><span class="span_remark">尽可能详细</span>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <textarea maxlength="-1" name="content" class="weui-textarea" placeholder="请输入详细介绍 
              提供： 需求：尽可能详细介绍否则无法通过审核！"></textarea>
            </view>
          </view>
        </view>

        <view class="items">
          <view class="top">
            <span class="title">图片介绍</span><span class="span_remark">会在详细介绍下方显示</span>
          </view>
          <view class="weui-cell">
            <view class="weui-cell__bd">
              <view>
                <u-upload
                  :fileList="fileList_images"
                  @afterRead="afterRead_images"
                  @delete="delete_images"
                  multiple
                  name="_images"
                  :maxCount="9"
                />
              </view>
            </view>
          </view>
        </view>

 <view class="items">
			<view class="color_red">发布须知<span class="color_red">*</span><span class="remark">
      <text>\n 1，严禁发布各类违法、违禁信息，一旦发现，永久封号。 \n 2，请选择正确的发布板块，
      否则将做关闭、删除等处理。多次无视发布规则者，将进行封号处理。 \n 3，为了更好的保护自身权益，
      建议合作前充分了解对方并签署合同，特别是涉及金钱的合作。 \n 4，严禁在非指定输入框内留联系方式
      （包含但不限于手机、微信、QQ、二维码等），一旦发现将做封号处理。\n 5，对于发布的内容，
      我们有权对其部分内容进行修改，包括但不限于：错别字、部分违规内容、页面整洁等。</text></span></view>
      </view>



        <view class="items">
          <view class="top">
            <span class="title">联系方式</span><span class="span_remark">最少需填写一项</span>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">微信</view>
            </view>
            <view class="weui-cell__bd">
              <input name="weixin" class="weui-input" type="text" placeholder="请输入微信" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">手机</view>
            </view>
            <view class="weui-cell__bd">
              <input name="phone" class="weui-input" type="text" placeholder="请输入手机" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">Q Q</view>
            </view>
            <view class="weui-cell__bd">
              <input name="qq" class="weui-input" type="text" placeholder="请输入QQ" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">电话</view>
            </view>
            <view class="weui-cell__bd">
              <input name="telphone" class="weui-input" type="text" placeholder="请输入电话" value="" />
            </view>
          </view>
        </view>

        <view class="btnbox">
          <button class="luckbtn luckbtn-default" formType="submit">提交信息</button>
        </view>
      </form>

      <view class="result" v-if="result">
        <view class="txt"><u-icon class="u_icon" name="checkmark-circle" color="" size=""></u-icon>发布成功，等待系统审核~</view>
        <view class="description">可在个人中心查看</view>
        <view class="btns">
          <button class="luckbtn luckbtn-default" @click="createAfterReturn">返回列表</button>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
import { request, upload } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      top_title: '',
      category: {},
      params: {},
      result: false,
      attributes: {},
      fileList_images: [],
    }
  },

  onLoad(options) {
    let id = options.category_id;
    uni.showLoading();
    request.post('/post/getCategory', {'id': id}).then(res => {
      uni.hideLoading();
      if (res.code == 200 && res.data.name) {
        uni.setNavigationBarTitle({ title: res.data.name + ' 发布页'});
        this.top_title = res.data.name + ' 发布页';
        this.category = res.data;
      } else {
        uni.showToast({
          icon: 'none',
          title: '未知发布类型',
          duration: 1500,
          mask: true,
          success: function() {
            setTimeout(function() {
              uni.navigateBack();
            }, 1500);
          }
        })
        return false;
      }
    })
  },

  methods: {
    formSubmit: function(e) {
      uni.showLoading();
      this.formBeforeSetParams();
      let form_params = e.detail.value;
      let params = this.params;
      params = Object.assign(params, form_params);
      request.post('/post/store', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          this.result = true;
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    formBeforeSetParams: function() {
      // 数据属性
      if (this.attributes) this.params.attributes = JSON.stringify(this.attributes);
      // 图片介绍
      this.params.images = [];
      if (this.fileList_images != undefined && this.fileList_images.length > 0) {
        this.fileList_images.forEach((item, index) => {
          let image = {
            id: item.id,
            image: item.url
          };
          this.params.images.push(image);
        })
        this.params.images = JSON.stringify(this.params.images);
      }
    },

    // 自定义多选数据处理
    set_form_checkbox: function(key, value) {
      if (this.attributes == undefined) this.attributes = {};
      if (this.attributes[key] == undefined) this.attributes[key] = [];

      let index = this.attributes[key].indexOf(value);
      if (index < 0) {
        if (this.attributes[key].length > 2) {
          uni.showToast({title: '最多只能选择三个', icon: 'none'});
          return false;
        }
        this.attributes[key].push(value);
      } else {
        this.attributes[key].splice(index, 1);
      }
      this.$forceUpdate();
    },

    // 自定义单选数据处理
    set_form_radio: function(value) {
      let array = value.split("[luck]");
      let array_key = array[0];
      let array_value = array[1];

      if (this.attributes == undefined) this.attributes = {};
      if (this.attributes[array_key] == undefined) this.attributes[array_key] = [];

      this.attributes[array_key] = [];
      this.attributes[array_key].push(array_value);
    },

    afterRead_images: function(event) {
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })

      for (let i = 0; i < lists.length; i++) {
        upload(lists[i].url).then(res => {
          let item = this[`fileList${event.name}`][fileListLen];
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            id: 0,
            url: res.data.url
          }))
          fileListLen++
        });
      }
    },

    delete_images: function(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },

    createAfterReturn: function() {
      uni.navigateBack({ delta: 1 });
    },

    switchTab: function(url) {
      uni.switchTab({
        url: url,
      })
    },

    jumpPage: function(url) {
      uni.navigateTo({
        url: url,
      })
    }
  }
}
</script>

<style>
@import url("@/static/weui.min.css");
page {
  padding-bottom: 60rpx;
}
.luckform .items {
  margin-top: 30rpx;
}
.luckform .btnbox {
  margin-top: 50rpx;
}

.result {
	text-align: center;
	padding: 60rpx;
}
.result .txt {
	letter-spacing: 2px;
}
.result .txt .icon {
	margin-right: 8rpx;
}
.result .description {
	margin-top: 20rpx;
	color: #999;
	font-size: 24rpx;
}
.result .btns {
	margin-top: 30rpx;
}
.result .btns .btn {
	margin-left: 10rpx;
}
.result .btns .btn:first-child {
	margin-left: 0;
}
</style>
