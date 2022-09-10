export default{
  //表示为当前模块开启命名空间
  namespaced:true,
  state:()=>({
     // 购物车的数组，用来存储购物车中每个商品的信息对象
     // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync('cart')||'[]')
  }),
  mutations:{
    addToCart(state,goods){
         // 根据提交的商品的Id，查询购物车中是否存在这件商品
            // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
     const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
     if(!findResult){
       state.cart.push(goods)
     }else{
       findResult.goods_count++
     }
     // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
     this.commit('m_cart/saveToStorage')
    },
    //存储到本地
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    //更新购物车中商品的勾选状态
    updateGoodsState(state,goods){
     const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
     if(findResult){
       findResult.goods_state=goods.goods_state
        this.commit('m_cart/saveToStorage')
     }
    },
    //更新商品数量
    updateGoodsCount(state,goods){
      const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
      if(findResult){
        findResult.goods_count=goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    //根据id删除对应的商品
    removeGoodsById(state,goods_id){
     state.cart = state.cart.filter(x=>x.goods_id!==goods_id)
     this.commit('m_cart/saveToStorage')
    },
    //点全选复选框后更新所有商品的勾选状态
    updateAllGoodsState(state,newState){
      state.cart.forEach(x=>x.goods_state=newState)
       this.commit('m_cart/saveToStorage')
    }
  },
  getters:{
    //购物车中所有商品的总数量
    total(state){
      let c=0
      state.cart.forEach(x=>c+=x.goods_count)
      return c
    },
    //购物车中处于勾选状态的是商品的数量
    checkedCount(state){
     return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
    },
    //已勾选商品的总价格
    checkedGoodsAmount(state){
     return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
    }
  }
}