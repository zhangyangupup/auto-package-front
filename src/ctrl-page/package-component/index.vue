<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
   class="package-page vcontent">
    <p class="title-box">前端应用构建平台</p>
    <div class="choose-type">
      <span class="choose-type-title"> <p><el-radio v-model="radio" label="1">上传文件压缩包</el-radio></p> <p><el-radio v-model="radio" label="2">git仓库获取</el-radio></p></span>
      <div class="tabs-box">
        <div class="tab-left">
          <el-upload
            class="upload-demo"
            drag
            ref="upload"
            :disabled="uploadDis"
            action="http://localhost"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="fileChange"
            :auto-upload="false"
            multiple>
            <i class="el-icon-upload"></i>
            <div  class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div style="flexGrow:1;padding:10px 0"  class="el-upload__tip" slot="tip">只能上传zip文件，大小尽量不要超过10M</div>
          </el-upload>
          <div class="kong-box">

            </div>
          <div class="submit-button">
            <el-button  @click.native="submitUpload" type="primary" round>上传</el-button>
          </div>
        </div>
        <div class="tab-right">
          <div class="tab-right-box">
            <p>git地址：</p>
            <el-input :disabled="!uploadDis" v-model="gitAddress" placeholder="请输入构建代码资源git地址（master分支）"></el-input>
            <p>项目名称：</p>
            <el-input :disabled="!uploadDis" v-model="proName" placeholder="请输入项目名称或包名称"></el-input>
            <div class="kong-box">

            </div>
             <div class="submit-button-right">
                <el-button @click="sureBtn" type="primary" round>确认</el-button>
             </div>
          </div>
        </div>
      </div>
      <div class="bigin-package">
        <el-button @click="beginPackage"  type="success" :loading="isPackage">{{!isPackage?'开始构建':'构建中'}}</el-button>
      </div>
    </div>
    <p v-if="packagePath !== '' || zipPath !== ''" class="success-box-title">构建完成</p>
    <div v-if="packagePath !== '' || zipPath !== ''" class="result-path-box">
      <p>构建部署地址：</p>
      <a :href="packagePath" target="_blank">{{packagePath}}</a>
    </div>
    <div v-if="packagePath !== '' || zipPath !== ''" class="result-path-box">
      <p>压缩包地址：</p>
      <a :href="zipPath" target="_blank">{{zipPath}}</a>
    </div>
    <!-- 开始打包 -->
   
    <!-- 打包进程 -->
    <div class="process-box">
      <p class="process-box-title">打包进程 <a style="fontWeight:400;fontSize:14px;float:right">msg:{{processRes.length}}</a> </p>
      <div v-if="processRes.length===0" class="no-data-box">
          <i class="iconfont icon-aislogo"></i>
      </div>
      <div v-if="processRes.length !== 0" class="process-words-box">
          <p v-for="(item,index) in processRes" :key='index'>【打包进程】：{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '../../api/centerCtrl.js'

export default {
  components:{
  },
  data(){
    return {
      showDrawer:false,
      radio:'1', // 代码资源方式
      gitAddress:"",
      fileList: [],
      loading:false,
      isPackage:false,
      path:"ws://106.12.58.11:13222",
      // path:"ws://localhost:13222",
      socket:"",
      type:"上传默认路径",
      value: '',
      result:[],
      fileName:'',
      zipPath:'',
      packagePath:'',
      processRes:[
       
      ],
      data:{
        length:1
      }
    }
  },
  mounted() {
    if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        console.log("socket成功连接");
        console.log('====================================');
          // 实例化socket
          this.socket = new WebSocket(this.path)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
      }
  },
  computed: {
    uploadDis() {
      if(this.radio!=='1'){
        return true
      }else{
        return false
      }
    },
    proName(){
      if(this.gitAddress!==''){
        let a = this.gitAddress.split('.git')[0].split('/')
        console.log(a)
        let len = a.length
        return a[len-1]
      }
    }
  },
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  },
  methods:{
    open: function () {
        console.log("socket连接成功")
    },
    error: function () {
        console.log("错误")
        this.isPackage = false


    },
    getMessage: function (msg) {
        console.log(msg.data)
        this.processRes.unshift(msg.data)
        if(msg.data.indexOf('[success]')>-1){
          this.isPackage = false
          this.packagePath = msg.data.split('打包成功:')[1]
          this.$notify({
            title: '构建完成',
            message: `部署地址：${this.packagePath}`,
            duration: 0
          });
        }
        if(msg.data.indexOf('[zip]')>-1){
          this.isPackage = false
          this.zipPath = msg.data.split(']:')[1]
          this.$notify({
            title: '构建完成',
            message: `压缩包地址：${this.zipPath}`,
            duration: 0
          });
        }
    },
    send: function (params) {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
        this.isPackage = false
    },
    beginPackage(){
      debugger
      let shell = ''
      this.isPackage = true
      if(this.radio === '1'){
        if(this.result.length<1){
          this.$notify.error({
              title: '错误',
              message: `您还没有上传资源文件`
            });
        this.isPackage = false
        return 
        }
        shell = `autoPackage&${this.result[0].dirName}`
        // 上传资源包方式
        this.send(shell)
      }else{
        if(this.gitAddress==='' || this.proName===''){
          this.$notify.error({
              title: '错误',
              message: `您还没有输入代码资源git地址`
            });
        this.isPackage = false
        return 
        }
        shell=`autoPackageGit&${this.gitAddress}`
        this.send(shell)
      }
      
    },
    sureBtn(){
      if(this.gitAddress!=='' || this.proName!==''){
          this.$notify.success({
              title: '保存成功',
              message: `${this.proName}可以开始构建`
            });
      }else{
          this.$notify.error({
              title: '保存失败',
              message: `请检查构建项`
            });
      }
    },
    /**
     * 上传文件
     */
    submitUpload() {
      this.loading = true
      debugger
        let length = this.fileList.length
        if(this.fileList.length===0){
          this.$notify.error({
            title: '错误',
            message: '你还没有选择文件'
          });
          this.loading = false
        }else{
          let a = this.fileList[0].raw.name.split('.')[1]
          this.fileName = this.fileList[0].raw.name.split('.')[0]
          debugger
          if(a==="zip"){
                let formData = new FormData();
                let name = `file`
                let file = this.fileList[0].raw
                formData.append(name,file)
                formData.append('dir','project')
                formData.append('project',true)
                Api.upload(formData).then(res=>{
                this.result.push(res.data)
                this.loading = false
                  this.fileList=[]
                this.$notify.success({
                  title: '成功',
                  message: `上传资源包成功，可以开始构建命令`
                });
                }).catch(err=>{
                  this.$notify.error({
                    title: '错误',
                    message: '上传失败'
                  });
                })
                }else{
                this.$notify.error({
                    title: '错误',
                    message: '只能上传zip格式压缩包'
                  });
                  this.loading = false
                  this.isPackage = false

              }
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
.package-page{
  height 100%
  display flex
  padding 0 16vw
  min-height 800px
  flex-direction column
  overflow hidden
  overflow-y scroll
  .title-box{
    padding 18px 0
    text-align left
    font-weight bold
    font-size 20px
    min-height 20px
    border-bottom 1px solid #ccc
  }
  .choose-type{
    display flex
    flex-direction column
    min-height 455px
    .choose-type-title{
      padding 10px
      text-align left
      font-weight bold
      display flex
      flex-direction row
      p{
        font-weight bold
        flex-grow 1
      }
      .el-radio__input{
        font-weight bold

      }
      .el-radio__label{
        font-weight bold
      }
      p:nth-child(2){
        text-align right
      }
    }
    .tabs-box{
      display flex
      flex-direction row
      .tab-left{
        height 100%
        padding 10px 0
        width 50%
        border-right 1px solid #ccc
        display flex
        flex-direction column
        .kong-box{
            flex-grow 1
          }
        .submit-button{
          width 360px
          margin 0 auto
          button{
            width 100%
          }
        }
      }
      .tab-right{
        width 50%
        padding 10px 0
        .tab-right-box{
          height 100%
          width 80%
          margin 0 auto
          display flex
          flex-direction column
          p{
            text-align left
            padding 12px 0
          }
          .kong-box{
            flex-grow 1
          }
          .submit-button-right{
            width 100%
            button{
              width 50%
            }
          }
        }
      }
    }
  }
  .bigin-package{
    padding 5vh
    border-bottom 1px solid #ccc
    button{
      width 30%
    }
  }
  .success-box-title{
    text-align left
    font-weight bold
    font-size 15px
    min-height 15px
    padding-bottom 10px
    border-bottom 1px solid #ccc
  }
  .result-path-box{
    padding 3vh
    display flex
    flex-direction row
    p:nth-child(1){
      flex-grow 0
      font-size 13px
      min-width 20vw
    }
    a{
      text-align right
      flex-grow 1
      color hoverColor
      font-size 12px
    }
  }
  .process-box{
    display flex
    padding-bottom 40px
    flex-direction column
    .process-box-title{
      padding 18px
      text-align left
      font-size 17px
      font-weight bold
      min-height 20px
    }
    .process-words-box{
      border-radius 5px
      overflow hidden
      overflow-y scroll
      max-height 500px
      background-color rgba(0,0,0,0.8)
      .result-word-box{
        padding 10px
      }
      p{
        padding 13px 10px
        color #fff
        text-align left
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
