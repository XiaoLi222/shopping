<template>
  <div class="home">
    <HelloWorld :html=i :Data=Data.shoppinglist>
      <div class="yuan"><p>{{shoppingnums}}</p></div>
    </HelloWorld>
    <article >
      <div class="box" v-for="(item) in Data.list" :key="item.skuId">
        <div class="img">
          <img :src="item.spuInfo.images" alt="">
        </div>
        <div class="cont">
          <p>{{item.spuInfo.spuTitle}}</p>
          <p>{{item.spuInfo.spuSubTitle}}</p>
          <p>{{item.spuInfo.price}}</p>
        </div>
        <button @click="AddShopping(item.spuInfo)">加入购物车</button>
      </div>
    </article>
  </div>
</template>

<script>
// 组件懒加载
import {defineComponent,defineAsyncComponent,reactive,getCurrentInstance,
  computed
} from 'vue'
const HelloWorld = defineAsyncComponent(()=>import('../components/HelloWorld.vue'))

export default defineComponent({
  components:{
    HelloWorld
  },
  setup(){
    let i = '<i class="iconfont icon-gouwuchekong"></i>'
    const Data = reactive({
      list:[],
      shoppinglist:[],
    })
    const {proxy} = getCurrentInstance()
    const methods = reactive({
      //获取全部商品的数据
      GetAllData(){
        proxy.$http.get('/api/list').then(res=>{
          const {data:li} = res.data
          const {list:da} = li
          Data.list = da
        })
      },
      //添加商品到购物车
      AddShopping(obj){
        let sp = Data.shoppinglist.findIndex(val=>val.skuId == obj.skuId)
        if(sp == -1){
          //动态为对象添加属性
          Reflect.set(obj,'flag',false)
          Reflect.set(obj,'store_nums',1)
          Data.shoppinglist.push(obj)
        }else{
          Data.shoppinglist[sp].store_nums++
        }
      }
    })
    let shoppingnums = computed(()=>{
        return Data.shoppinglist.reduce((acc,cur)=>{
          return acc+cur.store_nums
        },0)
    })
    return {
      i,...methods,Data,shoppingnums
    }
  },
  created(){
    this.GetAllData()
  }
})
</script>

<style scoped lang="scss" >
  .home{
    width: 100%;
    height:100%;
    display:flex;
    flex-direction: column;
    article{
      width:100%;
      height:90%;
      position: absolute;
      overflow-x: hidden;
      display: flex;
      flex-wrap: wrap;
      margin-top:4em;
      .box{
        width: 12%;
        height: 40%;
        margin-bottom: 00.8rem;
        margin-right: 2.16rem;
        display: flex;
        flex-direction: column;
        border: 1px solid;
        .img{
          width: 90%;
          height: 40%;
          border-radius: 0.5rem;
          margin: 0.5rem auto;
          border: 1px solid;
          img{
            height: 100%;
            width: 100%;
            border-radius: 0.5rem;
          }
        }
        .cont{
          width: 100%;
          height: 50%;
          border: 1px solid;
          p{
            text-align: center;
            font-size: 0.9rem;
          }
          p:nth-child(1){
            margin-top: 0.5rem;
          }
        }
        button{
          width: 100%;
          height: 10%;
          cursor: pointer;
          background-color: rgb(141, 222, 241);
          border: none;
          color: rgb(0, 0, 255);
          font-weight: 900;
          font-size: 1rem;
        }
      }
    }
    .yuan{
      position: absolute;
      margin-left: 49.7%;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: #ffffff;
      p{
        font-size: 0.8rem;
        color: red;
        font-weight: 800;
      }
    }
  }
</style>