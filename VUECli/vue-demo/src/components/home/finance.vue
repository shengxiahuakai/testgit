<template>
    <Panel :class="$style.panel" :title="title">
        <section :class="$style.content">
            <div :class="$style.item" v-for="item in items" :key=item.title>
               <h4>{{item.title}}<span :class="$style.label">{{item.label}}</span></h4>
               <p :class="$style.value">{{item.value}}</p>
               <p :class="$style.desc">{{item.desc}}</p>
            </div>
        </section>
    </Panel>
</template>
<script>
import Panel from "../core/panel.vue"
export default{
    name: 'finance',
    components: {
        Panel,
    },
    data () {
        return{
            title: '理财精选',
            items:[
                {title:'长乐盈',label:'180天可质押',value:'5.80%',desc:'近1年历史年化投资回报率'},
                {title:'京智0号',label:'大数据赋能',value:'6.00%',desc:'近1月历史年化投资回报率'},
                {title:'建信养老飞益鑫',label:'1000起投',value:'4.57%',desc:'近7日年化收益'},
                {title:'小白基金',label:'超短期',value:'4.50%',desc:'7日年化收益率'}
            ]
        }
    }
}
</script>
<style lang="scss" module>
@import '../../assets/css/element.scss';
.panel{
    @include panel;
    position:relative;
    >h4{
        border-bottom:none;
    }
    .content{
        @include list(row);
        position:relative;
        .item{
            width: 50%;
            padding-left: 16px;
            height: 109px;
            box-sizing: border-box;
            text-align: left;
            position: relative;
            h4{
                font-weight: 700;
                font-size: 15px;
                display: block;
                height: 21px;
                line-height: 21px;
                width:100%;
                margin: 17px 0 8px;
                .label{
                    box-sizing: border-box;
                    border: 1px solid #FF5155;
                    font-size: 11px;
                    padding: 2px 4px;
                    color:#FF5155;
                    position: relative;
                    top: -1.5px;
                    left: 4px;
                    font-weight: normal;
                }
            }
            .value{
                font-weight: 700;
                font-size: 22px;
                height: 29px;
                line-height: 29px;
                color: #FF5155;
                margin-block-start: 0px;
                margin-block-end: 0px;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
            }
            .desc{
                font-size: 12px;
                height: 17px;
                line-height: 17px;
                color: #999;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin:0px;
            }
        }
        .item:nth-child(odd):after {
            content: '';
            position: absolute;
            right: 0;
            width: 1px;
            display: block;
            background: #eee;
            -webkit-transform: scaleX(.5);
            -ms-transform: scaleX(.5);
            transform: scaleX(.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            height: 68px;
            top: 20px;
        }
    }
    .content:after {
        content: '';
        position: absolute;
        bottom: 109px;
        left: 0;
        width: 100%;
        height: 1px;
        display: block;
        background: black;
        transform: scaleY(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
}
</style>