<template>
  <view>
     <view class="goods-item">
              <view class="goods-item-left">
                <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
                <image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
              </view>
              <view class="goods-item-right">
                <view class="goods-name">{{goods.goods_name}}</view>
                <view class="goods-info-box">
                  <!-- 过滤器的管道符 -->
                  <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
                  <!-- 商品加减 -->
                  <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
                </view>
              </view>
            </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        //默认的图片，图片失效时用它替代
        defaultPic: 'https://img11.360buyimg.com/babel/s320x320_jfs/t1/147837/10/19673/77101/61566983Ee7096210/66afbae6a1d85c2d.jpg!cc_320x320.webp'
      };
    },
    methods:{
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state,
        })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+val//+是为了让它是number
        })
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
 .goods-item{
    display: flex;
    box-sizing: border-box;
    width: 750rpx;
    padding: 10px 5px;
    border: 1px solid #f0f0f0;
    .goods-item-left{
      display:flex;
      align-items: center;
      justify-content: space-between;
      .goods-pic{
        display: block;
        height: 100px;
        width: 100px;
        margin-right: 5px;
      }
    }
    .goods-item-right{
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 5px;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-price{
          font-size: 16px;
          color: #c00000;
        }
      }
    }
}
</style>