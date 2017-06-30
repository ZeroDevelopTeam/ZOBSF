<template>
	<section class="platform-nav">
		<el-row class="nav">
			<el-col :span="5">
				<el-dropdown ref="dropRef"  @visible-change="hiddenType" @command="handleCommand" :hide-on-click="false">
					<el-button type="danger" style="width:190px" ref="butRef">图书分类</el-button>
				  	<el-dropdown-menu slot="dropdown" class="type-list" >
				  		<div v-show="flag" class="type-detail" >
							<ul>
								<li>
									<a href="">中国文学</a>
								</li>
								<li>
									<a href="">外国文学</a>
								</li>
								<li>
									<a href="">历史文献</a>
								</li>
							</ul>
						</div>
				    <el-dropdown-item command="a">中国文学</el-dropdown-item>
				    <el-dropdown-item>外国文学</el-dropdown-item>
				    <el-dropdown-item>历史文献</el-dropdown-item>
				    <el-dropdown-item>小说传记</el-dropdown-item>
				    <el-dropdown-item>教辅资料</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				<div class="right-pic" v-if="specialFlag">
					<a href=""><img src="../../image/newBook.png"/></a>
					<a href=""><img src="../../image/newBook.png"/></a>
					<a href=""><img src="../../image/newBook.png"/></a>
				</div>
			</el-col>
  			<el-col :span="13">
  				<div class="menu">
  					<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="main"><b>首页</b></el-menu-item>
					  <el-menu-item index="hotBook"><b>热门书籍</b></el-menu-item>
					  <el-menu-item index="cheapBook"><b>特价书籍</b></el-menu-item>
					  <el-menu-item index="onlineRetrieve"><b>在线回收</b></el-menu-item>
					</el-menu>
  				</div>
  			</el-col>
  			<el-col :span="6">
  				<el-button type="danger" @click="myCart">购物车(0)</el-button>
  				<el-button>我的订单</el-button>
  			</el-col>
		</el-row>
		<el-row class="picScroll" v-if="specialFlag">
  			<el-col :span="24">
  				<el-row class="pic">
  					<el-col :span="24">
					    <el-carousel height="450px">
					      <el-carousel-item >
							<img src="../../image/3.jpg"/>
					      </el-carousel-item>
					      <el-carousel-item >
							<img src="../../image/2.jpg"/>
					      </el-carousel-item>
					      <el-carousel-item >
							<img src="../../image/1.jpg"/>
					      </el-carousel-item>
					    </el-carousel>
  					</el-col>
  				</el-row>
  			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	activeIndex:this.$route.path.substring(1,this.$route.path.length),
		    	flag:false,
		    	specialFlag:false,
		    	options: [{
		          value: '001',
		          label: '全部分类'
		          
		        }, {
		          value: '002',
		          label: '中国文学'
		        }, {
		          value: '003',
		          label: '外国文学'
		        },
		    	{
		          value: '003',
		          label: '历史文献'
		        }],
		        search:{
		        	search:'',
		        	value: '001'
		        }
		    }
		  },
		methods: {
			handleSelect(key, keyPath) {
		        this.$router.push({ path: '/platform/'+key });
		    },
		    //显示分类
		    handleCommand(){
		    	this.flag=true;
		    },
		    //控制隐藏分类
		    hiddenType(e){
		   		if(!e){
		        	this.flag=false;
		        }
		    },
		    //我的购物车
		    myCart(){
		    	this.$router.push({ path: '/platform/shoppingCart' });
		    },
  		},
  		mounted () {
  			let path = this.$route.path.split("/")[this.$route.path.split("/").length-1];
			if(path=='main' || path == 'hotBook' || path == 'cheapBook'){
				this.specialFlag = true;
			}else{
				this.specialFlag = false;
			}
	  　　	},
		watch:{
		  	"$route"(){
		  		let path = this.$route.path.split("/")[this.$route.path.split("/").length-1];
				if(path=='main' || path == 'hotBook' || path == 'cheapBook'){
					this.specialFlag = true;
				}else{
					this.specialFlag = false;
				}
		  	}
		}
		
	}

</script>
<style scoped lang="scss">
.el-dropdown-menu.type-list{
	filter:alpha(Opacity=90);-moz-opacity:0.9;opacity: 0.9;
	text-align: center;
    width: 190px;
    height: 440px;
}
.type-detail{
	margin-top: -7px;
	background-color: #fff;
	min-width:490px;
	height:450px;
	margin-left:190px;
	position:absolute;
	transform-origin: center top 0px;
}
.right-pic{
	margin-top: 7px;
	position:absolute;
	z-index:3;
	height: 450px !important;
	margin-left:75%;
    img{
        display:block;
        height: 150px;
        margin-bottom: 1px;
    }
    img:hover{
        -webkit-transform:translateX(2px);/*Safari or Chrome*/
        -moz-transform:  translateX(2px);/*Firefox*/
        -ms-transform:  translate(2px);/*IE9*/
        -o-transform:  translateX(2px);/*Opera*/
        transform:  translateX(2px);/*默认w3c*/
    }
}
.nav{
    width: 90%;
    margin: 0 auto;
    border-bottom:3px solid #c7161c;
    .menu{
        .el-menu{
            background-color: white;
            padding-left:50px;
            height: 40px;
        }
        .el-menu-item{
            height: 40px;
            line-height: 40px;
        }
        .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
            border-bottom: 3px solid #c7161c;
            color: #c7161c;
            background-color: white;
        }
        .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
            border-bottom: 3px solid #c7161c;
            color: #c7161c;
            background-color: white;
        }
    }
}
.picScroll{
    width: 100%;
    height: 450px;
    margin-bottom: 50px;
}
</style>