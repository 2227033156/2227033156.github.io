  import {mapGetters} from 'vuex'
  export default{
    computed:{
        ...mapGetters('m_cart',['total'])
      },
      methods:{
        setBadge(){
          // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
          uni.setTabBarBadge({
            index:2,
            text:this.total+''// 注意：text 的值必须是字符串，不能是数字
          })
        },
        removeBadge(){
            uni.removeTabBarBadge({
              index:2,
              text:''
            })
          }
        },
      watch: {
        total(val){
          if(val===0){
            this.removeBadge()
          }else{
             this.setBadge()
          }
        }
      },
      onShow() {
        if(this.total===0){
          this.removeBadge()
        }else{
          this.setBadge()
        }       
      }
    }