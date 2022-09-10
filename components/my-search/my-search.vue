<template>
  <view>
    <view class="my-search-container" :style="{'background-color':bgcolor}">
      <view class="my-search-box" @click="searchBoxHandler()"  :style="{'border-radius':radius +'px'}">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      bgcolor:{
        //背景颜色
        type:String,
        default:'#C00000'
      },
      //圆角尺寸
      radius:{
        type:Number,
        default:18
      }
    },
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #c00000;
  padding: 0 10px;
  .my-search-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    background-color: #fff;
    // border-radius: 18px;
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>