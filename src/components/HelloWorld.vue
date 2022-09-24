<template>
  <div class="hello">
    <slot></slot>
    <p @click="Go" v-html=html></p>
  </div>
  <h2></h2>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: 'HelloWorld',
  props: {
    html:String,
    Data:Array
  },
  setup(props){
    const retser = useRouter()
    function Go(){
      retser.push({name:'about',params:{shp:JSON.stringify(props.Data)}})
    }
    return {
      Go
    }
  }
}
</script>

<style scoped lang="scss">
  .hello{
    width: 100%;
    height: 3.5rem;
    position: fixed;
    text-align: center;
    background-color: rgb(244, 209, 164);
    p{
      margin-top: 0.5rem;
    }
  }
</style>
