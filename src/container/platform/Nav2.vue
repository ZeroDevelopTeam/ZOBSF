<template>
	<section class="nav-control">
		<el-row class="nav">
			<el-col :span="5">
				<el-dropdown @visible-change="hiddenType" @command="handleCommand" :hide-on-click="false">
					<el-button type="danger" style="width:190px">图书分类</el-button>
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
  				<el-button type="danger">购物车(0)</el-button>
  				<el-button>我的订单</el-button>
  			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	flag:false,
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
		    }
  		},
  		mounted () {
  			
  		},
  		components: {
		}
	}

</script>

<style scoped lang="scss">
/*特殊nav*/
.el-dropdown-menu.type-list{
	filter:alpha(Opacity=90);-moz-opacity:0.9;opacity: 0.9;
	text-align: center;
	position: absolute;
    top: 40px;
    left: 5% !important;
    width: 190px;
    height: 450px;
    transform-origin: center top 0px;
    z-index: 2000;
}
.type-detail{
	background-color: #fff;
	min-width:500px;
	height:450px;
	margin-left:190px;
	position:absolute;
	z-index:2;
}
.nav-control{
    .nav{
        width: 90%;
        margin: auto;
        border-bottom: 3px solid #c7161c;
        line-height: 40px;
        
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
        .nav-type{
            width: 30px;
        }
    }   
}
</style>