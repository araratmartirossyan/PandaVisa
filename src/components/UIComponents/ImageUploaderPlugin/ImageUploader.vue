<template>
  <div class="uploader">
    <div class="heading">
      <h5>{{title}}
        <font color="#999">{{uploading}}</font>
        <span v-show="thumbnail" @click="removeAvatar()" class="remove">
          <a class="delete is-medium"></a>
        </span>
      </h5>
    </div>
    <div v-show="!thumbnail" class="avatar-centered">
      <div id="thumbnail">
        <span id="pickfiles"></span>
        <div class="weui-uploader__input-box">
          <label id="addShowLabel" @click="uploadFiles(inputId)">
            <div class="weui-uploader__input"></div>
          </label>
        </div>
      </div>
    </div>
    <div v-show="thumbnail" class="uploader_file">
      <img class="poster" :src="thumbnail" />
    </div>
    <div v-show="!thumbnail && poster" class="uploader_file">
      <img class="poster" :src="poster" />
    </div>
  </div>
</template>

<script>
  import {
    getToken
  } from '../../../helpers/tokenGenerator.js'

  export default {
    name: 'thumb',
    props: {
      title: String,
      picOption: Function,
      getFiles: String,
      uploadingText: String,
      domain: String,
      uptokenUrl: String,
      poster: String
    },
    data() {
      return {
        files: '',
        uploading: '',
        inputId: '',
        userInfo: '',
        thumbnail: ''
      }
    },
    created() {
      this.$nextTick(() => {
        this.uploadInit()
      })
    },
    methods: {
      removeAvatar() {
        this.thumbnail = null
        this.$emit('removeThumb')
      },
      uploadFiles(id) {
        this.$el.querySelector(`#${id}`).click()
      },
      uploadInit() {
        this.upload()
        setTimeout(() => {
          this.inputId = this.$el.querySelector('#thumbnail input').getAttribute('id')
        }, 500)
      },
      upload() {
        let that = this
        let setting = {
          runtimes: 'html5', // 上传模式,依次退化
          browse_button: 'pickfiles', // 上传选择的点选按钮，**必需**
          uptoken: getToken(), // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
          unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
          domain: 'http://oisooyqzw.bkt.clouddn.com/', // bucket 域名，下载资源时用到，**必需**
          get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的token
          container: 'thumbnail', // 上传区域DOM ID，默认是browser_button的父元素，
          max_file_size: '10mb', // 最大文件体积限制
          flash_swf_url: 'js/plupload/Moxie.swf', // 引入flash,相对路径
          max_retries: 1, // 上传失败最大重试次数
          dragdrop: false, // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb', // 分块上传时，每片的体积
          auto_start: true,
          multi_selection: false, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
          init: {
            FilesAdded(up, files) {
              that.uploading = that.uploadingText
            },
            BeforeUpload(up, file) {
              console.log(file)
            },
            UploadProgress(up, file) {
              console.log(file)
            },
            FileUploaded(up, file, info) {
              let domain = up.getOption('domain')
              let res = window.JSON.parse(info)
              let sourceLink = `${domain}/${res.key}`
              that.thumbnail = sourceLink
              that.$emit('uploadPoster', sourceLink)
            },
            UploadComplete() {
              that.uploadInit()
              that.uploading = 'Uploaded'
            }
          }
        }
        Qiniu.uploader(setting) // eslint-disable-line
      }
    }
  }

</script>

<style scoped>
  .uploader {
    text-align: center;
  }

  .weui-cell {
    padding: 10px 15px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .weui-cell__bd {
    flex: 1;
  }

  .weui-uploader__hd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-bottom: 10px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .weui-uploader__title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .weui-uploader__info {
    color: #B2B2B2;
  }

  .weui-uploader__bd {
    margin-bottom: -4px;
    margin-right: -9px;
    overflow: hidden;
  }

  .uploader_file {
    float: none;
    margin-right: 9px;
    margin-bottom: 9px;
    text-align: -webkit-center;
  }

  .weui-uploader__img {
    display: block;
    width: 79px;
    height: 79px;
    border-radius: 0;
  }

  .weui-uploader__file_status {
    position: relative;
  }

  .weui-uploader__file_status:before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .weui-uploader__file-content {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #FFFFFF;
  }

  .weui-uploader__input-box {
    float: none!important;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 77px;
    height: 77px;
    border: 1px solid #D9D9D9;
    border-radius: 0;
  }

  .weui-uploader__input-box:before,
  .weui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #D9D9D9;
  }

  .weui-uploader__input-box:before {
    width: 2px;
    height: 39.5px;
  }

  .weui-uploader__input-box:after {
    width: 39.5px;
    height: 2px;
  }

  .weui-uploader__input-box:active {
    border-color: #999999;
  }

  .weui-uploader__input-box:active:before,
  .weui-uploader__input-box:active:after {
    background-color: #999999;
  }

  .weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .remove {
    float: none;
    vertical-align: super;
  }

  .avatar-centered {
    text-align: -webkit-center;
  }

  .poster {
    width: 100%;
  }

</style>
