<template>
    <div id="tab-nav" class="navbar" ref="wrapper">
      <ul ref="sliderGroup">
        <li @click="toggleTab(nav,index)" v-for="(nav,index) in navData" :key="index" ref="slider" :class="{active:index==curIndex}">{{nav.name}}</li>
      </ul>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default{
    name: 'scrollBar',
    props:{
        navData:{
            type:Array
        },
        curIndex:{
            type:Number
        }
    },
    methods:{
        refresh(){
            var Width=0;
            var pad=document.documentElement.style.fontSize;
            pad=parseInt(pad)*0.56;
            this.$nextTick(()=>{
                this.scroll=new BScroll(this.$refs.wrapper,{scrollX:true,scrollY:false,click:true});
                for(var i=0;i<this.$refs.slider.length;i++){
                    Width+=this.$refs.slider[i].clientWidth+pad;
                }
                this.$refs.sliderGroup.style.width = Width+100 + 'px'
                this.scroll.refresh()
            })
        },
        // 导航部门切换
		toggleTab(nav,index){
            this.$emit('toggleTab',nav,index);
        },
    }
}
</script>
<style lang="less" scoped>
.active{
	border-bottom: 1px solid tomato;
}
.navbar{
    width:100%;
    height:0.88rem;
    background:#fff;
    color:rgba(102,102,102,1);
    font-size:0.3rem;
    ul{
      padding-left:0.4rem;
      li{
        display:inline-block;
        margin-right:0.56rem;
        line-height:0.88rem;
      }
    }
  }
</style>