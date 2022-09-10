<template>
  <view class="cart-contain" v-if="cart.length!==0">
    <my-address></my-address>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 购物车里商品列表 -->
    <uni-swipe-action>
      <block v-for="(item,i) in cart" :key="i">
       <uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(item)">
        <my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
       </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 使用自定义的结算组件 -->
    <my-settle></my-settle>
  </view>
  
  <!-- 空白购物车的区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import {mapState,mapMutations} from 'vuex'
  export default {
    mixins:[badgeMix],
    computed:{
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        options:[{
          text:'删除',
          style:{
            backgroundColor:'#c00000'
          }
        }]
      };
    },
    methods:{
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
      radioChangeHandler(e){
        this.updateGoodsState(e)
      },
      numberChangeHandler(e){
        this.updateGoodsCount(e)
      },
      swiperItemClickHandler(item){
        this.removeGoodsById(item.goods_id)
      }
    }
    }
</script>

<style lang="scss">
.cart-contain{
  padding-bottom: 50px;
}
.cart-title{
  display: flex;
  height: 40px;
  padding-left: 5px;
  border: 1px solid #efefef;
  align-items: center;
  .cart-title-text{
    font-size: 14px;
    margin-left: 10px;
  }
}
.empty-cart{
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img{
    height: 90px;
    width: 90px;
  }
  .tip-text{
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
