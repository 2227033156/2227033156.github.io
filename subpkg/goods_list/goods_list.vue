<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
       <my-goods :goods="item"></my-goods>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        //节流阀
        isloading:false
      };
    },
    onLoad(options) {
      this.queryObj.query=options.query||''
      this.queryObj.cid=options.cid||''
      this.getGoodsList()
    },
    methods:{
     async getGoodsList(cb){
       this.isloading=true
       const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       this.isloading=false
       //只要数据请求完毕，就立即调用cb回调函数。下面这种写法可以让有传参数的函数执行，像上拉加载没传参数就不执行。可以叫做短路运算符
       cb&&cb()
       if(res.meta.status!==200) return uni.$showMsg()
       this.goodsList=[...this.goodsList,...res.message.goods]
       this.total=res.message.total
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    },
    onReachBottom(){
      if(this.queryObj.pagenum * this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕')
      if(this.isloading) return
      this.queryObj.pagenum+=1
      this.getGoodsList()
    },
    onPullDownRefresh(){
     this.queryObj.pagenum=1,
     this.total=0,
     this.isloading=false,
     this.goodsList=[]
     //重新发起请求
     this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
 
</style>
