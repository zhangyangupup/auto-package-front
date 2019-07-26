<template>
  <div class="ctrl-page vcontent">
    <!-- header -->
    <div class="ctrl-header-box">
      <i @click="showPop" class="iconfont icon-gengduo4"></i>
      <span>
        MUHAN
      </span>
      <i class="iconfont icon-app1"></i>
    </div>
    <!-- body -->
    <div class="ctrl-body-box">
      <!-- 内容区 -->
      <file-com v-if="selectTab===0"/>
      <package-com v-if="selectTab===1"/>
      <!-- 侧边框 -->
      <div v-if="showDrawer" class="drwer-box">
        <div class="drwer-header">
        </div>
        <div class="drwer-body">
          <div class="drwer-body-header">
            <i @click="hideMask" class="iconfont icon-kaiguan"></i>
          </div>
          <ul>
            <li @click="chooseThisTab(item,index)" v-for="(item, index) in list" :key='index'>
              <i :class="item.icon"></i>
              <p>{{item.text}}</p>
            </li>
          </ul>
        </div>
        <div class="drwer-footer">
        </div>
      </div>
    </div>
    <!-- mask -->
    <div @click="hideMask" v-if="showDrawer" class="mask-box">
    </div>
    <!-- mask -->
    <div v-if="!showDrawer" @click="showPop" class="sild-button">
      <i class="iconfont icon-liebiao3"></i>
    </div>
    <!-- footer -->
    <div class="ctrl-footer-box">
      <i></i>
      <span>center conctrl</span>
      <i></i>
    </div>
  </div>
</template>
<script>
import FileCom from './file-component/index.vue'
import PackageCom from './package-component/index.vue'
export default {
  components:{
    FileCom,
    PackageCom
  },
  data(){
    return {
      showDrawer:false,
      selectTab:0,
      list:[
        {
          icon:'iconfont icon-fenxiang',
          text:"文件上传"
        },
        {
          icon:'iconfont icon-yingyong2',
          text:"前端应用打包"
        }
      ]
    }
  },
  mounted(){

  },
  methods:{
    trantions(){
      this.$router.push({name:'SearchPage'})
    },
    chooseThisTab(item,index){
      this.selectTab = index
      this.showPop()
    },
    // showDrawer
    showPop(){
      this.showDrawer = !this.showDrawer
    },
    // mask
    hideMask(){
      this.showDrawer = !this.showDrawer
    },
    goApp(name,title){
      this.$store.commit('setBaiduSe',title)
      this.$router.push({
          name:name,
          params:{
            title:title
          }
        })
      }
  }
}
</script>
<style lang="stylus">
bgColor= #37474f
fontColor = #fff
hoverColor = #409eff
fontSize = 20px
.ctrl-page{
  height 100vh
  width 100vw
  display flex
  flex-direction column
  
  .ctrl-header-box, .ctrl-footer-box{
    display flex
    flex-direction row
    flex-grow 0
    height 50px
    line-height 50px
    min-height 50px
    background-color bgColor
    color fontColor
    font-size fontSize
    z-index 12
    i:hover{
      cursor pointer
      // color hoverColor
      transition all .2s ease-in-out
      background-color rgba(0,0,0,0.8)
     }
    i:nth-child(1), i:nth-child(3){
      flex-grow 0
      width 5vw
      font-size fontSize
    }
    span{
      flex-grow 1
      text-align left
      letter-spacing 3px
      font-size 20px
      font-weight bold
      padding 0 10px
    }
  }
  .ctrl-footer-box{
    height 30px
    line-height 30px
    min-height 30px
    span{
      text-align center
      font-weight 300
      font-size 14px
      letter-spacing 20px
    }
  }
  .ctrl-body-box{
    flex-grow 1
    background-color #f7f7f7
    overflow hidden
    overflow-y scroll
    .drwer-box{
      position absolute
      top 0px
      height 100%
      width 20vw
      background-color rgba(250,250,250,1)
      animation identifier 0.3s ease-in-out
      border-right 1px solid #ddd
      display flex
      flex-direction column
      z-index 11
      .drwer-header, .drwer-footer{
        height 60px
        flex-grow 0
      }
      .drwer-body{
        flex-grow 1
        .drwer-body-header{
          display flex
          flex-direction row
          border-bottom 1px solid #ccc
          i{
            flex-grow 1
            text-align right
            font-size 28px
            padding 10px
            color #aaa
            cursor pointer
          }
          i:hover{
            color hoverColor
            transition all .3s linear
          }  
        }
        ul{
          padding-top 20px
          li{
            padding 0 20px
            display flex
            flex-direction row
            height 60px
            color #212121
            line-height 60px
            cursor pointer
            i{
              height 60px
              line-height 60px
              font-size 26px
              font-weight bold
            }
            p{
              height 60px
              line-height 60px
              font-weight bold
              padding 0 20px
              letter-spacing 3px
              font-size 15px
            }
          }
          li:hover{
            background-color #bbb
            transition all .5s linear
          }
        }
      }
    }
  
  }
  .mask-box{
      position fixed
      top 0px
      width 100vw
      height 100vh
      z-index 10
      // animation identifier-cor 0.2s linear
      background-color rgba(0,0,0,0.4)
    }
    .sild-button{
      position fixed
      left -0px
      top 49vh
      background-color #eee
      border-top-right-radius 5px
      border-bottom-right-radius 5px 
      border 1px solid #ccc
      width 40px
      height 40px
      line-height 40px
      text-align center
      cursor pointer
      box-shadow 3px 3px 10px 1px #aaa
      transition all .3s ease-in-out
      i{
        font-size 22px 
      }
    }
    .sild-button:hover{
      background-color #fff
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
