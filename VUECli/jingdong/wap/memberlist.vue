<template>
	<div class="member_list">
		<!-- header信息 -->
		<DHeader :title='title'	v-on:lcallBack='goReturn'></DHeader>
		<!-- tab部门导航区 -->
		<Slider :navData="navData" :curIndex="curIndex" @toggleTab="toggleTab"  ref="sliders"></Slider>
		<!-- 主要内容区 -->
		<memberInfo :data="data" @onPull="onPulling"></memberInfo>
	</div>
</template>

<script>
import { DHeader} from 'diwork-ui';
import { Toast, MessageBox, Indicator } from 'mint-ui'
import NativeObj from '@/utils/jsbridge/index'
import {fetchData} from 'hr-utils'
import memberInfo from './components/memberinfo'
import Slider from './components/slider'
export default{
	name:'teampicture',
	components:{
		DHeader,
		Slider,
		memberInfo
	},
	data(){
		return {
			title:this._sn('Diwork.i18n232'),
			dept_id:'',
			staff_id:'',
			listpage:1,
			len:0,
			navData:[{'name':this._sn('common.i18n22'),'id':'','pageNum':1,data:[]}],
			curIndex:0,
			data:{}
		}
	},
	created(){
	  this.getMemberList();
	  this.getNavBar();
  },
	methods:{
		//获取所辖部门数据
        getNavBar(){
            var Width=0;
            var pad=document.documentElement.style.fontSize;
            pad=parseInt(pad)*0.56;
            fetchData({
                url : '/corehr-staff-mgr/corehr/staff/queryOrgByPrincipal',
                method : 'get',
                param : {},
                mock : false,
                contentType : "application/x-www-form-urlencoded",
                success : res => {
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].orgtype==2){
                            this.navData.push({'name':res.data[i].name,'id':res.data[i].id,'pageNum':1,'data':[]})
                        }
                    }
                    this.$refs.sliders.refresh();
                },
                error : err => {
                    Indicator.close()
                    Toast(err.message)
                }
            })
        },
        // 获取人员列表信息
        getMemberList(dept_id){
            this.staff_id=this.$route.query.staffId;
            if(!dept_id){
                this.dept_id='';
            }else{
                this.dept_id=dept_id;  			
            }
            this.staff_id = this.$route.query.staffId
            Indicator.open({
                text: this._sn('common.i18n1'),
                spinnerType: 'fading-circle'
            });
            fetchData({
                url : '/corehr-staff-mgr/corehr/staff/queryStaffPage',
                method : 'get',
                param : {
                    deptId:this.dept_id,
                    rptrelld:this.staff_id,
                    isDeptInfo: true,
                    isApp: true,
                    pageNum:this.navData[this.curIndex].pageNum,
                    pageSize:10,
                    staffstate:1,
                    //tenantId:that.listPageData.tenantId,
                },
                mock : false,
                contentType : "application/x-www-form-urlencoded",
                success : res => {
                    Indicator.close()
                    this.len=res.data.content.length;
                    if(res.data.content.length==0){
                        Toast(this._sn('Diy.i18n2000000'))
                    }
                    for(var i=0;i<this.len;i++){
                        this.navData[this.curIndex].data.push(res.data.content[i]);
                    }
                    if(this.len>0){
                        this.navData[this.curIndex].pageNum++;
                    }
                    this.data=this.navData[this.curIndex].data;
                },
                error : err => {
                    Indicator.close();
                    Toast(err.message);
                }
            })
        }, 
        goReturn() {
            this.$router.go(-1);
        },
        // tab监听绑定事件
        toggleTab(nav,index){
            if(index>=0){
                this.curIndex=index;
            }
            this.listpage=1;
            if(this.navData[this.curIndex].data.length==0){
                this.getMemberList(nav.id);
            }else{
                this.data=this.navData[this.curIndex].data;
            }
        },
        // 上一页或下一页
        onPulling(index){
            if(index===0){
                console.log(this._sn('Diwork.i18n2018091932'))
                this.navData[this.curIndex].pageNum=1;
                this.navData[this.curIndex].data=[];
                this.getMemberList(this.navData[this.curIndex].id);
            }else if(index===1){
                console.log(this._sn('Diwork.i18n2018091933'));
                this.getMemberList(this.navData[this.curIndex].id);
            }
        }
	},
}
</script>
<style lang="less" scoped>
.member_list{
  width: 7.5rem;
  overflow-x: hidden;
}
</style>