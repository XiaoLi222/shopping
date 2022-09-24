<template>
  <Header>
    <router-link to="/home">
     <button>返回</button>
    </router-link>
  </Header>
  <article>
    <div class="shoppingbox">
      <div class="list" v-for="(item,index) in Data.shp" :key="item.skuId">
        <input type="checkbox" :checked="item.flag" @change="methods.chan($event,index)">
        <div class="img">
          <img :src="item.images" alt="">
        </div>
        <div class="cont">
          <p>{{item.spuTitle}}{{item.spuSubTitle}}</p>
          <div id="price">
            <p>单价：￥{{item.price}}</p>
            <label>
              商品数量
              <input type="button" value="-" @click="methods.sub(index)">
              x{{item.store_nums}}
              <input type="button" value="+" @click="methods.add(index)">
            </label>
          </div>
          <button @click="methods.del(item.skuId)">不想要了</button>
        </div>
      </div>
    </div>
    <div class="shoppingbottom">
      <label>
        <input type="checkbox" :checked=check @change="methods.changeall($event)">全选
      </label>
      <p>结算：<span>￥{{total}}</span></p>
      <button @click="methods.clear">清空</button>
    </div>
  </article>
</template>
<script>
//组件懒加载
import {defineComponent, defineAsyncComponent, reactive, ref, computed} from 'vue'
import {useRoute} from 'vue-router'
const Header = defineAsyncComponent(()=>import('../components/HelloWorld.vue'))
export default defineComponent({
  components:{
    Header
  },
  setup(){
    const route = useRoute()
    const Data = reactive({
      shp:JSON.parse(route.params.shp)
    })
    const check = ref(false)
    const methods = {
      //增加数量
      add(ind){
        Data.shp[ind].store_nums ++
      },
      //减少数量
      sub(ind){
        return Data.shp[ind].store_nums === 1 ? Data.shp[ind].store_nums = 1 : Data.shp[ind].store_nums --
      },
      //单个商品勾选状态
      chan(e,ind){
        Data.shp[ind].flag = e.target.checked
        //判断所有商品是否为勾选状态
        check.value = Data.shp.every(blean=>blean.flag == true)
      },
      //商品全选
      changeall(e){
        check.value = e.target.checked
        Data.shp = Data.shp.map(val=>{
          return {...val,flag:check.value}
        })
      },
      //单个商品删除
      del(id){
        Data.shp = Data.shp.filter(val=>{
          return id !== val.skuId
        })
        if(Data.shp.length === 0){
          check.value = false
        }
      },
      //全选清空
      clear(){
        Data.shp = []
        check.value = false
      }
    }
    //总价
    const total = computed(()=>{
      return Data.shp.filter(val=>val.flag).length ? 
       Data.shp.filter(val=>val.flag).reduce((acc,cur)=>acc+cur.price*cur.store_nums,0) : 0
    })
    return {
      Data,methods,check,total
    }
  }
})
</script>
<style lang="scss" scoped>
button{
  float: left;
  margin-left:1rem;
  margin-top: 1.1rem;
}
article{
  width:100%;
  height:90%;
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top:4em;
  .shoppingbox{
    width: 100%;
    height: 90%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .list{
      width: 100%;
      height: 20%;
      margin-bottom: 0.6rem;
      display: flex;
      border: 1px solid #cccccc;
      .img{
        width: 10%;
        height: 90%;
        margin: auto;
        border-radius: 0.5rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
        }
      }
      .cont{
        width: 90%;
        height: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        >p{
          font-size: 1.5rem;
          margin-left: 00.5rem;
        }
        #price{
          display: flex;
          margin-top: 0.6rem;
          margin-left: 00.5rem;
          label{
            margin-left: 00.8rem;
            input[type="button"]{
              width: 1rem;
            }
          }
        }
        button{
          width: 4rem;
          height: 2rem;
          background-color: red;
          color: white;
          border: none;
          margin-left: 00.5rem;
          margin-top: 0.2rem;
        }
      }
    }
    .list:hover {
      box-shadow: 8px 4px 8px 1px;
    }
  }
  .shoppingbottom{
    width: 100%;
    height: 10%;
    display: flex;
    line-height: 4rem;
    label{
      margin-left: 1rem;
    }
    p{
      margin-left: 2rem;
    }
    button{
      width: 3rem;
      height: 2rem;
      border: none;
      background-color: red;
      color: white;
    }
  }
}
</style>
