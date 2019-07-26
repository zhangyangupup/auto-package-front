<template>
  <div 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="file-page vcontent">
    <p class="file-title">资源文件</p>
    <!--  -->
    <div class="file-content">
      <div class="type-box">
         <el-radio-group v-model="type">
          <el-radio-button label="上传默认路径"></el-radio-button>
          <el-radio-button label="上传指定路径"></el-radio-button>
         </el-radio-group>
        <div class="top-center-box">
        </div>
         <el-select v-if="type==='上传指定路径'" v-model="value" placeholder="请选择路径">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      <el-upload
        class="upload-demo"
        drag
        ref="upload"
        action="http://localhost"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="fileChange"
        :auto-upload="false"
        multiple>
        <i class="el-icon-upload"></i>
        <div  class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div  class="el-upload__tip" slot="tip">可以上传任意文件文件，但大小尽量不要超过10M</div>
      </el-upload>
      <div class="submit-button">
        <el-button  @click.native="submitUpload" type="primary" round>上传</el-button>
      </div>
      <div class="result-box">
        <div class="result-fa-box">
          <p>上传结果</p>
          <div v-for="(item,index) in result" :key='index' class="result-child-box">
            <p>文件链接</p>
            <a :href="item"  target="_blank">{{item}}</a>
            <p :data-clipboard-text="item.url" class="tag-read" @click="copy">点击复制</p>
          </div>
          <div v-if="result.length===0" class="no-data-box">
            <i class="iconfont icon-aislogo"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '../../api/centerCtrl.js'
import Clipboard from 'clipboard';  
export default {
  components:{
  },
  data(){
    return {
      fileList: [],
      loading:false,
      type:"上传默认路径",
      headers:{
        "content-type":"multipart/form-data"
      },
      options: [{
        value: 'images',
        label: 'static/public/images/'
      }, {
        value: 'project',
        label: 'static/public/project/'
      }, {
        value: 'zip',
        label: 'static/public/zip/'
      }, {
        value: 'else',
        label: 'static/public/else/'
      }],
      value: '',
      result:[],
      data:{
        length:1
      }
    }
  },
  mounted(){
  },
  methods:{
    /**
     * 复制链接
     */
    copy() {  
          var clipboard = new Clipboard('.tag-read')  
          clipboard.on('success', e => {  
             this.$notify.success({
                title: '成功',
                message: '复制链接成功'
              });
                  clipboard.destroy()  
                })  
                clipboard.on('error', e => {  
                   this.$notify.error({
                      title: '失败',
                      message: '您的浏览器不支持复制功能'
                    });
                  clipboard.destroy()  
                })  
    },
    /**
     * 上传文件
     */
    submitUpload() {
      try {
        this.loading = true
        let length = this.fileList.length
        if(this.fileList.length===0){
          this.$notify.error({
            title: '错误',
            message: '你还没有选择文件'
          });
          this.loading = false
        }
        if(this.type==='上传默认路径'){
          this.fileList.forEach((ele,index)=>{
              let formData = new FormData();
              let name = `file`
              let file = ele.raw
              formData.append(name,file)
              Api.upload(formData).then(res=>{
                console.log(res)
              this.result.push(res.data.url)
              this.loading = false
              this.fileList=[]
              this.$notify.success({
                  title: '成功',
                  message: '上传成功'
                });
              }).catch(err=>{
                this.$notify.error({
                  title: '错误',
                  message: '上传失败'
                });
              })
            })

        }else if(this.type==='上传指定路径'){
          if(this.value===''){
            this.$alert('未选择上传路径', '标题', {
              confirmButtonText: '确定',
            });
            return false
          }
          this.fileList.forEach((ele,index)=>{
              let formData = new FormData();
              let name = `file`
              let file = ele.raw
              formData.append(name,file)
              formData.append('dir',this.value)
              Api.upload(formData).then(res=>{
              this.result.push(res.data.url)
              this.loading = false
              this.fileList=[]
              this.$notify.success({
                  title: '成功',
                  message: '上传成功'
                });
            }).catch(err=>{
              this.$notify.error({
                title: '错误',
                message: '上传失败'
              });
            })
          })
      }
      } catch (error) {
        this.$notify.error({
                title: '错误',
                message: '上传失败'
              });
      }
      
    },
    /**
     * 上传文件发生变化的函数
     */
    fileChange(file,files){
      // console.log(files)
      this.fileList = files
      console.log(this.fileList)
    },
    /**
     * 点击移除已选文件的操作
     */
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.fileList = files
      console.log(this.fileList)
    },
    /**
     *  点击已选文件时的操作
     */ 
    handlePreview(file) {
      // console.log(file);
    }
  }
}
</script>
<style lang="stylus">
bgColor= #37474f
fontColor = #fff
hoverColor = #409eff
fontSize = 22px
.file-page{
  padding 0 10vw
  min-height 800px
  height 100%
  display flex
  flex-direction column
  padding-bottom 40px
  .file-title{
    padding 14px
    font-size 16px
    overflow: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing 5px
    font-weight bold
    text-align left
    border-bottom 1px solid #ccc
  }
  .file-content{
    .type-box{
      width 70%
      padding 20px 0  
      margin 0 auto
      display flex
      .el-radio-group{
        float right
      }
      .top-center-box{
        flex-grow 1
      }
    }
    .submit-button{
      width 70%
      padding 20px 0 
      margin 0 auto
      .el-button--primary{
        width 100%  
      }
    }
    .result-box{
      width 70%
      margin 0 auto
      overflow hidden
      border 1px dashed #ccc
      border-radius 10px
      background-color #fff
      display flex
      flex-direction column
      .result-fa-box{
        padding 0 20px
        p{
          padding 18px 0
          border-bottom 1px solid #ddd
          text-align left
          font-weight bold
          font-size 15px
        a{
          float right
          color #aaa
          font-size 12px
          cursor pointer
          transition all .3s ease-in-out
        }
        a:hover{
          color hoverColor
        }
      }
      .result-child-box{
        display flex
        flex-direction row
        p{
          flex-grow 0
          text-align center
          width 100px
          border 0
        }
        a{
          flex-grow 1
          color hoverColor
          padding 18px 0
          text-decoration none
        }
        a:hover{
          text-decoration underline
        }
        P:nth-child(3){
          font-size 13px
          font-family 400
          cursor pointer
        }
      }
      .no-data-box{
        padding 10vh
        i{
          font-size 60px
        }  
      }
      }
      
    }
  }
  .el-upload{
    width 70%
    height 25vh
    min-height 180px
    .el-upload-dragger{
      width 100%  
      height 25vh
      min-height 180px

    }
  .el-icon-upload{
    margin-top 7vh  
  }
  .el-upload__text{
    padding 15px
  }
  }
  }
  @keyframes identifier {
    from{
      left -40vw

    }
    to{
      left 0
    }
  }
@keyframes identifier-cor {
    from{
      right -100vw

    }
    to{
      right 0
    }
  }
</style>
