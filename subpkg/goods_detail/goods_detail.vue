<template>
  <!-- 在商品详情数据请求回来之前，data 中 goods_info 的值为 {}，因此初次渲染页面时，会导致 商品价格、商品名称 等闪烁的问题。所以加个v-if判断 -->
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <!-- 商品轮播图片区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
       <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <view class="price">￥{{goods_info.goods_price.toFixed(2)}}</view>
      <view class="goods-info-body">
        <view class="goods_name">{{goods_info.goods_name}}</view>
        <view class="favi">
          <uni-icons type="star" size="17" color="gray" :class="[active?'active':'']" @click="changeActive"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    computed:{
     ...mapState('m_cart', []),
     ...mapGetters('m_cart',['total'])
    },
    watch:{
      total:{
       handler(newVal){
          const findResult=this.options.find(x=>x.text==='购物车')
          if(findResult){
            findResult.info=newVal
          }
        },
         // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
          immediate:true
      }
    },
    data() {
      return {
        goods_info:{},
        active:false,
        options: [{
        					icon: 'shop',
        					text: '店铺',
        					infoBackgroundColor: '#007aff',
        					infoColor: "#f5f5f5"
        				}, {
        					icon: 'cart',
        					text: '购物车',
        					info: 0
        				}],
    buttonGroup: [{
    		text: '加入购物车',
    	backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
    		color: '#fff'
    					},
    					{
    						text: '立即购买',
    						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    						color: '#fff'
    					}
    				]
      };
    },
    onLoad(options) {
      const goods_id=options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods:{
      ...mapMutations('m_cart',['addToCart']),
     async getGoodsDetail(goods_id){
      const {data:res} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
      if(res.meta.status!=200) return uni.$showMsg()
      // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题。/g是全局替换的.后面那个是全局替换掉webp格式的图片变成jpg，因为webp格式苹果手机有时加载不出来
      res.message.goods_introduce= res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g,'jpg')
      this.goods_info=res.message
      },
      // 实现轮播图的预览效果
      preview(i){
        // 调用 uni.previewImage() 方法预览图片
        uni.previewImage({
           // 预览时，默认显示图片的索引
          current:i,
          // 所有图片 url 地址的数组
          urls:this.goods_info.pics.map((x)=>x.pics_big)
        })
      },
      onClick(e){
        if(e.content.text==='购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      buttonClick(e){
        if(e.content.text==='加入购物车'){
          //组织商品的信息对象
          //{ goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
          const goods={
            goods_id:this.goods_info.goods_id,
            goods_name:this.goods_info.goods_name,
            goods_price:this.goods_info.goods_price,
            goods_count:1,
            goods_small_logo:this.goods_info.goods_small_logo,
            goods_state:true
          }
          this.addToCart(goods)
        }
      },
      changeActive(){
        this.active=!this.active
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 750rpx;
  image{
    height: 100%;
    width: 100%;
  }
}
.goods-info-box{
  padding: 10px;
  padding-right: 0px;
  .price{
    font-size: 18px;
    color: #c00000;
    margin: 10px 0;
  }
  .goods-info-body{
    display: flex;
    // justify-content: space-between;
    .goods_name{
      font-size: 13px;
      margin-right: 10px;
    }
    .favi{
          display: flex;
          width: 120px;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          color: gray;
          border-left: 1px solid #efefef;       
    }
  }
  .yf{
    font-size: 12px;
    margin: 10px 0;
    color: gray;
  }
}
.goods_nav{
  // position: fixed;
    position: sticky;
  bottom: 0;
  left: 0;
  // width: 100%;
}
// .goods-detail-container{
//   padding-bottom: 50px;
// }
.active{
  background-color: yellow;
}
</style>
